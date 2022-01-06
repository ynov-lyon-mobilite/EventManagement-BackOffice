import {IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip} from "@mui/material";
import {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import {LoadingButton} from "@mui/lab";
import ClearIcon from '@mui/icons-material/Clear';

export default function EventPrices({event}){
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleNewPrice = (e) => {
        e.preventDefault();
    };

    const onDeletePrice = (price) => {

    };

    return (
        <div>
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
            <div className="mt-2">
                {event.prices.length > 0 && <div>{event.prices.length} tarif renseigné(s)</div>}
                <TableContainer>
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
                                    <Tooltip title="Supprimer le tarif" placement="top">
                                        <IconButton onClick={() => onDeletePrice(price)}>
                                            <ClearIcon />
                                        </IconButton>
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
                </TableContainer>
            </div>
        </div>
    );
}
