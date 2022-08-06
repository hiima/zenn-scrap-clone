import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { ChangeEvent, useState } from "react";
import { useCreateCommentMutation } from "../../graphql/generated";
import { uuid } from "uuidv4";

type PostCommentFormProps = {
  refetch: () => void;
  scrapId: string;
};

export const PostCommentForm: React.FC<PostCommentFormProps> = ({
  refetch,
  scrapId,
}) => {
  const [mutate] = useCreateCommentMutation({
    onCompleted() {
      setContent("");
      refetch();
    },
    onError() {
      console.error();
    },
  });
  const [content, setContent] = useState("");

  const handleContentChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent(event?.target.value);
  };

  // NOTE: コメントが入力されなければスクラップは作成できないようにする
  const canSubmit = () => content.length !== 0;

  const handleSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();

    mutate({
      variables: {
        input: {
          id: uuid(),
          content,
          scrapId,
        },
      },
    });
  };

  return (
    // NOTE: 入力欄の高さに応じて伸びるようにしている
    <Card sx={{ height: "auto", mt: "1rem" }}>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextareaAutosize
            minRows={6}
            maxRows={16}
            placeholder="スクラップにコメントを追加"
            style={{
              width: "100%",
              // NOTE: 非フォーカス時のアウトラインを削除
              border: "none",
              // NOTE: フォーカス時のアウトラインを削除
              outline: "none",
              fontSize: "15px",
            }}
            value={content}
            onChange={handleContentChange}
            onKeyDown={(event) => {
              if (event.metaKey && event.key === "Enter") {
                handleSubmit(event);
              }
            }}
          />
          <Divider></Divider>
          {/* NOTE: 右側に配置 */}
          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              disabled={!canSubmit()}
              sx={{ mt: "1.5rem" }}
            >
              投稿する
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
