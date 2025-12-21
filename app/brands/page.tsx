'use client';

import Image from 'next/image';
import { useState } from 'react';

// مپینگ کامل حروف فارسی به انگلیسی (بر اساس کیبورد فارسی استاندارد)
const persianToEnglishMap: Record<string, string> = {
  'ض': 'q', 'ص': 'w', 'ث': 'e', 'ق': 'r', 'ف': 't', 'غ': 'y', 'ع': 'u', 'ه': 'i', 'خ': 'o', 'ح': 'p',
  'ج': 'a', 'چ': 's', 'پ': 'd', 'گ': 'f', 'ک': 'g', 'م': 'h', 'ن': 'j', 'ت': 'k', 'ا': 'l', 'ل': ';',
  'ب': 'z', 'ی': 'x', 'س': 'c', 'ش': 'v', 'د': 'b', 'ژ': 'n', 'ر': 'm', 'ذ': ',', 'ز': '.', 'و': '/',
  'ئ': ']', 'ء': "'", 'ؤ': '[', 'إ': '`', 'أ': '~', 'آ': '}', 'ة': '{', 'ى': 'c', 'ك': 'g', 'ي': 'x',
  ' ': ' ', '-': '-', '_': '_', '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
};

// تابع تبدیل متن فارسی به انگلیسی
function convertPersianToEnglish(text: string): string {
  return text
    .split('')
    .map(char => persianToEnglishMap[char] || char)
    .join('')
    .toLowerCase();
}

const allBrands = [
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

export default function Brands() {
  const [searchTerm, setSearchTerm] = useState('');

  // تبدیل ورودی کاربر (فارسی یا انگلیسی) به انگلیسی کوچک
  const normalizedSearch = convertPersianToEnglish(searchTerm);

  const filteredBrands = allBrands.filter((brand) =>
    brand.name.toLowerCase().includes(normalizedSearch)
  );

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          لیست برندها
        </h1>

        {/* جستجو */}
        <div className="mb-12 max-w-md mx-auto">
          <input
            type="text"
            placeholder="جستجوی برند... (فارسی یا انگلیسی)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 text-md w-full rounded-3xl border border-gray-300 focus:border-blue-500 focus:outline-none transition"
          />
        </div>

        {/* گرید برندها */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-8">
          {filteredBrands.map((brand) => (
            <div
              key={brand.src}
              className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 aspect-square"
            >
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100px, 128px"
                />
              </div>
              <span className="text-sm font-semibold text-gray-800 text-center mt-auto">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* پیام وقتی نتیجه‌ای نیست */}
        {filteredBrands.length === 0 && (
          <div className="text-center text-xl text-gray-500 mt-16">
            هیچ برندی با این نام یافت نشد.
          </div>
        )}
      </div>
    </main>
  );
}