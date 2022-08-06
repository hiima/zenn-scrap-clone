import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import type { NextPage } from "next";
import Error from "next/error";
import { Bar } from "../components/Bar";
import { useScrapsQuery } from "../graphql/generated";

const Home: NextPage = () => {
  const { data, loading, error } = useScrapsQuery();

  if (error) return <Error statusCode={500} />;

  return (
    <>
      <CssBaseline />
      <Bar />
      <Container maxWidth="sm">
        <>{!loading && data && <a>{JSON.stringify(data, null, 4)}</a>}</>
      </Container>
    </>
  );
};

export default Home;
