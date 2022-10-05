import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(supabase.auth.user());

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();
      if (sessionUser) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", sessionUser.id)
          .single();

        setUser({
          ...sessionUser,
          ...profile,
        });
      }
    };
    getUserProfile();
    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const login = async () => {
    await supabase.auth.signIn({ provider: "github" });
  };

  return (
    <UserContext.Provider value={{ user, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
