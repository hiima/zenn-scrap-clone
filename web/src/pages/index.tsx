import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Top: NextPage = () => {
  const router = useRouter();

  // NOTE: トップページにアクセスされたらリダイレクトさせる
  useEffect(() => {
    router.push("/scraps");
  }, [router]);

  return null;
};

export default Top;
