/**
 * Server-side HTTP client for the FastAPI backend (makana-main/backend).
 * Every call runs on the Next.js server (SSR / route handlers) and talks to
 * BACKEND_URL; the browser never calls the backend directly, so the admin JWT
 * only ever travels between the two servers inside an httpOnly cookie.
 */

export const BACKEND_URL = (process.env.BACKEND_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");

const DEFAULT_TIMEOUT_MS = 6000;

export interface BackendError extends Error {
  status: number;
  code: string;
}

function makeError(status: number, code: string): BackendError {
  const err = new Error(`backend ${status}: ${code}`) as BackendError;
  err.status = status;
  err.code = code;
  return err;
}

interface CallOptions {
  method?: string;
  /** Admin JWT (no "Bearer " prefix) for authenticated calls. */
  token?: string;
  body?: unknown;
  timeoutMs?: number;
  query?: Record<string, string | undefined>;
}

/**
 * Calls the backend and parses the JSON response. Non-2xx responses throw a
 * BackendError whose `code` is the machine-readable detail the backend sends
 * (e.g. "bad-password", "slug-taken") when it is a plain word, else a generic
 * "server-error". Network failures/timeouts throw with code "unreachable".
 */
export async function backend<T>(path: string, opts: CallOptions = {}): Promise<T> {
  const url = new URL(`${BACKEND_URL}${path}`);
  for (const [k, v] of Object.entries(opts.query ?? {})) {
    if (v !== undefined && v !== "") url.searchParams.set(k, v);
  }

  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";
  if (opts.token) headers["Authorization"] = `Bearer ${opts.token}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: opts.method ?? "GET",
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(opts.timeoutMs ?? DEFAULT_TIMEOUT_MS),
    });
  } catch {
    throw makeError(0, "unreachable");
  }

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const detail = (data as { detail?: unknown } | null)?.detail;
    const code =
      typeof detail === "string" && /^[a-z-]+$/.test(detail) ? detail : "server-error";
    throw makeError(res.status, code);
  }
  return data as T;
}
