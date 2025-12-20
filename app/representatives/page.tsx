"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [proviences, setProviences] = useState([]);
  const [representatives, setRepresentatives] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [filteredReps, setFilteredReps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch provinces
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/v1/api/guarantee/client/provinces`
      );
      const data = await res.json();
      setProviences(data.result || []);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch representatives with optional provinceId filter
  const fetchRepresentatives = async (provinceId = "") => {
    setIsLoading(true);
    try {
      const url = provinceId
        ? `${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/v1/api/guarantee/anonymous/organizations?provinceId=${provinceId}&limit=100`
        : `${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/v1/api/guarantee/anonymous/organizations?limit=100`;
      const res = await fetch(url);
      const data = await res.json();
      setRepresentatives(data.result || []);
      setFilteredReps(data.result || []);
    } catch (error) {
      console.error("Error fetching representatives:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
    fetchRepresentatives();
  }, []);

  // Handle province selection
  const handleProvinceChange = (event) => {
    setSelectedProvinceId(event.target.value);
  };

  // Apply filter
  const handleFilterApply = () => {
    if (selectedProvinceId) {
      fetchRepresentatives(selectedProvinceId);
    } else {
      fetchRepresentatives();
    }
  };

  return (
    <div className="container mx-auto px-4 mt-16 font-iransans">
      
      <div className="flex gap-4">
        <img src="/slider/representives.png" className="rounded-3xl mb-8 h-28 w-auto"/>
        <div>
          <h2 className="text-2xl font-bold text-right mb-4">لیست نمایندگان</h2>
        <div
        className="p-4 mb-4 text-yellow-800 font-bold text-xs rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
        role="alert"
      >
        <span>
          لیست نمایندگان جهت آگاهی مشتریان گرامی از اسامی همکاران محترم آریا کیش
          در استان‌ها و شهرهای ایران عزیز می‌باشد. خواهشمندیم برای دریافت هرگونه
          خدمات، از طریق سایت ثبت سفارش کنید یا با شماره‌های مرکز تماس{" "}
        </span>
        <span className="ltr inline-flex">021-86780</span>
        <span> و </span>
        <span className="ltr inline-flex">021-1882</span>
        <span>
          {" "}
          تماس بگیرید. همکاران CRM در ساعات اداری (۹:۰۰ تا ۱۷:۰۰ روزهای
          کاری) آماده پاسخگویی به شما عزیزان هستند.
        </span>
      </div>
        </div>
      </div>
      
      <div className="mb-4 flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="w-full sm:w-1/3">
          <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
            انتخاب استان
          </label>
          <select
            id="province"
            name="province"
            value={selectedProvinceId}
            onChange={handleProvinceChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition duration-200"
          >
            <option value="">همه استان‌ها</option>
            {proviences.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleFilterApply}
          className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
        >
          اعمال فیلتر
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredReps.length > 0 ? (
              filteredReps.map((rep) => (
                <Link
                  href={`/representatives/${rep.id}`}
                  key={rep.id}
                  className="bg-white p-6 shadow-sm rounded-[30px] border border-gray-200 hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{rep.name}</h3>
                  <p className="text-gray-600">مدیریت: {rep.fullName}</p>
                  <p className="text-gray-600">استان: {rep.provinceName}</p>
                  <p className="text-gray-600">شهرستان: {rep.cityName}</p>
                  <p className="text-gray-600">کد نمایندگی: {rep.code || "نامشخص"}</p>
                </Link>
              ))
            ) : (
              <div className="col-span-4 text-center text-gray-500 p-4">
                نتیجه‌ای یافت نشد!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;