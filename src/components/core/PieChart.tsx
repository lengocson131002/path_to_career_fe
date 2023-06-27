import { Badge, Col, List, Row } from "antd";
import { Cell, Pie, PieChart as PieChartRechart } from "recharts";

const COLORS = ["#0284c7", "#dc2626"];

function PieChart({ data }: { data: { name: string; value?: number }[] }) {
  return (
    <div className="flex items-center justify-center h-full xl:flex-col gap-0 md:gap-12 xl:gap-5">
      <PieChartRechart width={100} height={100}>
        <Pie
          data={data}
          innerRadius={40}
          outerRadius={50}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          <Cell key={`cell-${0}`} fill={COLORS[0 % COLORS.length]} />
          <Cell key={`cell-${1}`} fill={COLORS[1 % COLORS.length]} />
        </Pie>
      </PieChartRechart>
      <List
        className="w-72"
        itemLayout="horizontal"
        dataSource={data}
        size="small"
        renderItem={(item, index) => {
          const total = 2;
          const percent = ((item.value ?? 0 / total) * 100).toFixed(2) + "%";

          return (
            <List.Item key={item.value} className="w-full">
              <Row className="w-full">
                <Col span={2}>
                  <Badge color={COLORS[index]} />
                </Col>
                <Col span={12}>
                  <span className="text-sm">{item.name}</span>
                </Col>
                <Col span={6} className="text-right">
                  <span className="text-sm">{percent}</span>
                </Col>
                <Col span={4} className="text-right">
                  <span className="text-sm">{item.value}</span>
                </Col>
              </Row>
            </List.Item>
          );
        }}
      />
    </div>
  );
}

export default PieChart;
