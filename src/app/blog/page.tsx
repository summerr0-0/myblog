// app/blog/page.tsx (서버 컴포넌트)

import { getAllBlogPosts } from "@/lib/markdown";
import BlogList from "@/components/BlogList";

export const metadata = {
    title: "Blog",
    description: "Read my latest blog posts",
};

export default async function BlogPage() {
    const allPosts = getAllBlogPosts();

    return (
        <div className="min-h-screen p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Blog</h1>
            <BlogList posts={allPosts} />
        </div>
    );
}
