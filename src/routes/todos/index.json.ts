import type { RequestHandler } from "@sveltejs/kit"

let todos: Todo[] = [];

export const get: RequestHandler = async ({ request }) => {
  return {
    status: 200,
    body: todos
  }
}

// post
export const post: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const todoText = formData.get("text")
  todos.push({
    created_at: new Date(),
    text: todoText,
    done: false
  });
  return {
    status: 303,
    // body: formData.get("text") as string,
    headers: {
      location: "/"
    }
  }
}