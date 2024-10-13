"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";


export const getPaymentDetails = async (orderId: string | undefined) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user?.email) {
        throw new Error("User not found. Please make sure you are logged in.");
    }

    const order = await db.order.findFirst({
        where: { id: orderId, userId: user.id },
        include: {
            billingAddress: true,
            configuration: true,
            shippingAddress: true,
            user: true,
        },
    });

    console.log("/thank-you/actions.ts getPaymentDetails", user?.id, user?.email, orderId)

    if (!order) {
        throw new Error("Sorry we can not find your order. Please reorder.");
    }

    if (order.isPaid) {
        console.log(order)
        return order;
    } else {
        return false;
    }
}
