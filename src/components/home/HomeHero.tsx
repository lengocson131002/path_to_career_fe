import { Button, Col, Row } from "antd";
import React from "react";
import HeroDecor from "@/assets/hero-decor.png";
import HeroBg from "@/assets/hero-bg.png";

type Props = {};

function HomeHero({}: Props) {
  console.log(HeroBg);
  return (
    <>
      <div
        className={`md:h-[660px] h-[400px] hero__bg w-full bg-[url('${HeroBg}')] bg-[length:1490px_660px] bg-origin-content bg-no-repeat absolute top-0 left-0 -z-50`}
      ></div>
      <div className="h-[500px] hero__main">
        <Row className="h-full">
          <Col lg={13} xs={{ span: 24, order: 2 }} className="md:self-center">
            <div className="hero__title">
              <div className="hero__title--upper md:text-4xl text-3xl font-bold md:text-left text-center">
                Hãy để chúng tôi
              </div>
              <div className="hero__title--lower md:text-5xl text-3xl font-bold md:text-left text-center text-primary uppercase md:my-5 my-2">
                Đồng hành cùng bạn trên con đường sự nghiệp
              </div>
            </div>
            <div className="hero__cta md:block flex justify-center md:mt-0 mt-4">
              <Button
                type="primary"
                className="md:h-[52px] md:w-[206px] font-medium p-0 md:rounded-[10px] rounded-3xl h-[36px] w-[180px]"
              >
                <span className="md:text-2xl text-xl md:py-3 -mt-[2px] py-2">
                  Khám phá ngay
                </span>
              </Button>
            </div>
          </Col>
          <Col lg={11} xs={{ span: 24, order: 1 }} className="self-center">
            <div className="overflow-visible md:block flex justify-center">
              <img
                src={HeroDecor}
                alt=""
                className="object-contain md:h-[403px] w-10/12 md:w-unset"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HomeHero;
