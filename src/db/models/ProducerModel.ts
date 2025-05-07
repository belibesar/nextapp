import { database } from "../config/mongodb";
import { z } from "zod";
import { ProducerType } from "@/types/types";
import { ObjectId } from "mongodb";

const ProducerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contact: z.object({
    phone: z.string(),
    email: z.string().email("Invalid email"),
    address: z.string()
  })
});

class ProducerModel {
  static collection() {
    return database.collection("producers");
  }

  static async create(producer: ProducerType) {
    ProducerSchema.parse(producer);

    const result = await this.collection().insertOne(producer);
    return result;
  }

  static async getAll() {
    const producers = await this.collection().find().toArray();
    return producers.map((producer) => ({
      id: producer._id,
      name: producer.name,
      contact: {
        phone: producer.contact.phone,
        email: producer.contact.email,
        address: producer.contact.address
      }
    }));
  }

  static async getById(id: string | ObjectId | undefined) {
    if (!id) {
      throw { message: "ID is required", status: 400 };
    }
    const objectId = new ObjectId(id);
    const producer = await this.collection().findOne({ _id: objectId });
    if (!producer) {
      throw { message: "Producer not found", status: 404 };
    }
    return producer;
  }
}

export default ProducerModel;
