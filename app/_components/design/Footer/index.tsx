"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Instagram, Telegram, Twitter, Whatsapp } from "../icons";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().required("وارد کردن شماره موبایل الزامی است"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}/wp-json/gf/v2/forms/8/submissions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${process.env.API_KEY_FORMS}`,
            },
            body: JSON.stringify({
              input_1: values.email,
            }),
          }
        );

        if (result.ok) {
          toast.success("عضویت شما با موفقیت انجام شد!");
        } else {
          throw new Error("خطا در عضویت");
        }
      } catch {
        toast.error("خطا در ارسال اطلاعات");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <div className="md:w-[60%] w-full border-[30px] border-white mx-auto bg-primary py-4 px-4 relative -bottom-[40px] rounded-[65px]">
        <div className="flex justify-between flex-col md:flex-row items-center">
          <span className="azarMehr text-white text-[20px] mb-4 md:mb-0">
            اطلاع از جدیدترین اخبار و تخفیف ها
          </span>
          <span>
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white py-2 px-4 rounded-2xl pl-[10px] flex items-center"
            >
              <input
                placeholder="شماره موبایل"
                type="text"
                name="email"
                className="outline-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />

              <button
                className="bg-primary py-2 px-4 rounded-2xl text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  "عضویت"
                )}
              </button>
            </form>
          </span>
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-[#dc3545] bg-white absolute left-0 right-0 text-center border-[#dc3545] border rounded-3xl p-3">
            {formik.errors.email}
          </div>
        ) : null}
      </div>
      <footer className="bg-[#F5F6F9] pt-16 pb-12 px-4 md:px-0">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-12 md:justify-center">
            <div className="col-span-3 md:text-center">
              <h3 className="azarMehr text-[20px] mb-3">
                لینک های <span className="text-primary">مهم</span>
              </h3>
              <ul>
                <li className="flex items-center gap-2 mb-2 md:justify-center">
                  <span className="block w-[8px] h-[8px] bg-primary rounded-full"></span>
                  <Link href="/faq">سوالات متداول</Link>
                </li>
                <li className="flex items-center gap-2 mb-2 md:justify-center">
                  <span className="block w-[8px] h-[8px] bg-primary rounded-full"></span>
                  <Link href="/complaints">ثبت شکایات</Link>
                </li>
                <li className="flex items-center gap-2 mb-2 md:justify-center">
                  <span className="block w-[8px] h-[8px] bg-primary rounded-full"></span>
                  <Link href="/rules">شرایط گارانتی</Link>
                </li>
                <li className="flex items-center gap-2 mb-2 md:justify-center">
                  <span className="block w-[8px] h-[8px] bg-primary rounded-full"></span>
                  <Link href="/survey">نظرسنجی</Link>
                </li>
                <li className="flex items-center gap-2 mb-2 md:justify-center">
                  <span className="block w-[8px] h-[8px] bg-primary rounded-full"></span>
                  <Link target="_blank" href="https://jaa-baar.com">
                    جابار
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-6 text-center mt-8 md:mt-0 flex h-full flex-col justify-center md:justify-end order-10 md:order-[unset]">
              <p className="mb-4 text-[18px] azarMehr">
                تجربه دریافت خدمات فراموش نشدنی
              </p>

              <div className="flex gap-4 justify-center">
                <Telegram />
                <Instagram />
                <Whatsapp />
                <Twitter />
              </div>
            </div>
            <div className="col-span-3 md:text-center">
              <h3 className="azarMehr text-[20px] mb-3">
                لینک های <span className="text-primary">مهم</span>
              </h3>
              <ul>
                <li className="flex items-center gap-2 mb-2 md:justify-center">
                  <span className="block w-[8px] h-[8px] bg-primary rounded-full"></span>
                  <Link href="/blog">وبلاگ</Link>
                </li>
                <li className="flex items-center gap-2 mb-2 md:justify-center">
                  <span className="block w-[8px] h-[8px] bg-primary rounded-full"></span>
                  <Link href="/recruitment">استخدام در آریا کیش</Link>
                </li>
                <li className="flex items-center gap-2 mb-2 md:justify-center">
                  <span className="block w-[8px] h-[8px] bg-primary rounded-full"></span>
                  <Link
                    target="_blank"
                    href="https://seller.ariakish.com/login"
                  >
                    پنل فروشندگان
                  </Link>
                </li>
                <li className="flex items-center gap-2 mb-2 md:justify-center">
                  <span className="block w-[8px] h-[8px] bg-primary rounded-full"></span>
                  <Link target="_blank" href="https://seller.ariakish.com">
                    استعلام کارت گارانتی
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          سایت آریا کیش انحصارا مطلق به آریا کیش میباشد واز حقوق قانونی برخودار
          است
        </div>
      </footer>
    </>
  );
};

export default Footer;
