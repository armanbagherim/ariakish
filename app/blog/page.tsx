import { notFound } from "next/navigation";
import React from "react";
import BlogModule from "./BlogModule";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "گارانتی آریا کیش | وبلاگ",
  description: "وبلاگ آریا کیش",
};

async function getPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}/wp-json/wp/v2/posts?_embed`,
    {
      cache: "force-cache",
    }
  );
  const post = await res.json();
  if (!post) notFound();
  return post;
}

const PostsBlog = async () => {
  const posts = await getPosts();
  return <BlogModule posts={posts} />;
};

export default PostsBlog;
