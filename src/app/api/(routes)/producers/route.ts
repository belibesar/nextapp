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