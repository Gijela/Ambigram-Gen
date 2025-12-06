"use client";
// ================================================================
// LogoTicker 组件 - 合作品牌滚动展示
// ================================================================
// SEO 优化：每个 logo 使用描述性 alt text
// ================================================================

import {
  AcmeLogo,
  ApexLogo,
  CelestialLogo,
  QuantumLogo,
  PulseLogo,
  EchoLogo,
} from "@/assets";
import { motion } from "framer-motion";
import Image from "next/image";

// Logo 配置：包含图片源和描述性 alt text
const logos = [
  { src: AcmeLogo, alt: "Acme Corporation logo - technology partner" },
  { src: PulseLogo, alt: "Pulse Media logo - creative agency partner" },
  { src: EchoLogo, alt: "Echo Design logo - design studio partner" },
  { src: CelestialLogo, alt: "Celestial Tech logo - innovation partner" },
  { src: ApexLogo, alt: "Apex Industries logo - enterprise partner" },
  { src: QuantumLogo, alt: "Quantum Labs logo - research partner" },
];

export const LogoTicker = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="flex items-center gap-5">
          <div className="flex-1 md:flex-none">
            <h2>Trusted by top innovative teams</h2>
          </div>
          <div className="flex flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              initial={{ translateX: "-50%" }}
              animate={{ translateX: "0" }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex flex-none gap-14 pr-14 -translate-x-1/2"
            >
              {[...logos, ...logos].map((logo, index) => (
                <Image
                  key={index}
                  src={logo.src.src}
                  width={logo.src.width}
                  height={logo.src.height}
                  alt={logo.alt}
                  className="h-6 w-auto"
                  loading="lazy"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
