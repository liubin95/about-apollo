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

export type MovieFilter = {
  actors?: InputMaybe<Array<Scalars['Int']['input']>>;
  category?: InputMaybe<Array<Scalars['Int']['input']>>;
  country?: InputMaybe<Array<Scalars['Int']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
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

export type NameFilter = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  actor?: Maybe<Actor>;
  actors: Array<Actor>;
  categories?: Maybe<Array<Category>>;
  countries?: Maybe<Array<Country>>;
  movie?: Maybe<Movie>;
  movies?: Maybe<Array<Movie>>;
  searchActors?: Maybe<Array<Actor>>;
  searchMovies?: Maybe<Array<Movie>>;
};


export type QueryActorArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCategoriesArgs = {
  filter?: InputMaybe<NameFilter>;
};


export type QueryCountriesArgs = {
  filter?: InputMaybe<NameFilter>;
};


export type QueryMovieArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMoviesArgs = {
  filter?: InputMaybe<MovieFilter>;
};


export type QuerySearchActorsArgs = {
  name: Scalars['String']['input'];
};


export type QuerySearchMoviesArgs = {
  title: Scalars['String']['input'];
};

export type MoviesQueryVariables = Exact<{
  filter?: InputMaybe<MovieFilter>;
}>;


export type MoviesQuery = { __typename?: 'Query', movies?: Array<{ __typename?: 'Movie', id: number, title: string, year: number, country: Array<{ __typename?: 'Country', name: string }>, category: Array<{ __typename?: 'Category', name: string }> }> | null };

export type CountriesQueryVariables = Exact<{
  country?: InputMaybe<NameFilter>;
}>;


export type CountriesQuery = { __typename?: 'Query', countries?: Array<{ __typename?: 'Country', id: number, name: string }> | null };

export type CategoriesQueryVariables = Exact<{
  category?: InputMaybe<NameFilter>;
}>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id: number, name: string }> | null };


export const MoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Movies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MovieFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MoviesQuery, MoviesQueryVariables>;
export const CountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Countries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NameFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CountriesQuery, CountriesQueryVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NameFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;