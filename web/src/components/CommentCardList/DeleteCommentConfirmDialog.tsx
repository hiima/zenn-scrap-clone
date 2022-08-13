import { forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import type { TransitionProps } from "@mui/material/transitions";
import { useDeleteCommentMutation } from "../../graphql/generated";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type DeleteCommentConfirmDialogProps = {
  commentId: string;
  open: boolean;
  onClose: () => void;
  /** ミューテーション完了後に実行するコールバック処理 */
  afterMutationCompleted: () => void;
};

export const DeleteCommentConfirmDialog: React.FC<
  DeleteCommentConfirmDialogProps
> = ({ commentId, open, onClose, afterMutationCompleted }) => {
  const [mutate] = useDeleteCommentMutation({
    onCompleted() {
      afterMutationCompleted();
      onClose();
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleDeleteClick = () => {
    mutate({ variables: { id: commentId } });
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogTitle fontWeight="bold" textAlign="center">
        削除しますか？
      </DialogTitle>

      <DialogContent>
        <Typography color="inherit" variant="body1" textAlign="center">
          コメントを削除しようとしています。
        </Typography>
        <Typography color="inherit" variant="body1" textAlign="center">
          この操作は戻すことができません。
        </Typography>
        <Stack
          direction="row"
          sx={{ mt: "1rem" }}
          justifyContent="space-between"
        >
          <Button
            variant="contained"
            sx={{
              width: "6.5rem",
              boxShadow: 0,
              backgroundColor: "silver",
              ":hover": {
                backgroundColor: "darkgray",
                boxShadow: 0,
              },
            }}
            onClick={onClose}
          >
            キャンセル
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              width: "6.5rem",
              boxShadow: 0,
              ":hover": {
                boxShadow: 0,
              },
            }}
            onClick={handleDeleteClick}
          >
            削除
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
