import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";


export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const signature = headers().get("stripe-signature");
        if (process.env.STRIPE_ENDPOINT_SECRET && signature) {
            const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_ENDPOINT_SECRET);
            console.log("Event", event)

            if (event.type === "checkout.session.completed") {
                const data = event.data.object;
                console.log("Data about user payment", data)

                const { userId, orderId } = data.metadata || { userId: null, orderId: null }

                if (!userId || !orderId) {
                    throw new Error("User or order not found")
                }

                const shippingAddress = data.shipping_details!.address;
                const billingAddress = data.customer_details!.address;

                await db.order.update({
                    where: {
                        id: orderId,
                    },
                    data: {
                        isPaid: true,
                        shippingAddress: {
                            create: {
                                name: data.customer_details!.name!,
                                city: shippingAddress!.city!,
                                postalCode: shippingAddress!.postal_code!,
                                street: shippingAddress!.line1!,
                                country: shippingAddress!.country!,
                            },
                        },
                        billingAddress: {
                            create: {
                                name: data.customer_details!.name!,
                                city: billingAddress!.city!,
                                postalCode: billingAddress!.postal_code!,
                                street: billingAddress!.line1!,
                                country: billingAddress!.country!,
                            },
                        }
                    }
                })

                return NextResponse.json({ result: event, ok: true });
            }


        } else {
            throw new Error("Stripe endpoint secret not found or singature not found");
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Error in checkout session", ok: false}, { status: 500 });
    }
}