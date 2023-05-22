import React from "react";
import Decor from "@/assets/partnership-decor.png";
import { Button } from "antd";

type Props = {};

function HomePartnership({}: Props) {
  return (
    <div className="home__partnership my-32 mt-60 relative md:min-h-[500px] w-full">
      <div className="bg-light-blue absolute w-full h-[90%] -z-50 bottom-0 md:scale-x-[1.152] overflow-x-hidden"></div>
      <div className="flex overflow-visible items-center">
        <div className="basis-3/5 ">
          <div className="text-5xl font-bold">
            Bạn có trên{" "}
            <span className="text-5xl font-bold text-primary">
              3 năm
              <br className="block content-['_'] mt-2" />
              kinh nghiệm
            </span>{" "}
            và muốn tìm việc <br className="block content-['_'] mt-2" />
            để{" "}
            <span className="text-5xl font-bold text-primary">
              tăng thu nhập
            </span>
            ?
          </div>
          <Button
            type="primary"
            className="h-[52px] w-[268px] font-medium p-0 rounded-[10px] mt-5"
          >
            <span className="text-2xl py-3 -mt-1">Đăng ký làm chuyên gia</span>
          </Button>
        </div>
        <div className="basis-2/5 self-end">
          <img src={Decor} alt="" className="w-full max-w-[480px]" />
        </div>
      </div>
    </div>
  );
}

export default HomePartnership;
