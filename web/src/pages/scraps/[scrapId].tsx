import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import { CommentCardList } from "../../components/CommentCardList";
import { PostCommentForm, Mode } from "../../components/PostCommentForm";
import { Title } from "../../components/Title";
import { useDeleteScrapMutation, useScrapQuery } from "../../graphql/generated";
import { toRelativeDate } from "../../lib/toRelativeDate";
import { Progress } from "../../components/Progress";
import { ScrapTitle } from "../../components/ScrapTitle";

const Scrap: NextPage = () => {
  const router = useRouter();
  const scrapId = router.query.scrapId as string;

  const [mutate, { loading: deleteLoading }] = useDeleteScrapMutation({
    onCompleted() {
      router.push("/scraps");
    },
    onError(error) {
      console.error(error);
    },
  });

  // FIXME: ページ表示時に2回リクエストされてしまう
  const { data, loading, error, refetch } = useScrapQuery({
    variables: { scrapId },
  });

  if (error) return <Error statusCode={500} />;

  if (loading || !data) return <Progress />;

  const comments = data?.scrapsByPk?.comments || [];

  return (
    <>
      <Title text={data?.scrapsByPk?.title}></Title>
      <Container maxWidth="md">
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

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ScrapTitle
            scrapId={scrapId}
            srcTitle={data.scrapsByPk?.title || ""}
          />

          <Button
            variant="contained"
            color="error"
            sx={{
              boxShadow: 0,
              ":hover": {
                boxShadow: 0,
              },
            }}
            onClick={() => mutate({ variables: { id: scrapId } })}
            // FIXME: 削除完了後、loadingじゃなくなった時点でenabledになってしまう
            disabled={deleteLoading}
          >
            スクラップを削除する
          </Button>
        </Stack>

        {data.scrapsByPk && comments.length > 0 ? (
          <CommentCardList
            comments={comments}
            parentScrapId={scrapId}
            afterCommentMutationCompleted={refetch}
          />
        ) : (
          // MARK: コメントがない場合のみ表示する
          <Typography variant="body1" fontWeight="bold" color="gray">
            最初のコメントを追加しましょう。
          </Typography>
        )}

        <Card sx={{ mt: "2rem", boxShadow: 0 }}>
          <CardContent>
            <PostCommentForm
              mode={Mode.New}
              afterMutationCompleted={refetch}
              parentScrapId={scrapId}
            />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Scrap;
