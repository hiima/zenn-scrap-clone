import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { Bar } from "../../components/Bar";

const New: NextPage = () => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(event?.target.value);
  };

  // NOTE: タイトルが入力されなければスクラップは作成できないようにする
  const canPost = () => title.length !== 0;

  const handleCreateClick = () => {
    // TODO: mutate
    // TODO: comments.idから求めたパスに遷移
    console.debug("hi");
  };

  return (
    <>
      <CssBaseline />
      <Bar />
      <Grid
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
          ></TextField>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleCreateClick}
            disabled={!canPost()}
          >
            スクラップを作成
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default New;
