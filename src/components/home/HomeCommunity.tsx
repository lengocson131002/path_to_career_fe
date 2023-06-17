import React, { CSSProperties } from "react";
import CommunityMan from "@/assets/community-decor.png";
import { Card } from "antd";

type Props = {};

function HomeCommunity({}: Props) {
  const responsiveBodyStyle: { [key: string]: CSSProperties } = {
    "@media (max-width: 768px)": {
      padding: "4px",
    },
  };

  return (
    <div className="home__community md:mt-40 mt-32 flex md:flex-nowrap flex-wrap md:min-h-[560px] items-center">
      <div className="home__community--decor md:basis-3/5 basis-full relative">
        <div className="community__decor--man max-w-[560px] md:-translate-x-32 -translate-x-8">
          <img src={CommunityMan} alt="" className="md:w-full w-3/4" />
        </div>
        <div className="community__decor--stats left-1/2 md:translate-x-[calc(-100%+36px)] md:translate-y-[calc(-100%+16px)] translate-x-[calc(-100%+100px)] translate-y-[calc(-100%)] absolute top-0">
          <Card className="text-center md:rounded-3xl rounded-xl shadow-[0_1px_6px_0px_rgba(0,0,0,0.05)] md:p-6 [&>div]:!py-2 [&>div]:!px-3">
            <div className="community__stats--number font-semibold text-primary md:text-3xl text-sm">
              100+
            </div>
            <div className="community__stats--text text-p2c-grey md:text-xl text-xs">
              chuyên gia/cộng tác viên
            </div>
          </Card>
        </div>
        <div className="community__decor--stats right-1/2 md:translate-x-[calc(100%-20px)] md:translate-y-[calc(-100%+80px)] translate-y-[calc(-100%+34px)] translate-x-[calc(100%+16px)] tran absolute bottom-0">
          <Card className="text-center md:rounded-3xl rounded-xl shadow-[0_1px_6px_0px_rgba(0,0,0,0.05)] md:p-6 [&>div]:!py-2 [&>div]:!px-3">
            <div className="community__stats--number font-semibold text-primary md:text-3xl text-sm">
              500+
            </div>
            <div className="community__stats--text text-p2c-grey md:text-xl text-xs">
              bài đăng trên hệ thống
            </div>
          </Card>
        </div>
      </div>
      <div className="home__communtiy--main md:text-right text-center md:basis-2/5 basis-full self-baseline md:mt-0 mt-5">
        <div className="community__main--title md:text-5xl text-2xl font-bold">
          Cộng đồng <br className="block content-['_'] md:mt-2" />
          <span className="text-primary md:text-5xl text-2xl font-bold">
            chuyên gia/nhân viên
          </span>{" "}
          <br className="block content-['_'] md:mt-2" />
          lớn mạnh
        </div>
        <div className="community__main--content md:mt-10 mt-6 text-p2c-grey md:text-xl text-sm">
          P2C - Path to career với đội ngũ chuyên gia/ nhân viên/ cộng tác viên
          với kĩ năng cao và được đạo tạo thuộc nhiều lĩnh vực việc làm khác
          nhau: Công nghệ thông tin, kinh tế, logistics, Văn phòng,...Qua đó có
          thể hỗ trợ mọi nhu cầu của bạn và làm hài lòng các nhà tuyển dụng
        </div>
      </div>
    </div>
  );
}

export default HomeCommunity;
