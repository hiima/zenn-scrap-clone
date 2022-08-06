import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { toRelativeDate } from "../../lib/toRelativeDate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIconOutlined from "@mui/icons-material/Delete";
import EditIconOutlined from "@mui/icons-material/Edit";
import { DeleteCommentConfirmDialog } from "../DeleteCommentConfirmDialog";

type CommentCardProps = {
  content: string;
  postedAt: string;
};

export const CommentCard: React.FC<CommentCardProps> = ({
  content,
  postedAt,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEditClick = () => {
    setAnchorEl(null);
  };
  const handleDeleteClick = () => {
    setDialogOpen(true);
    setAnchorEl(null);
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <DeleteCommentConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />

      <Card sx={{ mt: "0.3rem" }}>
        <CardContent>
          <Stack>
            <Typography variant="subtitle2" color="gray">
              {toRelativeDate(postedAt)}
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Button
                disableRipple
                style={{
                  backgroundColor: "transparent",
                }}
                endIcon={<KeyboardArrowDownIcon sx={{ color: "gray" }} />}
                onClick={handleMenuClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem disableRipple onClick={handleEditClick}>
                  <EditIconOutlined />
                  編集
                </MenuItem>
                <MenuItem disableRipple onClick={handleDeleteClick}>
                  <DeleteIconOutlined sx={{ color: "red" }} />
                  <Typography color="red">削除</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              sx={{
                wordWrap: "break-word",
                whiteSpace: "pre-line",
                mt: "1rem",
              }}
            >
              {content}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
