import React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";

type ScrapCardProps = {
  title: string;
  postedAt: string;
  commentCount: number;
};

export const ScrapCard: React.FC<ScrapCardProps> = ({
  title,
  postedAt,
  commentCount,
}) => {
  return (
    <Card sx={{ mt: "0.3rem", padding: "1.2rem" }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography color="gray">{postedAt}</Typography>
        </Stack>
        <Stack alignItems="center">
          <ChatBubbleOutline sx={{ color: "gray" }}></ChatBubbleOutline>
          <Typography color="gray">{commentCount}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};
