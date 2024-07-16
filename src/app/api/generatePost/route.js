import generatePost from '../../../../lib/post/generatePost';

export async function GET(req, res) {
    try {
        const posts = await generatePost();
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.error("Error fetching posts: ", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), { status: 500 });
    }
}
