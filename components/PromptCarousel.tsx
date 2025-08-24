"use client";

// Import Swiper React components
// Import Swiper styles
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { PromptCard } from "./PromptCard";

const PromptCarousel = () => {
  // Sample data that matches the new PromptWithMetadata type
  const samplePrompts = [
    {
      id: "1",
      title: "Sample Prompt 1",
      summary: "This is a sample prompt summary for the first prompt.",
      author_id: "author-1",
      deadline_date: "2023-10-01T00:00:00Z",
      length: 1000,
      story_count: 3,
      upvotes: 15,
      downvotes: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: {
        id: "author-1",
        username: "SampleAuthor",
        full_name: "Sample Author Name",
        avatar_url: undefined,
        bio: undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    },
    {
      id: "2",
      title: "Sample Prompt 2",
      summary: "This is a sample prompt summary for the second prompt.",
      author_id: "author-2",
      deadline_date: "2023-11-01T00:00:00Z",
      length: 2000,
      story_count: 5,
      upvotes: 22,
      downvotes: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: {
        id: "author-2",
        username: "AnotherAuthor",
        full_name: "Another Author",
        avatar_url: undefined,
        bio: undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    },
    {
      id: "3",
      title: "Sample Prompt 3",
      summary: "This is a sample prompt summary for the third prompt.",
      author_id: "author-3",
      deadline_date: undefined,
      length: 1500,
      story_count: 0,
      upvotes: 8,
      downvotes: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: {
        id: "author-3",
        username: "ThirdAuthor",
        full_name: "Third Author",
        avatar_url: undefined,
        bio: undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    },
  ];

  return (
    <>
      <Swiper
        // install Swiper modules
        spaceBetween={50}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {samplePrompts.map((prompt) => (
          <SwiperSlide key={prompt.id}>
            <PromptCard {...prompt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default PromptCarousel;
