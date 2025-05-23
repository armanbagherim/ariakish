"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MenuFill } from "../icons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="container mx-auto px-4 lg:px-0 hidden lg:block ">
        <div className="flex items-center justify-between">
          <Image
            className="p-4 w-[200px] h-auto"
            alt="لوگو آریا کیش"
            src={"/logo.png"}
            sizes="100vw"
            width={0}
            height={0}
          />
          <ul className="hidden gap-4 text-base font-medium lg:flex">
            <li>
              <Link href="/">خانه</Link>
            </li>
            <li>
              <Link href="co-vision">چشم انداز شرکت</Link>
            </li>
            <li>
              <Link href="/mission-statement">بیانیه ماموریت</Link>
            </li>
            <li>
              <Link href="/representatives">لیست نمایندگان</Link>
            </li>
            <li>
              <Link href="/rules">شرایط گارانتی</Link>
            </li>
            <li>
              <Link href="/contact">تماس با ما</Link>
            </li>
          </ul>
          <Link
            href="https://club.ariakish.com/login"
            target="_blank"
            className="px-3 py-3 border text-xs rounded-2xl border-primary text-primary"
          >
            ثبت سفارش تعمیرات
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 lg:px-0 lg:hidden block !pt-4 lg:pt-4">
        <div className="flex items-center justify-between">
          <span onClick={() => setIsOpen((prev) => !prev)}>
            <MenuFill />
          </span>
          <Image
            className="p-4 w-[150px] h-auto"
            alt="لوگو آریا کیش"
            src={"/logo.png"}
            sizes="100vw"
            width={0}
            height={0}
          />
        </div>
        <ul
          className={`flex absolute left-0 bg-white z-50 border-b py-4 px-4 right-0 top-16 flex-col gap-4 text-base font-medium ${isOpen ? "block" : "hidden"
            }`}
        >
          <li className="text-sm" onClick={() => setIsOpen(false)}>
            <Link href="/">خانه</Link>
          </li>
          <li className="text-sm" onClick={() => setIsOpen(false)}>
            <Link href="/co-vision">چشم انداز شرکت</Link>
          </li>
          <li className="text-sm" onClick={() => setIsOpen(false)}>
            <Link href="/mission-statement">بیانیه ماموریت</Link>
          </li>
          <li className="text-sm" onClick={() => setIsOpen(false)}>
            <Link href="/representatives">لیست نمایندگان</Link>
          </li>
          <li className="text-sm" onClick={() => setIsOpen(false)}>
            <Link href="/rules">شرایط گارانتی</Link>
          </li>
          <li className="text-sm" onClick={() => setIsOpen(false)}>
            <Link href="/contact">تماس با ما</Link>
          </li>
          <li className="text-sm" onClick={() => setIsOpen(false)}>
            <Link target="_blank" href="https://club.ariakish.com/login">
              ثبت کارت گارانتی
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
