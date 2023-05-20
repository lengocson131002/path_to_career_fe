import { Button, Col, Row } from "antd";
import React from "react";
import HeroDecor from "../../../assets/hero-decor.png";

type Props = {};

function HomeHero({}: Props) {
  return (
    <>
      <div className="h-[660px] hero__bg w-full bg-hero-bg bg-[length:1490px_660px] bg-origin-content bg-no-repeat absolute top-0 left-0 -z-50"></div>
      <div className="h-[500px] hero__main">
        <Row className="h-full">
          <Col span={13} className="self-center">
            <div className="hero__title">
              <div className="hero__title--upper text-4xl font-bold">
                Hãy để chúng tôi
              </div>
              <div className="hero__title--lower text-5xl font-bold text-primary uppercase my-5">
                Đồng hành cùng bạn trên con đường sự nghiệp
              </div>
            </div>
            <div className="hero__cta">
              <Button
                type="primary"
                className="h-[52px] w-[206px] font-medium p-0 rounded-[10px]"
              >
                <span className="text-2xl py-3 -mt-1">Khám phá ngay</span>
              </Button>
            </div>
          </Col>
          <Col span={11} className="self-center">
            <div className="">
              <img src={HeroDecor} alt="" className="object-cover h-[403px]" />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HomeHero;
