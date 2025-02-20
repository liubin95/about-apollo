/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Actor = {
  __typename?: 'Actor';
  gender: Gender;
  id: Scalars['Int']['output'];
  movies: Array<Movie>;
  name: Scalars['String']['output'];
};

export type ActorInput = {
  gender: Gender;
  movies?: InputMaybe<Array<Scalars['Int']['input']>>;
  name: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type Movie = {
  __typename?: 'Movie';
  actors: Array<Actor>;
  category: Array<Category>;
  country: Array<Country>;
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

export type MovieInput = {
  actors?: InputMaybe<Array<Scalars['Int']['input']>>;
  title: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createActor: Actor;
  createMovie: Movie;
  deleteActor: Scalars['Int']['output'];
  deleteMovie: Scalars['Int']['output'];
  updateActor: Actor;
  updateMovie: Movie;
};


export type MutationCreateActorArgs = {
  input?: InputMaybe<ActorInput>;
};


export type MutationCreateMovieArgs = {
  input?: InputMaybe<MovieInput>;
};


export type MutationDeleteActorArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMovieArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateActorArgs = {
  id: Scalars['Int']['input'];
  input?: InputMaybe<ActorInput>;
};


export type MutationUpdateMovieArgs = {
  id: Scalars['Int']['input'];
  input?: InputMaybe<MovieInput>;
};

export type Query = {
  __typename?: 'Query';
  actor?: Maybe<Actor>;
  actors: Array<Actor>;
  movie?: Maybe<Movie>;
  movies?: Maybe<Array<Movie>>;
  searchActors?: Maybe<Array<Actor>>;
  searchMovies?: Maybe<Array<Movie>>;
};


export type QueryActorArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMovieArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySearchActorsArgs = {
  name: Scalars['String']['input'];
};


export type QuerySearchMoviesArgs = {
  title: Scalars['String']['input'];
};

export type MoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type MoviesQuery = { __typename?: 'Query', movies?: Array<{ __typename?: 'Movie', title: string, year: number, category: Array<{ __typename?: 'Category', name: string }>, country: Array<{ __typename?: 'Country', name: string }> }> | null };


export const MoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Movies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MoviesQuery, MoviesQueryVariables>;