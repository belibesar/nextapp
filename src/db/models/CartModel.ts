import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";

class CartModel {
  static collection() {
    return database.collection("carts");
  }

  static async updateQuantity(userId: string, productId: string, qty: number) {
    const cart = await this.collection().findOne({
      userId: new ObjectId(userId)
    });

    if (!cart) throw { message: "Cart not found", status: 404 };

    const itemIndex = cart.items.findIndex(
      (item: any) => item.productId === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;

      if (cart.items[itemIndex].qty <= 0) {
        cart.items.splice(itemIndex, 1);
      }

      await this.collection().updateOne(
        { userId: new ObjectId(userId) },
        { $set: { items: cart.items, updatedAt: new Date() } }
      );
    } else {
      if (qty > 0) {
        cart.items.push({ productId: new ObjectId(productId), qty });
        await this.collection().updateOne(
          { userId: new ObjectId(userId) },
          { $set: { items: cart.items, updatedAt: new Date() } }
        );
      } else {
        throw { message: "Product not found in cart", status: 404 };
      }
    }
    return cart;
  }

  static async getCartWithProducts(userId: string) {
    const cart = await this.collection()
      .aggregate([
        { $match: { userId: new ObjectId(userId) } },
        {
          $lookup: {
            from: "products",
            localField: "items.productId",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        {
          $project: {
            _id: 0,
            userId: 1,
            items: 1,
            productDetails: {
              _id: 1,
              name: 1,
              price: 1,
              description: 1
            },
            createdAt: 1,
            updatedAt: 1
          }
        }
      ])
      .toArray();

    if (!cart || cart.length === 0) {
      throw { message: "Cart not found", status: 404 };
    }

    return cart[0];
  }

  static async addToCart(userId: string, productId: string, qty: number = 1) {
    if (qty <= 0) {
      throw { message: "Quantity must be greater than 0", status: 400 };
    }

    const cart = await this.findById(userId);
    // disini cart menggunakan userId sebagai id cart
    if (cart) {
      // If the cart exists, check if the product already exists in the items array
      const itemIndex = cart.items.findIndex(
        (item: { productId: ObjectId }) =>
          item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // If the product exists, update the quantity
        cart.items[itemIndex].qty += qty;
      } else {
        // If the product does not exist, push it to the items array
        cart.items.push({ productId: new ObjectId(productId), qty });
      }

      // Update the cart in the database
      await this.collection().updateOne(
        { _id: new ObjectId(userId) },
        { $set: { items: cart.items, updatedAt: new Date() } }
      );
    } else {
      // If the cart does not exist, create a new cart
      const newCart = {
        _id: new ObjectId(userId),
        items: [{ productId: new ObjectId(productId), qty }],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await this.collection().insertOne(newCart);
    }


   static async clearCart(userId: string) {
        return await this.collection().deleteOne({ userId: new ObjectId(userId) });
      }
    return await this.collection().findOne({ _id: new ObjectId(userId) });
  }

  static async findById(id: string) {
    const objectId = new ObjectId(id);
    const cart = await this.collection().findOne({ _id: objectId });

    return cart;
  }

}

export default CartModel;
