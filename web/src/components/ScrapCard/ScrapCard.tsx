import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
    <Card sx={{ mt: "0.3rem" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography variant="subtitle1" fontWeight="bold">
              {title}
            </Typography>
            <Typography variant="subtitle2" color="gray">
              {postedAt}
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <ChatBubbleOutline sx={{ color: "gray" }}></ChatBubbleOutline>
            <Typography variant="subtitle2" color="gray">
              {commentCount}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
