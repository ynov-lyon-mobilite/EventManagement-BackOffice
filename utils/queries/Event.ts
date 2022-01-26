import {gql} from "@apollo/client";

export const FETCH_EVENTS = gql`
    query FetchEvents($currentPage: Int, $take: Int){
        events(page: $currentPage, take: $take, deleted: true){
            edges{
                node{
                    category{name, uuid}
                    description
                    endDate
                    deletedAt
                    nbPlaces
                    participantsCount
                    prices{amount, uuid, description}
                    startDate
                    title
                    uuid
                }
            }
        }
    }
`;

export const CREATE_EVENT = gql`
    mutation CreateNewEvent($categoryUuid: String!, $title: String!, $startDate: Date!, $endDate: Date, $description: String){
        event: createEvent(categoryUuid: $categoryUuid, title: $title, startDate: $startDate, endDate: $endDate, description: $description){
            category{name, uuid}
            description
            endDate
            participantsCount
            prices{amount, description, uuid}
            startDate
            title
            uuid
        }
    }
`;

export const UPDATE_EVENT = gql`
    mutation UpdateEvent($categoryUuid: String!, $title: String!, $startDate: Date!, $uuid: String!, $endDate: Date, $description: String){
        event: updateEvent(categoryUuid: $categoryUuid, title: $title, startDate: $startDate, uuid: $uuid, endDate: $endDate, description: $description){
            category{name, uuid}
            description
            endDate
            participantsCount
            prices{amount, description}
            startDate
            title
            uuid
        }
    }
`;

export const CREATE_PRICE = gql`
    mutation CreateNewPrice($amount: Float!, $description: String, $eventUuid: String!){
        price: createPrice(amount: $amount, description: $description, eventUuid: $eventUuid){
            amount
            description
            uuid
        }
    }
`;

export const DELETE_PRICE = gql`
    mutation DeletePrice($uuid: String!){
        price: deletePrice(uuid: $uuid){
            uuid
        }
    }
`;