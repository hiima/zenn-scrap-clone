import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import { Bar } from "../../../components/Bar";
import { PostCommentForm } from "../../../components/PostCommentForm";
import { Title } from "../../../components/Title/Title";
import { useScrapQuery } from "../../../graphql/generated";

const Scrap: NextPage = () => {
  const router = useRouter();
  const scrapId = router.query.scrapId as string;

  // FIXME: ページ表示時に2回リクエストされてしまう
  const { data, loading, error, refetch } = useScrapQuery({
    variables: { scrapId },
  });

  if (error) return <Error statusCode={500} />;

  return (
    <>
      <Title text={data?.scrapsByPk?.title}></Title>
      <CssBaseline />
      <Bar />
      <Container maxWidth="md">
        {!loading && data && (
          <>
            <Typography variant="body2" color="gray">
              {`投稿日時: ${data.scrapsByPk?.postedAt}`}
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: "1rem" }}>
              {data.scrapsByPk?.title}
            </Typography>
            {/* TODO： コメントがない場合のみ表示する */}
            <Typography
              variant="body1"
              fontWeight="bold"
              color="gray"
              sx={{ mt: "1rem" }}
            >
              最初のコメントを追加しましょう。
            </Typography>
            <PostCommentForm scrapId={scrapId} refetch={refetch} />
          </>
        )}
      </Container>
    </>
  );
};

export default Scrap;
