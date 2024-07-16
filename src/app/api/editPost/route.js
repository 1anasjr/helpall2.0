import editPost from '../../../../lib/post/editPost';

export async function PUT(req) {
    try {
        // Assuming you parse the request body to get the post data
        const {uid,id,post} = await req.json(); // Use req.json() to parse JSON body in Next.js API routes
        // Call the addPost function
        editPost(uid,id,post); // Ensure to await if addPost is an async function

        // Respond with success message
        return new Response({ status: 200 });
    } catch (error) {
        console.error("Error adding post: ", error);
        // Respond with error message
        return new Response({ status: 200 });
    }
}
