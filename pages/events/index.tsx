import Layout from "../../components/layout/Layout";
import {NextSeo} from "next-seo";
import {useContext, useState} from "react";
import {EventContext} from "../../context/EventContext";
import EventsTable from "../../components/events/EventsTable";
import EventFormDialog from "../../components/events/EventFormDialog";

export default function Events() {
    const {events, loading} = useContext(EventContext);
    const [openEventDialog, setOpenEventDialog] = useState(false);
    const [editedEvent, setEditedEvent] = useState(null);

    const handleNewEventClick = () => {
        setEditedEvent(null);
        setOpenEventDialog(true);
    };

    const onEditEventClick = (event) => {
        setEditedEvent(event);
        setOpenEventDialog(true);
    }

    return (
        <Layout>
            <NextSeo
                title="Evènements"
                description="Gestion des évènements | back-office Yvent"
            />
            {loading ? "Chargement..." : (
                <EventsTable events={events} onCreation={handleNewEventClick} onEdition={onEditEventClick}/>
            )}
            <EventFormDialog
                open={openEventDialog}
                onClose={() => setOpenEventDialog(false)}
                event={editedEvent}
            />
        </Layout>
    );
}
