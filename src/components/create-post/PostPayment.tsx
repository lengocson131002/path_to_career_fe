import {
  EnumKeys,
  PaymentMethod,
  enumToList,
  getEnumKeys,
} from "@/commons/enum";
import { Button, Form, Radio } from "antd";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

function PostPayment({
  onSubmit,
}: {
  onSubmit: ({ method }: { method: EnumKeys<typeof PaymentMethod> }) => void;
}) {
  const [option, setOption] = useState<number>(0);

  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item
        name={"method"}
        label={
          <label className="font-medium block">
            Vui lòng chọn phương thức thanh toán:
          </label>
        }
        initialValue={"Momo"}
      >
        <Radio.Group
          defaultValue={getEnumKeys(PaymentMethod)[option]}
          size="large"
          className="flex-col flex gap-2"
        >
          {enumToList(PaymentMethod).map((method, index) => (
            <Radio
              value={method.key}
              checked={option === index}
              onClick={() => setOption(index)}
              className={`border-solid border px-6 py-4 hover:border-primary rounded-md ${
                option === index
                  ? "border-primary bg-blue-50"
                  : "border-p2c-gray"
              }`}
            >
              {method.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" className="float-right">
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PostPayment;
