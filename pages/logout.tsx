import React, { useEffect } from "react";
import { useUser } from "../context/user";

const Logout = () => {
  const { logout }: any = useUser();
  useEffect(() => {
    logout();
  }, []);
  return <div>Logout</div>;
};

export default Logout;
