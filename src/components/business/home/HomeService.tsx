import React from "react";
import CVService from "@/assets/service-cv.png";
import InterviewService from "@/assets/service-interview.png";

type Props = {};

function HomeService({}: Props) {
  return (
    <>
      <div className="home__section w-full px-4 flex justify-center mt-40 mb-10">
        <div className="home__section--title text-4xl font-medium">
          Các loại hình dịch vụ
        </div>
      </div>
      <div className="home__service w-full">
        <div className="home__service--item flex items-center">
          <div className="service__item--decor basis-1/2 p-20 pb-0">
            <img src={CVService} alt="" className="w-full" />
          </div>
          <div className="service__item--main basis-1/2">
            <div className="service__item--title font-bold text-5xl">
              Hỗ trợ viết, chỉnh sửa <br className="block content-['_'] mt-2" />
              <span className="text-primary text-5xl font-bold">
                sơ yếu lý lịch
              </span>
            </div>
            <div className="service__item--content text-xl text-p2c-grey mt-9 max-w-[500px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
        </div>
        <div className="home__service--item flex flex-row-reverse items-center">
          <div className="service__item--decor basis-1/2 p-20 pb-0">
            <img src={InterviewService} alt="" className="w-full" />
          </div>
          <div className="service__item--main basis-1/2 pl-[90px]">
            <div className="service__item--title font-bold text-5xl">
              Hỗ trợ các buổi <br className="block content-['_'] mt-2" />
              <span className="text-primary text-5xl font-bold">
                phỏng vấn thử
              </span>
            </div>
            <div className="service__item--content text-xl text-p2c-grey mt-9 max-w-[500px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeService;
