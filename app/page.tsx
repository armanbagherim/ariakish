import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  FlowMobile,
  Flows,
  OpenLinkFill,
  OpenLinkOutline,
} from "./_components/design/icons";
import React from "react";
import PureCarousel from "./_components/design/Carousel/PureCarousel";
import Timer from "./_components/design/Timer";
import HeroSlider from "./_components/design/Slider/HeroSlider";

const getBlog = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}/wp-json/wp/v2/posts?_embed`,
    {
      cache: "no-store",
    }
  );
  const posts = await data.json();
  return posts;
};

const getVipCards = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/v1/api/guarantee/anonymous/vipBundleTypes`,
    {
      cache: "no-store",
      method: "GET",
    }
  );
  const cards = await data.json();
  return cards;
};

const getPublicReports = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/v1/api/guarantee/anonymous/publicReports`,
    {
      cache: "no-store",
      method: "GET",
    }
  );
  const publicReports = await data.json();
  return publicReports;
};

export default async function Home() {
  const blogData = await getBlog();
  const { result: vipCards } = await getVipCards();
  const { result: publicReports } = await getPublicReports();
  const stickyPost = blogData.find((post: any) => post.sticky);
  const nonStickyPosts = blogData.filter((post: any) => !post.sticky);
  const firstColumnPosts = nonStickyPosts.slice(0, 2);
  const thirdColumnPosts = nonStickyPosts.slice(2, 6);

  function formatNumberCompact(num: number): string {
    if (num >= 1_000_000_000) {
      return `+ ${Math.floor(num / 100_000_000) / 10} میلیارد`;
    } else if (num >= 1_000_000) {
      return `+ ${Math.floor(num / 100_000) / 10} میلیون`;
    } else if (num >= 1_000) {
      return `+ ${Math.floor(num / 100) / 10} هزار`;
    } else {
      return num.toString();
    }
  }
  return (
    <div className="container mx-auto pt-10 md:pt-28 px-4 md:px-0">
      <div className="my-12">
        <HeroSlider />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 items-center pb- md:pb-14 md:mb-8">
        <div>
          <h1 className="text-[28px] azarMehr text-primary mb-4 ">
            گارانتی آریا کیش
          </h1>
          <p className="font-light leading-7 text-justify text-md md:text-lg mb-6">
            آریا کیش، پیشرو در ارائه خدمات گارانتی لوازم خانگی، با هدف افزایش
            رضایت مشتریان و تضمین کیفیت محصولات، به شما خدماتی بی‌نظیر ارائه
            می‌دهد. ما در آریا کیش به شما اطمینان می‌دهیم که با استفاده از
            فناوری‌های روز و تیم متخصص خود، تمامی نیازهای گارانتی شما را به
            بهترین شکل ممکن برآورده کنیم. با ما همراه باشید تا تجربه‌ای مطمئن و
            راحت از خرید لوازم خانگی داشته باشید.
          </p>
          <div className="flex gap-2">
            <Link
              href="/rules"
              className="px-3 py-3 border text-md rounded-2xl border-secondary text-secondary"
            >
              شرایط گارانتی
            </Link>
            {/* <Link
              href="#about"
              className="px-3 py-3 border text-md rounded-2xl border-secondary text-secondary"
            >
              درباره ما
            </Link> */}
          </div>
        </div>

      </div>
      {/* <div id="about" className="md:px-[10%] block py-12 mb-8 md:mb-20">
        <div className="text-center drop md:px-[10%] px-8 md:py-[50px] py-6 rounded-[40px] md:rounded-[70px]">
          <h2 className="md:text-[28px] text-lg azarMehr text-secondary mb-4">
            درباره ما
          </h2>
          <p className="text-sm md:text-xl text-justify">
            ما در شرکت آریا کیش همواره همراه شما هستیم تا با پشتیبانی و گارانتی
            معتبر، آرامش و اطمینان را به خانه‌های شما بیاوریم. با تکیه بر تجربه،
            تعهد و کیفیت، تلاش می‌کنیم تا هر لحظه از اعتماد شما پاسخی شایسته
            بگیریم. هدف ما، خلق تجربه‌ای بی‌دغدغه از پشتیبانی و خدماتی است که
            زندگی را آسوده و ساده تر می‌کند. در مسیر این همراهی، همواره به
            ارزش‌هایی چون صداقت، مشتری‌مداری و کیفیت در اقتصاد خانواده پایبندیم.
            انتخاب شما، افتخار ماست.
          </p>
        </div>
      </div> */}

      <div className="flex justify-center mb-8 md:mb-20">
        <div className="hidden md:block px-16">
          <h3 className="text-center text-primary azarMehr md:text-3xl text-xl mb-12 font-bold ">
            مراحل ثبت گارانتی
          </h3>
          <Flows />
        </div>
        <div className="block md:hidden">
          <h3 className="text-center text-primary azarMehr md:text-3xl text-xl mb-12 font-bold ">
            مراحل ثبت گارانتی
          </h3>
          <FlowMobile />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 mb-10 items-center  md:mb-32 gap-4">
        <div className="col-span-3">
          <h4 className="text-[26px] font-black mb-4">کارت VIP آریا کیش</h4>
          <p className="text-[14px] mb-4">
            از طریق کارت VIP می توانید به مقدار اعتبار اختصاص داده شده به هر
            کارت، از خدمات گارانتی استفاده کنید.
          </p>
          <div className="flex gap-4 mb-6">
            <div className="relative">
              <Link
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_CLUB_URL}/login?redirect_back_url=/BuyVipCard`}
                className="font-bold text-md rounded-2xl border-secondary text-secondary flex items-center"
              >
                خرید کارت vip
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-8">
          <PureCarousel data={vipCards} />
        </div>
      </div>
      <div className="grid  grid-cols-6 md:grid-cols-6 lg:grid-cols-12  gap-4 mb-16">
        <div className="col-span-3 text-center">
          <div className="azarMehr text-[24px] md:text-[40px] text-primary">
            {publicReports?.activeOrganizationCount}
          </div>
          <div>نمایندگی فعال</div>
        </div>
        <div className="col-span-3 text-center">
          <div className="azarMehr text-[24px] md:text-[40px] text-primary">
            {publicReports?.userCount}
          </div>
          <div>کاربر فعال</div>
        </div>
        <div className="col-span-3 text-center">
          <div className="azarMehr text-[24px] md:text-[40px] text-primary">
            {formatNumberCompact(publicReports?.guaranteeCount || 0)}
          </div>
          <div>گارانتی فعال</div>
        </div>
        <div className="col-span-3 text-center">
          <div className="azarMehr text-[24px] md:text-[40px] text-primary">
            {publicReports?.totalRequestCount}
          </div>
          <div>درخواست تعمیر</div>
        </div>
      </div>
      <h4 className="text-center azarMehr mb-10 text-primary">
        وبلاگ آریا کیش
      </h4>
      <div className="grid lg:grid-cols-12  grid-cols-1 items-center gap-4 mb-16">
        {/* First Column */}
        <div className="col-span-4 space-y-4">
          {firstColumnPosts.map((post: any, key: number) => (
            <Link
              key={key}
              href={`/blog/${post.slug}`}
              className="relative block"
            >
              <div
                key={post.id}
                className="flex border border-[#CFD2E3] gap-4 rounded-[55px] px-6 py-6"
              >
                {post?._embedded["wp:featuredmedia"] !== undefined && (
                  <Image
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className=" rounded-[40px] w-[152px] h-[152px] object-cover"
                    src={post?._embedded["wp:featuredmedia"][0]?.source_url}
                  />
                )}
                <div>
                  <h4 className="azarMehr text-base mb-4">
                    {post?.title?.rendered}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Middle Column (Sticky Post) */}
        <div className="col-span-4 pin relative">
          {stickyPost && (
            <Link href={`/blog/${stickyPost.slug}`}>
              <div key={stickyPost.id} className="mb-4">
                <Image
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full rounded-[60px]"
                  src={stickyPost?._embedded["wp:featuredmedia"][0]?.source_url}
                />
                <div className="absolute bottom-0 py-10 flex items-start flex-col justify-center blogGradiant left-0 right-0 px-4">
                  <div className="flex justify-between w-full">
                    <div>
                      <h2 className="azarMehr text-2xl text-white mb-4">
                        {stickyPost.title.rendered}
                      </h2>
                    </div>
                    <OpenLinkOutline />
                  </div>
                </div>
              </div>
              <div className="w-[304px] mx-auto absolute left-0 right-0 -bottom-4 h-28 bg-blue-600/75 rounded-[48px] blur-[48px] -z-10" />
            </Link>
          )}
        </div>

        {/* Third Column */}
        <div className="col-span-4">
          {thirdColumnPosts.map((post: any) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="mb-4 border border-[#CFD2E3] flex justify-between p-4 rounded-[30px] items-center"
            >
              <h2>{post.title.rendered}</h2>
              <OpenLinkFill />
            </Link>
          ))}
        </div>
      </div>
      <div className="text-center">
        <Link
          className="px-8 py-3 border text-xs rounded-2xl border-secondary text-secondary"
          href="/blog"
        >
          همه مطالب
        </Link>
      </div>
    </div>
  );
}
