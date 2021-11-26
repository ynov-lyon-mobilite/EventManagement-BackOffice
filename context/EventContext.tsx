import {createContext, useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {FetchEventsQuery} from "../src/__graphql__/__generated__";

const FETCH_EVENTS = gql`
    query FetchEvents($currentPage: Int, $take: Int){
        events(currentPage: $currentPage, take: $take){
            edges{
                node{
                    category{name}
                    description
                    endDate
                    participantsCount
                    prices{price}
                    startDate
                    title
                    uuid
                }
            }
        }
    }
`;

type EventContextType = {
    events : FetchEventsQuery["events"]["edges"] | null,
    loading: boolean,
    fetchEvents: (page: number, take: number) => Promise<void>,
};

export const EventContext = createContext<EventContextType>(undefined);

export default function EventContextProvider({children}){
    const { data, loading, refetch } = useQuery<FetchEventsQuery>(FETCH_EVENTS);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if(data){
            setEvents(data.events.edges ? data.events.edges.map(item => item.node) : []);
        }
    },[data])

    const fetchEvents = async (page: number, take: number) => {
        await refetch({variables: {page, take}});
    };

    return (
        <EventContext.Provider value={{
            events,
            loading,
            fetchEvents
        }}>
            {children}
        </EventContext.Provider>
    );
}