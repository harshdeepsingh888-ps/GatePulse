const buckets = new Map();

function getCurrentTimeInSeconds() {
  return Date.now() / 1000;
}

function calculateRefillRate(requestsPerMinute) {
  return requestsPerMinute / 60;
}

export function rateLimitByApiKey(req, res, next) {
  const apiKey = req.apiKey;

  if (!apiKey) {
    const error = new Error(
      "API key context is missing"
    );
    error.statusCode = 500;
    return next(error);
  }

  const capacity = apiKey.requestsPerMinute;
  const refillRate = calculateRefillRate(capacity);
  const now = getCurrentTimeInSeconds();

  let bucket = buckets.get(apiKey.id);

  if (!bucket) {
    bucket = {
      tokens: capacity,
      lastRefillTimestamp: now,
    };
  }

  const elapsedSeconds =
    now - bucket.lastRefillTimestamp;

  const refilledTokens =
    elapsedSeconds * refillRate;

  bucket.tokens = Math.min(
    capacity,
    bucket.tokens + refilledTokens
  );

  bucket.lastRefillTimestamp = now;

  if (bucket.tokens < 1) {
    buckets.set(apiKey.id, bucket);

    res.setHeader("X-RateLimit-Limit", capacity);
    res.setHeader("X-RateLimit-Remaining", 0);
    const retryAfter = Math.ceil(
      (1 - bucket.tokens) / refillRate
    );

    res.setHeader("Retry-After", retryAfter);

    const error = new Error(
      "Rate limit exceeded"
    );
    error.statusCode = 429;

    return next(error);
  }

  bucket.tokens -= 1;
  buckets.set(apiKey.id, bucket);

  res.setHeader("X-RateLimit-Limit", capacity);
  res.setHeader(
    "X-RateLimit-Remaining",
    Math.floor(bucket.tokens)
  );

  return next();
}