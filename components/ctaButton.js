import { useUser } from "../context/user";

const CTAButton = () => {
  const { user, login } = useUser();
  if (!!user && !user.is_subscribed) {
    return (
      <button className="bg-amber-600 text-white w-1/2 ml-auto rounded">
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
