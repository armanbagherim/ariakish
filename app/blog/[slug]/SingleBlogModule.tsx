"use client";
import { useState } from "react";

const SingleBlogModule = ({ posts }) => {
  const [copyText, setCopyText] = useState("کپی لینک صفحه");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopyText("کپی شد!");

      setTimeout(() => setCopyText("کپی لینک صفحه"), 2000);
    });
  };

  return (
    <main id="main pt-8">
      <header className="entry-header bg-[#F7F6F8] mb-12 p-8 mt-16">
        <div className="container px-4 md:px-0 mx-auto">
          <div className="flex justify-between mb-4 items-center flex-col md:flex-row">
            <h1 className="text-md md:text-[28px]  font-bold">
              {posts[0].title.rendered}
            </h1>
            <span className="text-sm text-gray-500">زمان مطالعه: 0 دقیقه</span>
          </div>
          <img
            src={posts[0]["_embedded"]["wp:featuredmedia"][0].source_url}
            className="w-full -mt-28  h-[450px] rounded-[55px] object-cover mb-8 relative -bottom-32"
            alt=""
          />
        </div>
      </header>
      <article className="container px-4 md:px-0 mx-auto pt-12">
        <div className="wrapper-content prose prose-neutral max-w-none prose-a:text-primary">
          <div className="flex justify-between items-center mb-12">
            <div className="flex gap-2 font-bold text-[#2563eb]">
              {posts[0]["_embedded"]["wp:term"][0].map((value, key) => (
                <span className="category" key={key}>
                  {value.name}
                </span>
              ))}
            </div>
            <div
              className="flex items-center gap-2 border border-[#707686] p-2 rounded-xl cursor-pointer"
              onClick={handleCopyLink}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.75 7H8.75C7.7835 7 7 7.7835 7 8.75V15.75C7 16.7165 7.7835 17.5 8.75 17.5H15.75C16.7165 17.5 17.5 16.7165 17.5 15.75V8.75C17.5 7.7835 16.7165 7 15.75 7Z"
                  stroke="#707686"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M14 7V5.25C14 4.78587 13.8156 4.34075 13.4874 4.01256C13.1592 3.68437 12.7141 3.5 12.25 3.5H5.25C4.78587 3.5 4.34075 3.68437 4.01256 4.01256C3.68437 4.34075 3.5 4.78587 3.5 5.25V12.25C3.5 12.7141 3.68437 13.1592 4.01256 13.4874C4.34075 13.8156 4.78587 14 5.25 14H7"
                  stroke="#707686"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span
                id="copyLink"
                className="copy-link !text-[#707686] no-underline"
              >
                {copyText}
              </span>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: posts[0].content.rendered,
            }}
          ></div>
        </div>
      </article>
    </main>
  );
};

export default SingleBlogModule;
