import React from "react";
import Link from "next/link";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const getStars = (averageScore) => {
  // Ensure averageScore is a valid number; default to 0 if invalid
  const score =
    typeof averageScore === "number" && !isNaN(averageScore)
      ? (averageScore / 100) * 5
      : 0;
  const full = Math.floor(score);
  const half = score - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return {
    full,
    half,
    empty,
  };
};

const getData = async (id) => {
  try {
    if (!id) {
      throw new Error("ID is missing");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/v1/api/guarantee/anonymous/organizations/${id}`
    );
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    const result = await res.json();
    return result || {};
  } catch (error) {
    console.error("Error fetching organization data:", error);
    return { organization: null }; // Return null organization on error
  }
};

export default async function OrganizationPage({ params }) {
  const { id } = (await params) || {};
  if (!id) {
    return (
      <div className="max-w-5xl md:mt-14 mt-4 mx-auto p-8 bg-white shadow-xl rounded-2xl text-right space-y-6">
        <h1 className="text-3xl font-bold text-red-800">خطا</h1>
        <p className="text-red-600">شناسه سازمان معتبر نیست.</p>
        <Link
          href="/representatives"
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
        >
          بازگشت
        </Link>
      </div>
    );
  }

  const { result: data } = await getData(id);
  const organization = data.organization; // Access the nested organization object
  const totalRequestCount = data.totalRequestCount;
  const finishedRequestCount = data.finishedRequestCount;
  const averageScore = data.averageScore;

  if (!organization) {
    return (
      <div className="max-w-5xl md:mt-14 mt-4 mx-auto p-8 bg-white shadow-xl rounded-2xl text-right space-y-6">
        <h1 className="text-3xl font-bold text-red-800">خطا</h1>
        <p className="text-red-600">داده‌های سازمان یافت نشد.</p>
        <Link
          href="/representatives"
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
        >
          بازگشت
        </Link>
      </div>
    );
  }

  const stars = getStars(averageScore);

  // Extract lat and lng; use fallback for Tehran if missing
  const { lat, lng } = organization.address || {};
  const isValidLatLng =
    typeof lat === "number" &&
    typeof lng === "number" &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180;

  // Fallback coordinates for Tehran if lat/lng are missing
  const fallbackLat = 35.6892; // Approximate latitude for Tehran
  const fallbackLng = 51.389; // Approximate longitude for Tehran
  const displayLat = isValidLatLng ? lat : fallbackLat;
  const displayLng = isValidLatLng ? lng : fallbackLng;

  return (
    <div className="max-w-5xl md:mt-14 mt-4 mx-auto p-8 bg-white shadow-xl rounded-2xl text-right space-y-6">
      {/* Title and Back Button */}
      <div className="flex justify-between items-center border-b pb-2">
        <h1 className="text-3xl font-bold text-blue-800">اطلاعات نمایندگی</h1>
        <Link
          href="/representatives"
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
        >
          بازگشت
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        {/* بخش مدیریت */}
        <div className="bg-blue-50 p-4 rounded-xl shadow-sm space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">مدیر نمایندگی</h2>
          <p>
            <strong>نام:</strong> {organization.user?.firstname || "ناموجود"}
          </p>
          <p>
            <strong>نام خانوادگی:</strong>{" "}
            {organization.user?.lastname || "ناموجود"}
          </p>
        </div>

        {/* اطلاعات نمایندگی */}
        <div className="bg-green-50 p-4 rounded-xl shadow-sm space-y-2">
          <h2 className="text-xl font-semibold text-green-700">
            مشخصات نمایندگی
          </h2>
          <p>
            <strong>نام:</strong> {organization.organization?.name || "ناموجود"}
          </p>
          <p>
            <strong>کد:</strong> {organization.code || "ناموجود"}
          </p>
          <p>
            <strong>تاریخ مجوز:</strong>{" "}
            {organization.licenseDate &&
            !isNaN(new Date(organization.licenseDate).getTime())
              ? new Date(organization.licenseDate).toLocaleDateString("fa-IR")
              : "ناموجود"}
          </p>
        </div>

        {/* آدرس و نقشه */}
        <div className="bg-yellow-50 p-4 rounded-xl shadow-sm space-y-2">
          <h2 className="text-xl font-semibold text-yellow-700">
            موقعیت مکانی
          </h2>
          <p>
            <strong>استان:</strong>{" "}
            {organization.address?.province?.name || "ناموجود"}
          </p>
          <p>
            <strong>طول جغرافیایی:</strong>{" "}
            {isValidLatLng ? lat : "ناموجود (پیش‌فرض: تهران)"}
          </p>
          <p>
            <strong>عرض جغرافیایی:</strong>{" "}
            {isValidLatLng ? lng : "ناموجود (پیش‌فرض: تهران)"}
          </p>
          {/* Google Maps iframe */}
          {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
            <iframe
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${displayLat},${displayLng}&zoom=15`}
            ></iframe>
          ) : (
            <p className="text-red-600">کلید API نقشه موجود نیست.</p>
          )}
          {!isValidLatLng && (
            <p className="text-yellow-600">
              نقشه با مختصات پیش‌فرض تهران نمایش داده شده است.
            </p>
          )}
        </div>

        {/* امتیاز و درخواست‌ها */}
        <div className="bg-purple-50 p-4 rounded-xl shadow-sm space-y-2">
          <h2 className="text-xl font-semibold text-purple-700">
            عملکرد نمایندگی
          </h2>
          <p>
            <strong>میانگین امتیاز:</strong>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(stars.full)].map((_, i) => (
                <FaStar key={`f${i}`} className="text-yellow-400" />
              ))}
              {stars.half && <FaStarHalfAlt className="text-yellow-400" />}
              {[...Array(stars.empty)].map((_, i) => (
                <FaRegStar key={`e${i}`} className="text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-600 text-sm">
                (
                {typeof averageScore === "number" && !isNaN(averageScore)
                  ? averageScore.toFixed(1)
                  : "ناموجود"}{" "}
                / 100)
              </span>
            </div>
          </p>
          <p>
            <strong>تعداد کل درخواست‌ها:</strong>{" "}
            {typeof totalRequestCount === "number"
              ? totalRequestCount
              : "ناموجود"}
          </p>
          <p>
            <strong>درخواست‌های تکمیل‌شده:</strong>{" "}
            {typeof finishedRequestCount === "number"
              ? finishedRequestCount
              : "ناموجود"}
          </p>
        </div>
      </div>
    </div>
  );
}
