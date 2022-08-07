import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useState } from "react";
import { useCreateCommentMutation } from "../../graphql/generated";
import { uuid } from "uuidv4";

type MODE = "NEW" | "EDIT";

type PostCommentFormProps = {
  /** ミューテーション完了後に実行するコールバック処理 */
  afterMutationCompleted: () => void;
  /** NEW=新規作成モード, EDIT=編集モード(キャンセルボタンが現れる) */
  mode: MODE;
  /** キャンセルクリック時に実行するコールバック処理。 `mode=EDIT` のときのみ実行される */
  onCancel?: () => void;
  scrapId: string;
};

export const PostCommentForm: React.FC<PostCommentFormProps> = ({
  afterMutationCompleted,
  mode,
  onCancel = () => {},
  scrapId,
}) => {
  const [mutate] = useCreateCommentMutation({
    onCompleted() {
      setContent("");
      afterMutationCompleted();
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
              // NOTE: 非フォーカス時のアウトラインを削除
              border: "none",
              // NOTE: フォーカス時のアウトラインを削除
              outline: "none",
              width: "100%",
              fontSize: "15px",
              resize: "vertical",
            }}
            value={content}
            onChange={handleContentChange}
            onKeyDown={(event) => {
              if (event.metaKey && event.key === "Enter") {
                handleSubmit(event);
              }
            }}
            spellCheck={false}
          />
          <Divider></Divider>
          {/* NOTE: 右側に配置 */}
          <Box display="flex" justifyContent="flex-end">
            <Stack direction="row" gap={2}>
              {mode === "EDIT" && (
                <Button
                  color="inherit"
                  sx={{ mt: "1.5rem" }}
                  onClick={onCancel}
                >
                  キャンセル
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={!canSubmit()}
                sx={{ mt: "1.5rem" }}
              >
                {mode === "NEW" ? "投稿する" : "更新する"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
