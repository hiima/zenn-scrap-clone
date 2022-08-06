import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import { Bar } from "../../../components/Bar";
import { useCommentsQuery } from "../../../graphql/generated";

const Scrap: NextPage = () => {
  const router = useRouter();
  const scrapId = router.query.scrapId as string;

  const { data, loading, error } = useCommentsQuery({ variables: { scrapId } });

  if (error) return <Error statusCode={500} />;

  return (
    <>
      <CssBaseline />
      <Bar />
      <Container maxWidth="md">
        <>
          {!loading &&
            data &&
            data.comments.map((comment) => {
              return (
                <>
                  <p>{comment.id}</p>
                  <p>{comment.content}</p>
                  <p>{comment.postedAt}</p>
                  <p>===</p>
                </>
              );
            })}
        </>
      </Container>
    </>
  );
};

export default Scrap;
