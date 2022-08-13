import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { uuid } from "uuidv4";
import { Title } from "../../components/Title";
import { useCreateScrapMutation } from "../../graphql/generated";

const New: NextPage = () => {
  const router = useRouter();
  const [mutate, { loading }] = useCreateScrapMutation({
    onCompleted({ insertScrapsOne }) {
      // NOTE: 通常起こり得ないケース
      if (!insertScrapsOne) {
        console.error("scrap was created but not returned scrap id");
        return;
      }

      router.push(`/scraps/${insertScrapsOne.id}`);
    },
    onError(error) {
      console.error(error);
    },
  });

  const [title, setTitle] = useState("");

  const handleTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(event?.target.value);
  };

  // NOTE: タイトルが入力されなければスクラップは作成できないようにする
  const canSubmit = () => title.length !== 0 && !loading;

  const handleSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    mutate({
      variables: {
        input: {
          title,
          id: uuid(),
        },
      },
    });
  };

  return (
    <>
      <Title text="新しいスクラップの作成"></Title>
      <Grid
        component="form"
        onSubmit={handleSubmit}
        container
        spacing={5}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: "2rem" }}
      >
        <Grid item>
          <Typography variant="h4" fontWeight="bold">
            New scrap
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="gray">
            スクラップはスレッド形式で気軽に知見をまとめられる場所です。
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder="タイトル"
            value={title}
            sx={{ width: "30rem" }}
            onChange={handleTitleChange}
            onKeyDown={(event) => {
              if (event.metaKey && event.key === "Enter") {
                handleSubmit(event);
              }
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            disabled={!canSubmit()}
            sx={{
              boxShadow: 0,
              ":hover": {
                boxShadow: 0,
              },
            }}
          >
            スクラップを作成
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default New;
