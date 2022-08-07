import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { ChangeEvent, useState } from "react";
import {
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from "../../graphql/generated";
import { uuid } from "uuidv4";

type MODE = "NEW" | "EDIT";

type PostCommentFormProps = {
  /** ミューテーション完了後に実行するコールバック処理 */
  afterMutationCompleted: () => void;
  /** NEW=新規モード, EDIT=編集モード(キャンセルボタンが現れる) */
  mode: MODE;
  // TODO: これは必須じゃないはずなので確認してOptionalにする。編集モードでは使わないから
  /** 新規モード時に使用する。新規作成するコメントを紐付ける対象となる親スクラップID */
  parentScrapId: string;
  /** 編集モード時に使用する。キャンセルクリック時に実行するコールバック処理 */
  onCancel?: () => void;
  /** 編集モード時に使用する。編集ボタンを押す前の元のコメント。キャンセルを押したら、元のコメントが復元される */
  originContent?: string;
  /** 編集モード時に使用する。更新対象のコメントID */
  commentId?: string;
};

// FIXME: 片方のモードのみに必要なパラメータがOptionalで居心地が悪い。関数宣言化してオーバーロードが使えないか？
export const PostCommentForm: React.FC<PostCommentFormProps> = ({
  afterMutationCompleted,
  mode,
  parentScrapId,
  onCancel = () => {},
  originContent = "",
  commentId = "",
}) => {
  const [mutateCreate] = useCreateCommentMutation({
    onCompleted() {
      setContent("");
      afterMutationCompleted();
    },
    onError() {
      console.error();
    },
  });
  const [mutateUpdate] = useUpdateCommentMutation({
    onCompleted() {
      setContent("");
      afterMutationCompleted();
    },
    onError() {
      console.error();
    },
  });

  const [content, setContent] = useState(originContent);

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

    if (mode === "NEW") {
      mutateCreate({
        variables: {
          input: {
            id: uuid(),
            content,
            scrapId: parentScrapId,
          },
        },
      });
    } else {
      mutateUpdate({
        variables: {
          id: commentId,
          content,
        },
      });
    }
  };

  return (
    // NOTE: 入力行数に応じて下に伸びるようにしている
    <Card sx={{ height: "auto", mt: "1rem" }}>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextareaAutosize
            // FIXME: 編集モードの場合は、初期値として元のcontentを設定しなければならない
            value={content}
            onChange={handleContentChange}
            onKeyDown={(event) => {
              if (event.metaKey && event.key === "Enter") {
                handleSubmit(event);
              }
            }}
            placeholder="スクラップにコメントを追加"
            minRows={6}
            maxRows={16}
            style={{
              // NOTE: 非フォーカス時のアウトラインを削除
              border: "none",
              // NOTE: フォーカス時のアウトラインを削除
              outline: "none",
              width: "100%",
              fontSize: "15px",
              resize: "vertical",
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
