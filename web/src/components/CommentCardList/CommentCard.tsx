import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { toRelativeDate } from "../../lib/toRelativeDate";
import { DeleteCommentConfirmDialog } from "./DeleteCommentConfirmDialog";
import { CommentCardMenu } from "./CommentCardMenu";
import { Mode, PostCommentForm } from "../PostCommentForm";

type CommentCardProps = {
  parentScrapId: string;
  commentId: string;
  content: string;
  postedAt: string;
  /** ミューテーション完了後に実行するコールバック処理 */
  afterMutationCompleted: () => void;
};

export const CommentCard: React.FC<CommentCardProps> = ({
  parentScrapId,
  commentId,
  content,
  postedAt,
  afterMutationCompleted,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [isCommentReadOnly, setIsCommentReadOnly] = useState(true);

  return (
    <>
      <DeleteCommentConfirmDialog
        commentId={commentId}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        afterMutationCompleted={afterMutationCompleted}
      />

      <Card sx={{ mt: "0.3rem", boxShadow: 0 }}>
        <CardContent>
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="gray">
                {toRelativeDate(postedAt)}
              </Typography>

              <CommentCardMenu
                // MARK: 編集ボタンが押されたら、コメントを編集モードに切り替える
                onClickEdit={() => setIsCommentReadOnly(false)}
                onClickDelete={() => setDialogOpen(true)}
              />
            </Stack>

            {isCommentReadOnly ? (
              <Typography
                sx={{
                  wordWrap: "break-word",
                  whiteSpace: "pre-line",
                  mt: "1rem",
                }}
              >
                {content}
              </Typography>
            ) : (
              <PostCommentForm
                mode={Mode.Edit}
                afterMutationCompleted={() => {
                  // MARK: コメントの編集が終わったら、コメント欄を読み取り専用に戻す
                  setIsCommentReadOnly(true);
                  afterMutationCompleted();
                }}
                onCancel={() => setIsCommentReadOnly(true)}
                originContent={content}
                commentId={commentId}
              />
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
