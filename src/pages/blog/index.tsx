import EventCard from "@/components/home/EventCard";
import { events } from "@/components/home/Events";
import { Col, Row } from "antd";

const Blog = () => {
  return (
    <div>
      <h1 className="mb-10 text-5xl">Blogs</h1>  
      <Row gutter={[24, 24]}>
        {events.map((event) => (
          <Col>
            <EventCard
              thumbnail={event.thumbnail}
              title={event.title}
              description={event.description}
              time={event.time}
              link={event.link}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Blog;
