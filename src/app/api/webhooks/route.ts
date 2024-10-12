// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import { stripe } from "@/lib/stripe";
// import { db } from "@/db";


// export async function POST(req: NextRequest) {
//     if (typeof process.env.STRIPE_WEBHOOK_SECRET === 'undefined') {
//         throw new Error('Environment variable STRIPE_WEBHOOK_SECRET is missing!')
//     }

//     try {
//         const body = await req.text();
//         const signature = headers().get("stripe-signature");
//         if (process.env.STRIPE_WEBHOOK_SECRET && signature) {
//             const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
//             console.log("Event", event)

//             if (event.type === "checkout.session.completed") {

//                 if (!event.data.object.customer_details?.email) {
//                     throw new Error('Missing user email')
//                 }

//                 const data = event.data.object;
//                 console.log("Data about user payment", data)

//                 const { userId, orderId } = data.metadata || { userId: null, orderId: null }

//                 if (!userId || !orderId) {
//                     throw new Error("User or order not found")
//                 }

//                 const shippingAddress = data.shipping_details!.address;
//                 const billingAddress = data.customer_details!.address;

//                 await db.order.update({
//                     where: {
//                         id: orderId,
//                     },
//                     data: {
//                         isPaid: true,
//                         shippingAddress: {
//                             create: {
//                                 name: data.customer_details!.name!,
//                                 city: shippingAddress!.city!,
//                                 postalCode: shippingAddress!.postal_code!,
//                                 street: shippingAddress!.line1!,
//                                 country: shippingAddress!.country!,
//                             },
//                         },
//                         billingAddress: {
//                             create: {
//                                 name: data.customer_details!.name!,
//                                 city: billingAddress!.city!,
//                                 postalCode: billingAddress!.postal_code!,
//                                 street: billingAddress!.line1!,
//                                 country: billingAddress!.country!,
//                             },
//                         }
//                     }
//                 })

//                 return NextResponse.json({ result: event, ok: true });
//             }
//         } else {
//             throw new Error("Stripe endpoint secret not found or singature not found");
//         }
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({ message: error, ok: false }, { status: 500 });
//     }
// }

import { db } from '@/db'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import Email from "@/components/emails/Email"


const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const body = await req.text()
        const signature = headers().get('stripe-signature')

        if (!signature) {
            return new Response('Invalid signature', { status: 400 })
        }

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )

        if (event.type === 'checkout.session.completed') {
            if (!event.data.object.customer_details?.email) {
                throw new Error('Missing user email')
            }

            const session = event.data.object as Stripe.Checkout.Session

            const { userId, orderId } = session.metadata || {
                userId: null,
                orderId: null,
            }

            if (!userId || !orderId) {
                throw new Error('Invalid request metadata')
            }

            const billingAddress = session.customer_details!.address
            const shippingAddress = session.shipping_details!.address
            console.log(userId, orderId, billingAddress, shippingAddress)

            const order = await db.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    isPaid: true,
                    shippingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            city: shippingAddress!.city!,
                            country: shippingAddress!.country!,
                            postalCode: shippingAddress!.postal_code!,
                            street: shippingAddress!.line1!,

                        },
                    },
                    billingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            city: billingAddress!.city!,
                            country: billingAddress!.country!,
                            postalCode: billingAddress!.postal_code!,
                            street: billingAddress!.line1!,

                        },
                    },
                },
            })

            await resend.emails.send({
                from: "Casey Selling <nhinguyenngoclinh2005@gmail.com>",
                to: [event.data.object.customer_details.email],
                subject: "Thank for your order!",
                react: Email({
                    orderId,
                    orderDate: order.createdAt.toLocaleDateString(),
                    // @ts-ignore
                    shippingAddress: {
                        name: session.customer_details!.name!,
                        city: shippingAddress!.city!,
                        country: shippingAddress!.country!,
                        postalCode: shippingAddress!.postal_code!,
                        street: shippingAddress!.line1!,

                    }
                })
            })


            return NextResponse.json({ result: event, ok: true })
        } else {
            throw new Error("Stripe endpoint secret not found or singature not found");
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error, ok: false }, { status: 500 });
    }
}