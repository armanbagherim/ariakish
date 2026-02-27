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
      method: "GET",
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

export const brands = [
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
  { src: "/brands/smeg.png", name: "smeg" },
  { src: "/brands/braun.png", name: "braun" },
  { src: "/brands/nespresso.png", name: "nespresso" },
  { src: "/brands/ninja.png", name: "ninja" },
  { src: "/brands/philips.png", name: "philips" },
  { src: "/brands/brilux.png", name: "brilux" },
];

export default async function Home() {
  const blogData = await getBlog();
  const { result: vipCards } = await getVipCards();
  const { result: publicReports } = await getPublicReports();

  // پیدا کردن پست sticky (featured)
  const stickyPost = blogData.find((post: any) => post.sticky === true);

  // پست‌های معمولی (غیر sticky)
  const nonStickyPosts = blogData.filter((post: any) => post.sticky !== true);

  // ترکیب برای نمایش در گرید: sticky اول + بقیه
  const allPosts = stickyPost
    ? [stickyPost, ...nonStickyPosts]
    : nonStickyPosts;

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

      <Link href="brilux-brand">
        <img className="rounded-3xl" src="/slider/home-brilux.png" alt="Brilux Banner" />
      </Link>

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

      <div dir="ltr">
        <Marquee
          direction="right"
          speed={40}
          loop={0}
          pauseOnHover={true}
          gradient={true}
          autoFill
          gradientColor="#f3f4f6"
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

      <div className="container mx-auto px-4 py-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: The Main Featured Post (Sticky) */}
          <div className="lg:col-span-7 xl:col-span-8">
            {allPosts.slice(0, 1).map((post) => {
              const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group relative block overflow-hidden rounded-3xl bg-gray-900">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    {featuredImage && (
                      <Image
                        src={featuredImage}
                        alt={post.title.rendered}
                        fill
                        className="object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                        priority
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 p-6 md:p-10 space-y-4 text-right" dir="rtl">
                    <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-black bg-yellow-400 rounded-full uppercase">
                      مطلب ویژه
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors">
                      {post.title.rendered}
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base line-clamp-2 max-w-2xl">
                      {/* Optional: Add excerpt here if available */}
                      مشاهده متن کامل این گزارش و تحلیل تخصصی...
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right Column: The Vertical Feed */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8">
            <h3 className="text-xl font-bold border-r-4 border-yellow-400 pr-4 mb-2 text-gray-800" dir="rtl">
              آخرین نوشته‌ها
            </h3>

            {allPosts.slice(1, 5).map((post) => {
              const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4 items-start" dir="rtl">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                    {featuredImage && (
                      <Image
                        src={featuredImage}
                        alt={post.title.rendered}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center py-1">
                    <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {post.title.rendered}
                    </h4>
                    <time className="mt-2 text-[11px] text-gray-400 font-medium">
                      {/* Replace with actual date if available */}
                      ۵ دقیقه مطالعه
                    </time>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <Link
          className="inline-flex items-center gap-2 text-sm text-secondary hover:text-secondary/80 transition-colors"
          href="/blog"
        >
          مشاهده همه مطالب
        </Link>
      </div>
    </div>
  );
}