import GroupBuyModel from "@/db/models/GroupBuyModel";
import errorHandler from "@/lib/errorHandler";

export async function GET(request: Request) {
    try {
        const userData = request.headers.get("x-user-data");
        console.log("x-user-data header:", userData);

        let userDataJson;
        try {
            userDataJson = JSON.parse(userData || "");
        } catch (parseError) {
            console.error("Invalid JSON in x-user-data header:", userData);
            userDataJson = { _id: userData };
        }

        const userId = userDataJson?._id;
        if (!userId) {
            throw { message: "User ID is required", status: 400 };
        }

        const groupBuys = await GroupBuyModel.findByUserId(userId);
        console.log("Group buys fetched:", groupBuys);

        return new Response(JSON.stringify({ success: true, data: groupBuys }), { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}