import type { RequestHandler } from "@sveltejs/kit"
import { api } from "./_api";

export const get: RequestHandler = async ({ params, request }) => {
  return api(params, request);
}

export const post: RequestHandler = async ({ params, request }) => {
  const formData = await request.formData();
  const todoText = formData.get("text") as string

  return api(params, request, {
    created_at: new Date(),
    text: todoText,
    done: false
  });
}