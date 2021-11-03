export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Event = {
  category: EventCategory;
  description?: Maybe<Scalars["String"]>;
  endDate: Scalars["Date"];
  participants: Array<User>;
  price: Scalars["Float"];
  startDate: Scalars["Date"];
  title: Scalars["String"];
};

export type EventCategory = {
  name: Scalars["String"];
  uuid: Scalars["String"];
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
  login: User;
  logout: Success;
  register: User;
  updateEvent: Event;
  updateUser: User;
};

export type MutationCreateEventArgs = {
  categoriesUuid: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  endDate?: Maybe<Scalars["Date"]>;
  price?: Maybe<Scalars["Float"]>;
  startDate: Scalars["Date"];
  title: Scalars["String"];
};

export type MutationDeleteEventArgs = {
  uuid: Scalars["String"];
};

export type MutationDeleteUserArgs = {
  uuid: Scalars["String"];
};

export type MutationJoinEventArgs = {
  uuid: Scalars["String"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationRegisterArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationUpdateEventArgs = {
  categoriesUuid?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  endDate?: Maybe<Scalars["Date"]>;
  price?: Maybe<Scalars["Float"]>;
  startDate?: Maybe<Scalars["Date"]>;
  title?: Maybe<Scalars["String"]>;
  uuid: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  displayName: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  roles?: Maybe<Array<Role>>;
  username?: Maybe<Scalars["String"]>;
  uuid: Scalars["String"];
};

export type Query = {
  event: Event;
  eventCategories: Array<EventCategory>;
  events: Array<Event>;
  isAlive: Scalars["Boolean"];
  ping: Scalars["String"];
  user?: Maybe<User>;
  /** Get connected user informations */
  user_infos: User;
  users: Array<User>;
};

export type QueryEventArgs = {
  uuid: Scalars["String"];
};

export type QueryUserArgs = {
  id: Scalars["String"];
};

export type QueryUsersArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  search?: Maybe<Scalars["String"]>;
};

export enum Role {
  Admin = "ADMIN",
  Dev = "DEV",
}

export type Success = {
  success: Scalars["Boolean"];
};

export type User = {
  displayName: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  joinedEvents: Array<Event>;
  roles: Array<Role>;
  username?: Maybe<Scalars["String"]>;
  uuid: Scalars["String"];
};

export type FetchCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type FetchCurrentUserQuery = {
  user_infos: {
    displayName: string;
    email?: string | null | undefined;
    username?: string | null | undefined;
  };
};
