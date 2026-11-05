import { TWCError } from "./errors";

const REFRESH_BEFORE_EXPIRY_MS = 30 * 1000;

/**
 * Client-credentials tokens for one TWC client instance. The token lives only in this object,
 * never in a module-level variable, so clients for different tenants in one process never
 * share a token.
 */
export class TokenManager {
  private token: string | null = null;
  private expiresAt = 0;
  private inFlight: Promise<string> | null = null;

  constructor(
    private readonly tokenUrl: string,
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly fetchImpl: typeof fetch
  ) {}

  /** A valid token, requesting a new one when there is none or it expires within 30 seconds. */
  get(): Promise<string> {
    if (this.token && Date.now() < this.expiresAt - REFRESH_BEFORE_EXPIRY_MS) {
      return Promise.resolve(this.token);
    }
    if (!this.inFlight) {
      this.inFlight = this.request().then(
        (token) => {
          this.inFlight = null;
          return token;
        },
        (error) => {
          this.inFlight = null;
          throw error;
        }
      );
    }
    return this.inFlight;
  }

  /** Drop the cached token, e.g. after TWC rejects it with a 401. */
  invalidate(): void {
    this.token = null;
    this.expiresAt = 0;
  }

  private async request(): Promise<string> {
    let res: Response;
    try {
      res = await this.fetchImpl(this.tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }).toString(),
      });
    } catch {
      throw new TWCError("TWC token request failed: no response", 0, "network_error");
    }
    if (!res.ok) {
      throw new TWCError(`TWC token request failed with ${res.status}`, res.status, "auth_failed");
    }
    const data: any = await res.json().catch(() => null);
    if (!data || typeof data.access_token !== "string") {
      throw new TWCError("TWC token request returned no access token", res.status, "auth_failed");
    }
    this.token = data.access_token;
    this.expiresAt = Date.now() + (Number(data.expires_in) || 60) * 1000;
    return data.access_token;
  }
}
