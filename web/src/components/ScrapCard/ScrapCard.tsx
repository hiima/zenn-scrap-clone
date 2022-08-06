import React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";

type ScrapCardProps = {};

export const ScrapCard: React.FC<ScrapCardProps> = () => {
  return (
    <Card sx={{ padding: "1.2rem" }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="h6" fontWeight="bold">
            リーダブルコード読書ログ
          </Typography>
          <Typography color="gray">10分前に作成</Typography>
        </Stack>
        <Stack alignItems="center">
          <ChatBubbleOutline sx={{ color: "gray" }}></ChatBubbleOutline>
          <Typography color="gray">3</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};
