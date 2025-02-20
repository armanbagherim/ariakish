"use client";
import React, { useState, useEffect } from "react";

const Timer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex gap-4">
      {timeLeft.days > 0 && (
        <div className="flex flex-col">
          <span className="text-lg font-bold text-primary">
            {timeLeft.days}
          </span>{" "}
          <span>روز</span>{" "}
        </div>
      )}
      {timeLeft.hours > 0 && (
        <div className="flex flex-col">
          <span className="text-lg font-bold text-primary">
            {timeLeft.hours}
          </span>{" "}
          <span>ساعت</span>{" "}
        </div>
      )}
      {timeLeft.minutes > 0 && (
        <div className="flex flex-col">
          <span className="text-lg font-bold text-primary">
            {timeLeft.minutes}
          </span>{" "}
          <span>دقیقه</span>{" "}
        </div>
      )}
      {timeLeft.seconds > 0 && (
        <div className="flex flex-col">
          <span className="text-lg font-bold text-primary">
            {timeLeft.seconds}
          </span>{" "}
          <span>ثانیه</span>{" "}
        </div>
      )}
      {Object.keys(timeLeft).length === 0 && <span>زمان به پایان رسید</span>}
    </div>
  );
};

export default Timer;
