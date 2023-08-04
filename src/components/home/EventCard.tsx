import Placeholder from "@/assets/placeholder.png";
import { Button, Image } from "antd";
import { Link } from "react-router-dom";

export type EventCardData = {
  thumbnail?: string | any;
  title: string;
  description: string;
  time: string;
  link: string;
  classname?: string;
};

const EventCard = ({
  classname,
  title,
  description,
  time,
  link,
  thumbnail,
}: EventCardData) => {
  return (
    <div
      className={`my-2 card group shadow-md md:max-w-[400px] rounded-[20px] overflow-hidden transition-colors ${
        classname ?? ""
      }`}
    >
      <div className="card__content">
        <div className="card__thumbnail w-auto rounded-t-[20px] overflow-hidden h-44">
          <Image
            src={thumbnail ?? Placeholder}
            alt={`'${title.slice(0, 10) + "..."}' event thumbnail`}
            className="object-cover h-44"
          />
        </div>
        <div className="card__details px-8">
          <div className="card__title my-5 line-clamp-2 font-extrabold text-title text-2xl">
            {title}
          </div>
          <div className="card__desc text-content text-base line-clamp-3">
            {description}
          </div>
          <div className="card__time italic text-content mt-[30px] mb-10 font-thin text-sm">
            {time}
          </div>
          <div className="card__action">
            <Button className="max-w-[136px] mb-4">
              <Link to={link ?? "/"} className="font-medium">
                Xem thêm
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
