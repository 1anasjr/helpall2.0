import deletePost from '../../../../lib/post/deletePost';

export async function DELETE(req) {
    try {
        // Assuming you parse the request body to get the post data
        const {uid,id} = await req.json(); // Use req.json() to parse JSON body in Next.js API routes
        // Call the addPost function
        deletePost(uid,id); // Ensure to await if addPost is an async function

        // Respond with success message
        return new Response({ status: 200 });
    } catch (error) {
        console.error("Error Deleting post: ", error);
        // Respond with error message
        return new Response({ status: 200 });
    }
}
