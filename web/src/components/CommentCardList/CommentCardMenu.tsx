import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIconOutlined from "@mui/icons-material/Delete";
import EditIconOutlined from "@mui/icons-material/Edit";

type CommentCardMenuProps = {
  /** 編集ボタンクリック時に実行するコールバック */
  onClickEdit: () => void;
  /** 削除ボタンクリック時に実行するコールバック */
  onClickDelete: () => void;
};

export const CommentCardMenu: React.FC<CommentCardMenuProps> = ({
  onClickEdit,
  onClickDelete,
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
    onClickEdit();
    setAnchorEl(null);
  };
  const handleDeleteClick = () => {
    onClickDelete();
    setAnchorEl(null);
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button
        disableRipple
        style={{
          backgroundColor: "transparent",
        }}
        endIcon={<KeyboardArrowDownIcon sx={{ color: "gray" }} />}
        onClick={handleMenuClick}
        sx={{
          boxShadow: 0,
          ":hover": {
            boxShadow: 0,
          },
        }}
      />
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
        {/* MARK: 編集メニューアイテム */}
        <MenuItem disableRipple onClick={handleEditClick}>
          <EditIconOutlined />
          編集
        </MenuItem>

        {/* MARK: 削除メニューアイテム */}
        <MenuItem disableRipple onClick={handleDeleteClick}>
          <DeleteIconOutlined sx={{ color: "red" }} />
          <Typography color="red">削除</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
