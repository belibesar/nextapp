import ProducerModel from "@/db/models/ProducerModel";
import errorHandler from "@/lib/errorHandler";

export async function GET() {
  try {
    const producers = await ProducerModel.getAll();
    return Response.json(producers);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(request: Request) {
  try {
    const newProducer = await request.json();
    await ProducerModel.create(newProducer);
    return Response.json({ message: "Producer created successfully" });
  } catch (error) {
    return errorHandler(error);
  }
}
