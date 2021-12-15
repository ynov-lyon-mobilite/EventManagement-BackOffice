import {useRouter} from "next/router";
import Layout from "../../../components/layout/Layout";
import {useContext, useState} from "react";
import {EventContext} from "../../../context/EventContext";
import {Button, CircularProgress, Divider} from "@mui/material";
import {displayDate} from "../../../utils/date";
import EditIcon from '@mui/icons-material/Edit';
import EventFormDialog from "../../../components/events/EventFormDialog";
import EventPrices from "../../../components/events/EventPrices";

export default function Event(){
    const {events, loading} = useContext(EventContext);
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);

    if(loading) return (<CircularProgress/>);

    const event = events.find(evt => evt.uuid === router.query.id);
    console.log(event);

    if(!event) return <Layout>Aucune donnée</Layout>;

    return (
        <Layout>
            <Button variant="contained" startIcon={<EditIcon/>} onClick={() => setOpenDialog(true)}>
                Modifier
            </Button>
            <div>ID : {event.uuid}</div>
            <div>Intitulé : {event.title}</div>
            <div>Catégorie : {event.category.name}</div>
            <div>Début : {displayDate(event.startDate)}</div>
            <div>Fin : {event.endDate ? displayDate(event.endDate) : 'Non définie' }</div>
            <div>Nombre de participants : {event.participantsCount }</div>
            <div>Description : {event.description ?? 'Aucune description'}</div>
            <EventFormDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                event={event}
            />
            <Divider sx={{my : 2}}/>
            <div>Prix :</div>
            <EventPrices event={event}/>
        </Layout>
    );
}