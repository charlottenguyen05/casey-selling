"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { db } from "@/db";

export const getAuthStatus = async () => {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        console.log("Auth-callback", user)

        if (!user?.id || !user?.email) {
            throw new Error("User not found");
        }

        const existingUser = await db.user.findFirst({
            where: { email: user.email }
        })

        if (!existingUser) {
            await db.user.create({
                data: {
                    id: user.id,
                    email: user.email,
                }
            })
        }
        console.log("New user created")
        return { success: true }
    }
    catch (error) {
        console.log("error in getAuthStatus", error);
        return { success: false }
    }
}