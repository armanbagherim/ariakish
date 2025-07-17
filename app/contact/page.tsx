import Link from "next/link";

export default function Page() {
  return (
    <div className="px-4 mt-16">
      <div className="bg-[#fbfbfb] container mx-auto p-4 rounded-3xl mb-12">
        <div className="grid lg:grid-cols-2 items-center md:gap-14 sm:p-8 p-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-customGray peyda">
              در تماس باشیم
            </h1>
            <p className="text-sm text-customGray mt-4 leading-relaxed">
              کارشناسان پشتیبانی آریا کیش همواره در تلاش هستند تا بهترین تجربه
              پاسخگویی را داشته باشید.
            </p>
            <ul className="mt-12 space-y-4 mb-8">
              <li className="flex items-center">
                <p className="text-customGray font-bold text-md ml-4">
                  info@ariakish.com
                </p>
              </li>
              <li className="flex items-center">
                <p className="ltr flex gap-2 text-customGray font-bold text-md ml-4">
                  <span>021-86780</span>
                  <span>و</span>
                  <span>021-1882</span>
                </p>
              </li>
              <li className="flex items-center">
                <p className="text-customGray font-bold text-md ml-4">
                  آدرس دفتر مرکزی: تهران - میدان ولیعصر- بلوار کشاورز - خیابان
                  کبکانیان - پلاک 14
                </p>
              </li>
              <li>
                <p className="text-customGray font-bold text-md ml-4">
                  کد پستی 1415995673
                </p>
              </li>
              <li>
                <p className="text-customGray font-bold text-md ml-4">
                  ساعت کاری شنبه تا چهارشنبه 9 الی 17 و پنجشنبه ها 9 الی 13
                </p>  
              </li>
              <li className="flex items-center">
                <p className="text-customGray font-bold text-md ml-4">
                  سامانه پیامک: 100086780
                </p>
              </li>
            </ul>

            <div className="flex gap-2 flex-col">
              <Link
                href="/complaints"
                className="p-4  text-sm text-red-800 rounded-2xl font-bold bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                برای ثبت شکایات کلیک کنید
              </Link>
              <Link
                href="/survey"
                className="p-4 mb-4 text-sm text-red-800 rounded-2xl font-bold bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                برای ثبت نظرسنجی کلیک کنید
              </Link>
            </div>
          </div>
          <div>
            <iframe
              title="map-iframe"
              src="https://neshan.org/maps/iframe/places/_bvH1rIxO3jO#c35.713-51.421-13z-0p/35.71284790298415/51.4029672134138"
              width="100%"
              height="450"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
