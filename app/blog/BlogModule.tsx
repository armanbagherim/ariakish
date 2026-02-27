import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Clock } from "../_components/design/icons";
import ReadingTime from "../_components/Utils/ReadingTime";

const BlogModule = ({ posts }) => {
  return (
    <div className="container px-4 md:px-0 mx-auto mt-12" dir="rtl">
      {/* Refined Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post) => {
          const featuredImage = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col h-full bg-white border border-gray-100 rounded-[32px] p-4 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] bg-gray-50">
                {featuredImage ? (
                  <Image
                    alt={post.title.rendered}
                    src={featuredImage}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                    <span className="text-gray-300">بدون تصویر</span>
                  </div>
                )}

                {/* Subtle Overlay Badge */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-900 shadow-sm">
                    مطالعه مطلب
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex flex-col flex-grow pt-5 pb-2 px-2">
                {/* Category or Date Row */}
                <div className="flex items-center gap-3 mb-3 text-gray-400">
                  <div className="flex items-center gap-1 text-[11px] font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <ReadingTime content={post.content.rendered} />
                  </div>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-[11px] font-medium">
                    {new Date(post.date).toLocaleDateString('fa-IR')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="azarMehr text-lg md:text-xl font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post?.title?.rendered}
                </h3>

                {/* Footer Link (Stays at bottom) */}
                <div className="mt-auto pt-6 flex items-center text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <span>ادامه مطلب</span>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BlogModule;