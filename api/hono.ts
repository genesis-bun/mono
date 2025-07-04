import routes from "./routes";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";
import { respond } from "@/api/lib/utils/respond";
import { rateLimiter } from "hono-rate-limiter";
import { cors } from "hono/cors";

const hono = new Hono()
  .use(cors())
  .use(logger())
  .use(trimTrailingSlash())
  .use(
    rateLimiter({
      windowMs: 1000,
      limit: 300,
      standardHeaders: "draft-6",
      keyGenerator: async (ctx) => ctx.req.header("X-Api-Key")!,
    })
  )
  .route("/api/v1", routes)
  .get("*", (ctx) => {
    return respond.err(ctx, "Invalid v1 api route", 404);
  });

export default hono;