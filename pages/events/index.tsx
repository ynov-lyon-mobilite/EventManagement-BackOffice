import Layout from "../../components/layout/Layout";
import {NextSeo} from "next-seo";
import {useContext} from "react";
import {EventContext} from "../../context/EventContext";
import EventsTable from "../../components/events/EventsTable";

export default function Events() {
    const {events, loading} = useContext(EventContext);

    const handleNewEvent = () => {
        console.log('new event');
    };

    return (
        <Layout>
            <NextSeo
                title="Evènements"
                description="Gestion des évènements | back-office Yvent"
            />
            {loading ? "Chargement..." : (
                <EventsTable events={events} onCreation={handleNewEvent}/>
            )}
        </Layout>
    );
}
