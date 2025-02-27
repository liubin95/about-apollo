/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    mutation refreshToken($refreshToken: String!) {\n      refreshToken(refreshToken: $refreshToken) {\n        refreshToken\n        token\n      }\n    }\n  ": typeof types.RefreshTokenDocument,
    "\n    mutation Login($form: LoginInput!) {\n      login(login: $form) {\n        token\n        refreshToken\n      }\n    }\n  ": typeof types.LoginDocument,
    "\n  query Movies($filter: MovieFilter) {\n    movies(filter: $filter) {\n      id\n      title\n      year\n      country {\n        name\n      }\n      category {\n        name\n      }\n    }\n  }\n": typeof types.MoviesDocument,
    "\n  query Countries($country: NameFilter) {\n    countries(filter: $country) {\n      id\n      name\n    }\n  }\n": typeof types.CountriesDocument,
    "\n  query Categories($category: NameFilter) {\n    categories(filter: $category) {\n      id\n      name\n    }\n  }\n": typeof types.CategoriesDocument,
};
const documents: Documents = {
    "\n    mutation refreshToken($refreshToken: String!) {\n      refreshToken(refreshToken: $refreshToken) {\n        refreshToken\n        token\n      }\n    }\n  ": types.RefreshTokenDocument,
    "\n    mutation Login($form: LoginInput!) {\n      login(login: $form) {\n        token\n        refreshToken\n      }\n    }\n  ": types.LoginDocument,
    "\n  query Movies($filter: MovieFilter) {\n    movies(filter: $filter) {\n      id\n      title\n      year\n      country {\n        name\n      }\n      category {\n        name\n      }\n    }\n  }\n": types.MoviesDocument,
    "\n  query Countries($country: NameFilter) {\n    countries(filter: $country) {\n      id\n      name\n    }\n  }\n": types.CountriesDocument,
    "\n  query Categories($category: NameFilter) {\n    categories(filter: $category) {\n      id\n      name\n    }\n  }\n": types.CategoriesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation refreshToken($refreshToken: String!) {\n      refreshToken(refreshToken: $refreshToken) {\n        refreshToken\n        token\n      }\n    }\n  "): (typeof documents)["\n    mutation refreshToken($refreshToken: String!) {\n      refreshToken(refreshToken: $refreshToken) {\n        refreshToken\n        token\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Login($form: LoginInput!) {\n      login(login: $form) {\n        token\n        refreshToken\n      }\n    }\n  "): (typeof documents)["\n    mutation Login($form: LoginInput!) {\n      login(login: $form) {\n        token\n        refreshToken\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Movies($filter: MovieFilter) {\n    movies(filter: $filter) {\n      id\n      title\n      year\n      country {\n        name\n      }\n      category {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Movies($filter: MovieFilter) {\n    movies(filter: $filter) {\n      id\n      title\n      year\n      country {\n        name\n      }\n      category {\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Countries($country: NameFilter) {\n    countries(filter: $country) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query Countries($country: NameFilter) {\n    countries(filter: $country) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Categories($category: NameFilter) {\n    categories(filter: $category) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query Categories($category: NameFilter) {\n    categories(filter: $category) {\n      id\n      name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;