import { timeSince } from "@/commons/utils";
import { getReviews } from "@/services/reviews/services";
import { useQuery } from "@tanstack/react-query";
import { Card, Empty, List, Pagination, Rate } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Notification() {
  const { id } = useParams();
  const [page, setPage] = useState<number>(1);
  const reviews = useQuery([`p2c_reviews_${id}`], () =>
    getReviews({ accountId: id ? +id : undefined, page: page })
  );

  useEffect(() => {
    reviews.refetch();
  }, [page]);

  return (
    <Card>
      {reviews ? (
        <>
          <List
            itemLayout="horizontal"
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  imageStyle={{
                    height: 160,
                    width: 320,
                    margin: "0 auto",
                    marginBottom: 20,
                  }}
                  description={
                    <span className="text-xl font-medium text-sub-gray">
                      Freelancer chưa có đánh giá nào
                    </span>
                  }
                ></Empty>
              ),
            }}
            dataSource={reviews.data?.items}
            header={<div className="text-lg font-bold">Đánh giá</div>}
            renderItem={(item, index) => (
              <List.Item className="cursor-pointer hover:bg-gray-50">
                <List.Item.Meta
                  className="px-4"
                  title={
                    <div className="flex justify-between">
                      {item.reviewer?.name}

                      <div className="font-medium text-base text-p2c-gray">
                        {timeSince(item.updatedAt)}
                      </div>
                    </div>
                  }
                  description={
                    <div>
                      <div>
                        <Rate value={item.score}></Rate>
                      </div>
                      <div className="mt-2">Nội dung: {item.content}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
          <Pagination
            className="float-right mt-4"
            current={reviews.data?.pageNumber}
            total={reviews.data?.totalCount}
            onChange={(page) => setPage(page)}
          ></Pagination>
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          imageStyle={{ height: 160, width: 384 }}
        ></Empty>
      )}
    </Card>
  );
}

export default Notification;
