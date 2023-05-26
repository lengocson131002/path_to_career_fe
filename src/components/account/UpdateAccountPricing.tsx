import React from "react";
import AccountPricingCard, { Pricing } from "./AccountPricingCard";

type Props = {};

const pricings: Pricing[] = [
  {
    title: "Startup",
    price: 30000,
    perks: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
  },
  {
    title: "Startup",

    price: 30000,
    perks: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
    selected: true,
  },
  {
    title: "Startup",
    price: 30000,
    perks: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
  },
];

function UpdateAccountPricing({}: Props) {
  return (
    <div className="flex justify-between gap-6">
      {pricings.map((pricing, index) => (
        <AccountPricingCard
          key={`pricing-${index}`}
          pricing={pricing}
          count={pricings.length}
        />
      ))}
    </div>
  );
}

export default UpdateAccountPricing;
