import { Hono } from "hono";
import example from "./example";

const routes = new Hono().route("/example", example);

export default routes;
