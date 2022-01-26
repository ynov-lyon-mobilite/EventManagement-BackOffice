import {useRouter} from "next/router";
import Layout from "../../../components/layout/Layout";
import {useContext, useState} from "react";
import {EventContext} from "../../../context/EventContext";
import {Button, Chip, CircularProgress, Divider} from "@mui/material";
import {displayDate} from "../../../utils/date";
import EditIcon from '@mui/icons-material/Edit';
import EventFormDialog from "../../../components/events/EventFormDialog";
import EventPrices from "../../../components/events/EventPrices";
import {NextSeo} from "next-seo";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ConfirmDialog from "../../../components/layout/ConfirmDialog";
import {LoadingButton} from "@mui/lab";
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

export default function Event(){
    const {events, loading, deleteEvent} = useContext(EventContext);
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [canceling, setCanceling] = useState(false);
    const [cancelError, setCancelError] = useState(null);

    if(loading) return (<Layout><CircularProgress/></Layout>);

    const event = events.find(evt => evt.uuid === router.query.id);

    if(!event) return <Layout>Aucune donnée</Layout>;

    const onConfirmDeletion = async () => {
        setCanceling(true);
        setCancelError(null);
        try{
            await deleteEvent(event.uuid);
        }catch(e){
            setCancelError(e.toString());
        }
        setCanceling(false);
    }

    const isEventDeleted = !!event.deletedAt;

    return (
        <Layout>
            <NextSeo
                title={`Evènement`}
                description="Evènement yvent"
            />
            <div className="d-flex">
                {isEventDeleted ? (
                    <Chip icon={<DoNotDisturbOnIcon />} label="Evènement annulé" variant="outlined"/>
                ) : (
                    <>
                        <Button variant="contained" startIcon={<EditIcon/>} onClick={() => setOpenDialog(true)}>
                            Modifier
                        </Button>
                        <LoadingButton
                            className="mx-2"
                            onClick={() => setOpenConfirmDialog(true)}
                            loading={canceling}
                            loadingPosition="start"
                            startIcon={<RemoveCircleOutlineIcon />}
                            variant="outlined"
                        >
                            Annuler
                        </LoadingButton>
                    </>
                )}
            </div>
            <table className="mt-2">
                <tbody>
                <tr><td className="font-bold">ID</td><td>{event.uuid}</td></tr>
                <tr><td className="font-bold">Intitulé</td><td>{event.title}</td></tr>
                <tr><td className="font-bold">Catégorie</td><td>{event.category.name}</td></tr>
                <tr><td className="font-bold">Début</td><td>{displayDate(event.startDate)}</td></tr>
                <tr><td className="font-bold">Fin</td><td>{event.endDate ? displayDate(event.endDate) : 'Non définie' }</td></tr>
                <tr><td className="font-bold">Nb max de places</td><td>{event.nbPlaces}</td></tr>
                <tr><td className="font-bold">Nombre de participants</td><td>{event.participantsCount}</td></tr>
                <tr><td className="font-bold">Description</td><td>{event.description ?? 'Aucune description'}</td></tr>
                </tbody>
            </table>
            <EventFormDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                event={event}
            />
            <ConfirmDialog
                open={openConfirmDialog}
                title="Annuler l'évènement"
                onConfirm={onConfirmDeletion}
                onClose={() => setOpenConfirmDialog(false)}
            >Confirmez-vous l'annulation de l'évènement ?</ConfirmDialog>
            <Divider sx={{my : 2}}/>
            <EventPrices event={event}/>
        </Layout>
    );
}
