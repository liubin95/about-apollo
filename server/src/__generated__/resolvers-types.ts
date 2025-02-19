import { Category } from '@prisma/client';
import { Gender } from '@prisma/client';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Movie as MovieModel, Actor as ActorModel } from '@prisma/client';
import { MyContext } from '../index.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export { Category };

export { Gender };

export type Movie = {
  __typename?: 'Movie';
  actors: Array<Actor>;
  category: Category;
  id: Scalars['Int']['output'];
  releaseDate: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type MovieInput = {
  actors?: InputMaybe<Array<Scalars['Int']['input']>>;
  releaseDate: Scalars['Int']['input'];
  title: Scalars['String']['input'];
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
  filterMovies?: Maybe<Array<Movie>>;
  movie?: Maybe<Movie>;
  movies?: Maybe<Array<Movie>>;
  searchActors?: Maybe<Array<Actor>>;
  searchMovies?: Maybe<Array<Movie>>;
};


export type QueryActorArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFilterMoviesArgs = {
  category?: InputMaybe<Category>;
  releaseDate?: InputMaybe<Scalars['Int']['input']>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Actor: ResolverTypeWrapper<ActorModel>;
  ActorInput: ActorInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: Category;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Gender: Gender;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Movie: ResolverTypeWrapper<MovieModel>;
  MovieInput: MovieInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Actor: ActorModel;
  ActorInput: ActorInput;
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  Int: Scalars['Int']['output'];
  Movie: MovieModel;
  MovieInput: MovieInput;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
}>;

export type ActorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Actor'] = ResolversParentTypes['Actor']> = ResolversObject<{
  gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  movies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers = EnumResolverSignature<{ ACTION?: any, COMEDY?: any, DRAMA?: any, FANTASY?: any, HORROR?: any, MYSTERY?: any, ROMANCE?: any, THRILLER?: any }, ResolversTypes['Category']>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GenderResolvers = EnumResolverSignature<{ FEMALE?: any, MALE?: any }, ResolversTypes['Gender']>;

export type MovieResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  actors?: Resolver<Array<ResolversTypes['Actor']>, ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createActor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType, Partial<MutationCreateActorArgs>>;
  createMovie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType, Partial<MutationCreateMovieArgs>>;
  deleteActor?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeleteActorArgs, 'id'>>;
  deleteMovie?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeleteMovieArgs, 'id'>>;
  updateActor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType, RequireFields<MutationUpdateActorArgs, 'id'>>;
  updateMovie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType, RequireFields<MutationUpdateMovieArgs, 'id'>>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  actor?: Resolver<Maybe<ResolversTypes['Actor']>, ParentType, ContextType, RequireFields<QueryActorArgs, 'id'>>;
  actors?: Resolver<Array<ResolversTypes['Actor']>, ParentType, ContextType>;
  filterMovies?: Resolver<Maybe<Array<ResolversTypes['Movie']>>, ParentType, ContextType, Partial<QueryFilterMoviesArgs>>;
  movie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QueryMovieArgs, 'id'>>;
  movies?: Resolver<Maybe<Array<ResolversTypes['Movie']>>, ParentType, ContextType>;
  searchActors?: Resolver<Maybe<Array<ResolversTypes['Actor']>>, ParentType, ContextType, RequireFields<QuerySearchActorsArgs, 'name'>>;
  searchMovies?: Resolver<Maybe<Array<ResolversTypes['Movie']>>, ParentType, ContextType, RequireFields<QuerySearchMoviesArgs, 'title'>>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Actor?: ActorResolvers<ContextType>;
  Category?: CategoryResolvers;
  DateTime?: GraphQLScalarType;
  Gender?: GenderResolvers;
  Movie?: MovieResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

