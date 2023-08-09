"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import * as Icon from "@phosphor-icons/react";
import LinearChartMotion from "@/components/LinearChartMotion";

export default function Home() {
  return (
    <AnimatePresence>
      <div className="min-h-[100vh] sm:min-h-screen w-screen flex flex-col relative bg-[#F2F3F5] font-inter overflow-hidden">
        <main className="flex flex-col justify-center h-[90%] static md:fixed w-screen overflow-hidden grid-rows-[1fr_repeat(3,auto)_1fr] z-[100] pt-[30px] pb-[320px] px-4 md:px-20 md:py-0">
          <motion.svg
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.95,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            className="block w-[100px] row-start-2 mb-8 md:mb-6"
            viewBox="0 0 256.000000 256.000000"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M104 1905 c-28 -14 -61 -36 -74 -50 l-24 -25 30 -39 c16 -22 127
              -160 246 -307 l218 -268 -34 -40 c-190 -235 -456 -569 -456 -575 0 -13 44 -48
              88 -71 91 -48 191 -35 268 33 25 22 108 118 185 213 77 96 144 176 148 178 4
              3 32 -25 61 -62 227 -284 260 -319 349 -361 47 -22 70 -26 146 -26 77 0 98 4
              147 27 91 42 122 71 271 256 l140 173 23 -28 c244 -304 311 -378 364 -405 94
              -47 189 -34 267 36 l44 41 -246 303 c-166 205 -243 307 -237 315 5 7 116 144
              247 306 l238 295 -43 38 c-39 35 -117 68 -160 68 -9 0 -40 -7 -69 -16 -68 -20
              -113 -62 -256 -238 -62 -78 -126 -156 -142 -174 l-28 -33 -139 172 c-152 187
              -206 236 -293 269 -48 18 -73 21 -143 18 -92 -4 -158 -30 -225 -86 -33 -27
              -52 -50 -222 -259 l-91 -112 -141 172 c-189 233 -189 232 -247 261 -70 35
              -142 35 -210 1z m1226 -353 c43 -32 281 -332 273 -345 -21 -35 -264 -324 -282
              -334 -37 -23 -106 -16 -140 13 -32 26 -271 318 -271 330 0 15 260 331 282 341
              55 27 96 25 138 -5z"
              fill="#1E2B3A"
            />
          </motion.svg>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.95,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            className="relative md:ml-[-10px] md:mb-[37px] font-extrabold text-[16vw] md:text-[130px] font-inter text-[#1E2B3A] leading-[0.9] tracking-[-2px] z-[100]"
          >
            Time Series <br />
            Forecasting <span className="text-[#407BBF]">App</span>
            <span className="font-inter text-[#407BBF]">.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.95,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            className="flex flex-row justify-center z-20 mx-0 mb-0 mt-8 md:mt-0 md:mb-[35px] max-w-2xl md:space-x-8"
          >
            <div className="w-full">
              <h2 className="flex items-center font-semibold text-[1em] text-[#1a2b3b]">
                Platform
              </h2>
              <p className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal">
                👋 Welcome to Nixtla&apos;s forecasting app, your one-stop 🎯 solution for predicting your time series with precision powered by TimeGPT.
              </p>
            </div>
          </motion.div>

          <div className="flex gap-[15px] mt-8 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.55,
                duration: 0.55,
                ease: [0.075, 0.82, 0.965, 1],
              }}
            >
              <Link
                href="https://github.com/nixtla"
                target="_blank"
                className="group rounded-full pl-[8px] min-w-[180px] pr-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
                style={{
                  boxShadow:
                    "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                }}
              >
                <Icon.GithubLogo size={20} />
                Star on Github
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.65,
                duration: 0.55,
                ease: [0.075, 0.82, 0.965, 1],
              }}
            >
              <Link
                href="/generate"
                className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
                style={{
                  boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                }}
              >
                <span className="mr-2"> Try it out </span>
                <Icon.ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </main>
        <LinearChartMotion />
        <div className="h-[60px] bg-[#1D2B3A] fixed bottom-0 z-20 w-full flex flex-row items-center justify-evenly">
          <p className="text-white/80 text-base md:text-lg font-semibold md:leading-[60px] whitespace-nowrap flex flex-row">
            ®2023 Nixtla Inc. All rights reserved
          </p>
        </div>
      </div>
    </AnimatePresence>
  );
}
