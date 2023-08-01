import BarChart from "@/components/core/BarChart";
import PieChart from "@/components/core/PieChart";
import {
  getDashboardAccounts,
  getDashboardPosts,
  getStatistic,
  getTopFreelancers,
} from "@/services/dashboard/services";
import { AppState } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, DatePicker, List, Statistic } from "antd";
import { FormatConfig } from "antd/es/statistic/utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
const { RangePicker } = DatePicker;

const rangePresets: {
  label: string;
  value: [dayjs.Dayjs, dayjs.Dayjs];
}[] = [
  { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
];

const formatter = (value: number | string, config?: FormatConfig) => (
  <CountUp end={+value} separator="," className="font-bold text-3xl" />
);

function Dashboard() {
  const [range, setRange] = useState<
    [dayjs.Dayjs | undefined, dayjs.Dayjs | undefined]
  >([undefined, undefined]);
  const { account } = useSelector((state: AppState) => state.user);

  if (account?.role !== "Admin") {
    return <></>;
  }

  const statistic = useQuery([`p2c_dashboard_statistics`], () =>
    getStatistic({ from: range[0], to: range[1] })
  );
  const freelancers = useQuery([`p2c_dashboard_freelancers`], () =>
    getTopFreelancers()
  );
  const posts = useQuery([`p2c_dashboard_posts`], () =>
    getDashboardPosts({ from: range[0], to: range[1] })
  );
  const accounts = useQuery([`p2c_dashboard_accounts`], () =>
    getDashboardAccounts({ from: range[0], to: range[1] })
  );

  const onRangeChange = (dates: null | (dayjs.Dayjs | null)[]) => {
    if (dates && dates[0] && dates[1]) {
      setRange([dates[0].startOf("date"), dates[1].endOf("date")]);
    } else {
      setRange([undefined, undefined]);
    }
  };

  useEffect(() => {
    statistic.refetch();
    posts.refetch();
    accounts.refetch();
    freelancers.refetch();
  }, [range]);

  return (
    <>
      <RangePicker presets={rangePresets} onChange={onRangeChange} />
      <div className="grid xl:grid-cols-10 grid-cols-12 gap-2 mt-2">
        <div className="row-span-4 xl:col-span-2 col-span-12 grid xl:flex-col grid-cols-12 gap-2 justify-between">
          <Card
            title="Tổng doanh thu"
            className="xl:col-span-12 lg:col-span-3 md:col-span-6 col-span-12"
          >
            <div className="flex items-center gap-2">
              <Statistic
                value={statistic.data?.revenue}
                formatter={formatter}
              />
              <span>&#8363;</span>
            </div>
          </Card>
          <Card
            title="Tổng bài đăng"
            className="xl:col-span-12 lg:col-span-3 md:col-span-6 col-span-12"
          >
            <div className="flex items-center gap-2">
              <Statistic
                value={statistic.data?.postCount}
                formatter={formatter}
              />
              <span>bài đăng</span>
            </div>
          </Card>
          <Card
            title="Tổng người dùng"
            className="xl:col-span-12 lg:col-span-3 md:col-span-6 col-span-12"
          >
            <div className="flex items-center gap-2">
              <Statistic
                value={statistic.data?.userCount}
                formatter={formatter}
              />
              <span>người dùng</span>
            </div>
          </Card>
          <Card
            title="Tổng Freelancer"
            className="xl:col-span-12 lg:col-span-3 md:col-span-6 col-span-12"
          >
            <div className="flex items-center gap-2">
              <Statistic
                value={statistic.data?.freelancerCount}
                formatter={formatter}
              />
              <span>freelancers</span>
            </div>
          </Card>
          <Card
            title="Tổng lượt truy cập"
            className="xl:col-span-12 lg:col-span-3 md:col-span-6 col-span-12"
          >
            <div className="flex items-center gap-2">
              <Statistic
                value={
                  statistic.data?.postCount ? statistic.data?.postCount + 50 : 0
                }
                formatter={formatter}
              />
              <span>lượt</span>
            </div>
          </Card>
        </div>
        <div className="row-span-4 grid grid-cols-12 gap-2 xl:col-span-6 col-span-12">
          <Card title="Bài đăng" className="h-full lg:col-span-6 col-span-12">
            <BarChart
              data={{
                name: "Bài đăng",
                "Mới tạo": posts.data?.byStatus.New,
                "Đã thanh toán": posts.data?.byStatus.Paid,
                "Đã nhận": posts.data?.byStatus.Accepted,
                "Hoàn tất": posts.data?.byStatus.Done,
              }}
            />
          </Card>
          <Card
            title="Bài đăng theo dịch vụ"
            className="h-full lg:col-span-6 col-span-12"
          >
            <BarChart
              data={{
                name: "Bài đăng theo dịch vụ",
                "Tạo CV": posts.data?.byService.CreateCV,
                "Review CV": posts.data?.byService.ReviewCV,
                "Phỏng vấn thử": posts.data?.byService.MockInterview,
              }}
            />
          </Card>
          <Card title="Người dùng" className="h-full lg:col-span-6 col-span-12">
            <PieChart
              data={[
                {
                  name: "Hoạt động",
                  value: accounts.data?.User.active,
                },
                {
                  name: "Ngừng hoạt động",
                  value: accounts.data?.User.inactive,
                },
              ]}
            />
          </Card>
          <Card title="Freelancer" className="h-full lg:col-span-6 col-span-12">
            <PieChart
              data={[
                {
                  name: "Hoạt động",
                  value: accounts.data?.Freelancer.active,
                },
                {
                  name: "Ngừng hoạt động",
                  value: accounts.data?.Freelancer.inactive,
                },
              ]}
            />
          </Card>
        </div>

        <div className="row-span-4 xl:col-span-2 col-span-12">
          <Card
            title="Top freelancer"
            className="h-full"
            extra={<AiFillStar />}
          >
            <List
              itemLayout="horizontal"
              dataSource={freelancers.data}
              renderItem={(item, index) => (
                <List.Item.Meta
                  description={
                    <div className="flex items-center gap-4 mb-6">
                      <div className="font-bold">{++index}</div>
                      <Avatar src={item.avatar} size={"large"} />
                      <div className="">{item.name}</div>
                    </div>
                  }
                />
              )}
            />
          </Card>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
