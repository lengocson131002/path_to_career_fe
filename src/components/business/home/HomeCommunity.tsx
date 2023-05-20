import React from "react";
import CommunityMan from "@/assets/community-decor.png";
import { Card } from "antd";

type Props = {};

function HomeCommunity({}: Props) {
  return (
    <div className="home__community mt-40 flex md:min-h-[560px] items-center">
      <div className="home__community--decor basis-3/5 relative">
        <div className="community__decor--man max-w-[560px] -translate-x-32">
          <img src={CommunityMan} alt="" className="w-full" />
        </div>
        <div className="community__decor--stats left-1/2 translate-x-[calc(-100%+36px)] translate-y-[calc(-100%+16px)] absolute top-0">
          <Card className="text-center rounded-3xl">
            <div className="community__stats--number font-semibold text-primary text-3xl">
              500+
            </div>
            <div className="community__stats--text text-p2c-grey text-xl">
              chuyên gia/cộng tác viên
            </div>
          </Card>
        </div>
        <div className="community__decor--stats right-1/2 translate-x-[calc(100%-20px)] translate-y-[calc(-100%+80px)] absolute bottom-0">
          <Card className="text-center rounded-3xl">
            <div className="community__stats--number font-semibold text-primary text-3xl">
              300+
            </div>
            <div className="community__stats--text text-p2c-grey text-xl">
              bài đăng trên hệ thống
            </div>
          </Card>
        </div>
      </div>
      <div className="home__communtiy--main text-right basis-2/5 self-baseline">
        <div className="community__main--title text-5xl font-bold">
          Cộng đồng <br className="block content-['_'] mt-2" />
          <span className="text-primary text-5xl font-bold">
            chuyên gia/cộng tác viên
          </span>{" "}
          <br className="block content-['_'] mt-2" />
          lớn mạnh
        </div>
        <div className="community__main--content mt-10 text-p2c-grey text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat
          bibendum ornare urna, cursus eget convallis. Feugiat imperdiet posuere
          justo, ultrices interdum sed orci nunc, mattis. Ipsum viverra viverra
          neque adipiscing arcu, quam dictum. Dui mi viverra dui, sit accumsan,
          tincidunt massa. Dui cras magnis.
        </div>
      </div>
    </div>
  );
}

export default HomeCommunity;
