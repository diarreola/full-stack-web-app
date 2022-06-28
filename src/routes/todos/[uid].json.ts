import type { RequestHandler } from "@sveltejs/kit"
import { api } from "./_api";

export const del: RequestHandler = async ({ params, request }) => {
  return api(params, request);
}

export const patch: RequestHandler = async ({ params, request }) => {
  const formData = await request.formData();
  const todoText = formData.get("text") as string
  const markTodo = formData.has("done") ? !!formData.get("done") : undefined

  return api(params, request, {
    text: todoText,
    done: markTodo
  });
}