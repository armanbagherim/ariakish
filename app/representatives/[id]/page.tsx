"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define types for the organization data
interface OrganizationData {
  organization: {
    user?: { firstname?: string; lastname?: string };
    organization?: { name?: string };
    code?: string;
    licenseDate?: string;
    address?: { latitude?: string; longitude?: string; province?: { name?: string } };
  };
  totalRequestCount?: number;
  finishedRequestCount?: number;
  averageScore?: number;
}

// Function to calculate star ratings
const getStars = (averageScore: number | undefined) => {
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

export default function OrganizationPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<OrganizationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!params.id) {
      setError("شناسه نماینده معتبر نیست.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/v1/api/guarantee/anonymous/organizations/${params.id}`
        );
        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }
        const result = await res.json();
        setData(result.result || {});
      } catch (error) {
        console.error("Error fetching organization data:", error);
        setError("داده‌های نماینده یافت نشد.");
        setData({ organization: {} });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const lat = parseFloat(data?.organization?.address?.latitude);
  const lng = parseFloat(data?.organization?.address?.longitude);
  const isValidLatLng =
    typeof lat === "number" &&
    typeof lng === "number" &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180;

  const fallbackLat = 35.6892;
  const fallbackLng = 51.389;
  const displayLat = isValidLatLng ? lat : fallbackLat;
  const displayLng = isValidLatLng ? lng : fallbackLng;

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current && !loading && !error && data?.organization) {
      // Initialize Leaflet map
      mapRef.current = L.map(mapContainerRef.current, {
        center: [displayLat, displayLng],
        zoom: 15,
        scrollWheelZoom: false,
      });

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Define custom marker icon
      const customIcon = L.icon({
        iconUrl: "/assets/map/img_pin.png",
        iconSize: [90, 90], // Adjust size as needed
        iconAnchor: [16, 32], // Anchor at the bottom center
        popupAnchor: [0, -32], // Popup anchor (if needed)
      });

      // Add marker with custom icon
      L.marker([displayLat, displayLng], { icon: customIcon }).addTo(mapRef.current);

      // Cleanup on unmount
      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }
  }, [displayLat, displayLng, loading, error, data]);

  if (loading) {
    return (
      <div className="max-w-5xl md:mt-14 mt-4 mx-auto p-8 bg-white shadow-xl rounded-2xl flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-blue-800 font-semibold">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error || !params.id || !data?.organization) {
    return (
      <div className="max-w-5xl md:mt-14 mt-4 mx-auto p-8 bg-white shadow-xl rounded-2xl text-right space-y-6">
        <h1 className="text-3xl font-bold text-red-800">خطا</h1>
        <p className="text-red-600">{error || "داده‌های نماینده یافت نشد."}</p>
        <Link
          href="/representatives"
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
        >
          بازگشت
        </Link>
      </div>
    );
  }

  const { organization, totalRequestCount, finishedRequestCount, averageScore } = data;
  const stars = getStars(averageScore);

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
          <div
            ref={mapContainerRef}
            style={{ width: "100%", height: "300px", borderRadius: "8px" }}
          ></div>

          <p className="text-xs text-gray-500">
            © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors
          </p>
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