import { prisma } from "../lib/prisma.js";

export async function getAnalyticsOverview() {
  const [
    totalRequests,
    blockedRequests,
    averageLatency,
    activeApiKeys,
  ] = await Promise.all([
    prisma.requestLog.count(),

    prisma.requestLog.count({
      where: {
        wasBlocked: true,
      },
    }),

    prisma.requestLog.aggregate({
      _avg: {
        responseTimeMs: true,
      },
    }),

    prisma.apiKey.count({
      where: {
        isActive: true,
      },
    }),
  ]);

  return {
    totalRequests,
    blockedRequests,
    averageLatency: Math.round(
      averageLatency._avg.responseTimeMs ?? 0
    ),
    activeApiKeys,
  };
}

export async function getTopApiKeys() {
  const topApiKeys = await prisma.apiKey.findMany({
    where: {
      requestLogs: {
        some: {},
      },
    },
    select: {
      id: true,
      name: true,
      tier: true,
      isActive: true,
      _count: {
        select: {
          requestLogs: true,
        },
      },
    },
    orderBy: {
      requestLogs: {
        _count: "desc",
      },
    },
    take: 10,
  });

  return topApiKeys.map((apiKey) => ({
    id: apiKey.id,
    name: apiKey.name,
    tier: apiKey.tier,
    isActive: apiKey.isActive,
    totalRequests: apiKey._count.requestLogs,
  }));
}

export async function getRecentRequests() {
  return prisma.requestLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
    select: {
      id: true,
      method: true,
      endpoint: true,
      statusCode: true,
      responseTimeMs: true,
      ipAddress: true,
      userAgent: true,
      wasBlocked: true,
      blockReason: true,
      createdAt: true,
      apiKey: {
        select: {
          id: true,
          name: true,
          keyPrefix: true,
          tier: true,
        },
      },
    },
  });
}
export async function getUsageTrend() {
  const endTime = new Date();
  const startTime = new Date(
    endTime.getTime() - 24 * 60 * 60 * 1000
  );

  const requestLogs = await prisma.requestLog.findMany({
    where: {
      createdAt: {
        gte: startTime,
        lte: endTime,
      },
    },
    select: {
      createdAt: true,
      wasBlocked: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const hourlyBuckets = new Map();

  for (let hourOffset = 23; hourOffset >= 0; hourOffset -= 1) {
    const bucketTime = new Date(
      endTime.getTime() - hourOffset * 60 * 60 * 1000
    );

    bucketTime.setUTCMinutes(0, 0, 0);

    const bucketKey = bucketTime.toISOString();

    hourlyBuckets.set(bucketKey, {
      timestamp: bucketKey,
      totalRequests: 0,
      blockedRequests: 0,
    });
  }

  for (const requestLog of requestLogs) {
    const bucketTime = new Date(requestLog.createdAt);

    bucketTime.setUTCMinutes(0, 0, 0);

    const bucketKey = bucketTime.toISOString();
    const bucket = hourlyBuckets.get(bucketKey);

    if (!bucket) {
      continue;
    }

    bucket.totalRequests += 1;

    if (requestLog.wasBlocked) {
      bucket.blockedRequests += 1;
    }
  }

  return Array.from(hourlyBuckets.values());
}
export async function getErrorAnalytics() {
  const groupedStatuses = await prisma.requestLog.groupBy({
    by: ["statusCode"],
    _count: {
      statusCode: true,
    },
    orderBy: {
      statusCode: "asc",
    },
  });

  const totalErrors = groupedStatuses.reduce(
    (total, group) =>
      group.statusCode >= 400
        ? total + group._count.statusCode
        : total,
    0
  );

  const statusBreakdown = groupedStatuses
    .filter((group) => group.statusCode >= 400)
    .map((group) => ({
      statusCode: group.statusCode,
      count: group._count.statusCode,
    }));

  return {
    totalErrors,
    statusBreakdown,
  };
}
export async function getLatencyAnalytics() {
  const latencyStats = await prisma.requestLog.aggregate({
    _avg: {
      responseTimeMs: true,
    },
    _min: {
      responseTimeMs: true,
    },
    _max: {
      responseTimeMs: true,
    },
  });

  return {
    averageLatencyMs: Math.round(
      latencyStats._avg.responseTimeMs ?? 0
    ),
    minimumLatencyMs:
      latencyStats._min.responseTimeMs ?? 0,
    maximumLatencyMs:
      latencyStats._max.responseTimeMs ?? 0,
  };
}