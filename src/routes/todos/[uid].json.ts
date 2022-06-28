import type { RequestHandler } from "@sveltejs/kit"
import { api } from "./_api";

export const del: RequestHandler = async ({ params, request }) => {
  return api(params, request);
}