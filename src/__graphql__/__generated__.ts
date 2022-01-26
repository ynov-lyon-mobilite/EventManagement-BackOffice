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

export type Booking = {
  event: Event;
  price?: Maybe<Scalars['Float']>;
  refunded: Scalars['Boolean'];
  refundedAt?: Maybe<Scalars['Date']>;
  user: User;
  uuid: Scalars['String'];
};

export type Cursor = {
  current?: Maybe<Scalars['CursorID']>;
  take: Scalars['Int'];
  total: Scalars['Int'];
};

export type Event = {
  category: EventCategory;
  deletedAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  nbPlaces: Scalars['Int'];
  participants: UserConnection;
  participantsCount: Scalars['Int'];
  prices: Array<Price>;
  restPlaces: Scalars['Int'];
  startDate: Scalars['Date'];
  title: Scalars['String'];
  uuid: Scalars['String'];
};


export type EventParticipantsArgs = {
  cursor?: Maybe<Scalars['CursorID']>;
  page?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type EventCategory = {
  isActive: Scalars['Boolean'];
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
  createBooking: Booking;
  createEvent: Event;
  createEventCategory: EventCategory;
  createPrice: Price;
  deleteEvent: Event;
  deleteEventCategories: Array<EventCategory>;
  deleteEventCategory: EventCategory;
  deletePrice: Price;
  deleteUser: User;
  /** Pay to join the event */
  joinEvent: Scalars['String'];
  login: UserAuth;
  register: UserAuth;
  restoreEventCategory: EventCategory;
  testSub: Scalars['Boolean'];
  updateEvent: Event;
  updateEventCategory: EventCategory;
  updateUser: User;
};


export type MutationCreateBookingArgs = {
  eventPriceUuid: Scalars['String'];
};


export type MutationCreateEventArgs = {
  categoryUuid: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  nbPlaces?: Maybe<Scalars['Int']>;
  startDate: Scalars['Date'];
  title: Scalars['String'];
};


export type MutationCreateEventCategoryArgs = {
  name: Scalars['String'];
};


export type MutationCreatePriceArgs = {
  amount: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  eventUuid: Scalars['String'];
};


export type MutationDeleteEventArgs = {
  uuid: Scalars['String'];
};


export type MutationDeleteEventCategoriesArgs = {
  uuids: Array<Scalars['String']>;
};


export type MutationDeleteEventCategoryArgs = {
  uuid: Scalars['String'];
};


export type MutationDeletePriceArgs = {
  uuid: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  uuid: Scalars['String'];
};


export type MutationJoinEventArgs = {
  cancelUrl: Scalars['String'];
  eventUuid: Scalars['String'];
  priceUuid: Scalars['String'];
  successUrl: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRestoreEventCategoryArgs = {
  uuid: Scalars['String'];
};


export type MutationUpdateEventArgs = {
  categoryUuid?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  nbPlaces?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
};


export type MutationUpdateEventCategoryArgs = {
  name: Scalars['String'];
  uuid: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Role>>;
  uuid: Scalars['String'];
};

export type PageInfo = {
  currentPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  totalPages: Scalars['Int'];
};

export type Price = {
  amount: Scalars['Float'];
  description: Scalars['String'];
  uuid: Scalars['String'];
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
  cursor?: Maybe<Scalars['CursorID']>;
  eventUuid: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryEventsArgs = {
  cursor?: Maybe<Scalars['CursorID']>;
  deleted?: Maybe<Scalars['Boolean']>;
  includePastEvents?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  cursor?: Maybe<Scalars['CursorID']>;
  page?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export enum Role {
  Admin = 'ADMIN'
}

export type Subscription = {
  eventCreated: User;
  newEvent: Event;
};

export type Success = {
  success: Scalars['Boolean'];
};

export type User = {
  bookings: Array<Booking>;
  displayName: Scalars['String'];
  email: Scalars['String'];
  joinedEvents: Array<Event>;
  roles: Array<Role>;
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

export type FetchCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCategoriesQuery = { eventCategories: Array<{ isActive: boolean, name: string, uuid: string }> };

export type CreateNewCategoryMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateNewCategoryMutation = { category: { uuid: string, name: string, isActive: boolean } };

export type DeleteCategoriesMutationVariables = Exact<{
  uuids: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteCategoriesMutation = { deleteEventCategories: Array<{ uuid: string }> };

export type RestoreCategoryMutationVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type RestoreCategoryMutation = { restoreEventCategory: { uuid: string } };

export type FetchEventsQueryVariables = Exact<{
  currentPage?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type FetchEventsQuery = { events: { edges: Array<{ node: { description?: string | null | undefined, endDate?: any | null | undefined, deletedAt?: any | null | undefined, nbPlaces: number, participantsCount: number, startDate: any, title: string, uuid: string, category: { name: string, uuid: string }, prices: Array<{ amount: number, uuid: string, description: string }> } }> } };

export type CreateNewEventMutationVariables = Exact<{
  categoryUuid: Scalars['String'];
  title: Scalars['String'];
  startDate: Scalars['Date'];
  endDate?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  nbPlaces?: Maybe<Scalars['Int']>;
}>;


export type CreateNewEventMutation = { event: { description?: string | null | undefined, endDate?: any | null | undefined, deletedAt?: any | null | undefined, nbPlaces: number, participantsCount: number, startDate: any, title: string, uuid: string, category: { name: string, uuid: string }, prices: Array<{ amount: number, uuid: string, description: string }> } };

export type UpdateEventMutationVariables = Exact<{
  categoryUuid: Scalars['String'];
  title: Scalars['String'];
  startDate: Scalars['Date'];
  uuid: Scalars['String'];
  endDate?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  nbPlaces?: Maybe<Scalars['Int']>;
}>;


export type UpdateEventMutation = { event: { description?: string | null | undefined, endDate?: any | null | undefined, deletedAt?: any | null | undefined, nbPlaces: number, participantsCount: number, startDate: any, title: string, uuid: string, category: { name: string, uuid: string }, prices: Array<{ amount: number, uuid: string, description: string }> } };

export type DeleteEventMutationVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type DeleteEventMutation = { event: { description?: string | null | undefined, endDate?: any | null | undefined, deletedAt?: any | null | undefined, nbPlaces: number, participantsCount: number, startDate: any, title: string, uuid: string, category: { name: string, uuid: string }, prices: Array<{ amount: number, uuid: string, description: string }> } };

export type CreateNewPriceMutationVariables = Exact<{
  amount: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  eventUuid: Scalars['String'];
}>;


export type CreateNewPriceMutation = { price: { amount: number, description: string, uuid: string } };

export type DeletePriceMutationVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type DeletePriceMutation = { price: { uuid: string } };

export type FetchCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCurrentUserQuery = { user_infos: { displayName: string, email: string, uuid: string } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { loggedUser: { jwt: string, user: { displayName: string, email: string, roles: Array<Role>, uuid: string, joinedEvents: Array<{ title: string }> } } };

export type UpdateMainUserMutationVariables = Exact<{
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
}>;


export type UpdateMainUserMutation = { updateUser: { uuid: string } };
