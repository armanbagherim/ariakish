"use client";
import { useEffect, useState } from "react";

const SingleBlogModule = ({ posts }) => {
  const post = posts[0];
  const [copyText, setCopyText] = useState("کپی لینک صفحه");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopyText("کپی شد!");
      setTimeout(() => setCopyText("کپی لینک صفحه"), 2000);
    });
  };

  const fetchComments = async () => {
    setLoadingComments(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}/wp-json/wp/v2/comments?post=${post.id}`
    );
    const data = await res.json();
    setComments(data);
    setLoadingComments(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setSuccessMsg("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}/wp-json/wp/v2/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post: post.id,
          author_name: commentForm.name,
          author_email: commentForm.email,
          content: commentForm.content,
        }),
      }
    );

    const result = await res.json();

    if (res.ok) {
      setComments((prev) => [
        ...prev,
        {
          ...result,
          content: { rendered: commentForm.content },
          author_name: commentForm.name,
          pending: true,
        },
      ]);
      setSuccessMsg(
        "نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده خواهد شد."
      );
      setCommentForm({ name: "", email: "", content: "" });
    } else {
      alert("خطا در ارسال نظر");
      console.error(result);
    }

    setLoadingSubmit(false);
  };

  return (
    <main className="pt-8">
      <header className="entry-header bg-[#F7F6F8] mb-12 p-8 mt-16 rounded-[20px] shadow">
        <div className="container px-4 md:px-0 mx-auto">
          <div className="flex justify-between mb-4 items-center flex-col md:flex-row">
            <h1 className="text-md md:text-[28px] font-bold text-gray-800">
              {post.title.rendered}
            </h1>
            <span className="text-sm text-gray-500">زمان مطالعه: 0 دقیقه</span>
          </div>
          <img
            src={post._embedded["wp:featuredmedia"][0].source_url}
            className="w-full rounded-[32px] object-cover h-[400px] md:h-[450px] shadow-md"
            alt=""
          />
        </div>
      </header>

      <article className="container px-4 md:px-0 mx-auto pt-8">
        <div className="wrapper-content prose prose-neutral max-w-none prose-a:text-primary">
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2 font-bold text-blue-600">
              {post._embedded["wp:term"][0].map((value, key) => (
                <span className="category" key={key}>
                  {value.name}
                </span>
              ))}
            </div>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 border border-gray-400 p-2 rounded-xl hover:bg-gray-100"
            >
              <svg
                width="21"
                height="21"
                fill="none"
                stroke="#707686"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 21 21"
              >
                <path d="M15.75 7H8.75C7.7835 7 7 7.7835 7 8.75V15.75C7 16.7165 7.7835 17.5 8.75 17.5H15.75C16.7165 17.5 17.5 16.7165 17.5 15.75V8.75C17.5 7.7835 16.7165 7 15.75 7Z" />
                <path d="M14 7V5.25C14 4.78587 13.8156 4.34075 13.4874 4.01256C13.1592 3.68437 12.7141 3.5 12.25 3.5H5.25C4.78587 3.5 4.34075 3.68437 4.01256 4.01256C3.68437 4.34075 3.5 4.78587 3.5 5.25V12.25C3.5 12.7141 3.68437 13.1592 4.01256 13.4874C4.34075 13.8156 4.78587 14 5.25 14H7" />
              </svg>
              <span className="text-gray-600 text-sm">{copyText}</span>
            </button>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          ></div>
        </div>
      </article>

      <section className="container mx-auto mt-16 px-4 md:px-0">
        <h2 className="text-xl font-bold mb-4 text-gray-800">نظرات کاربران</h2>

        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="نام شما"
            className="border p-3 w-full rounded"
            value={commentForm.name}
            onChange={(e) =>
              setCommentForm({ ...commentForm, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="ایمیل شما"
            className="border p-3 w-full rounded"
            value={commentForm.email}
            onChange={(e) =>
              setCommentForm({ ...commentForm, email: e.target.value })
            }
            required
          />
          <textarea
            placeholder="متن نظر شما"
            className="border p-3 w-full rounded"
            value={commentForm.content}
            onChange={(e) =>
              setCommentForm({ ...commentForm, content: e.target.value })
            }
            required
          />
          <button
            type="submit"
            disabled={loadingSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {loadingSubmit ? "در حال ارسال..." : "ارسال نظر"}
          </button>

          {successMsg && (
            <p className="text-green-600 font-medium">{successMsg}</p>
          )}
        </form>

        <div className="space-y-4">
          {loadingComments ? (
            <div className="flex justify-center my-8">
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="0.75" />
              </svg>
            </div>
          ) : comments.length === 0 ? (
            <p className="text-gray-600">هیچ نظری ثبت نشده است.</p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="border p-4 rounded bg-gray-50 shadow-sm"
              >
                <div className="font-bold text-sm text-gray-800">
                  {c.author_name}
                </div>
                <div
                  className="text-gray-700 mt-1 text-sm"
                  dangerouslySetInnerHTML={{ __html: c.content.rendered }}
                />
                {c.pending && (
                  <div className="text-yellow-600 text-xs mt-2">
                    این نظر در انتظار تایید مدیر است.
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default SingleBlogModule;
