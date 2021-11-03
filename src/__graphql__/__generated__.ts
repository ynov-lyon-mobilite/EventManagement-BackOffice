export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  CursorID: any;
  Date: any;
};

export type Cursor = {
  current?: Maybe<Scalars['CursorID']>;
  take: Scalars['Int'];
  total: Scalars['Int'];
};

export type Event = {
  category: EventCategory;
  description?: Maybe<Scalars['String']>;
  endDate: Scalars['Date'];
  participants: UserConnection;
  price: Scalars['Float'];
  startDate: Scalars['Date'];
  title: Scalars['String'];
};


export type EventParticipantsArgs = {
  currentPage?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['CursorID']>;
  take?: Maybe<Scalars['Int']>;
  targetPage?: Maybe<Scalars['Int']>;
};

export type EventCategory = {
  name: Scalars['String'];
  uuid: Scalars['String'];
};

export type EventConnection = {
  cursor: Cursor;
  edges: Array<EventNode>;
  pageInfo: PageInfo;
};

export type EventNode = {
  cursor: Scalars['CursorID'];
  node: Event;
};

export type Mutation = {
  createEvent: Event;
  deleteEvent: Event;
  deleteUser: User;
  /**
   * Pay to join the event
   * @deprecated Not implemented yet
   */
  joinEvent: Event;
  login: UserAuth;
  register: UserAuth;
  updateEvent: Event;
  updateUser: User;
};


export type MutationCreateEventArgs = {
  categoriesUuid: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  price?: Maybe<Scalars['Float']>;
  startDate: Scalars['Date'];
  title: Scalars['String'];
};


export type MutationDeleteEventArgs = {
  uuid: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  uuid: Scalars['String'];
};


export type MutationJoinEventArgs = {
  uuid: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateEventArgs = {
  categoriesUuid?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  price?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  displayName: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Role>>;
  username?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type PageInfo = {
  currentPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  totalPages: Scalars['Int'];
};

export type Query = {
  event: Event;
  eventCategories: Array<EventCategory>;
  eventParticipants: UserConnection;
  events: EventConnection;
  isAlive: Scalars['Boolean'];
  ping: Scalars['String'];
  user?: Maybe<User>;
  /** Get connected user informations */
  user_infos: User;
  users: UserConnection;
};


export type QueryEventArgs = {
  uuid: Scalars['String'];
};


export type QueryEventParticipantsArgs = {
  currentPage?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['CursorID']>;
  eventUuid: Scalars['String'];
  take?: Maybe<Scalars['Int']>;
  targetPage?: Maybe<Scalars['Int']>;
};


export type QueryEventsArgs = {
  currentPage?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['CursorID']>;
  take?: Maybe<Scalars['Int']>;
  targetPage?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  currentPage?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['CursorID']>;
  take?: Maybe<Scalars['Int']>;
  targetPage?: Maybe<Scalars['Int']>;
};

export enum Role {
  Admin = 'ADMIN',
  Dev = 'DEV'
}

export type Success = {
  success: Scalars['Boolean'];
};

export type User = {
  displayName: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  joinedEvents: Array<Event>;
  roles: Array<Role>;
  username?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type UserAuth = {
  jwt: Scalars['String'];
  user: User;
};

export type UserConnection = {
  cursor: Cursor;
  edges: Array<UserNode>;
  pageInfo: PageInfo;
};

export type UserNode = {
  cursor: Scalars['CursorID'];
  node: User;
};

export type FetchCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCurrentUserQuery = { user_infos: { displayName: string, email?: string | null | undefined, username?: string | null | undefined } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { loggedUser: { jwt: string, user: { displayName: string, email?: string | null | undefined, roles: Array<Role>, username?: string | null | undefined, uuid: string, joinedEvents: Array<{ title: string }> } } };
