import Banner from "@/assets/banner.png";
import { ServiceTypes, enumToList } from "@/commons/enum";
import { formatDate, timeSince } from "@/commons/utils";
import CardSkeleton from "@/components/core/CardSkeleton";
import { PageModel } from "@/services/core/models";
import { getMajorCodes } from "@/services/majors/services";
import { PostModel } from "@/services/posts/models";
import { getPosts } from "@/services/posts/services";
import { useQuery } from "@tanstack/react-query";
import { Card, Checkbox, Pagination, Tag, TreeSelect, Typography } from "antd";
import dayjs from "dayjs";
import HTMLReactParser from "html-react-parser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { SHOW_PARENT } = TreeSelect;
const { Paragraph } = Typography;

function PostPage() {
  const [value, setValue] = useState<string[]>([]);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [page, setPage] = useState<PageModel>({
    pageNumber: 1,
    pageSize: 20,
  });
  const { data, isSuccess, isFetching } = useQuery(["p2c_posts"], getPosts);
  const majors = useQuery(["p2c_majors"], getMajorCodes);
  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setPosts(data.items);
      setPage({
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        hasNext: data.hasNext,
        hasPrevious: data.hasPrevious,
        totalCount: data.totalCount,
        totalPages: data.totalPages,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <img src={Banner} alt="banner_img" className="w-full mb-8" />
      <div className="flex gap-12">
        <div className="w-96">
          <CardSkeleton loading={majors.isFetching}>
            <Card className="w-full sticky top-28">
              <div className="text-primary font-semibold mb-2">Dịch vụ</div>
              <div className="ml-4">
                <Checkbox.Group
                  className="flex-col"
                  options={enumToList(ServiceTypes)}
                />
              </div>
              <div className="text-primary font-semibold my-2">Lĩnh vực</div>
              <div className="ml-4">
                <Checkbox.Group
                  className="flex-col"
                  options={majors.data?.map((major) => ({
                    label: major.name,
                    value: major.code,
                  }))}
                />
              </div>
            </Card>
          </CardSkeleton>
        </div>
        {/* <div>
          <TreeSelect
            treeData={treeData}
            value={value}
            onChange={onChange}
            treeCheckable
            showCheckedStrategy={SHOW_PARENT}
            placeholder={"Vui lòng chọn"}
            style={{
              width: 260,
              position: "sticky",
              top: 100,
            }}
            tagRender={({ label, value, closable, onClose }) => (
              <Tag
                color={"volcano"}
                closable={closable}
                onClose={onClose}
                style={{ marginRight: 3 }}
              >
                {label}
              </Tag>
            )}
            treeDefaultExpandAll
            showSearch
            size="large"
            open={true}
            dropdownStyle={{
              zIndex: 0,
              marginTop: 24,
              boxShadow: "none",
            }}
          />
        </div> */}
        <div className="w-full">
          {posts && (
            <CardSkeleton
              hasTitle
              loading={isFetching}
              className="flex flex-col gap-4"
            >
              {posts?.map((post, index) => (
                <Card
                  loading={isFetching}
                  key={index}
                  className="cursor-pointer"
                  title={
                    <div className="flex gap-4 items-center">
                      <div className="font-bold text-lg">{post.title}</div>
                      <div className="font-normal text-sm text-p2c-gray">
                        {post.createdAt && timeSince(post.createdAt)}
                      </div>
                    </div>
                  }
                  extra={
                    <div>
                      <Tag color="blue">{ServiceTypes[post.serviceType]}</Tag>
                      <Tag color="volcano">{post.jobPosition}</Tag>
                    </div>
                  }
                  onClick={() => {
                    navigate(`/bai-dang/${post.id}`);
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <Paragraph
                      ellipsis={{
                        rows: 4,
                      }}
                    >
                      {HTMLReactParser(post.content)}
                    </Paragraph>
                    {post.finishTime && (
                      <div className="align-middle">
                        <span className="text-primary font-semibold">
                          Hạn chót:
                        </span>{" "}
                        <Tag color="red">{formatDate(post.finishTime)}</Tag>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </CardSkeleton>
          )}
          <Pagination
            pageSize={page.pageSize}
            total={page.totalCount}
            current={page.pageNumber}
            className="flex justify-end w-full"
          ></Pagination>
        </div>
      </div>
    </>
  );
}

export default PostPage;
