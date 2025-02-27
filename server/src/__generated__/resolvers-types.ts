import { Gender } from '@prisma/client';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Movie as MovieModel, Actor as ActorModel, Category as CategoryModel, Country as CountryModel, User as UserModel } from '@prisma/client';
import { MyContext } from '../auth.js';
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

export { Gender };

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Movie = {
  __typename?: 'Movie';
  actors: Array<Actor>;
  categories: Array<Category>;
  countries: Array<Country>;
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

export type MovieFilter = {
  actors?: InputMaybe<Array<Scalars['Int']['input']>>;
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  countries?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  login: Token;
  refreshToken: Token;
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


export type MutationLoginArgs = {
  login: LoginInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
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
  me: User;
  movie?: Maybe<Movie>;
  movies?: Maybe<Array<Movie>>;
  searchActors?: Maybe<Array<Actor>>;
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

export type Token = {
  __typename?: 'Token';
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
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
  Category: ResolverTypeWrapper<CategoryModel>;
  Country: ResolverTypeWrapper<CountryModel>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Gender: Gender;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  Movie: ResolverTypeWrapper<MovieModel>;
  MovieFilter: MovieFilter;
  MovieInput: MovieInput;
  Mutation: ResolverTypeWrapper<{}>;
  NameFilter: NameFilter;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Token: ResolverTypeWrapper<Token>;
  User: ResolverTypeWrapper<UserModel>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Actor: ActorModel;
  ActorInput: ActorInput;
  Boolean: Scalars['Boolean']['output'];
  Category: CategoryModel;
  Country: CountryModel;
  DateTime: Scalars['DateTime']['output'];
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  Movie: MovieModel;
  MovieFilter: MovieFilter;
  MovieInput: MovieInput;
  Mutation: {};
  NameFilter: NameFilter;
  Query: {};
  String: Scalars['String']['output'];
  Token: Token;
  User: UserModel;
}>;

export type ActorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Actor'] = ResolversParentTypes['Actor']> = ResolversObject<{
  gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  movies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CountryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GenderResolvers = EnumResolverSignature<{ FEMALE?: any, MALE?: any }, ResolversTypes['Gender']>;

export type MovieResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  actors?: Resolver<Array<ResolversTypes['Actor']>, ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createActor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType, Partial<MutationCreateActorArgs>>;
  createMovie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType, Partial<MutationCreateMovieArgs>>;
  deleteActor?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeleteActorArgs, 'id'>>;
  deleteMovie?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeleteMovieArgs, 'id'>>;
  login?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'login'>>;
  refreshToken?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationRefreshTokenArgs, 'refreshToken'>>;
  updateActor?: Resolver<ResolversTypes['Actor'], ParentType, ContextType, RequireFields<MutationUpdateActorArgs, 'id'>>;
  updateMovie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType, RequireFields<MutationUpdateMovieArgs, 'id'>>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  actor?: Resolver<Maybe<ResolversTypes['Actor']>, ParentType, ContextType, RequireFields<QueryActorArgs, 'id'>>;
  actors?: Resolver<Array<ResolversTypes['Actor']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<ResolversTypes['Category']>>, ParentType, ContextType, Partial<QueryCategoriesArgs>>;
  countries?: Resolver<Maybe<Array<ResolversTypes['Country']>>, ParentType, ContextType, Partial<QueryCountriesArgs>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  movie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QueryMovieArgs, 'id'>>;
  movies?: Resolver<Maybe<Array<ResolversTypes['Movie']>>, ParentType, ContextType, Partial<QueryMoviesArgs>>;
  searchActors?: Resolver<Maybe<Array<ResolversTypes['Actor']>>, ParentType, ContextType, RequireFields<QuerySearchActorsArgs, 'name'>>;
}>;

export type TokenResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Actor?: ActorResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Gender?: GenderResolvers;
  Movie?: MovieResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

