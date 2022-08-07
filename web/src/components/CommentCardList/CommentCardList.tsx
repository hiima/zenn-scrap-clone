import { CommentCard } from "./CommentCard";

type Comment = {
  id: string;
  content: string;
  postedAt: string;
};

type CommentCardListProps = {
  comments: Comment[];
  /** コメントの親スクラップID */
  parentScrapId: string;
  /** ミューテーション完了後に実行するコールバック処理 */
  afterCommentMutationCompleted: () => void;
};

export const CommentCardList: React.FC<CommentCardListProps> = ({
  comments,
  parentScrapId,
  afterCommentMutationCompleted,
}) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          parentScrapId={parentScrapId}
          commentId={comment.id}
          content={comment.content}
          postedAt={comment.postedAt}
          afterMutationCompleted={afterCommentMutationCompleted}
        ></CommentCard>
      ))}
    </>
  );
};
