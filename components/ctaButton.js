import { useUser } from "../context/user";
import axios from "axios";

const CTAButton = ({ plan }) => {
  const { user, login } = useUser();
  const processSubscription = async (planId) => {
    const { data } = await axios.get(`/api/subscription/${planId}`);
    console.log("ctaButon line 8", data);
  };

  if (!!user && !user.is_subscribed) {
    return (
      <button
        onClick={() => processSubscription(plan.id)}
        className="bg-amber-600 text-white w-1/2 ml-auto rounded"
      >
        Subscribe
      </button>
    );
  } else if (!user) {
    return (
      <button
        onClick={login}
        className="bg-amber-600 text-white w-1/2 ml-auto rounded"
      >
        Create Account
      </button>
    );
  } else {
    return (
      <button className="bg-amber-600 text-white w-1/2 ml-auto rounded">
        Manage Subscription
      </button>
    );
  }
};

export default CTAButton;
