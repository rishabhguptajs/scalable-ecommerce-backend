import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const createProductStripe = async(name: string, description: string, price: number) => {
    try {
        const product = await stripe.products.create({
            name, description
        })

        const priceStripe = await stripe.prices.create({
            product: product.id,
            unit_amount: price * 100,
            currency: 'usd'
        })

        const response = {
            product,
            priceStripe
        }

        return response;
    } catch (error: any) {
        throw new Error(`Error while creating product: ${error.message}`);
    }
}

const createPaymentIntent = async(amount: number, currency: string) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency
        });

        return paymentIntent;
    } catch (error: any) {
        throw new Error(`Error while creating payment intent: ${error.message}`);
    }
}

const confirmPayment = async(paymentIntentId: string) => {
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

        return paymentIntent;
    } catch (error: any) {
        throw new Error(`Error while confirming payment: ${error.message}`);
    }
}

const cancelPayment = async(paymentIntentId: string) => {
    try {
        const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);

        return paymentIntent;
    } catch (error: any) {
        throw new Error(`Error while cancelling payment: ${error.message}`);
    }
}

const createCheckoutSession = async(amount: number, currency: string, successUrl: string, cancelUrl: string) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'paypal', 'amazon_pay'],
            line_items: [
                {
                    price_data: {
                        currency,
                        product_data: {
                            name: 'T-shirt',
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
        })

        return session;
    } catch (error: any) {
        throw new Error(`Error while creating checkout session: ${error.message}`);
    }
}

export {
    createProductStripe,
    createPaymentIntent,
    confirmPayment,
    cancelPayment,
    createCheckoutSession
}