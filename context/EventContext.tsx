import {createContext, useEffect, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {
    CreateNewEventMutation,
    CreateNewEventMutationVariables,
    CreateNewPriceMutation,
    CreateNewPriceMutationVariables,
    DeletePriceMutation,
    DeletePriceMutationVariables,
    FetchEventsQuery,
    UpdateEventMutation,
    UpdateEventMutationVariables
} from "../src/__graphql__/__generated__";

const FETCH_EVENTS = gql`
    query FetchEvents($currentPage: Int, $take: Int){
        events(page: $currentPage, take: $take){
            edges{
                node{
                    category{name, uuid}
                    description
                    endDate
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

const CREATE_EVENT = gql`
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

const UPDATE_EVENT = gql`
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

const CREATE_PRICE = gql`
    mutation CreateNewPrice($amount: Float!, $description: String, $eventUuid: String!){
        price: createPrice(amount: $amount, description: $description, eventUuid: $eventUuid){
            amount
            description
            uuid
        }
    }
`;

const DELETE_PRICE = gql`
    mutation DeletePrice($uuid: String!){
        price: deletePrice(uuid: $uuid){
            uuid
        }
    }
`;

type EventContextType = {
    // @ts-ignore
    events : FetchEventsQuery["events"]["edges"]["node"] | null,
    loading: boolean,
    fetchEvents: (page: number, take: number) => Promise<void>,
    createEvent: (categoryUuid, title, startDate, endDate, description) => Promise<void>,
    updateEvent: (categoryUuid, title, startDate, endDate, uuid, description) => Promise<UpdateEventMutation["event"]>,
    createPrice: (amount, description, eventUuid) => Promise<void>,
    deletePrice: (uuid, eventUuid) => Promise<void>,
};

export const EventContext = createContext<EventContextType>(undefined);

export default function EventContextProvider({children}){
    const { data, loading, refetch } = useQuery<FetchEventsQuery>(FETCH_EVENTS);
    const [createEvent] = useMutation<CreateNewEventMutation, CreateNewEventMutationVariables>(CREATE_EVENT);
    const [updateEvent] = useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UPDATE_EVENT);
    const [createPrice] = useMutation<CreateNewPriceMutation, CreateNewPriceMutationVariables>(CREATE_PRICE);
    const [deletePrice] = useMutation<DeletePriceMutation, DeletePriceMutationVariables>(DELETE_PRICE);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if(data){
            setEvents(data.events.edges ? data.events.edges.map(item => item.node) : []);
        }
    },[data]);

    const fetchEvents = async (page: number, take: number) => {
        await refetch({variables: {page, take}});
    };

    const handleCreateEvent = async (categoryUuid, title, startDate, endDate, description) => {
        const { data } = await createEvent({ variables: { categoryUuid, title, startDate, endDate, description } });
        setEvents(prev => [...prev, data.event]);
    };

    const handleUpdateEvent = async (categoryUuid, title, startDate, endDate, uuid, description) => {
        const { data } = await updateEvent({ variables: { categoryUuid, title, startDate, endDate, uuid, description } });
        setEvents(prev => prev.map(event => {
            if(event.uuid === uuid) return data.event;
            return event;
        }));
        return data.event;
    };

    const handleNewPrice = async(amount, description, eventUuid) => {
        const { data } = await createPrice({ variables: { amount, description, eventUuid } });
        setEvents(prev => prev.map(event => {
            if(event.uuid === eventUuid) return {...event, prices: [...event.prices, data.price]};
            return event;
        }));
    }

    const handleDeletePrice = async(uuid, eventUuid) => {
        await deletePrice({ variables: { uuid } });
        setEvents(prev => prev.map(event => {
            if(event.uuid === eventUuid) return {...event, prices: event.prices.filter(price => price.uuid !== uuid)};
            return event;
        }));
    }

    return (
        <EventContext.Provider value={{
            events,
            loading,
            fetchEvents,
            createEvent: handleCreateEvent,
            updateEvent: handleUpdateEvent,
            createPrice: handleNewPrice,
            deletePrice: handleDeletePrice
        }}>
            {children}
        </EventContext.Provider>
    );
}
