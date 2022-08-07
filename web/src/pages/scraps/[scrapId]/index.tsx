import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import { Bar } from "../../../components/Bar";
import { CommentCardList } from "../../../components/CommentCardList";
import { PostCommentForm } from "../../../components/PostCommentForm";
import { Title } from "../../../components/Title/Title";
import { useScrapQuery } from "../../../graphql/generated";
import { toRelativeDate } from "../../../lib/toRelativeDate";

const Scrap: NextPage = () => {
  const router = useRouter();
  const scrapId = router.query.scrapId as string;

  // FIXME: ページ表示時に2回リクエストされてしまう
  const { data, loading, error, refetch } = useScrapQuery({
    variables: { scrapId },
  });

  if (error) return <Error statusCode={500} />;

  const comments = data?.scrapsByPk?.comments || [];

  return (
    <>
      <Title text={data?.scrapsByPk?.title}></Title>
      <CssBaseline />
      <Bar />
      <Container maxWidth="md">
        {!loading && data && (
          <>
            <Stack direction="row" alignItems="center">
              <Typography variant="body2" color="gray">
                {`${
                  data.scrapsByPk?.postedAt
                    ? toRelativeDate(data.scrapsByPk?.postedAt) + "に作成"
                    : ""
                }`}
              </Typography>
              <ChatBubbleOutline
                sx={{
                  mt: "0.1rem",
                  ml: "1rem",
                  color: "gray",
                  width: "1rem",
                  height: "1rem",
                }}
              ></ChatBubbleOutline>
              <Typography variant="body2" color="gray" sx={{ ml: "0.1rem" }}>
                {data.scrapsByPk?.comments.length}
              </Typography>
            </Stack>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: "1rem" }}>
              {data.scrapsByPk?.title}
            </Typography>

            {comments.length > 0 ? (
              <CommentCardList
                comments={comments}
                afterCommentMutationCompleted={refetch}
              />
            ) : (
              // NOTE コメントがない場合のみ表示する
              <Typography
                variant="body1"
                fontWeight="bold"
                color="gray"
                sx={{ mt: "1rem" }}
              >
                最初のコメントを追加しましょう。
              </Typography>
            )}

            <PostCommentForm
              scrapId={scrapId}
              afterMutationCompleted={refetch}
              mode="NEW"
            />
          </>
        )}
      </Container>
    </>
  );
};

export default Scrap;
