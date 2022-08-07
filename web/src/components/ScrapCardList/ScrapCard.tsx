import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import { toRelativeDate } from "../../lib/toRelativeDate";

type ScrapCardProps = {
  id: string;
  title: string;
  postedAt: string;
  commentCount: number;
};

export const ScrapCard: React.FC<ScrapCardProps> = ({
  id,
  title,
  postedAt,
  commentCount,
}) => {
  return (
    <Card sx={{ mt: "0.3rem" }}>
      <CardActionArea href={`/scraps/${id}`}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography variant="subtitle1" fontWeight="bold">
                {title}
              </Typography>
              <Typography variant="subtitle2" color="gray">
                {`${toRelativeDate(postedAt)}に作成`}
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
      </CardActionArea>
    </Card>
  );
};
