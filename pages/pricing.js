import React from "react";
import Stripe from "stripe";
import CTAButton from "../components/ctaButton";

const Pricing = ({ plans }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-1 py-2">
      {plans.map((plan) => {
        return (
          <div
            key={plan.id}
            className="p-8 h-40 mb-4 w-1/4 rounded shadow text-xl flex flex-row items-center"
          >
            <div>
              <h2 className="mb-2 text-2xl font-bold">{plan.name}</h2>
              <p className="text-slate-400">
                ${plan.price / 100}
                <span> {plan.currency}</span>
              </p>
              <p className="italic">per {plan.interval}</p>
            </div>
            <CTAButton plan={plan} />
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  const { data: prices } = await stripe.prices.list();

  const plans = await Promise.all(
    prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product);
      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        interval: price.recurring.interval,
        currency: price.currency,
      };
    })
  );
  const sortedPlans = plans.sort((a, b) => a.price - b.price);
  return {
    props: {
      plans: sortedPlans,
    },
  };
};

export default Pricing;
