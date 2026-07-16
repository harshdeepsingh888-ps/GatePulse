import type { RecentRequest } from "@/services/analytics.service";

type RecentRequestsTableProps = {
  requests: RecentRequest[];
};

function getMethodColor(method: string) {
  switch (method) {
    case "GET":
      return "bg-emerald-500/10 text-emerald-500";

    case "POST":
      return "bg-blue-500/10 text-blue-500";

    case "PUT":
    case "PATCH":
      return "bg-amber-500/10 text-amber-500";

    case "DELETE":
      return "bg-red-500/10 text-red-500";

    default:
      return "bg-muted text-muted-foreground";
  }
}

function getStatusStyle(status: number) {
  if (status >= 500) {
    return {
      label: `${status} Server Error`,
      className: "border-red-500/20 bg-red-500/10 text-red-600",
    };
  }

  if (status === 429) {
    return {
      label: `${status} Rate Limited`,
      className: "border-amber-500/20 bg-amber-500/10 text-amber-600",
    };
  }

  if (status >= 400) {
    return {
      label: `${status} Client Error`,
      className: "border-orange-500/20 bg-orange-500/10 text-orange-600",
    };
  }

  return {
    label: `${status} OK`,
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
  };
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(date));
}

export function RecentRequestsTable({
  requests,
}: RecentRequestsTableProps) {
  if (requests.length === 0) {
    return (
      <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
        No requests recorded yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted-foreground">
            <th className="pb-3">Method</th>
            <th className="pb-3">Endpoint</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Latency</th>
            <th className="pb-3">API Key</th>
            <th className="pb-3">Time</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => {
            const status = getStatusStyle(request.statusCode);

            return (
            <tr
              key={request.id}
              className="border-b border-border/40"
            >
              <td className="py-3">
                <span
                  className={`rounded-md px-2 py-1 text-xs font-semibold ${getMethodColor(
                    request.method,
                  )}`}
                >
                  {request.method}
                </span>
              </td>

              <td className="font-medium">
                {request.endpoint}
              </td>

              <td className="py-3">
  <span
    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${status.className}`}
  >
    {status.label}
  </span>
</td>

              <td>
                {request.responseTimeMs} ms
              </td>

              <td>
                {request.apiKey?.name ?? "—"}
              </td>

              <td>
                {formatTime(request.createdAt)}
              </td>
            </tr>
                    );
        })}
        </tbody>
      </table>
    </div>
  );
}