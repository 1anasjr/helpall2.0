'use server'

import Stripe from "stripe";
import getPostById from "../post/getPostById";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function stripePayment(uid,postId,amount) {
  try {
    const customer = await stripe.customers.create(
      {  
        metadata: {
          postId: postId,
          amount:amount,
          uid:uid
        },
      }
    );
    
    const {title} = await getPostById(uid,postId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: "aed",
            product_data: {
              name: title,
              description: `we thank for helping people in need`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        }
      ],
      mode: "payment",
      success_url: `http://localhost:3000/post/${uid}/${postId}`,
      cancel_url: `http://localhost:3000/post/${uid}/${postId}`,
    });
    return  session.url;
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    throw new Error("Failed to create Stripe session");
  }
}
