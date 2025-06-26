import type { Context } from "hono";
import type { ResponseHeader } from "hono/utils/headers";
import type {
  ClientErrorStatusCode,
  ServerErrorStatusCode,
} from "hono/utils/http-status";
import type { BaseMime } from "hono/utils/mime";
import type { JSONObject } from "hono/utils/types";

export const respond = {
  ok: function <
    C extends Context,
    T extends JSONObject,
    U extends 200 | 201 | 202,
  >(ctx: C, data: T, message: string, status: U, headers?: HeaderRecord) {
    ctx.status(status);
    for (const [name, value] of Object.entries(headers || {})) {
      ctx.header(name, value);
    }
    return ctx.json({ success: true, data, message });
  },

  err: function <
    C extends Context,
    U extends ClientErrorStatusCode | ServerErrorStatusCode,
  >(ctx: C, message: string, status: U, headers?: HeaderRecord) {
    ctx.status(status);
    for (const [name, value] of Object.entries(headers || {})) {
      ctx.header(name, value);
    }
    return ctx.json({ success: false, error: message });
  },
};

type HeaderRecord =
  | Record<"Content-Type", BaseMime>
  | Record<ResponseHeader, string>
  | Record<string, string>;
