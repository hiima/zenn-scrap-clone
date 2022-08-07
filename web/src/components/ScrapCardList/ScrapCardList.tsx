import { ScrapCard } from "./ScrapCard";

type Scrap = {
  id: string;
  title: string;
  postedAt: string;
  commentCount: number;
};

type ScrapCardListProps = {
  scraps: Scrap[];
};

export const ScrapCardList: React.FC<ScrapCardListProps> = ({ scraps }) => {
  return (
    <>
      {scraps.map((scrap) => (
        <ScrapCard
          key={scrap.id}
          id={scrap.id}
          title={scrap.title}
          postedAt={scrap.postedAt}
          commentCount={scrap.commentCount}
        ></ScrapCard>
      ))}
    </>
  );
};
