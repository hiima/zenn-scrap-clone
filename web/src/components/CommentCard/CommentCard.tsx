import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { toRelativeDate } from "../../lib/toRelativeDate";

type CommentCardProps = {
  content: string;
  postedAt: string;
};

export const CommentCard: React.FC<CommentCardProps> = ({
  content,
  postedAt,
}) => {
  return (
    <Card sx={{ mt: "0.3rem" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography>
              {/* NOTE: 改行コードがあればそこで改行するようにしている */}
              <pre style={{ fontFamily: "inherit" }}>{content}</pre>
            </Typography>
            <Typography variant="subtitle2" color="gray">
              {toRelativeDate(postedAt)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
