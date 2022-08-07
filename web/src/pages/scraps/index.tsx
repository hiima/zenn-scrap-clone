import Container from "@mui/material/Container";
import type { NextPage } from "next";
import Error from "next/error";
import { ScrapCardList } from "../../components/ScrapCardList";
import { Title } from "../../components/Title";
import { useScrapsQuery } from "../../graphql/generated";

const Home: NextPage = () => {
  const { data, loading, error } = useScrapsQuery();

  if (error) return <Error statusCode={500} />;

  const scraps =
    data?.scraps.map((scrap) => ({
      id: scrap.id,
      title: scrap.title,
      postedAt: scrap.postedAt,
      commentCount: scrap.commentsAggregate.aggregate?.count || 0,
    })) || [];

  return (
    <>
      <Title text="スクラップ一覧"></Title>
      <Container maxWidth="md">
        <>{!loading && <ScrapCardList scraps={scraps} />}</>
      </Container>
    </>
  );
};

export default Home;
