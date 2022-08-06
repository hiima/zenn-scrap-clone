import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import type { NextPage } from "next";
import Error from "next/error";
import { Bar } from "../../components/Bar";
import { ScrapCard } from "../../components/ScrapCard";
import { useScrapsQuery } from "../../graphql/generated";

const Home: NextPage = () => {
  const { data, loading, error } = useScrapsQuery();

  if (error) return <Error statusCode={500} />;

  return (
    <>
      <CssBaseline />
      <Bar />
      <Container maxWidth="sm">
        <>
          {!loading &&
            data &&
            data.scraps.map((scrap) => {
              return (
                <ScrapCard
                  key={scrap.id}
                  title={scrap.title}
                  postedAt={scrap.postedAt}
                  commentCount={scrap.commentsAggregate.aggregate?.count || 0}
                ></ScrapCard>
              );
            })}
        </>
      </Container>
    </>
  );
};

export default Home;
