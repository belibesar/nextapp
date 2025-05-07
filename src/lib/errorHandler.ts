import { CustomeError } from "@/types/types";
import { ZodError } from "zod";

export default function errorHandler(error: unknown) {
  let message = (error as CustomeError).message || "Internal Server Error";
  let status = (error as CustomeError).status || 500;
  //   console.log(error);

  if (error instanceof ZodError) {
    status = 400;
    message = error.errors.map((el) => `${el.message}`).join(", ");
  }

  return Response.json({ message }, { status });
}
