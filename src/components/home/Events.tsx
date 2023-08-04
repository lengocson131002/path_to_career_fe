import Event1 from "@/assets/event1.jpg";
import Event2 from "@/assets/event2.jpg";
import Event3 from "@/assets/event3.jpg";
import Event4 from "@/assets/event4.jpg";
import PlaceHolder from "@/assets/placeholder.png";
import { Button, Image } from "antd";
import { EventCardData } from "./EventCard";
import EventCarousel from "./EventCarousel";
import { Link } from "react-router-dom";

type Props = {};

export const events: EventCardData[] = [
  {
    thumbnail: Event1,
    title: "Cách viết CV chuẩn nhất mọi ngành nghề, chinh phục nhà tuyển dụng",
    description:
      "Ngày nay, bộ hồ sơ xin việc thường không thể thiếu một bản CV. Bởi lẽ thông qua nó, nhà tuyển dụng có thể đánh giá tổng quan năng lực của bạn. Vậy làm cách nào để biết CV của mình đã đầy đủ các yếu tố cần thiết hay chưa? Cùng tìm hiểu tất cả thông tin về cách viết CV cũng như những điều cần chú ý qua bài viết bên dưới nhé!",
    time: "Wednesday 21 June 2023, from 9:30am till 2:30pm",
    link: "/blog/1",
  },
  {
    thumbnail: Event2,
    title: "Cách tự tin khi phỏng vấn: 9 tuyệt chiêu giúp bạn trở nên nổi bật",
    description:
      "Tìm việc làm không khó, nhưng để tìm được một công việc phù hợp với bản thân không phải điều dễ dàng. Do vậy, nếu có thể tìm được một công việc phù hợp thì đừng để đánh mất cơ hội chỉ vì sự thiếu tự tin của bản thân. Sau đây là 9 cách tự tin khi phỏng vấn mà bạn nên học ngay bây giờ.",
    time: "Wednesday 21 June 2023, from 9:30am till 2:30pm",
    link: "/blog/2",
  },
  {
    thumbnail: Event3,
    title: "Những Kinh Nghiệm Phỏng Vấn Hữu Ích Cho Sinh Viên Mới Ra Trường",
    description:
      "Phỏng vấn là một cơ hội quan trọng để ứng viên có thể trực tiếp trao đổi thông tin với nhà tuyển dụng và nâng cao giá trị năng lực của mình. Nếu thật sự muốn được thông qua buổi phỏng vấn và tìm được công việc mới, bạn phải dành nhiều tâm sức và thời gian để đầu tư và trau dồi các lưu ý khi phỏng vấn. Do đó với các sinh viên mới ra trường, trau dồi kỹ năng phỏng vấn ngay từ bây giờ càng là điều quan trọng.",
    time: "Wednesday 21 June 2023, from 9:30am till 2:30pm",
    link: "/blog/3",
  },
  {
    thumbnail: Event4,
    title: "Viết gì vào CV nếu bạn thiếu kinh nghiệm làm việc?",
    description:
      "CV là bước đầu tiên và quan trọng quyết định quá trình tìm việc của bạn. Một CV “chuẩn” là một bộ CV với kinh nghiệm làm việc, kỹ năng tốt. Nhưng với sinh viên mới ra trường – thiếu kinh nghiệm, một CV đúng chuẩn không phải chuyện dễ. Vậy nên viết gì vào CV nếu thiếu kinh nghiệm? Bài viết dưới đây sẽ mách bạn 4 thứ “thay thế” hoàn hảo cho kinh nghiệm làm việc.",
    time: "Wednesday 21 June 2023, from 9:30am till 2:30pm",
    link: "/blog/4",
  },
];

const Events = (props: Props) => {
  return (
    <section className="home__events w-full relative lg:px-24 px-0 my-[72px]">
      <div className="section__title mb-10 z-10 text-xs lg:text-xl ml-7 flex justify-between items-center">
        <div>
          Blog{" "}
          <div className="lg:mx-3 mx:1 inline-block w-[50px] lg:w-[90px] bg-[#7E8595] h-[0.5px] lg:h-[1px] align-middle"></div>
        </div>
        <Button>
          <Link to={"/blog"}>Xem tất cả</Link>
        </Button>
      </div>
      <div className="events relative overflow-visible lg:px-24 px-0 lg:mt-0 mt-4">
        <div className="events__slider lg:flex hidden justify-between w-full">
          <EventCarousel events={events} />
        </div>
        <div className="events__stacks lg:hidden flex items-center flex-col gap-[30px]">
          {events.slice(0, 3).map((event, i) => {
            return (
              <div className="events__stack flex" key={i}>
                <div className="events__stack--thumbnail basis-[162px] w-[162px] max-h-[156px]">
                  <Image
                    src={event.thumbnail ?? PlaceHolder}
                    alt="event thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="events__stack--content max-w-[210.34px] ml-3">
                  <div className="events__stack--title text-base font-extrabold">
                    {event.title}
                  </div>
                  <div className="events__stack--description text-[11px] mt-3">
                    {event.description}
                  </div>
                  <Button className="max-h-[27px] mt-3">
                    <Link to={event.link}>Xem ngay</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Events;
