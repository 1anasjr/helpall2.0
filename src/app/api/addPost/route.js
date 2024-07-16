import addPost from '../../../../lib/post/addPost';

export async function POST(req) {
    try {
        // Assuming you parse the request body to get the post data
        const postData = await req.json(); // Use req.json() to parse JSON body in Next.js API routes
        // Call the addPost function
        addPost(postData); // Ensure to await if addPost is an async function

        // Respond with success message
        return new Response({ status: 200 });
    } catch (error) {
        console.error("Error adding post: ", error);
        // Respond with error message
        return new Response({ status: 200 });
    }
}
