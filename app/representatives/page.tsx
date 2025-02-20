"use client";
import React, { useState } from "react";

const Page = () => {
  const representatives = [
    {
      id: 1,
      province: "تهران",
      city: "تهران",
      name: "دفتر مرکزی",
      code: 170001,
    },
    {
      id: 2,
      province: "تهران",
      city: "ورامین",
      name: "سید مرتضی زوین",
      code: 1400093,
    },
    {
      id: 3,
      province: "اصفهان",
      city: "شاهین شهر",
      name: "محسن مرادمند جزی",
      code: 1700096,
    },
    {
      id: 4,
      province: "اردبیل",
      city: "ملاباشی",
      name: "مصطفی خدایاری",
      code: 1700097,
    },
    {
      id: 5,
      province: "ایلام",
      city: "آبدانان",
      name: "علی عبدالهی",
      code: 1400150,
    },
    {
      id: 6,
      province: "یزد",
      city: "مهریز",
      name: "حسین ابوئی",
      code: 1400130,
    },
    {
      id: 7,
      province: "آذربایجان شرقی",
      city: "اهر",
      name: "رضا پاشاپور",
      code: 1400195,
    },
    {
      id: 8,
      province: "آذربایجان غربی",
      city: "سلماس",
      name: "منوچهر اژدری",
      code: 1400216,
    },
    {
      id: 9,
      province: "گیلان",
      city: "رشت",
      name: "علی خانجانی",
      code: 1400066,
    },
    {
      id: 10,
      province: "مازندران",
      city: "رامسر",
      name: "صابر کاکاوان",
      code: 1700033,
    },
    {
      id: 11,
      province: "آذربایجان شرقی",
      city: "هریس",
      name: "قاسمعلی قاسمی",
      code: 1400234,
    },
    {
      id: 12,
      province: "آذربایجان غربی",
      city: "ارومیه",
      name: "حسین اکبرزاده",
      code: 1700099,
    },
    {
      id: 13,
      province: "مازندران",
      city: "ساری",
      name: "امید میرزایی",
      code: 1700035,
    },
    {
      id: 14,
      province: "آذربایجان شرقی",
      city: "شبستر",
      name: "حسن آهنگر انزابی",
      code: 1400218,
    },
    {
      id: 15,
      province: "اصفهان",
      city: "کاشان",
      name: "مجید کامش",
      code: 1400129,
    },
    {
      id: 16,
      province: "تهران",
      city: "گیلاوند",
      name: "جمال میرزا علیخان",
      code: 1400087,
    },
    {
      id: 17,
      province: "هرمزگان",
      city: "بندرعباس",
      name: "محمد رحیمی",
      code: 1400144,
    },
    {
      id: 18,
      province: "تهران",
      city: "اسلامشهر",
      name: "صیاد سعیدی",
      code: 1400083,
    },
    {
      id: 19,
      province: "سیستان بلوچستان",
      city: "زاهدان",
      name: "مهدی رحیمی",
      code: 1700109,
    },
    {
      id: 20,
      province: "البرز",
      city: "کرج",
      name: "مهدی شعبانی",
      code: 1700111,
    },
  ];
  const [search, setSearch] = useState("");

  const filteredReps = representatives.filter((rep) =>
    Object.values(rep).some((value) =>
      String(value).toLowerCase().includes(search?.toLowerCase())
    )
  );
  return (
    <div className="container mx-auto px-4 mt-16">
      <h2 className="text-2xl font-bold text-right mb-4">لیست نمایندگان</h2>

      <input
        type="text"
        placeholder="جستجو..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div
        className="p-4 mb-4  text-yellow-800 font-bold text-xs rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
        role="alert"
      >
        <span className="">
          لیست نمایندگان جهت اگاهی مشتریان گرامی از اسامی همکاران محترم اریا کیش
          در استانها و شهر های ایران عزیز میباشد خواهشمندیم جهت دریافت هر گونه
          خدمات از طریق سایت ثبت سفارش و یا شماره های دفتر مرکزی
        </span>
        <span className="ltr inline-flex"> 021-1882 </span>
        <span> و </span>
        <span className="ltr inline-flex"> 021-86780 </span>
        <span>
          {" "}
          درخواست خدمات فرمایید. همکاران CRM طی ساعات اداری 9/00الی 17/00روزهای
          کاری اماده پاسخگویی به شما عزیزان هستند{" "}
        </span>
      </div>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredReps.length > 0 ? (
            filteredReps.map((rep, index) => (
              <div
                key={rep.id}
                className="bg-white p-6 shadow-sm rounded-[30px] border border-gray-200 hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {rep.name}
                </h3>
                <p className="text-gray-600">استان: {rep.province}</p>
                <p className="text-gray-600">شهرستان: {rep.city}</p>
                <p className="text-gray-600">کد نمایندگی: {rep.code}</p>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500 p-4">
              نتیجه‌ای یافت نشد!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
