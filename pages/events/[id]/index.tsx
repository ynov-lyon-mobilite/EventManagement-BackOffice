import {useRouter} from "next/router";
import Layout from "../../../components/layout/Layout";
import {SyntheticEvent, useContext, useState} from "react";
import {EventContext} from "../../../context/EventContext";
import {Avatar, Box, Button, Chip, CircularProgress, Divider, Tab, Tabs} from "@mui/material";
import {displayDate} from "../../../utils/date";
import EditIcon from '@mui/icons-material/Edit';
import EventFormDialog from "../../../components/events/EventFormDialog";
import EventPrices from "../../../components/events/EventPrices";
import {NextSeo} from "next-seo";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ConfirmDialog from "../../../components/layout/ConfirmDialog";
import {LoadingButton} from "@mui/lab";
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {a11yProps} from "../../../utils/other";
import TabPanel from "../../../components/layout/TabPanel";
import EventBookings from "../../../components/events/EventBookings";
import PersonIcon from '@mui/icons-material/Person';

export default function Event(){
    const {events, loading, deleteEvent} = useContext(EventContext);
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [canceling, setCanceling] = useState(false);
    const [cancelError, setCancelError] = useState(null);
    const [tabValue, setTabValue] = useState(router.asPath.includes('#bookings') ? 1 : 0);

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

    const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

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
            {cancelError && (<div className="error">{cancelError}</div>)}
            <div className="d-flex mt-2">
                <table>
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
                <div className="ml-2 d-flex flex-1">
                    <img
                        className="w-full"
                        style={{
                            borderRadius: '10px',
                            boxShadow: "0 0 5px rgba(0,0,0,0.5)",
                            maxHeight: '300px',
                            objectFit: 'cover'
                        }}
                        src={event.image ?? "/default.jpg"}/>
                </div>
            </div>
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
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleChangeTab} aria-label="event tabs">
                        <Tab component="a" href="#prices"
                             icon={<ManageAccountsIcon />}
                             iconPosition="start"
                             label="Tarifs" {...a11yProps(0)} />
                        <Tab component="a" href="#bookings"
                             icon={<VpnKeyIcon />}
                             iconPosition="start"
                             label="Réservations" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} id="event" index={0}>
                    <EventPrices event={event}/>
                </TabPanel>
                <TabPanel value={tabValue} id="event" index={1}>
                    <EventBookings event={event}/>
                </TabPanel>
            </Box>
        </Layout>
    );
}
