import todoItemSvelte from "$lib/todo-item.svelte";
import type { RequestEvent } from "@sveltejs/kit";
import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export const api = async (params: Record<string, unknown>, request: Request, data?: Record<string, string>) => {
  let body = {};
  let status = 500;

  switch (request.method.toUpperCase()) {
    case "GET":
      body = await prisma.todo.findMany();
      status = 200;
      break;
    case "POST":
      body = await prisma.todo.create({
        data: {
          created_at: data.created_at as Date,
          done: data.done as boolean,
          text: data.text as string
        }
      })
      status = 201;
      break;
    case "DELETE":
      body = await prisma.todo.delete({
        where: {
          uid: params.uid
        }
      });
      status = 200;
      break;
    case "PATCH":
      if (data.text) {
        body = await prisma.todo.update({
          where: { 
            uid: params.uid
          },
          data: {
            text: data.text 
          }
        });
      } else {
        body = await prisma.todo.update({
          where: { 
            uid: params.uid
          },
          data: {
            done: data.done
          }
        });
      }
      status = 200;
      break;
    default:
      break;
  }

  if (request.method.toUpperCase() !== "GET" && 
    request.headers.get("accept") !== "application/json") {
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
