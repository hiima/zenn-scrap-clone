import { ChangeEvent, useState } from "react";
import { IconButton, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useEditScrapTitleMutation } from "../../graphql/generated";

type ScrapTitleProps = {
  scrapId: string;
  srcTitle: string;
};

export const ScrapTitle: React.FC<ScrapTitleProps> = ({
  scrapId,
  srcTitle,
}) => {
  const [title, setTitle] = useState(srcTitle);
  const [isEditMode, setIsEditMode] = useState(false);

  const [mutate] = useEditScrapTitleMutation({
    onCompleted() {
      setIsEditMode(false);
    },
    onError(error) {
      setTitle(srcTitle);
      console.error(error);
    },
  });

  const handleTitleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(event?.target.value);
  };

  return (
    <Stack direction="row" alignItems="center">
      {isEditMode ? (
        <>
          <TextField
            value={title}
            variant="standard"
            onChange={handleTitleChange}
          />
          <IconButton onClick={() => setIsEditMode(false)}>
            <CloseIcon />
          </IconButton>
          <IconButton
            onClick={() => mutate({ variables: { id: scrapId, title } })}
          >
            <SaveIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mt: "1rem", mb: "1rem" }}
          >
            {title}
          </Typography>
          <IconButton onClick={() => setIsEditMode(true)}>
            <ModeEditOutlineIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );
};
