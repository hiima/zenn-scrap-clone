import CircularProgress from "@mui/material/CircularProgress";

export const Progress: React.FC = () => {
  return (
    <div
      style={{
        marginTop: "3rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};
