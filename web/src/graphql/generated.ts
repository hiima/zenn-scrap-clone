import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: string;
  uuid: string;
};

/** コメント */
export type Comments = {
  __typename?: "Comments";
  content: Scalars["String"];
  id: Scalars["uuid"];
  postedAt: Scalars["timestamptz"];
  /** An object relationship */
  scrap: Scraps;
  scrapId: Scalars["uuid"];
};

/** aggregated selection of "comments" */
export type CommentsAggregate = {
  __typename?: "CommentsAggregate";
  aggregate?: Maybe<CommentsAggregateFields>;
  nodes: Array<Comments>;
};

/** aggregate fields of "comments" */
export type CommentsAggregateFields = {
  __typename?: "CommentsAggregateFields";
  count: Scalars["Int"];
  max?: Maybe<CommentsMaxFields>;
  min?: Maybe<CommentsMinFields>;
};

/** aggregate fields of "comments" */
export type CommentsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CommentsSelectColumn>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "comments" */
export type CommentsAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CommentsMaxOrderBy>;
  min?: InputMaybe<CommentsMinOrderBy>;
};

/** input type for inserting array relation for remote table "comments" */
export type CommentsArrRelInsertInput = {
  data: Array<CommentsInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<CommentsOnConflict>;
};

/** Boolean expression to filter rows from the table "comments". All fields are combined with a logical 'AND'. */
export type CommentsBoolExp = {
  _and?: InputMaybe<Array<CommentsBoolExp>>;
  _not?: InputMaybe<CommentsBoolExp>;
  _or?: InputMaybe<Array<CommentsBoolExp>>;
  content?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  postedAt?: InputMaybe<TimestamptzComparisonExp>;
  scrap?: InputMaybe<ScrapsBoolExp>;
  scrapId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "comments" */
export enum CommentsConstraint {
  /** unique or primary key constraint on columns "id" */
  CommentsPkey = "comments_pkey",
}

/** input type for inserting data into table "comments" */
export type CommentsInsertInput = {
  content?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  scrap?: InputMaybe<ScrapsObjRelInsertInput>;
  scrapId?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type CommentsMaxFields = {
  __typename?: "CommentsMaxFields";
  content?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  postedAt?: Maybe<Scalars["timestamptz"]>;
  scrapId?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "comments" */
export type CommentsMaxOrderBy = {
  content?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  postedAt?: InputMaybe<OrderBy>;
  scrapId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CommentsMinFields = {
  __typename?: "CommentsMinFields";
  content?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  postedAt?: Maybe<Scalars["timestamptz"]>;
  scrapId?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "comments" */
export type CommentsMinOrderBy = {
  content?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  postedAt?: InputMaybe<OrderBy>;
  scrapId?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "comments" */
export type CommentsMutationResponse = {
  __typename?: "CommentsMutationResponse";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Comments>;
};

/** on_conflict condition type for table "comments" */
export type CommentsOnConflict = {
  constraint: CommentsConstraint;
  update_columns?: Array<CommentsUpdateColumn>;
  where?: InputMaybe<CommentsBoolExp>;
};

/** Ordering options when selecting data from "comments". */
export type CommentsOrderBy = {
  content?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  postedAt?: InputMaybe<OrderBy>;
  scrap?: InputMaybe<ScrapsOrderBy>;
  scrapId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: comments */
export type CommentsPkColumnsInput = {
  id: Scalars["uuid"];
};

/** select columns of table "comments" */
export enum CommentsSelectColumn {
  /** column name */
  Content = "content",
  /** column name */
  Id = "id",
  /** column name */
  PostedAt = "postedAt",
  /** column name */
  ScrapId = "scrapId",
}

/** input type for updating data in table "comments" */
export type CommentsSetInput = {
  content?: InputMaybe<Scalars["String"]>;
};

/** update columns of table "comments" */
export enum CommentsUpdateColumn {
  /** column name */
  Content = "content",
}

export type CommentsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CommentsSetInput>;
  where: CommentsBoolExp;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = "ASC",
  /** in ascending order, nulls first */
  AscNullsFirst = "ASC_NULLS_FIRST",
  /** in ascending order, nulls last */
  AscNullsLast = "ASC_NULLS_LAST",
  /** in descending order, nulls first */
  Desc = "DESC",
  /** in descending order, nulls first */
  DescNullsFirst = "DESC_NULLS_FIRST",
  /** in descending order, nulls last */
  DescNullsLast = "DESC_NULLS_LAST",
}

/** スクラップ */
export type Scraps = {
  __typename?: "Scraps";
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregate relationship */
  commentsAggregate: CommentsAggregate;
  id: Scalars["uuid"];
  postedAt: Scalars["timestamptz"];
  title: Scalars["String"];
};

/** スクラップ */
export type ScrapsCommentsArgs = {
  distinctOn?: InputMaybe<Array<CommentsSelectColumn>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<CommentsOrderBy>>;
  where?: InputMaybe<CommentsBoolExp>;
};

/** スクラップ */
export type ScrapsCommentsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CommentsSelectColumn>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<CommentsOrderBy>>;
  where?: InputMaybe<CommentsBoolExp>;
};

/** Boolean expression to filter rows from the table "scraps". All fields are combined with a logical 'AND'. */
export type ScrapsBoolExp = {
  _and?: InputMaybe<Array<ScrapsBoolExp>>;
  _not?: InputMaybe<ScrapsBoolExp>;
  _or?: InputMaybe<Array<ScrapsBoolExp>>;
  comments?: InputMaybe<CommentsBoolExp>;
  id?: InputMaybe<UuidComparisonExp>;
  postedAt?: InputMaybe<TimestamptzComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "scraps" */
export enum ScrapsConstraint {
  /** unique or primary key constraint on columns "id" */
  ScrapsPkey = "scraps_pkey",
}

/** input type for inserting data into table "scraps" */
export type ScrapsInsertInput = {
  comments?: InputMaybe<CommentsArrRelInsertInput>;
  id?: InputMaybe<Scalars["uuid"]>;
  title?: InputMaybe<Scalars["String"]>;
};

/** response of any mutation on the table "scraps" */
export type ScrapsMutationResponse = {
  __typename?: "ScrapsMutationResponse";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Scraps>;
};

/** input type for inserting object relation for remote table "scraps" */
export type ScrapsObjRelInsertInput = {
  data: ScrapsInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<ScrapsOnConflict>;
};

/** on_conflict condition type for table "scraps" */
export type ScrapsOnConflict = {
  constraint: ScrapsConstraint;
  update_columns?: Array<ScrapsUpdateColumn>;
  where?: InputMaybe<ScrapsBoolExp>;
};

/** Ordering options when selecting data from "scraps". */
export type ScrapsOrderBy = {
  commentsAggregate?: InputMaybe<CommentsAggregateOrderBy>;
  id?: InputMaybe<OrderBy>;
  postedAt?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: scraps */
export type ScrapsPkColumnsInput = {
  id: Scalars["uuid"];
};

/** select columns of table "scraps" */
export enum ScrapsSelectColumn {
  /** column name */
  Id = "id",
  /** column name */
  PostedAt = "postedAt",
  /** column name */
  Title = "title",
}

/** input type for updating data in table "scraps" */
export type ScrapsSetInput = {
  title?: InputMaybe<Scalars["String"]>;
};

/** update columns of table "scraps" */
export enum ScrapsUpdateColumn {
  /** column name */
  Title = "title",
}

export type ScrapsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ScrapsSetInput>;
  where: ScrapsBoolExp;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars["String"]>;
  _gt?: InputMaybe<Scalars["String"]>;
  _gte?: InputMaybe<Scalars["String"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars["String"]>;
  _in?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars["String"]>;
  _isNull?: InputMaybe<Scalars["Boolean"]>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars["String"]>;
  _lt?: InputMaybe<Scalars["String"]>;
  _lte?: InputMaybe<Scalars["String"]>;
  _neq?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars["String"]>;
  _nin?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars["String"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars["String"]>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars["String"]>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars["timestamptz"]>;
  _gt?: InputMaybe<Scalars["timestamptz"]>;
  _gte?: InputMaybe<Scalars["timestamptz"]>;
  _in?: InputMaybe<Array<Scalars["timestamptz"]>>;
  _isNull?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["timestamptz"]>;
  _lte?: InputMaybe<Scalars["timestamptz"]>;
  _neq?: InputMaybe<Scalars["timestamptz"]>;
  _nin?: InputMaybe<Array<Scalars["timestamptz"]>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars["uuid"]>;
  _gt?: InputMaybe<Scalars["uuid"]>;
  _gte?: InputMaybe<Scalars["uuid"]>;
  _in?: InputMaybe<Array<Scalars["uuid"]>>;
  _isNull?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["uuid"]>;
  _lte?: InputMaybe<Scalars["uuid"]>;
  _neq?: InputMaybe<Scalars["uuid"]>;
  _nin?: InputMaybe<Array<Scalars["uuid"]>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root";
  /** delete data from the table: "comments" */
  deleteComments?: Maybe<CommentsMutationResponse>;
  /** delete single row from the table: "comments" */
  deleteCommentsByPk?: Maybe<Comments>;
  /** delete data from the table: "scraps" */
  deleteScraps?: Maybe<ScrapsMutationResponse>;
  /** delete single row from the table: "scraps" */
  deleteScrapsByPk?: Maybe<Scraps>;
  /** insert data into the table: "comments" */
  insertComments?: Maybe<CommentsMutationResponse>;
  /** insert a single row into the table: "comments" */
  insertCommentsOne?: Maybe<Comments>;
  /** insert data into the table: "scraps" */
  insertScraps?: Maybe<ScrapsMutationResponse>;
  /** insert a single row into the table: "scraps" */
  insertScrapsOne?: Maybe<Scraps>;
  /** update data of the table: "comments" */
  updateComments?: Maybe<CommentsMutationResponse>;
  /** update single row of the table: "comments" */
  updateCommentsByPk?: Maybe<Comments>;
  /** update multiples rows of table: "comments" */
  updateCommentsMany?: Maybe<Array<Maybe<CommentsMutationResponse>>>;
  /** update data of the table: "scraps" */
  updateScraps?: Maybe<ScrapsMutationResponse>;
  /** update single row of the table: "scraps" */
  updateScrapsByPk?: Maybe<Scraps>;
  /** update multiples rows of table: "scraps" */
  updateScrapsMany?: Maybe<Array<Maybe<ScrapsMutationResponse>>>;
};

/** mutation root */
export type Mutation_RootDeleteCommentsArgs = {
  where: CommentsBoolExp;
};

/** mutation root */
export type Mutation_RootDeleteCommentsByPkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDeleteScrapsArgs = {
  where: ScrapsBoolExp;
};

/** mutation root */
export type Mutation_RootDeleteScrapsByPkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootInsertCommentsArgs = {
  objects: Array<CommentsInsertInput>;
  onConflict?: InputMaybe<CommentsOnConflict>;
};

/** mutation root */
export type Mutation_RootInsertCommentsOneArgs = {
  object: CommentsInsertInput;
  onConflict?: InputMaybe<CommentsOnConflict>;
};

/** mutation root */
export type Mutation_RootInsertScrapsArgs = {
  objects: Array<ScrapsInsertInput>;
  onConflict?: InputMaybe<ScrapsOnConflict>;
};

/** mutation root */
export type Mutation_RootInsertScrapsOneArgs = {
  object: ScrapsInsertInput;
  onConflict?: InputMaybe<ScrapsOnConflict>;
};

/** mutation root */
export type Mutation_RootUpdateCommentsArgs = {
  _set?: InputMaybe<CommentsSetInput>;
  where: CommentsBoolExp;
};

/** mutation root */
export type Mutation_RootUpdateCommentsByPkArgs = {
  _set?: InputMaybe<CommentsSetInput>;
  pk_columns: CommentsPkColumnsInput;
};

/** mutation root */
export type Mutation_RootUpdateCommentsManyArgs = {
  updates: Array<CommentsUpdates>;
};

/** mutation root */
export type Mutation_RootUpdateScrapsArgs = {
  _set?: InputMaybe<ScrapsSetInput>;
  where: ScrapsBoolExp;
};

/** mutation root */
export type Mutation_RootUpdateScrapsByPkArgs = {
  _set?: InputMaybe<ScrapsSetInput>;
  pk_columns: ScrapsPkColumnsInput;
};

/** mutation root */
export type Mutation_RootUpdateScrapsManyArgs = {
  updates: Array<ScrapsUpdates>;
};

export type Query_Root = {
  __typename?: "query_root";
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregate relationship */
  commentsAggregate: CommentsAggregate;
  /** fetch data from the table: "comments" using primary key columns */
  commentsByPk?: Maybe<Comments>;
  /** fetch data from the table: "scraps" */
  scraps: Array<Scraps>;
  /** fetch data from the table: "scraps" using primary key columns */
  scrapsByPk?: Maybe<Scraps>;
};

export type Query_RootCommentsArgs = {
  distinctOn?: InputMaybe<Array<CommentsSelectColumn>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<CommentsOrderBy>>;
  where?: InputMaybe<CommentsBoolExp>;
};

export type Query_RootCommentsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CommentsSelectColumn>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<CommentsOrderBy>>;
  where?: InputMaybe<CommentsBoolExp>;
};

export type Query_RootCommentsByPkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootScrapsArgs = {
  distinctOn?: InputMaybe<Array<ScrapsSelectColumn>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ScrapsOrderBy>>;
  where?: InputMaybe<ScrapsBoolExp>;
};

export type Query_RootScrapsByPkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_Root = {
  __typename?: "subscription_root";
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregate relationship */
  commentsAggregate: CommentsAggregate;
  /** fetch data from the table: "comments" using primary key columns */
  commentsByPk?: Maybe<Comments>;
  /** fetch data from the table: "scraps" */
  scraps: Array<Scraps>;
  /** fetch data from the table: "scraps" using primary key columns */
  scrapsByPk?: Maybe<Scraps>;
};

export type Subscription_RootCommentsArgs = {
  distinctOn?: InputMaybe<Array<CommentsSelectColumn>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<CommentsOrderBy>>;
  where?: InputMaybe<CommentsBoolExp>;
};

export type Subscription_RootCommentsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CommentsSelectColumn>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<CommentsOrderBy>>;
  where?: InputMaybe<CommentsBoolExp>;
};

export type Subscription_RootCommentsByPkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootScrapsArgs = {
  distinctOn?: InputMaybe<Array<ScrapsSelectColumn>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ScrapsOrderBy>>;
  where?: InputMaybe<ScrapsBoolExp>;
};

export type Subscription_RootScrapsByPkArgs = {
  id: Scalars["uuid"];
};

export type CreateCommentMutationVariables = Exact<{
  input: CommentsInsertInput;
}>;

export type CreateCommentMutation = {
  __typename?: "mutation_root";
  insertCommentsOne?: { __typename?: "Comments"; id: string } | null;
};

export type CreateScrapMutationVariables = Exact<{
  input: ScrapsInsertInput;
}>;

export type CreateScrapMutation = {
  __typename?: "mutation_root";
  insertScrapsOne?: { __typename?: "Scraps"; id: string } | null;
};

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars["uuid"];
}>;

export type DeleteCommentMutation = {
  __typename?: "mutation_root";
  deleteCommentsByPk?: { __typename?: "Comments"; id: string } | null;
};

export type DeleteScrapMutationVariables = Exact<{
  id: Scalars["uuid"];
}>;

export type DeleteScrapMutation = {
  __typename?: "mutation_root";
  deleteScrapsByPk?: { __typename?: "Scraps"; id: string } | null;
};

export type EditScrapTitleMutationVariables = Exact<{
  id: Scalars["uuid"];
  title: Scalars["String"];
}>;

export type EditScrapTitleMutation = {
  __typename?: "mutation_root";
  updateScrapsByPk?: { __typename?: "Scraps"; id: string } | null;
};

export type ScrapQueryVariables = Exact<{
  scrapId: Scalars["uuid"];
}>;

export type ScrapQuery = {
  __typename?: "query_root";
  scrapsByPk?: {
    __typename?: "Scraps";
    id: string;
    title: string;
    postedAt: string;
    comments: Array<{
      __typename?: "Comments";
      id: string;
      content: string;
      postedAt: string;
    }>;
  } | null;
};

export type ScrapsQueryVariables = Exact<{ [key: string]: never }>;

export type ScrapsQuery = {
  __typename?: "query_root";
  scraps: Array<{
    __typename?: "Scraps";
    id: string;
    postedAt: string;
    title: string;
    commentsAggregate: {
      __typename?: "CommentsAggregate";
      aggregate?: {
        __typename?: "CommentsAggregateFields";
        count: number;
      } | null;
    };
  }>;
};

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars["uuid"];
  content: Scalars["String"];
}>;

export type UpdateCommentMutation = {
  __typename?: "mutation_root";
  updateCommentsByPk?: { __typename?: "Comments"; id: string } | null;
};

export const CreateCommentDocument = gql`
  mutation CreateComment($input: CommentsInsertInput!) {
    insertCommentsOne(object: $input) {
      id
    }
  }
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument, options);
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>;
export type CreateCommentMutationResult =
  Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const CreateScrapDocument = gql`
  mutation CreateScrap($input: ScrapsInsertInput!) {
    insertScrapsOne(object: $input) {
      id
    }
  }
`;
export type CreateScrapMutationFn = Apollo.MutationFunction<
  CreateScrapMutation,
  CreateScrapMutationVariables
>;

/**
 * __useCreateScrapMutation__
 *
 * To run a mutation, you first call `useCreateScrapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScrapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScrapMutation, { data, loading, error }] = useCreateScrapMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateScrapMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateScrapMutation,
    CreateScrapMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateScrapMutation, CreateScrapMutationVariables>(
    CreateScrapDocument,
    options
  );
}
export type CreateScrapMutationHookResult = ReturnType<
  typeof useCreateScrapMutation
>;
export type CreateScrapMutationResult =
  Apollo.MutationResult<CreateScrapMutation>;
export type CreateScrapMutationOptions = Apollo.BaseMutationOptions<
  CreateScrapMutation,
  CreateScrapMutationVariables
>;
export const DeleteCommentDocument = gql`
  mutation DeleteComment($id: uuid!) {
    deleteCommentsByPk(id: $id) {
      id
    }
  }
`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >(DeleteCommentDocument, options);
}
export type DeleteCommentMutationHookResult = ReturnType<
  typeof useDeleteCommentMutation
>;
export type DeleteCommentMutationResult =
  Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;
export const DeleteScrapDocument = gql`
  mutation DeleteScrap($id: uuid!) {
    deleteScrapsByPk(id: $id) {
      id
    }
  }
`;
export type DeleteScrapMutationFn = Apollo.MutationFunction<
  DeleteScrapMutation,
  DeleteScrapMutationVariables
>;

/**
 * __useDeleteScrapMutation__
 *
 * To run a mutation, you first call `useDeleteScrapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteScrapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteScrapMutation, { data, loading, error }] = useDeleteScrapMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteScrapMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteScrapMutation,
    DeleteScrapMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteScrapMutation, DeleteScrapMutationVariables>(
    DeleteScrapDocument,
    options
  );
}
export type DeleteScrapMutationHookResult = ReturnType<
  typeof useDeleteScrapMutation
>;
export type DeleteScrapMutationResult =
  Apollo.MutationResult<DeleteScrapMutation>;
export type DeleteScrapMutationOptions = Apollo.BaseMutationOptions<
  DeleteScrapMutation,
  DeleteScrapMutationVariables
>;
export const EditScrapTitleDocument = gql`
  mutation EditScrapTitle($id: uuid!, $title: String!) {
    updateScrapsByPk(pk_columns: { id: $id }, _set: { title: $title }) {
      id
    }
  }
`;
export type EditScrapTitleMutationFn = Apollo.MutationFunction<
  EditScrapTitleMutation,
  EditScrapTitleMutationVariables
>;

/**
 * __useEditScrapTitleMutation__
 *
 * To run a mutation, you first call `useEditScrapTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditScrapTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editScrapTitleMutation, { data, loading, error }] = useEditScrapTitleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useEditScrapTitleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditScrapTitleMutation,
    EditScrapTitleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    EditScrapTitleMutation,
    EditScrapTitleMutationVariables
  >(EditScrapTitleDocument, options);
}
export type EditScrapTitleMutationHookResult = ReturnType<
  typeof useEditScrapTitleMutation
>;
export type EditScrapTitleMutationResult =
  Apollo.MutationResult<EditScrapTitleMutation>;
export type EditScrapTitleMutationOptions = Apollo.BaseMutationOptions<
  EditScrapTitleMutation,
  EditScrapTitleMutationVariables
>;
export const ScrapDocument = gql`
  query Scrap($scrapId: uuid!) {
    scrapsByPk(id: $scrapId) {
      id
      title
      postedAt
      comments(orderBy: { postedAt: ASC }) {
        id
        content
        postedAt
      }
    }
  }
`;

/**
 * __useScrapQuery__
 *
 * To run a query within a React component, call `useScrapQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapQuery({
 *   variables: {
 *      scrapId: // value for 'scrapId'
 *   },
 * });
 */
export function useScrapQuery(
  baseOptions: Apollo.QueryHookOptions<ScrapQuery, ScrapQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ScrapQuery, ScrapQueryVariables>(
    ScrapDocument,
    options
  );
}
export function useScrapLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ScrapQuery, ScrapQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ScrapQuery, ScrapQueryVariables>(
    ScrapDocument,
    options
  );
}
export type ScrapQueryHookResult = ReturnType<typeof useScrapQuery>;
export type ScrapLazyQueryHookResult = ReturnType<typeof useScrapLazyQuery>;
export type ScrapQueryResult = Apollo.QueryResult<
  ScrapQuery,
  ScrapQueryVariables
>;
export const ScrapsDocument = gql`
  query Scraps {
    scraps(orderBy: { postedAt: DESC }) {
      id
      postedAt
      title
      commentsAggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

/**
 * __useScrapsQuery__
 *
 * To run a query within a React component, call `useScrapsQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapsQuery({
 *   variables: {
 *   },
 * });
 */
export function useScrapsQuery(
  baseOptions?: Apollo.QueryHookOptions<ScrapsQuery, ScrapsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ScrapsQuery, ScrapsQueryVariables>(
    ScrapsDocument,
    options
  );
}
export function useScrapsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ScrapsQuery, ScrapsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ScrapsQuery, ScrapsQueryVariables>(
    ScrapsDocument,
    options
  );
}
export type ScrapsQueryHookResult = ReturnType<typeof useScrapsQuery>;
export type ScrapsLazyQueryHookResult = ReturnType<typeof useScrapsLazyQuery>;
export type ScrapsQueryResult = Apollo.QueryResult<
  ScrapsQuery,
  ScrapsQueryVariables
>;
export const UpdateCommentDocument = gql`
  mutation UpdateComment($id: uuid!, $content: String!) {
    updateCommentsByPk(pk_columns: { id: $id }, _set: { content: $content }) {
      id
    }
  }
`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >(UpdateCommentDocument, options);
}
export type UpdateCommentMutationHookResult = ReturnType<
  typeof useUpdateCommentMutation
>;
export type UpdateCommentMutationResult =
  Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>;
