// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server'
import { headers } from 'next/headers';
import Stripe from "stripe";
import editPost from '../../../../lib/post/editPost';
import getPostById from '../../../../lib/post/getPostById';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST= async (req)=>{
    try{
      
    const data= await req.text()
    const dataJson = await JSON.parse(data)
    const sig = headers().get('Stripe-Signature') ;
    // console.log("sig",sig);
    let event = stripe.webhooks.constructEvent(data, sig,process.env.STRIPE_SECRET_ENDPOINT_SECRET);

    if (event.type === 'checkout.session.completed') {
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.

        const customer = await stripe.customers.retrieve(dataJson.data.object.customer)
        const metadata = await customer.metadata
        const {amount,postId,uid} = metadata
        // console.log(metadata);
        console.log({postId,uid});
        const post = await getPostById(uid,postId)
        let updatedAmt = parseInt(post.currentDonation) + parseInt(amount);
        const  updatedPost = {...post,currentDonation:updatedAmt}
        // const post = {currentDonation:amount}
        await editPost(uid,postId,updatedPost)
       
      }

    // console.log(event);
    return  NextResponse.json({ event })
        


    } catch(e) {

        console.log(e);
        return  NextResponse.json({  isSuccess:false,msg:"some error occured"+e.messsage })
    }

}

