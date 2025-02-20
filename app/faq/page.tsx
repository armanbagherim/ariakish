import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="container mt-14 mx-auto px-4">
        <div className=" p-8">
          <h1 className="text-md md:text-xl font-bold mb-4">سوالات متداول</h1>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              کارت گارانتی دستگاهی که خریداری نموده ام مخدوش است چه اقدامی باید
              انجام دهم؟
            </h4>
            <p className="text-sm">
              در این موارد باید به فروشگاهی که خرید نموده اید مراجعه واز فروشنده
              درخواست نمائید نسبت به اصلاح مورد اقدام نماید.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              نحوه فعال سازی کارت گارانتی چگونه است؟
            </h4>
            <p className="text-sm">
              به سایت مراجعه ودر قسمت ثبت گارانتی اقدام به ثبت شماره گارانتی
              محصول خریداری شده نمائید.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              به سایت مراجعه نمودم در هنگام ثبت کارت گارانتی پیغام خطا وتکراری
              بودن میدهد جه اقدامی انجام دهم؟
            </h4>
            <p className="text-sm">
              کارت گارانتی فوق تقلبی بوده و احتمال دارد محصول نیز فیک باشد.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              در چه مواردی کالایی که خریداری نموده ام از شمول گارانتی خارج می
              شود؟
            </h4>
            <p className="text-sm">
              برای مشاهده شرایط گارانتی روی{" "}
              <Link className="text-primary" href="/rules">
                شرایط گارانتی
              </Link>{" "}
              کلیک کنید.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              کالایی که خریداری نموده ام دچار عیب است چه اقدامی باید انجام دهم؟
            </h4>
            <p className="text-sm">
              درصورتی که کالا را از فروشگاه آنلاین خریداری نموده اید، طبق قوانین
              سازمان صعنت و معدن، تا 7 روز امکان بازگشت کالا وجود دارد. در غیر
              این صورت{" "}
              <Link className="text-primary" href="/rules">
                شرایط گارانتی
              </Link>{" "}
              را مطالعه نمائید.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              گارانتی دستگاه من به پایان رسیده است آیا می توانم از شرکت مجدد
              خدمات دریافت نمایم؟
            </h4>
            <p className="text-sm">
              شرکت اریا کیش موظف به تامین قطعات و نگهداری تعمیرات با دریافت
              هزینه میباشد در صورت تمایل از خدمات VIP اریا کیش استفاده نمایید
            </p>
          </div>

          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              کارت گارانتی VIP چیست؟
            </h4>
            <p className="text-sm">
              با پرداخت هزینه از طریق درگاه تمام کالاهای فاقد گارانتی به مدت
              معین از خدمات VIP برخودارمی شوند با{" "}
              <span className="inline-flex ltr">021-86780</span> یا
              <span className="inline-flex ltr">021-1882</span> تماس بگیرید
            </p>
          </div>

          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              آیا شرکت آریا کیش در شهرستان ها نمایندگی دارد؟
            </h4>
            <p className="text-sm">
              برای مشاهده لیست نمایندگان، از طریق لینک{" "}
              <Link className="text-primary" href="/representatives">
                شرایط گارانتی
              </Link>{" "}
              اقدام نمائید.
            </p>
          </div>
          <div className="mb-4 border p-4 rounded-3xl">
            <h4 className="text-lg font-bold text-primary mb-2">
              به چه صورت می توانم کالایی را که برای تعمیر ارسال نمودم رهگیری
              نمایم؟
            </h4>
            <p className="text-sm">
              با مراجعه به سایت وپنل کاربری می توانید نسبت به رهگیری کالا اقدام
              نمائید ویا با تماس با مرکز ارتباطات مشتریان با شماره های 86870-021
              و1882-021 نسبت به رهگیری محصول خود اقدام نمائید.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
