import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";



class ProducerModel {
    static collection() {
        return database.collection("producers");
    }

    static async getAll() {
        const producers = await this.collection().find().toArray();
        return producers.map((producer) => ({
            id: producer._id,
            name: producer.name,
            contact: {
                phone: producer.phone,
                email: producer.email,
                address: producer.address,
            },
        }));

    }
}

export default ProducerModel;