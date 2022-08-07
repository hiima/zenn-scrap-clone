import { CommentCard } from "./CommentCard";

type Comment = {
  id: string;
  content: string;
  postedAt: string;
};

type CommentCardListProps = {
  comments: Comment[];
  /** ミューテーション完了後に実行するコールバック処理 */
  afterCommentMutationCompleted: () => void;
};

export const CommentCardList: React.FC<CommentCardListProps> = ({
  comments,
  afterCommentMutationCompleted,
}) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          commentId={comment.id}
          content={comment.content}
          postedAt={comment.postedAt}
          afterMutationCompleted={afterCommentMutationCompleted}
        ></CommentCard>
      ))}
    </>
  );
};
