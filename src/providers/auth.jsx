"use client";

import useHighbridgeStore from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthProvider = () => {
  const user = useHighbridgeStore((state) => state.user);
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user && pathname === "/login") {
      push("/");
    }
    if (!user) {
      push("/login");
    }
  }, [user, push]);
  return null;
};

export default AuthProvider;
