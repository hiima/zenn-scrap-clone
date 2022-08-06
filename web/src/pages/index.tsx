import type { NextPage } from "next";
import Error from "next/error";
import { useScrapsQuery } from "../graphql/generated";

const Home: NextPage = () => {
  const { data, loading, error } = useScrapsQuery();

  if (error) return <Error statusCode={500} />;

  return <>{!loading && data && <p>{JSON.stringify(data, null, 4)}</p>}</>;
};

export default Home;
