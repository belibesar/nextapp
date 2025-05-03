import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";


class CartModel {
    static collection() {
        return database.collection("carts");
    }

    static async updateQuantity(userId: string, productId: string, qty: number) {   
        const cart = await this.collection().findOne({ userId: new ObjectId(userId) });

        if (!cart) throw { message: "Cart not found", status: 404 };

        const itemIndex = cart.items.findIndex((item: any) => item.productId === productId);

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
                throw { message: "Product not found in cart", status: 404 }
            }
        }
        return cart;
    }

    static async getCartWithProducts(userId: string) {
        const cart = await this.collection().aggregate([
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
        ]).toArray();
    
        if (!cart || cart.length === 0) {
            throw { message: "Cart not found", status: 404 };
        }
    
        return cart[0];
    }

    static async addToCart(userId: string, productId: string, qty: number) {
        if (qty <= 0) {
            throw { message: "Quantity must be greater than 0", status: 400 };
        }
    
        const cart = await this.collection().findOne({ userId: new ObjectId(userId) });
    
        if (!cart) {
            const newCart = {
                userId: new ObjectId(userId),
                items: [{ productId: new ObjectId(productId), qty }],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await this.collection().insertOne(newCart);
            return newCart;
        }
    
        const itemIndex = cart.items.findIndex((item: any) => item.productId.toString() === productId);
    
        if (itemIndex > -1) {
            throw { message: "Product already exists in cart. go to cart", status: 400 };
        }
    
        cart.items.push({ productId: new ObjectId(productId), qty });
        cart.updatedAt = new Date();
    
        await this.collection().updateOne(
            { userId: new ObjectId(userId) },
            { $set: { items: cart.items, updatedAt: cart.updatedAt } }
        );
    
        return cart;
    }
}

export default CartModel;