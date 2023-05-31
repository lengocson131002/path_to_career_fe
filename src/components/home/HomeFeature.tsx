import Connection from "@/assets/fast-connection.png";
import Free from "@/assets/free-post.png";
import Service from "@/assets/multi-service.png";

type Props = {};

function HomeFeature({}: Props) {
  return (
    <div className="home__feature w-full bg-white rounded-[10px] flex py-10 md:px-[100px] px-5 gap-3 shadow-[0_0_30px_10px_rgba(0,0,0,0.05)] justify-between">
      <div className="home__feature--item flex flex-col max-w-[280px] items-center text-center">
        <div className="feature__item--icon md:w-28 md:h-28 w-12 h-12 rounded-full bg-light-blue mb-4 flex items-center justify-center">
          <img src={Connection} alt="" className="md:w-16 w-8" />
        </div>
        <div className="feature__item--title md:text-2xl text-xs font-medium h-[48px]">
          Kết nối nhanh chóng
        </div>
        <div className="feature__item--description md:text-xl text-xs text-p2c-grey">
          Kết nối bạn với chuyên gia/cộng tác viên trên lãnh thổ Việt Nam.
        </div>
      </div>
      <div className="home__feature--item flex flex-col max-w-[280px] items-center text-center">
        <div className="feature__item--icon md:w-28 md:h-28 w-12 h-12 rounded-full bg-light-blue mb-4 flex items-center justify-center">
          <img src={Free} alt="" className="md:w-16 w-8" />
        </div>
        <div className="feature__item--title md:text-2xl text-xs font-medium h-[48px]">
          Đăng bài không mất phí
        </div>
        <div className="feature__item--description md:text-xl text-xs text-p2c-grey">
          Bạn sẽ nhanh chóng nhận được chào giá từ các chuyên gia/cộng tác viên.
        </div>
      </div>
      <div className="home__feature--item flex flex-col max-w-[280px] items-center text-center">
        <div className="feature__item--icon md:w-28 md:h-28 w-12 h-12 rounded-full bg-light-blue mb-4 flex items-center justify-center">
          <img src={Service} alt="" className="md:w-16 w-8" />
        </div>
        <div className="feature__item--title md:text-2xl text-xs font-medium h-[48px]">
          Đa dạng dịch vụ
        </div>
        <div className="feature__item--description md:text-xl text-xs text-p2c-grey">
          Hỗ trợ đa dạng dịch hỗ trợ cho việc phỏng vấn và tìm việc của bạn.
        </div>
      </div>
    </div>
  );
}

export default HomeFeature;
