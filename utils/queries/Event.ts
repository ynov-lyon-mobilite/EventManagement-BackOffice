import {gql} from "@apollo/client";

export const FETCH_EVENTS = gql`
    query FetchEvents($currentPage: Int){
        events(page: $currentPage, take: 50, deleted: true, includePastEvents: true){
            edges{
                node{
                    category{name, uuid}
                    description
                    endDate
                    deletedAt
                    nbPlaces
                    image
                    participantsCount
                    prices{amount, uuid, description}
                    bookings{uuid, price, user{displayName, email, uuid}, refunded, refundedAt}
                    startDate
                    title
                    uuid
                }
            }
        }
    }
`;

export const CREATE_EVENT = gql`
    mutation CreateNewEvent($categoryUuid: String!, $title: String!, $startDate: Date!, $endDate: Date, $image: Upload, $description: String, $nbPlaces: Int = 0){
        event: createEvent(categoryUuid: $categoryUuid, title: $title, startDate: $startDate, endDate: $endDate, image: $image, description: $description, nbPlaces: $nbPlaces){
            category{name, uuid}
            description
            endDate
            deletedAt
            nbPlaces
            image
            participantsCount
            prices{amount, uuid, description}
            bookings{uuid, price, user{displayName, email, uuid}, refunded, refundedAt}
            startDate
            title
            uuid
        }
    }
`;

export const UPDATE_EVENT = gql`
    mutation UpdateEvent($categoryUuid: String!, $title: String!, $startDate: Date!, $uuid: String!, $endDate: Date, $image: Upload, $description: String, $nbPlaces: Int = 0){
        event: updateEvent(categoryUuid: $categoryUuid, title: $title, startDate: $startDate, uuid: $uuid, endDate: $endDate, image: $image, description: $description, nbPlaces: $nbPlaces){
            category{name, uuid}
            description
            endDate
            deletedAt
            nbPlaces
            image
            participantsCount
            prices{amount, uuid, description}
            bookings{uuid, price, user{displayName, email, uuid}, refunded, refundedAt}
            startDate
            title
            uuid
        }
    }
`;

export const DELETE_EVENT = gql`
    mutation DeleteEvent($uuid: String!){
        event: deleteEvent(uuid: $uuid){
            category{name, uuid}
            description
            endDate
            deletedAt
            nbPlaces
            image
            participantsCount
            prices{amount, uuid, description}
            bookings{uuid, price, user{displayName, email, uuid}, refunded, refundedAt}
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

export const REFUND_BOOKING = gql`
    mutation RefundBooking($bookingUuid: String!){
        booking: refundBooking(bookingUuid: $bookingUuid){
            uuid, 
            price, 
            user{displayName, email, uuid}, 
            refunded, 
            refundedAt
        }
    }
`;
