import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="container mt-14 mx-auto px-4">
        <div className="p-8">
          <h1 className="text-md md:text-xl font-bold mb-4">سوالات متداول</h1>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              کارت گارانتی دستگاهی که خریداری کرده‌ام مخدوش است، چه اقدامی باید
              انجام دهم؟
            </h4>
            <p className="text-sm">
              در این موارد، به فروشگاهی که از آن خرید کرده‌اید مراجعه کنید و از
              فروشنده بخواهید نسبت به اصلاح مشکل اقدام کند.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              نحوه فعال‌سازی کارت گارانتی چگونه است؟
            </h4>
            <p className="text-sm">
              به سایت مراجعه کنید و در بخش ثبت گارانتی، شماره گارانتی محصول
              خریداری‌شده را وارد کنید.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              هنگام ثبت کارت گارانتی در سایت، با خطای تکراری بودن مواجه شدم، چه
              اقدامی باید انجام دهم؟
            </h4>
            <p className="text-sm">
              کارت گارانتی شما ممکن است تقلبی باشد و احتمال دارد محصول نیز اصل
              نباشد.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              در چه مواردی کالای خریداری‌شده از شمول گارانتی خارج می‌شود؟
            </h4>
            <p className="text-sm">
              برای مشاهده شرایط گارانتی، روی{" "}
              <Link className="text-primary" href="/rules">
                شرایط گارانتی
              </Link>{" "}
              کلیک کنید.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              کالای خریداری‌شده‌ام دچار نقص است، چه اقدامی باید انجام دهم؟
            </h4>
            <p className="text-sm">
              اگر کالا را از فروشگاه آنلاین خریداری کرده‌اید، طبق قوانین سازمان
              صنعت، معدن و تجارت، تا ۷ روز امکان بازگشت کالا وجود دارد. در غیر
              این صورت،{" "}
              <Link className="text-primary" href="/rules">
                شرایط گارانتی
              </Link>{" "}
              را مطالعه کنید.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              گارانتی دستگاه من به پایان رسیده است، آیا می‌توانم دوباره از شرکت
              خدمات دریافت کنم؟
            </h4>
            <p className="text-sm">
              شرکت آریا کیش موظف است قطعات و خدمات تعمیر را با دریافت هزینه
              ارائه دهد. در صورت تمایل، از خدمات VIP آریا کیش استفاده کنید.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              کارت گارانتی VIP چیست؟
            </h4>
            <p className="text-sm">
              با پرداخت هزینه از طریق درگاه، تمام کالاهای بدون گارانتی برای مدت
              معینی از خدمات VIP برخوردار می‌شوند. با شماره‌های{" "}
              <span className="inline-flex ltr">021-86780</span> یا{" "}
              <span className="inline-flex ltr">021-1882</span> تماس بگیرید.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              آیا شرکت آریا کیش در شهرستان‌ها نمایندگی دارد؟
            </h4>
            <p className="text-sm">
              برای مشاهده لیست نمایندگان، از طریق لینک{" "}
              <Link className="text-primary" href="/representatives">
                نمایندگان
              </Link>{" "}
              اقدام کنید.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              چگونه می‌توانم کالایی که برای تعمیر ارسال کرده‌ام را رهگیری کنم؟
            </h4>
            <p className="text-sm">
              با مراجعه به سایت و پنل کاربری، می‌توانید کالای خود را رهگیری کنید
              یا با مرکز ارتباطات مشتریان به شماره‌های{" "}
              <span className="inline-flex ltr">021-86780</span> و{" "}
              <span className="inline-flex ltr">021-1882</span> تماس بگیرید.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}