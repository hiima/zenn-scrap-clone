import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Bar } from "../../../components/Bar";

const Scrap: NextPage = () => {
  const router = useRouter();
  const { scrapId } = router.query;

  return (
    <>
      <CssBaseline />
      <Bar />
      <Container maxWidth="md">
        <p>{scrapId}</p>
      </Container>
    </>
  );
};

export default Scrap;
