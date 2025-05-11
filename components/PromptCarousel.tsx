"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { PromptCard } from "./PromptCard";

const PromptCarousel = () => {
  return (
    <>
      <Swiper
        // install Swiper modules
        spaceBetween={50}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <PromptCard
            id="1"
            createdAt={new Date().toISOString()}
            promptTitle="Sample Prompt"
            promptSummary="This is a sample prompt summary."
            authorId="Author Name"
            deadline="
                  2023-10-01T00:00:00Z"
            length="Short"
            writerCreds={10}
            stories={[]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <PromptCard
            id="1"
            createdAt={new Date().toISOString()}
            promptTitle="Sample Prompt"
            promptSummary="This is a sample prompt summary."
            authorId="Author Name"
            deadline="
          2023-10-01T00:00:00Z"
            length="Short"
            writerCreds={10}
            stories={[]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <PromptCard
            id="1"
            createdAt={new Date().toISOString()}
            promptTitle="Sample Prompt"
            promptSummary="This is a sample prompt summary."
            authorId="Author Name"
            deadline="
          2023-10-01T00:00:00Z"
            length="Short"
            writerCreds={10}
            stories={[]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <PromptCard
            id="1"
            createdAt={new Date().toISOString()}
            promptTitle="Sample Prompt"
            promptSummary="This is a sample prompt summary."
            authorId="Author Name"
            deadline="
          2023-10-01T00:00:00Z"
            length="Short"
            writerCreds={10}
            stories={[]}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default PromptCarousel;
