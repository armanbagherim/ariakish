import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Clock } from "../_components/design/icons";
import ReadingTime from "../_components/Utils/ReadingTime";

const BlogModule = ({ posts }) => {
  console.log(posts);
  return (
    <div className="container px-4 md:p-0 mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {posts.map((post, key) => (
          <Link
            key={key}
            href={`/blog/${post.slug}`}
            className="relative block"
          >
            <div
              key={post.id}
              className="flex  border sm:h-full sm:flex-col lg:flex-col border-[#CFD2E3] gap-4 rounded-[55px] px-6 py-6"
            >
              {post?._embedded["wp:featuredmedia"] !== undefined && (
                <Image
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="sm:w-full lg:w-full rounded-[40px] lg:w-[152px] lg:h-[152px] w-[152px] h-[152px] object-cover"
                  src={post?._embedded["wp:featuredmedia"][0]?.source_url}
                />
              )}
              <div>
                <Link
                  className="text-[#298C89] bg-[#EAF4F4] rounded-xl p-2 mb-4 inline-block"
                  href={post?._embedded["wp:term"][0][0].slug}
                >
                  {post?._embedded["wp:term"][0][0].name}
                </Link>
                <h4 className="azarMehr text-base mb-4">
                  {post?.title?.rendered}
                </h4>
                <div className="flex items-center gap-2 ">
                  <Clock color={"black"} />{" "}
                  <ReadingTime content={post?.content?.rendered} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogModule;
