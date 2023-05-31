import React from "react";
import CVService from "@/assets/service-cv.png";
import InterviewService from "@/assets/service-interview.png";

type Props = {};

function HomeService({}: Props) {
  return (
    <>
      <div className="home__section w-full px-4 flex justify-center mt-40 md:mb-10 mb-5">
        <div className="home__section--title md:text-4xl text-xl font-medium">
          Các loại hình dịch vụ
        </div>
      </div>
      <div className="home__service w-full">
        <div className="home__service--item flex md:flex-nowrap flex-wrap items-center">
          <div className="service__item--decor md:basis-1/2 basis-full md:p-20 pb-0 p-10 pt-0">
            <img src={CVService} alt="" className="w-full" />
          </div>
          <div className="service__item--main md:basis-1/2 basis-full">
            <div className="service__item--title font-bold md:text-5xl text-xl md:text-left text-center">
              Hỗ trợ viết, chỉnh sửa{" "}
              <br className="block content-['_'] md:mt-2" />
              <span className="text-primary md:text-5xl text-xl font-bold">
                sơ yếu lý lịch
              </span>
            </div>
            <div className="service__item--content md:text-xl text-sm text-p2c-grey md:mt-9 mt-4 max-w-[500px] md:text-left text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
        </div>
        <div className="home__service--item flex md:flex-nowrap flex-wrap md:flex-row-reverse items-center">
          <div className="service__item--decor md:basis-1/2 basis-full md:p-20 pb-0 p-10 pt-10">
            <img src={InterviewService} alt="" className="w-full" />
          </div>
          <div className="service__item--main md:basis-1/2 basis-full md:pl-[90px]">
            <div className="service__item--title font-bold md:text-5xl text-xl md:text-left text-center">
              Hỗ trợ các buổi <br className="block content-['_'] md:mt-2" />
              <span className="text-primary md:text-5xl text-xl font-bold">
                phỏng vấn thử
              </span>
            </div>
            <div className="service__item--content md:text-xl text-sm text-p2c-grey md:mt-9 mt-4 max-w-[500px] md:text-left text-justify">
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
