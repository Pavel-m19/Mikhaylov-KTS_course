import React from "react";

import s from "./Card.module.scss";

export type CardProps = {
  image: string;
  category?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  price?: number;
  onClick?: React.MouseEventHandler;
  id: number;
};

const Card: React.FC<CardProps> = ({
  image,
  category,
  title,
  subtitle,
  price,
  onClick,
  id,
  ...args
}) => (
  <div {...args} className={s.card} onClick={onClick}>
    <div className={s.card_content_wrapper}>
      <img src={image} alt="product_pic" className={s.card_image} />
      {category && <div className={s.card_category}>{category}</div>}
      <div className={s.card_title}>{title}</div>
      <div className={s.card_price}>{`${price}$`}</div>
    </div>
  </div>
);
export default React.memo(Card);
