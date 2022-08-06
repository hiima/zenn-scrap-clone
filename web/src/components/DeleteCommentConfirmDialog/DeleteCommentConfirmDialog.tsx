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
  refetch: () => void;
};

export const DeleteCommentConfirmDialog: React.FC<
  DeleteCommentConfirmDialogProps
> = ({ commentId, open, onClose, refetch }) => {
  const [mutate] = useDeleteCommentMutation({
    onCompleted() {
      refetch();
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
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullWidth
    >
      <DialogTitle fontWeight="bold" textAlign="center">
        削除しますか？
      </DialogTitle>

      <DialogContent>
        <Typography color="gray">
          コメントを削除しようとしています。この操作は戻すことができません。
        </Typography>
        <Stack
          direction="row"
          sx={{ mt: "1rem" }}
          justifyContent="space-between"
        >
          <Button
            variant="contained"
            color="inherit"
            sx={{ width: "6.5rem" }}
            onClick={onClose}
          >
            キャンセル
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ width: "6.5rem" }}
            onClick={handleDeleteClick}
          >
            削除
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
