import React from "react";
import Link from "next/link";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const getStars = (averageScore) => {
    const score = (averageScore / 100) * 5;
    const full = Math.floor(score);
    const half = score - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return {
        full,
        half,
        empty
    };
};

export default async function OrganizationPage({ params }) {
    const { id } = params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/v1/api/guarantee/anonymous/organizations/${id}`);
    const { result } = await res.json();
    const { organization } = result;
    const stars = getStars(result.averageScore);

    return (
        <div className="max-w-5xl md:mt-14 mt-4 mx-auto p-8 bg-white shadow-xl rounded-2xl text-right space-y-6">
            {/* Title and Back Button */}
            <div className="flex justify-between items-center border-b pb-2">
                <h1 className="text-3xl font-bold text-blue-800">اطلاعات سازمان</h1>
                <Link href="/representatives" className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition">
                    بازگشت
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">

                {/* بخش مدیریت */}
                <div className="bg-blue-50 p-4 rounded-xl shadow-sm space-y-2">
                    <h2 className="text-xl font-semibold text-blue-700">مدیر سازمان</h2>
                    <p><strong>نام:</strong> {organization.user.firstname}</p>
                    <p><strong>نام خانوادگی:</strong> {organization.user.lastname}</p>
                </div>

                {/* اطلاعات سازمان */}
                <div className="bg-green-50 p-4 rounded-xl shadow-sm space-y-2">
                    <h2 className="text-xl font-semibold text-green-700">مشخصات سازمان</h2>
                    <p><strong>نام:</strong> {organization.organization.name}</p>
                    <p><strong>کد:</strong> {organization.code}</p>
                    <p><strong>تاریخ مجوز:</strong> {new Date(organization.licenseDate).toLocaleDateString("fa-IR")}</p>
                </div>

                {/* آدرس */}
                <div className="bg-yellow-50 p-4 rounded-xl shadow-sm space-y-2">
                    <h2 className="text-xl font-semibold text-yellow-700">موقعیت مکانی</h2>
                    <p><strong>استان:</strong> {organization.address.province.name}</p>
                </div>

                {/* امتیاز و درخواست‌ها */}
                <div className="bg-purple-50 p-4 rounded-xl shadow-sm space-y-2">
                    <h2 className="text-xl font-semibold text-purple-700">عملکرد سازمان</h2>
                    <p>
                        <strong>میانگین امتیاز:</strong>
                        <div className="flex items-center gap-1 mt-1">
                            {[...Array(stars.full)].map((_, i) => <FaStar key={`f${i}`} className="text-yellow-400" />)}
                            {stars.half && <FaStarHalfAlt className="text-yellow-400" />}
                            {[...Array(stars.empty)].map((_, i) => <FaRegStar key={`e${i}`} className="text-yellow-400" />)}
                            <span className="ml-2 text-gray-600 text-sm">({result.averageScore.toFixed(1)} / 100)</span>
                        </div>
                    </p>
                    <p><strong>تعداد کل درخواست‌ها:</strong> {result.totalRequestCount}</p>
                    <p><strong>درخواست‌های تکمیل‌شده:</strong> {result.finishedRequestCount}</p>
                </div>
            </div>
        </div>
    );
}
