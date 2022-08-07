import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { ChangeEvent, useState } from "react";
import {
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from "../../graphql/generated";
import { uuid } from "uuidv4";

export enum Mode {
  New,
  Edit,
}

type NewModeProps = {
  mode: Mode.New;
  /** 新規作成するコメントを紐付ける対象となる親スクラップID */
  parentScrapId: string;
};

type EditModeProps = {
  mode: Mode.Edit;
  /** キャンセルクリック時に実行するコールバック処理 */
  onCancel: () => void;
  /** 編集ボタンを押す前の元のコメント。キャンセルを押したら、元のコメントが復元される */
  originContent: string;
  /** 更新対象のコメントID */
  commentId: string;
};

type PostCommentFormProps = {
  /** ミューテーション完了後に実行するコールバック処理 */
  afterMutationCompleted: () => void;
} & (NewModeProps | EditModeProps);

export const PostCommentForm: React.FC<PostCommentFormProps> = (props) => {
  const [mutateCreate, { loading: loadingCreate }] = useCreateCommentMutation({
    onCompleted() {
      setContent("");
      props.afterMutationCompleted();
    },
    onError() {
      console.error();
    },
  });
  const [mutateUpdate, { loading: loadingUpdate }] = useUpdateCommentMutation({
    onCompleted() {
      setContent("");
      props.afterMutationCompleted();
    },
    onError() {
      console.error();
    },
  });

  const [content, setContent] = useState(
    props.mode === Mode.New ? "" : props.originContent
  );

  const handleContentChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent(event?.target.value);
  };

  // NOTE: コメントが入力されなければスクラップは作成できないようにする
  const canSubmit = () =>
    content.length !== 0 && !loadingCreate && !loadingUpdate;

  const handleSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();

    if (props.mode === Mode.New) {
      mutateCreate({
        variables: {
          input: {
            id: uuid(),
            content,
            scrapId: props.parentScrapId,
          },
        },
      });
    } else {
      mutateUpdate({
        variables: {
          id: props.commentId,
          content,
        },
      });
    }
  };

  return (
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
          {props.mode === Mode.Edit && (
            <Button
              color="inherit"
              sx={{ mt: "1.5rem" }}
              onClick={props.onCancel}
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
            {props.mode === Mode.New ? "投稿する" : "更新する"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
