"use client";
import clsx from "clsx";
import { Swiper } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { TProps } from "@/types/component/props";
import { PaginationChevronIcon } from "@/common/Atoms/Image/Icon";

export default function ReviewSwiper({ children }: TProps) {
  return (
    <>
      <div className="flex items-center justify-center w-full mx-auto overflow-hidden relative">
        <div className="swiperContainer w-[1900px] mx-auto">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            navigation={{
              prevEl: ".prevNavigation",
              nextEl: ".nextNavigation",
            }}
            spaceBetween={24}
            slidesPerView={3.5}
            centeredSlides={true}
            grabCursor={true}
            pagination={{
              clickable: true,
              renderBullet: function (_, className) {
                return `<span class="${className} [&.swiper-pagination-bullet-active]:bg-label-strong"></span>`;
              },
            }}
          >
            {children}
            <div className="bg-gradient-to-r from-white w-[520px] h-full absolute top-0 left-0 z-10"></div>
            <div className="bg-gradient-to-l from-white w-[520px] h-full absolute top-0 right-0 z-10"></div>
          </Swiper>
        </div>
        <div className="navigations">
          <div className="prevNavigation">
            <SliderNavigationButton direction="prev" />
          </div>
          <div className="nextNavigation">
            <SliderNavigationButton direction="next" />
          </div>
        </div>
      </div>
    </>
  );
}

function SliderNavigationButton({ direction }: { direction: "prev" | "next" }) {
  // const icon = direction === "prev" ? <PrevChevronIcon /> : <NextChevronIcon />;
  const icon = <PaginationChevronIcon direction={direction} />;
  return (
    <div
      className={clsx(
        "flex items-center justify-center absolute z-[11] bottom-[5px]",
        [
          direction === "prev"
            ? "left-[calc(50vw-80px)] pr-[2px]"
            : "right-[calc(50vw-80px)] pl-[2px]",
        ]
      )}
    >
      {icon}
    </div>
  );
}
