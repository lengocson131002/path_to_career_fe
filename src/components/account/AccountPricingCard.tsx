import { Badge, Button, Card } from "antd";
import React, { CSSProperties, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { CheckOutlined } from "@ant-design/icons";

export type Pricing = {
  title?: string;
  description?: string;
  price?: number;
  perks: string[];
  selected?: boolean;
};

type Props = {
  pricing: Pricing;
  count: number;
};

function AccountPricingCard({ pricing, count }: Props) {
  const [basis, setBasis] = useState<CSSProperties>({
    flexBasis: `${(1 / count ?? 1) * 100}%`,
  });

  useEffect(() => {
    setBasis({
      flexBasis: `${(1 / count ?? 1) * 100}%`,
    });

    return () => {
      setBasis({});
    };
  }, [count]);

  return (
    <Badge.Ribbon
      text="Mua nhiều nhất"
      className={`${pricing.selected ? "" : "!hidden"}`}
    >
      <Card
        style={basis}
        className={`rounded-3xl ${
          pricing.selected ? "border-2 border-primary" : ""
        } hover:border-primary transition-colors`}
      >
        {pricing.title && (
          <div
            className={`card__pricing--title font-semibold text-xl mb-3 ${
              pricing.selected ? "text-primary" : ""
            }`}
          >
            {pricing.title}
          </div>
        )}
        {pricing.description && (
          <div className="card__pricing--description mb-3 font-medium">
            {pricing.description}
          </div>
        )}
        <div className="card__pricing--subscription">
          <span className="subscription--price font-bold text-4xl">
            {pricing.price}đ
          </span>
          {/* FORMAT */}
          <span className="subscription--measure font-medium text-xl">
            {" "}
            /tháng
          </span>
        </div>
        <div className="card__pricing--action my-6">
          <Button
            type={`${pricing.selected ? "primary" : "default"}`}
            className="w-full font-semibold text-lg p-0 rounded-md h-[40px]"
          >
            <span className="py-3 !-mt-1">Nâng cấp</span>
          </Button>
        </div>
        <div className="card__pricing--perks font-medium">
          {pricing.perks.map((perk) => {
            return (
              <div key={perk} className="flex gap-3 mb-4">
                <div className="text-primary">
                  <CheckOutlined />
                </div>
                <div className="flex-grow">{perk}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </Badge.Ribbon>
  );
}

export default AccountPricingCard;
