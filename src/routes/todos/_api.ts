import todoItemSvelte from "$lib/todo-item.svelte";
import type { RequestEvent } from "@sveltejs/kit"

let todos: Todo[] = [];

export const api = (params: Record<string, unknown>, request: Request, data?: Record<string, string>) => {
  let body = {};
  let status = 500;

  switch (request.method.toUpperCase()) {
    case "GET":
      body = todos;
      status = 200;
      break;
    case "POST":
      todos.push(data as Todo)
      body = data;
      status = 201;
      break;
    case "DELETE":
      todos = todos.filter(todo => todo.uid !== params.uid)
      status = 200;
      break;
    case "PATCH":
      todos = todos.map(todo => {
        if (todo.uid === params.uid) {
          todo.text = data.text as string;
        }
        return todo;
      });
      status = 200;
      break;
    default:
      break;
  }

  if (request.method.toUpperCase() !== "GET") {
    return {
      status: 303,
      headers: {
        location: "/"
      }
    };
  }

  return {
    status,
    body
  }
}
