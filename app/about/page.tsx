import { Alert } from "../_components/design/icons";

const getData = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}/wp-json/wp/v2/pages/65`,
    {
      method: "GET",
    }
  );
  const content = await data.json();
  return content;
};

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mt-14 mx-auto px-4">
      <div className="border border-gray-300 rounded-3xl p-8">
        <h1 className="text-md md:text-xl font-bold mb-4">
          درباره ما
        </h1>
        {/* 
        <p className="text-md mb-4">
          مشتری گرامی! ضمن قدردانی از خرید محصول با گارانتی آریا کیش، خواهشمند
          است جهت برخورداری از تمام امتیازات گارانتی، شناسه رهگیری کالا یا شناسه
          گارانتی و یا شماره کارت گارانتی محصول را در سایت ثبت نمائید
        </p>
        <div
          className="p-4 mb-4 flex md:flex-row flex-col gap-2 items-start md:items-center text-yellow-800 font-bold text-sm rounded-lg bg-yellow-50  "
          role="alert"
        >
          <span className="font-medium items-center bg-white py-2 px-3 rounded-2xl gap-2 md:gap-0 justify-center md:flex-col flex">
            <Alert /> <span>اخطار</span>
          </span>
          تمام خدمات مورد نیاز محصولات هوشمند،کولر گازی ،لباسشویی،ظرفشویی و..
          انحصارا می بایست توسط شرکت گارانتی آریاکیش نصب و راه انداری وتایید
          گارانتی گردد.
        </div>
        <div
          className="p-4 mb-4 text-yellow-800 font-bold rounded-sm bg-yellow-50  "
          role="alert"
        >
          <span className="font-medium">تذکر مهم </span>
          مسئولیت صحت و سلامت فیزیکی کالا و دریافت اکسسوری صرفا برعهده خریدار می
          باشد.
        </div>

        <div
          className="p-4 mb-4  gap-4 text-sm flex-col text-red-800 rounded-lg bg-red-50  "
          role="alert"
        >
          <span className="font-bold text-lg block mb-4 azarMehr">
            مواردی که مشمول خدمات گارانتی نمی باشد:
          </span>
          <ul>
            <li className="gap-2 flex items-center mb-3 text-[16px]">
              <span className="block w-[8px] h-[8px] bg-red-800 rounded-full"></span>
              شکستگی ویا تغییر شکل که بر اثر تشعشات حرارتی وبرودتی در کالا بوجود
              آمده باشد.
            </li>
            <li className="gap-2 flex items-center mb-3 text-[16px]">
              <span className="block w-[8px] h-[8px] bg-red-800 rounded-full"></span>
              لوازم جانبی وقطعات مصرفی مانند باطری،فیلتر،پاکت جاروبرقی و...
            </li>
            <li className="gap-2 flex items-center mb-3 text-[16px]">
              <span className="block w-[8px] h-[8px] bg-red-800 rounded-full"></span>
              هرگونه آسیب فیزیکی که در اثراستفاده ناصحیح از کالا باشد.
            </li>
            <li className="gap-2 flex items-center mb-3 text-[16px]">
              <span className="block w-[8px] h-[8px] bg-red-800 rounded-full"></span>
              تعمیردر مراکز متفرقه ویا توسط افراد غیر مجازانجام شود.
            </li>
            <li className="gap-2 flex items-center mb-3 text-[16px]">
              <span className="block w-[8px] h-[8px] bg-red-800 rounded-full"></span>
              کسری قطعات جانبی اکسسوری.
            </li>
            <li className="gap-2 flex items-center mb-3 text-[16px]">
              <span className="block w-[8px] h-[8px] bg-red-800 rounded-full"></span>
              مخدوش بودن برگه ومندرجات کارت گارانتی به هر طریق.
            </li>
            <li className="gap-2 flex items-center mb-3 text-[16px]">
              <span className="block w-[8px] h-[8px] bg-red-800 rounded-full"></span>
              بروز رسانی مجدد محصول یا آپدیت نرم افزاری پس از نصب راه اندازی
              توسط مراکز مجاز آریا کیش.
            </li>
            <li className="gap-2 flex items-center mb-3 text-[16px]">
              <span className="block w-[8px] h-[8px] bg-red-800 rounded-full"></span>
              رسوب زدایی محصولات با مواد اسیدی.
            </li>
            <li className="gap-2 flex items-center mb-3 text-[16px]">
              <span className="block w-[8px] h-[8px] bg-red-800 rounded-full"></span>
              ایرادات حاصل از نوسانات برق که شرکت برق منطقه موظف به پرداخت خسارت
              کالا می باشد.
            </li>
          </ul>
        </div> */}
        <div
          className="data-wrapper"
          dangerouslySetInnerHTML={{ __html: data.content.rendered }}
        ></div>
      </div>
    </div>
  );
}
