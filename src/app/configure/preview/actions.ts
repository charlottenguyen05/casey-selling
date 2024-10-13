"use server";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product"
import { db } from "@/db"
import { stripe } from "@/lib/stripe"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Order } from "@prisma/client"

export const createCheckoutSession = async ({ configId }: { configId: string }) => {
    try {
        const configuration = await db.configuration.findUnique({
            where: { id: configId }
        });

        if (!configuration) {
            throw new Error("Configuration not found");
        }
        
        const { finish, material } = configuration;

        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            throw new Error("You need to be logged in to checkout");
        }

        const existingOrder = await db.order.findFirst({
            where: {
                userId: user.id,
                configurationId: configId
            }
        });

        let price = BASE_PRICE;
        if (material === "polycarbonate") {
            price += PRODUCT_PRICES.material.polycarbonate;
        }
        if (finish === "textured") {
            price += PRODUCT_PRICES.finish.textured;
        }

        let order: Order | undefined = undefined;

        console.log("Creating checkout session", user.id, configuration.id);

        if (existingOrder) {
            order = existingOrder;
        } else {
            order = await db.order.create({
                data: {
                    userId: user.id,
                    totalPrice: price / 100,
                    configurationId: configuration.id
                }
            });
        }

        const product = await stripe.products.create({
            name: "Custom Phone Case",
            description: "Custom phone case",
            images: [configuration.imageUrl],
            default_price_data: {
                currency: "eur",
                unit_amount: price,
            }
        });

        // Create a checkout session
        const checkoutSession = await stripe.checkout.sessions.create({
            line_items: [
                { price: product.default_price as string, quantity: 1 }
            ],
            payment_method_types: ["card", "paypal"],
            mode: "payment",
            shipping_address_collection: {
                allowed_countries: ["FR", "US", "CA", "VN", "DE", "GB", "ES", "IT", "NL", "BE", "SE", "FI", "DK", "NO", "PT", "PL", "CZ", "SK", "HU", "AT", "CH", "IE", "LU", "GR", "RO", "BG", "HR", "SI", "LT", "LV", "EE", "MT", "CY"],
            },
            metadata: {
                userId: user.id,
                orderId: order.id,
            },
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?order_id=${order.id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configId}`,
        });

        return { url: checkoutSession.url };
    } catch (error) {
        console.error("Error creating checkout session:", error);
        throw error;
    }
};

