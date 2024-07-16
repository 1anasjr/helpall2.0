import addComment from '../../../../lib/commets/addComment';

export async function POST(req) {
    try {
        // Assuming you parse the request body to get the post data
        const data = await req.json(); // Use req.json() to parse JSON body in Next.js API routes
        // Call the addPost function
        const {uid,postId,userName,comment} = data
        addComment(uid,postId,userName,comment); // Ensure to await if addPost is an async function

        // Respond with success message
        return new Response({ status: 200 });
    } catch (error) {
        console.error("Error adding comments: ", error);
        // Respond with error message
        return new Response({ status: 200 });
    }
}