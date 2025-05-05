import { NewProduct } from "@/types/types";
import { database } from "../config/mongodb";
import { z } from "zod";
import { ObjectId } from "mongodb";
import ProducerModel from "./ProducerModel";
import UserModel from "./UserModel";

const ProductSchema = z.object({
  name: z.string({ message: "Name is required" }),
  description: z.string({ message: "Description is required" }),
  price: z.number({ message: "Price is required" }),
  stock: z.number({ message: "Stock is required" }),
  category: z.string({ message: "Category is required" }),
  supplierId: z.string({ message: "Supplier ID is required" }),
  producerId: z.string({ message: "Producer ID is required" })
});

class ProductModel {
  static collection() {
    return database.collection<NewProduct>("products");
  }

  static async create(newProduct: NewProduct) {
    ProductSchema.parse(newProduct);

    const existingProducts = await this.getByName(newProduct.name);
    if (existingProducts) {
      throw { message: "Product already exists", status: 401 };
    }
    const validProducer = await ProducerModel.getById(newProduct.producerId);
    if (!validProducer) {
      throw { message: "Invalid producer ID", status: 400 };
    }
    const validSupplier = await UserModel.findById(
      newProduct.supplierId as string
    );
    if (!validSupplier) {
      throw { message: "Invalid supplier ID", status: 400 };
    }
    if (validSupplier.role !== "supplier") {
      throw { message: "Invalid supplier role", status: 400 };
    }

    newProduct.producerId = new ObjectId(newProduct.producerId);
    newProduct.supplierId = new ObjectId(newProduct.supplierId);

    const productToInsert = {
      ...newProduct,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.collection().insertOne(productToInsert);
    return productToInsert;
  }

  static async findById(id: string) {
    const product = await this.collection().findOne({ _id: new ObjectId(id) });
    if (!product) {
      throw { message: "Product not found", status: 404 };
    }
    return product;
  }

  static async getAll({ page, search }: { page: string; search: string }) {
    const limit = 8;
    const skip = (parseInt(page) - 1) * limit;

    const searchQuery = search
      .trim()
      .split(" ")
      .map((el) => ({
        name: { $regex: el, $options: "i" }
      })
      );

    const pipeline = [
      {
        $match: {
          ...(searchQuery.length > 0 ? { $and: searchQuery } : {}),
        }
      },
      {
        $lookup: {
          from: "producers",
          localField: "producerId",
          foreignField: "_id",
          as: "producer"
        }
      },
      {
        $unwind: {
          path: "$producer",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      }
    ]

    const products = await this.collection().aggregate(pipeline).toArray();
    return products;
  }

  static async getByName(name: string) {
    const product = await this.collection().findOne({ name });
    return product;
  }
}

export default ProductModel;
