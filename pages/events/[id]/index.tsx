import {useRouter} from "next/router";
import Layout from "../../../components/layout/Layout";
import {useContext, useState} from "react";
import {EventContext} from "../../../context/EventContext";
import {Button, CircularProgress, Divider} from "@mui/material";
import {displayDate} from "../../../utils/date";
import EditIcon from '@mui/icons-material/Edit';
import EventFormDialog from "../../../components/events/EventFormDialog";
import EventPrices from "../../../components/events/EventPrices";
import {NextSeo} from "next-seo";

export default function Event(){
    const {events, loading} = useContext(EventContext);
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);

    if(loading) return (<CircularProgress/>);

    const event = events.find(evt => evt.uuid === router.query.id);

    if(!event) return <Layout>Aucune donnée</Layout>;

    return (
        <Layout>
            <NextSeo
                title={`Evènement`}
                description="Evènement yvent"
            />
            <Button variant="contained" startIcon={<EditIcon/>} onClick={() => setOpenDialog(true)}>
                Modifier
            </Button>
            <table className="mt-2">
                <tbody>
                <tr><td className="font-bold">ID</td><td>{event.uuid}</td></tr>
                <tr><td className="font-bold">Intitulé</td><td>{event.title}</td></tr>
                <tr><td className="font-bold">Catégorie</td><td>{event.category.name}</td></tr>
                <tr><td className="font-bold">Début</td><td>{displayDate(event.startDate)}</td></tr>
                <tr><td className="font-bold">Fin</td><td>{event.endDate ? displayDate(event.endDate) : 'Non définie' }</td></tr>
                <tr><td className="font-bold">Nombre de participants</td><td>{event.participantsCount}</td></tr>
                <tr><td className="font-bold">Description</td><td>{event.description ?? 'Aucune description'}</td></tr>
                </tbody>
            </table>
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
