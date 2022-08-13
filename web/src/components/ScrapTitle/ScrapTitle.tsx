import Typography from "@mui/material/Typography";

type ScrapTitleProps = {
  title: string;
};

export const ScrapTitle: React.FC<ScrapTitleProps> = ({ title }) => {
  return (
    <Typography variant="h5" fontWeight="bold" sx={{ mt: "1rem", mb: "1rem" }}>
      {title}
    </Typography>
  );
};
