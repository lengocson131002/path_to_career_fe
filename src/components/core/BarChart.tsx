import {
  Bar,
  BarChart as BarChartRechart,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8F66DE"];

function BarChart({
  data,
}: {
  data: { [key: string]: string | number | undefined };
}) {
  return (
    <div className="flex justify-center">
      <BarChartRechart width={300} height={200} data={[data]} barSize={40}>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {Object.keys(data).map((key, index) => {
          if (key !== "name") {
            return <Bar dataKey={key} fill={COLORS[index]} />;
          }
        })}
      </BarChartRechart>
    </div>
  );
}

export default BarChart;
