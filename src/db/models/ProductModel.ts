import { NewProduct } from "@/types/types";
import { database } from "../config/mongodb";
import { z } from "zod"
import { ObjectId } from "mongodb";

const ProductSchema = z.object({
    name: z.string({ message: "Name is required"}),
    description: z.string({ message: "Description is required"}),
    price: z.number({ message: "Price is required"}),
    stock: z.number({ message: "Stock is required"}),
    category: z.string({ message: "Category is required"}),
    supplierId: z.string({ message: "Supplier ID is required"}),
    producerId: z.string({ message: "Producer ID is required"}),
})


class ProductModel {
    static collection() {
        return database.collection<NewProduct>("products");
    }

    static async create(newProduct: NewProduct, role: string, supplierId: string) {

        if (role !== "admin") {
            throw { message: "Unauthorized", status: 401 };
        }

        ProductSchema.parse(newProduct);
        const products = await this.collection().aggregate([
            {
                $facet: {
                    existingProducts: [
                        { $match: { $or: [{ name: newProduct.name}, { description: newProduct.description}] } },
                        { $limit: 1 },
                    ],
                    validProducer: [
                        {
                            $lookup: {
                                from: "producers",
                                localField: "producerId",
                                foreignField: "_id",
                                as: "producer",
                            },
                        },
                        { $match: { "producer._id": new ObjectId(newProduct.producerId) } },
                        { $limit: 1 },
                    ],
                },
            },
            {
                $project: {
                    existingProducts: { $arrayElemAt: ["$existingProducts", 0] },
                    validProducer: { $arrayElemAt: ["$validProducer", 0] },
                },
            },
        ]).toArray();

        const { existingProducts, validProducer } = products[0];

        if (existingProducts) {
            throw { message: "Product already exists", status: 401 };
        }

        if (!validProducer) {
            throw { message: "Invalid producer ID", status: 400 };
        }

        const productToInsert = {
            ...newProduct,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await this.collection().insertOne(productToInsert);
        return "Product created successfully";
    }

    static async findById(id: string) {
        const product = await this.collection().findOne({ _id: new ObjectId(id) });
        if (!product) {
            throw { message: "Product not found", status: 404 };
        }
        return product;
    }

    static async getAll({ page, search }: { page: string, search: string}) {
        const limit = 6;
        const skip = (parseInt(page) - 1) * limit;

        const searchQueary = search.trim().split(" ").map(el => ({
            name: { $regex: el, $options: "i" },
        }));

        const products = await this.collection()
            .find({ $and: searchQueary, })
            .skip(skip)
            .limit(limit)
            .toArray();
        return products;
    }

}

export default ProductModel;