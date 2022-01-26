import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from "@mui/material";
import {useContext, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import {LoadingButton} from "@mui/lab";
import ClearIcon from '@mui/icons-material/Clear';
import {EventContext} from "../../context/EventContext";

export default function EventPrices({event}){
    const {createPrice, deletePrice} = useContext(EventContext);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [deletingPrices, setDeletingPrices] = useState([]);

    const handleNewPrice = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try{
            await createPrice(parseFloat(amount), description, event.uuid);
            setAmount('')
            setDescription('');
        }catch(e){
            setError(e.toString());
        }
        setSubmitting(false);
    };

    const onDeletePrice = async (price) => {
        setDeletingPrices(prev => [...prev, price.uuid])
        try{
            await deletePrice(price.uuid, event.uuid);
        }catch(e){
            setError(e.toString());
        }
        setDeletingPrices(prev => prev.filter(onePriceId => onePriceId !== price.uuid));
    };

    const isEventDeleted = !!event.deletedAt;

    return (
        <div>
            {!isEventDeleted && (
                <>
                    <div>Nouveau tarif :</div>
                    <form onSubmit={handleNewPrice} className="d-flex">
                        <TextField
                            label="Montant (€)"
                            required
                            type="number"
                            sx={{mr: 2}}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <TextField
                            label="Description"
                            required
                            sx={{mr: 2}}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="my-auto">
                            <LoadingButton
                                variant="contained"
                                type="submit"
                                loading={submitting}
                                loadingPosition="start"
                                startIcon={<AddIcon/>}
                                disabled={!amount || !description || submitting}
                            >Ajouter</LoadingButton>
                        </div>
                    </form>
                </>
            )}
            {error && (<div className="error">{error}</div>)}
            <div className="mt-2">
                {event.prices.length > 0 && <div>{event.prices.length} tarif(s) renseigné(s)</div>}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Prix</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {event.prices.map(price => (
                                <TableRow key={price.uuid}>
                                    <TableCell>
                                        {price.amount}
                                    </TableCell>
                                    <TableCell>
                                        {price.description}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title={isEventDeleted ? 'Suppression désactivée' : 'Supprimer le tarif'} placement="top">
                                            <span>
                                                <IconButton
                                                    disabled={isEventDeleted || deletingPrices.includes(price.uuid)}
                                                    onClick={() => onDeletePrice(price)}
                                                >
                                                <ClearIcon />
                                            </IconButton>
                                            </span>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {event.prices.length === 0 && (
                                <TableRow style={{height: 53}}>
                                    <TableCell colSpan={3}>Aucun tarif</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
