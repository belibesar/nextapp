import { z } from "zod";
import { database } from "../config/mongodb";
import { NewUser, UserType } from "@/types/types";
import { hashPassword } from "@/utils/bcrypt";
import { ObjectId } from "mongodb";

const UserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
  role: z.enum(["admin", "distributor"], {
    errorMap: () => ({
      message: "Role must be either 'supplier' or 'distributor'"
    })
  }),
  companyName: z
    .string()
    .min(3, { message: "Company name must be at least 3 characters long" }),
  contact: z.object({
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 characters long" }),
    address: z.object({
      province: z
        .string()
        .min(3, { message: "Province must be at least 3 characters long" }),
      regency: z
        .string()
        .min(3, { message: "Regency must be at least 3 characters long" })
    })
  })
});

class UserModel {
  static collection() {
    return database.collection<UserType>("users");
  }

  static async create(newUser: NewUser) {
    UserSchema.parse(newUser);
    const user = await this.collection().findOne({
      $or: [{ name: newUser.name }, { email: newUser.email }]
    });

    if (user) {
      throw { message: "Email already exists", status: 400 };
    }

    newUser.password = hashPassword(newUser.password);

    await this.collection().insertOne(newUser);
    return "User created successfully";
  }

  static async findByEmail(email: string) {
    return await this.collection().findOne({ email });
  }

  static async findById(id: string) {
    const objectId = new ObjectId(id);
    return await this.collection().findOne({ _id: objectId });
  }

  static async updateUser(id: string, updatedUser: Partial<NewUser>) {
    const objectId = new ObjectId(id);

    const validatedData = UserSchema.partial().parse(updatedUser);
    if (validatedData.password) {
      validatedData.password = hashPassword(validatedData.password);
    }

    const result = await this.collection().updateOne(
      { _id: objectId },
      { $set: validatedData }
    );

    if (result.matchedCount === 0) {
      throw { message: "User not found", status: 404 };
    }

    return "User updated successfully";
  }

  static async getAllAdmin() {
    return await this.collection().find({ role: "admin" }).toArray();
  }
}

export default UserModel;
