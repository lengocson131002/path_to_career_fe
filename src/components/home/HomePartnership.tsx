import React from "react";
import Decor from "@/assets/partnership-decor.png";
import { Button } from "antd";
import { Link } from "react-router-dom";

type Props = {};

function HomePartnership({}: Props) {
  return (
    <div className="home__partnership md:my-32 my-10 md:mt-60 relative md:min-h-[500px] min-h-[200px] w-full">
      <div className="bg-light-blue absolute w-full md:h-[90%] h-full -z-50 bottom-0 md:scale-x-[1.152] scale-x-[1.105] overflow-x-hidden"></div>
      <div className="flex overflow-visible items-center md:flex-nowrap flex-wrap">
        <div className="md:basis-3/5 basis-full md:text-left text-center md:pt-0 pt-5">
          <div className="md:text-5xl text-xl font-bold">
            Bạn có trên{" "}
            <span className="md:text-5xl text-xl font-bold text-primary">
              3 năm
              <br className="block content-['_'] md:mt-2" />
              kinh nghiệm
            </span>{" "}
            và muốn tìm việc <br className="block content-['_'] md:mt-2" />
            để{" "}
            <span className="md:text-5xl text-xl font-bold text-primary">
              tăng thu nhập
            </span>
            ?
          </div>
          <Link to="/bai-dang">
            <Button
              type="primary"
              className="md:h-[52px] md:w-[268px] h-[36px] w-[200px] font-medium p-0 rounded-[10px] mt-5"
            >
              <span className="md:text-2xl text-base md:py-3 -mt-1">
                Đăng ký làm chuyên gia
              </span>
            </Button>
          </Link>
        </div>
        <div className="md:basis-2/5 md:block hidden self-end">
          <img src={Decor} alt="" className="w-full max-w-[480px]" />
        </div>
      </div>
    </div>
  );
}

export default HomePartnership;
