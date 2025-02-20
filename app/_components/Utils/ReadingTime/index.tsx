import React from "react";

const calculateReadingTime = (text) => {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = text.split(" ").length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
};

const ReadingTime = ({ content }) => {
  const textContent = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
  const estimatedTime = calculateReadingTime(textContent);

  return <span>زمان مطالعه {estimatedTime} دقیقه</span>;
};

export default ReadingTime;
