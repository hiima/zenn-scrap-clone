import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Title } from "../components/Title/Title";

const Top: NextPage = () => {
  const router = useRouter();

  // NOTE: トップページにアクセスされたらリダイレクトさせる
  useEffect(() => {
    router.push("/scraps");
  }, [router]);

  return <Title></Title>;
};

export default Top;
