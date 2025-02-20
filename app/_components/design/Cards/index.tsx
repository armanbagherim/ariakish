import React from "react";
import { Vip } from "../icons";

interface ICard {
  cardName: string;
  price?: number;
  expireDate: string;
  cardNumber: string;
  color: string;
}

const Cards: React.FC<ICard> = (props) => {
  return (
    <div
      className="px-7 py-4 overflow-hidden relative rounded-[30px] flex flex-col justify-between gap-8"
      style={{ backgroundColor: `${props.color}80` }} // 80 is 50% opacity in hex
    >
      <svg
        className="absolute top-[-10px] right-[-10px]"
        width="98"
        height="97"
        viewBox="0 0 98 97"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          opacity="0.08"
          cx="62.5"
          cy="34.5"
          r="62.5"
          fill={props.color}
        />
      </svg>
      <svg
        className="absolute bottom-[-10px] left-[-10px]"
        width="103"
        height="82"
        viewBox="0 0 103 82"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse opacity="0.1" cx="19" cy="88" rx="84" ry="88" fill="black" />
      </svg>

      <div className="flex items-center justify-between">
        <span className="font-bold text-lg">{props.cardName}</span>
        <Vip />
      </div>
    <div className="text-center font-bold text-xl">
        {props.price?.toLocaleString()} تومان
      </div>
      <div className="flex items-center justify-between">
        <span>{props.expireDate}</span>
        <span>{props.cardNumber}</span>
      </div>
    </div>
  );
};

export default Cards;
