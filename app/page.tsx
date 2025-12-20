import Image from "next/image";
import Link from "next/link";
import {
  OpenLinkFill,
  OpenLinkOutline,
} from "./_components/design/icons";
import React from "react";
import PureCarousel from "./_components/design/Carousel/PureCarousel";
import HeroSlider from "./_components/design/Slider/HeroSlider";
import Marquee from "react-fast-marquee";

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

const brands = [
  { src: "/brands/aap-pro.png", name: "aap-pro" },
  { src: "/brands/AILY-DIGITAL.png", name: "AILY-DIGITAL" },
  { src: "/brands/aiwa.png", name: "aiwa" },
  { src: "/brands/alpine.png", name: "alpine" },
  { src: "/brands/arktek.png", name: "arktek" },
  { src: "/brands/AUDIOSYSTEM.png", name: "AUDIOSYSTEM" },
  { src: "/brands/band-and-olufsen.png", name: "band-and-olufsen" },
  { src: "/brands/BERLIN-BC.png", name: "BERLIN-BC" },
  { src: "/brands/bitron-1.png", name: "bitron-1" },
  { src: "/brands/bitron.png", name: "bitron" },
  { src: "/brands/bkk.png", name: "bkk" },
  { src: "/brands/britex.png", name: "britex" },
  { src: "/brands/casio.png", name: "casio" },
  { src: "/brands/cooler-master.png", name: "cooler-master" },
  { src: "/brands/corsair.png", name: "corsair" },
  { src: "/brands/das-audio.png", name: "das-audio" },
  { src: "/brands/das.png", name: "das" },
  { src: "/brands/DC-QUART.png", name: "DC-QUART" },
  { src: "/brands/DD-AUDIO.png", name: "DD-AUDIO" },
  { src: "/brands/DECA.png", name: "DECA" },
  { src: "/brands/dell.png", name: "dell" },
  { src: "/brands/DOCAN.png", name: "DOCAN" },
  { src: "/brands/DYNAMIC STATE.png", name: "DYNAMIC STATE" },
  { src: "/brands/earldom.png", name: "earldom" },
  { src: "/brands/electro-voice.png", name: "electro-voice" },
  { src: "/brands/energizer.png", name: "energizer" },
  { src: "/brands/ENTU.png", name: "ENTU" },
  { src: "/brands/epson.png", name: "epson" },
  { src: "/brands/evvoli.png", name: "evvoli" },
  { src: "/brands/faith.png", name: "faith" },
  { src: "/brands/fanvil.png", name: "fanvil" },
  { src: "/brands/fedar.png", name: "fedar" },
  { src: "/brands/fulian.png", name: "fulian" },
  { src: "/brands/gamdias.png", name: "gamdias" },
  { src: "/brands/game-max.png", name: "game-max" },
  { src: "/brands/gplus.png", name: "gplus" },
  { src: "/brands/green.png", name: "green" },
  { src: "/brands/harman.png", name: "harman" },
  { src: "/brands/hatron.png", name: "hatron" },
  { src: "/brands/hisense.png", name: "hisense" },
  { src: "/brands/hp.png", name: "hp" },
  { src: "/brands/HPE.png", name: "HPE" },
  { src: "/brands/IDHILIDS.png", name: "IDHILIDS" },
  { src: "/brands/intel.png", name: "intel" },
  { src: "/brands/jack.png", name: "jack" },
  { src: "/brands/jasco.png", name: "jasco" },
  { src: "/brands/jbl.png", name: "jbl" },
  { src: "/brands/jin.png", name: "jin" },
  { src: "/brands/juki.png", name: "juki" },
  { src: "/brands/KAREN-AUDIO.png", name: "KAREN-AUDIO" },
  { src: "/brands/kashima.png", name: "kashima" },
  { src: "/brands/king-star.png", name: "king-star" },
  { src: "/brands/LIBERAL.png", name: "LIBERAL" },
  { src: "/brands/LION-TWO.png", name: "LION-TWO" },
  { src: "/brands/mackie.png", name: "mackie" },
  { src: "/brands/MAGIC-AUDIO.png", name: "MAGIC-AUDIO" },
  { src: "/brands/MD-LAB.png", name: "MD-LAB" },
  { src: "/brands/menzo.png", name: "menzo" },
  { src: "/brands/mikaelson.png", name: "mikaelson" },
  { src: "/brands/MQ DRAW ME.png", name: "MQ DRAW ME" },
  { src: "/brands/msi.png", name: "msi" },
  { src: "/brands/NAKAMICHI.png", name: "NAKAMICHI" },
  { src: "/brands/NEWLONG.png", name: "NEWLONG" },
  { src: "/brands/NIKITA.png", name: "NIKITA" },
  { src: "/brands/NORA-NOVIN-TAK-1.png", name: "NORA-NOVIN-TAK-1" },
  { src: "/brands/NORA-NOVIN-TAK.png", name: "NORA-NOVIN-TAK" },
  { src: "/brands/novox.png", name: "novox" },
  { src: "/brands/NURNBERG.png", name: "NURNBERG" },
  { src: "/brands/panasonic.png", name: "panasonic" },
  { src: "/brands/paradise.png", name: "paradise" },
  { src: "/brands/PHOENIX-GOLD.png", name: "PHOENIX-GOLD" },
  { src: "/brands/precious.png", name: "precious" },
  { src: "/brands/QUPA.png", name: "QUPA" },
  { src: "/brands/rak.png", name: "rak" },
  { src: "/brands/rcf.png", name: "rcf" },
  { src: "/brands/ROYAL-SOUND.png", name: "ROYAL-SOUND" },
  { src: "/brands/sammi.png", name: "sammi" },
  { src: "/brands/sandisk.png", name: "sandisk" },
  { src: "/brands/siliconpower.png", name: "siliconpower" },
  { src: "/brands/silter.png", name: "silter" },
  { src: "/brands/SILVERSTAR.png", name: "SILVERSTAR" },
  { src: "/brands/silverstone.png", name: "silverstone" },
  { src: "/brands/sing-e.png", name: "sing-e" },
  { src: "/brands/singer.png", name: "singer" },
  { src: "/brands/SKY-DOLPHIN.png", name: "SKY-DOLPHIN" },
  { src: "/brands/sp-audio.png", name: "sp-audio" },
  { src: "/brands/SYSTEM-CERAMICS.png", name: "SYSTEM-CERAMICS" },
  { src: "/brands/toshiba.png", name: "toshiba" },
  { src: "/brands/tribit.png", name: "tribit" },
  { src: "/brands/tsco.png", name: "tsco" },
  { src: "/brands/vesta.png", name: "vesta" },
  { src: "/brands/WEIJIE.png", name: "WEIJIE" },
  { src: "/brands/wilco.png", name: "wilco" },
  { src: "/brands/WORLDEN.png", name: "WORLDEN" },
  { src: "/brands/xiaomi.png", name: "xiaomi" },
  { src: "/brands/YESHI.png", name: "YESHI" },
];

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
          <h1 className="text-[28px] azarMehr text-primary mb-4">
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
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 mb-10 items-center md:mb-32 gap-4 mt-14 md:mt-8">
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

      <div className="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-12 gap-4 mb-16">
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

      {/* ==================== بخش برندهای تحت گارانتی ==================== */}
      <div className="mt-10 mb-8 px-4">
        <div className="mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl md:text-xl font-bold text-primary azarMehr">
            برندهای تحت گارانتی
          </h2>
          <Link
            href="/brands"
            className="text-secondary border border-secondary px-6 py-3 rounded-2xl hover:bg-secondary hover:text-white transition-colors duration-300"
          >
            همه برندها
          </Link>
        </div>
      </div>

      {/* Marquee شیک با react-fast-marquee */}
      <div dir="ltr">
        <Marquee
        direction="right"  // چپ به راست (معکوس)
        speed={40}     
        loop={0}    // سرعت (کمتر = کندتر، می‌تونی 30 یا 50 تست کنی)
        pauseOnHover={true}
        gradient={true}
        autoFill

        gradientColor="#f3f4f6"  // رنگ پس‌زمینه برای fade دو طرف (bg-gray-100)
        gradientWidth="8rem"
        className="py-12 rounded-3xl overflow-hidden bg-gray-100"
      >
        {brands.map((brand) => (
          <div
            key={brand.src}
            className="mx-4 flex-shrink-0 w-30 h-30 bg-white rounded-2xl shadow-md flex items-center justify-center p-4"
          >
            <Image
              src={brand.src}
              alt={brand.name}
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        ))}
      </Marquee>
      </div>

      {/* ==================== پایان بخش برندها ==================== */}

      <h4 className="text-center azarMehr mb-10 text-primary mt-16">
        وبلاگ آریا کیش
      </h4>

      <div className="grid lg:grid-cols-12 grid-cols-1 items-center gap-4 mb-16">
        {/* First Column */}
        <div className="col-span-4 space-y-4">
          {firstColumnPosts.map((post: any, key: number) => (
            <Link
              key={key}
              href={`/blog/${post.slug}`}
              className="relative block"
            >
              <div className="flex border border-[#CFD2E3] gap-4 rounded-[55px] px-6 py-6">
                {post?._embedded["wp:featuredmedia"] !== undefined && (
                  <Image
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-[40px] w-[152px] h-[152px] object-cover"
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
              <div className="mb-4">
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