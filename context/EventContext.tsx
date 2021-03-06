import {createContext, useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {
    CreateNewEventMutation,
    CreateNewEventMutationVariables,
    CreateNewPriceMutation,
    CreateNewPriceMutationVariables, DeleteEventMutation, DeleteEventMutationVariables,
    DeletePriceMutation,
    DeletePriceMutationVariables,
    FetchEventsQuery, RefundBookingMutation, RefundBookingMutationVariables,
    UpdateEventMutation,
    UpdateEventMutationVariables
} from "../src/__graphql__/__generated__";
import {
    CREATE_EVENT,
    CREATE_PRICE,
    DELETE_EVENT,
    DELETE_PRICE,
    FETCH_EVENTS, REFUND_BOOKING,
    UPDATE_EVENT
} from "../utils/queries/Event";

type EventContextType = {
    // @ts-ignore
    events : FetchEventsQuery["events"]["edges"]["node"] | null,
    loading: boolean,
    fetchEvents: (page: number, take: number) => Promise<void>,
    createEvent: (categoryUuid, title, startDate, endDate, image, description, nbPlaces) => Promise<void>,
    updateEvent: (categoryUuid, title, startDate, endDate, image, uuid, description, nbPlaces) => Promise<UpdateEventMutation["event"]>,
    deleteEvent: (uuid) => Promise<void>,
    createPrice: (amount, description, eventUuid) => Promise<void>,
    deletePrice: (uuid, eventUuid) => Promise<void>,
    refundBooking: (booking, event) => Promise<void>,
};

export const EventContext = createContext<EventContextType>(undefined);

export default function EventContextProvider({children}){
    const { data, loading, refetch } = useQuery<FetchEventsQuery>(FETCH_EVENTS);
    const [createEvent] = useMutation<CreateNewEventMutation, CreateNewEventMutationVariables>(CREATE_EVENT);
    const [updateEvent] = useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UPDATE_EVENT);
    const [deleteEvent] = useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DELETE_EVENT);
    const [createPrice] = useMutation<CreateNewPriceMutation, CreateNewPriceMutationVariables>(CREATE_PRICE);
    const [deletePrice] = useMutation<DeletePriceMutation, DeletePriceMutationVariables>(DELETE_PRICE);
    const [refundBooking] = useMutation<RefundBookingMutation, RefundBookingMutationVariables>(REFUND_BOOKING);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if(data){
            setEvents(data.events.edges ? data.events.edges.map(item => item.node) : []);
        }
    },[data]);

    const fetchEvents = async (page: number, take: number) => {
        await refetch({variables: {page, take}});
    };

    const handleCreateEvent = async (categoryUuid, title, startDate, endDate, image, description, nbPlaces = 0) => {
        const { data } = await createEvent({ variables: { categoryUuid, title, startDate, endDate, image, description, nbPlaces } });
        setEvents(prev => [...prev, data.event]);
    };

    const handleUpdateEvent = async (categoryUuid, title, startDate, endDate, image, uuid, description, nbPlaces = 0) => {
        const { data } = await updateEvent({ variables: { categoryUuid, title, startDate, endDate, image, uuid, description, nbPlaces } });
        setEvents(prev => prev.map(event => {
            if(event.uuid === uuid) return data.event;
            return event;
        }));
        return data.event;
    };

    const handleDeleteEvent = async (uuid) => {
        const { data } = await deleteEvent({ variables: { uuid } });
        setEvents(prev => prev.map(event => {
            if(event.uuid === uuid) return data.event;
            return event;
        }));
    };

    const handleNewPrice = async(amount, description, eventUuid) => {
        const { data } = await createPrice({ variables: { amount, description, eventUuid } });
        setEvents(prev => prev.map(event => {
            if(event.uuid === eventUuid) return {...event, prices: [...event.prices, data.price]};
            return event;
        }));
    };

    const handleDeletePrice = async(uuid, eventUuid) => {
        await deletePrice({ variables: { uuid } });
        setEvents(prev => prev.map(event => {
            if(event.uuid === eventUuid) return {...event, prices: event.prices.filter(price => price.uuid !== uuid)};
            return event;
        }));
    };

    const handleRefundBooking = async (booking, event) => {
        const { data } = await refundBooking({variables: { bookingUuid: booking.uuid }});
        setEvents(prev => prev.map(ev => {
            if(ev.uuid === event.uuid) return {
                ...ev,
                bookings: ev.bookings.map(b => {
                    if(b.uuid === booking.uuid) return data.booking;
                    return b;
                })
            };
            return ev;
        }));
    };

    return (
        <EventContext.Provider value={{
            events,
            loading,
            fetchEvents,
            createEvent: handleCreateEvent,
            updateEvent: handleUpdateEvent,
            deleteEvent: handleDeleteEvent,
            createPrice: handleNewPrice,
            deletePrice: handleDeletePrice,
            refundBooking: handleRefundBooking
        }}>
            {children}
        </EventContext.Provider>
    );
}
