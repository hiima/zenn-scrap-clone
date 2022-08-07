import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { toRelativeDate } from "../../lib/toRelativeDate";
import { DeleteCommentConfirmDialog } from "../DeleteCommentConfirmDialog";
import { CommentCardMenu } from "./CommentCardMenu";

type CommentCardProps = {
  commentId: string;
  content: string;
  postedAt: string;
  /** ミューテーション完了後に実行するコールバック処理 */
  afterMutationCompleted: () => void;
};

export const CommentCard: React.FC<CommentCardProps> = ({
  commentId,
  content,
  postedAt,
  afterMutationCompleted,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <DeleteCommentConfirmDialog
        commentId={commentId}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        afterMutationCompleted={afterMutationCompleted}
      />

      <Card sx={{ mt: "0.3rem" }}>
        <CardContent>
          <Stack>
            <Typography variant="subtitle2" color="gray">
              {toRelativeDate(postedAt)}
            </Typography>

            <CommentCardMenu onClickDelete={() => setDialogOpen(true)} />

            <Typography
              sx={{
                wordWrap: "break-word",
                whiteSpace: "pre-line",
                mt: "1rem",
              }}
            >
              {content}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
