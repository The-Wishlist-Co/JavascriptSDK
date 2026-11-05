/**
 * The one error type the TWC client throws.
 *
 * It carries the HTTP status, a short code and a message naming the operation. It never
 * carries the client secret, tokens, request or response bodies, or values from the URL
 * (an email can be part of a TWC path), so it is safe to log.
 */
export class TWCError extends Error {
  /** HTTP status from TWC, or 0 when no response was received. */
  readonly status: number;
  /** One of: bad_request, unauthorized, forbidden, not_found, conflict, rate_limited, server_error, network_error, invalid_argument, customer_conflict, browser_not_supported, auth_failed. */
  readonly code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = "TWCError";
    this.status = status;
    this.code = code;
  }
}

export function codeForStatus(status: number): string {
  if (status === 400) return "bad_request";
  if (status === 401) return "unauthorized";
  if (status === 403) return "forbidden";
  if (status === 404) return "not_found";
  if (status === 409) return "conflict";
  if (status === 429) return "rate_limited";
  return "server_error";
}

/** The result of an operation on a wishlist or item that does not belong to the customer. */
export function notFound(what: string): TWCError {
  return new TWCError(`${what} not found`, 404, "not_found");
}

export function invalidArgument(message: string): TWCError {
  return new TWCError(message, 0, "invalid_argument");
}
