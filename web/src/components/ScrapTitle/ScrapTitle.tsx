import { ChangeEvent, useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
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
            sx={{ mt: "1rem", mb: "1rem", width: "16rem" }}
          />
          <IconButton
            sx={{ ml: "0.2rem" }}
            onClick={() => mutate({ variables: { id: scrapId, title } })}
            color="success"
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            sx={{ ml: "-0.5rem" }}
            onClick={() => {
              setIsEditMode(false);
              setTitle(srcTitle);
            }}
            color="error"
          >
            <CloseIcon />
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
