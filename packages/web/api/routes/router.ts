import { Hono } from "hono";
import welcome from "./welcome.route";

const routes = new Hono().route("/welcome", welcome);

export default routes;
