import { notFound } from "next/navigation";
import SingleBlogModule from "./SingleBlogModule";
import { Metadata } from "next";

async function getPost(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}/wp-json/wp/v2/posts?slug=${id}&_embed`,
    {
      cache: "force-cache",
    }
  );
  const post = await res.json();
  if (!post) notFound();
  return post;
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: `گارانتی آریا کیش | ${post[0].title.rendered}`,
    description: "وبلاگ آریا کیش",
  };
}

export default async function Page({ params }) {
  const posts = await getPost(params.slug);
  return <SingleBlogModule posts={posts} />;
}
