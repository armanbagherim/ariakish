"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

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
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}/wp-json/wp/v2/comments?post=${post.id}`
      );
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post.id]);

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
        {
          id: Date.now(),
          author_name: commentForm.name,
          content: { rendered: `<p>${commentForm.content}</p>` },
          date: new Date().toISOString(),
          pending: true,
        },
        ...prev,
      ]);
      setSuccessMsg("نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده خواهد شد.");
      setCommentForm({ name: "", email: "", content: "" });
    } else {
      alert("خطا در ارسال نظر");
    }
    setLoadingSubmit(false);
  };

  return (
    <main className="min-h-screen bg-white pb-20" dir="rtl">

      <header className="relative pt-12 md:pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
            <h1
              className="azarMehr text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </span>
                توسط تیم تحریریه
              </span>
              <span className="h-4 w-px bg-gray-200 hidden md:block"></span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {new Date(post.date).toLocaleDateString('fa-IR')}
              </span>
            </div>
          </div>

          {/* کنترل وجود عکس برای جلوگیری از TypeError */}
          {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-gray-100">
              <Image
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                fill
                priority
                className="object-cover"
              />
            </div>
          ) : (
            /* اگر عکس نداشت، یک طرح ساده یا فضای خالی زیبا نمایش بده */
            <div className="w-full h-24 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 rounded-[40px] border-2 border-dashed border-gray-200 flex items-center justify-center">
              <span className="text-gray-400 azarMehr">نوشته بدون تصویر شاخص</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 mt-16 lg:mt-24">
        <div className="max-w-4xl mx-auto">

          {/* Action Bar */}
          <div className="flex justify-between items-center mb-12 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-blue-600">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold">مقاله تخصصی</span>
            </div>

            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300 border ${copyText === "کپی شد!"
                ? "bg-green-50 border-green-200 text-green-600"
                : "bg-gray-50 border-gray-100 text-gray-600 hover:bg-white hover:shadow-md"
                }`}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 21 21">
                <path d="M15.75 7H8.75C7.7835 7 7 7.7835 7 8.75V15.75C7 16.7165 7.7835 17.5 8.75 17.5H15.75C16.7165 17.5 17.5 16.7165 17.5 15.75V8.75C17.5 7.7835 16.7165 7 15.75 7Z" />
                <path d="M14 7V5.25C14 4.78587 13.8156 4.34075 13.4874 4.01256C13.1592 3.68437 12.7141 3.5 12.25 3.5H5.25C4.78587 3.5 4.34075 3.68437 4.01256 4.01256C3.68437 4.34075 3.5 4.78587 3.5 5.25V12.25C3.5 12.7141 3.68437 13.1592 4.01256 13.4874C4.34075 13.8156 4.78587 14 5.25 14H7" />
              </svg>
              <span className="text-sm font-bold">{copyText}</span>
            </button>
          </div>

          {/* Article Text */}
          <article
            className="azarMehr prose prose-lg md:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-[2] prose-img:rounded-3xl prose-a:text-blue-600 hover:prose-a:text-blue-700"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Comment Section */}
          <section className="mt-24 pt-16 border-t border-gray-100">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-black text-gray-900">نظرات و دیدگاه‌ها</h2>
              <div className="h-px flex-grow bg-gray-100"></div>
              <span className="bg-gray-100 px-4 py-1 rounded-full text-sm font-bold text-gray-500">
                {comments.length} نظر
              </span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-[32px] p-6 md:p-10 mb-12 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 mr-2">نام شما</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-gray-200 p-4 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                    placeholder="مثلاً: علی رضایی"
                    value={commentForm.name}
                    onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 mr-2">ایمیل شما</label>
                  <input
                    type="email"
                    className="w-full bg-white border border-gray-200 p-4 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                    placeholder="example@gmail.com"
                    value={commentForm.email}
                    onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 mr-2">متن نظر</label>
                <textarea
                  rows={5}
                  className="w-full bg-white border border-gray-200 p-4 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none"
                  placeholder="دیدگاه خود را اینجا بنویسید..."
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loadingSubmit}
                className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50"
              >
                {loadingSubmit ? "در حال ارسال..." : "ثبت دیدگاه"}
              </button>

              {successMsg && (
                <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 font-medium animate-bounce">
                  {successMsg}
                </div>
              )}
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {loadingComments ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium">اولین نفری باشید که نظر می‌دهد!</p>
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="relative bg-white border border-gray-100 p-6 rounded-[28px] shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">
                        {c.author_name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-gray-900">{c.author_name}</div>
                        <div className="text-[11px] text-gray-400">
                          {new Date(c.date).toLocaleDateString('fa-IR')}
                        </div>
                      </div>
                    </div>
                    <div
                      className="text-gray-700 leading-relaxed text-sm md:text-base mr-16"
                      dangerouslySetInnerHTML={{ __html: c.content.rendered }}
                    />
                    {c.pending && (
                      <div className="mt-4 mr-16 inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 text-[10px] font-bold rounded-lg border border-yellow-100">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
                        در انتظار تایید مدیریت
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default SingleBlogModule;