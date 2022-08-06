import Head from "next/head";

export type TitleProps = {
  text?: string;
};

export const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <Head>
      <title>{text ? `${text} | Skrap` : "Skrap"}</title>
    </Head>
  );
};
