import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Title } from "../components/Title";

const Top: NextPage = () => {
  const router = useRouter();

  // MARK: トップページにアクセスされたらリダイレクトさせる
  useEffect(() => {
    router.push("/scraps");
  }, [router]);

  return <Title></Title>;
};

export default Top;
