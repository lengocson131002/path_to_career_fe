import { Spin } from "antd";

function Loader({ loading }: { loading: boolean }) {
  if (!loading) {
    return <></>;
  }
  return (
    <Spin
      spinning={true}
      className="fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center bg-white"
    ></Spin>
  );
}

export default Loader;
