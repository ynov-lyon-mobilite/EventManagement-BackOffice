import {
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, IconButton,
    InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {useContext, useEffect, useRef, useState} from "react";
import {LoadingButton} from "@mui/lab";
import AddIcon from '@mui/icons-material/Add';
import {CategoryContext} from "../../context/CategoryContext";
import {EventContext} from "../../context/EventContext";
import ClearIcon from '@mui/icons-material/Clear';
import {isValueString} from "../../utils/other";

const INITIAL_EVENT = {
    categoryUuid: null,
    title: '',
    nbPlaces: '',
    description: null,
    startDate: null,
    endDate: null,
    image: null,
};

const convertEventToForm = (oneEvent) => ({
    ...oneEvent,
    image: (!oneEvent.image || isValueString(oneEvent.image)) ? null : oneEvent.image,
    categoryUuid: oneEvent.category.uuid,
    startDate: oneEvent.startDate.substring(0,10),
    endDate: oneEvent.endDate.substring(0,10)
})

export default function EventFormDialog({open, onClose, event = null}){
    const {activeCategories, loading} = useContext(CategoryContext);
    const {createEvent, updateEvent} = useContext(EventContext);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(null);
    const [newEvent, setNewEvent] = useState(INITIAL_EVENT);
    const inputFileRef = useRef<HTMLInputElement|null>(null);

    useEffect(() => {
        if(event) setNewEvent(convertEventToForm(event))
        else setNewEvent(INITIAL_EVENT);
    }, [event])

    useEffect(() => {
        setNewEvent(prev => ({...prev, nbPlaces: Math.abs(parseInt(prev.nbPlaces)).toString()}))
    },[newEvent.nbPlaces])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try{
            let resultEvent;
            if(!event){
                await createEvent(newEvent.categoryUuid, newEvent.title, newEvent.startDate, newEvent.endDate, newEvent.image, newEvent.description, parseInt(newEvent.nbPlaces));
                resultEvent = INITIAL_EVENT;
            }else{
                resultEvent = await updateEvent(newEvent.categoryUuid, newEvent.title, newEvent.startDate, newEvent.endDate, newEvent.image, event.uuid, newEvent.description, parseInt(newEvent.nbPlaces));
                resultEvent = convertEventToForm(resultEvent);
            }
            onClose();
            setNewEvent(resultEvent);
        }catch (e) {
            setError(e.toString());
        }
        setSubmitting(false);
    }

    const handleChange = (prop) => (event) => {
        setNewEvent(prev => ({...prev, [prop] : event.target.value}))
    }

    if(loading){return <CircularProgress />}

    const isFormValid = !!newEvent.title && !!newEvent.startDate && !!newEvent.categoryUuid;

    return (
        <Dialog open={open} keepMounted onClose={onClose} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <DialogTitle className="text-center">{!event ? 'Nouvel' : 'Edition'} évènement</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        autoFocus
                        label="Intitulé"
                        margin="normal"
                        required
                        value={newEvent.title ?? ''}
                        onChange={handleChange('title')}
                    />
                    <div className="d-flex">
                        <FormControl sx={{ flex:'1',mr:2 }} fullWidth margin="normal">
                            <InputLabel id="category-select">Catégorie *</InputLabel>
                            <Select
                                labelId="category-select"
                                label="Catégorie"
                                required
                                value={newEvent.categoryUuid ?? ''}
                                onChange={handleChange('categoryUuid')}
                            >
                                {activeCategories.map(category => (
                                    <MenuItem key={category.uuid} value={category.uuid}>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ flex:'1' }}
                            label="Nombre de place max"
                            required
                            InputProps={{ inputProps: { min: 0} }}
                            type="number"
                            margin="normal"
                            value={newEvent.nbPlaces ?? ''}
                            onChange={handleChange('nbPlaces')}
                        />
                    </div>
                    <div className="d-flex">
                        <TextField
                            required
                            label="Date de début"
                            type="date"
                            margin="normal"
                            value={newEvent.startDate ?? ''}
                            onChange={handleChange('startDate')}
                            sx={{ flex:'1',mr:2 }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Date de fin"
                            type="date"
                            margin="normal"
                            value={newEvent.endDate ?? ''}
                            onChange={handleChange('endDate')}
                            sx={{ flex:'1' }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </div>
                    <TextField
                        fullWidth
                        label="Description"
                        margin="normal"
                        multiline
                        rows={6}
                        value={newEvent.description ?? ''}
                        onChange={handleChange('description')}
                    />
                    <input
                        type="file"
                        ref={inputFileRef}
                        onChange={e => setNewEvent(prev => ({...prev, image: e.target.files[0]}))}
                    />
                    {newEvent.image && (
                        <IconButton onClick={() => {
                            inputFileRef.current.value = "";
                            setNewEvent(prev => ({...prev, image: null}))
                        }}>
                            <ClearIcon/>
                        </IconButton>
                    )}
                    {error && <div className="mt-2 error">{error}</div>}
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={submitting}
                        loadingPosition="start"
                        startIcon={!event ? <AddIcon/> : <EditIcon/>}
                        disabled={!isFormValid}
                    >{!event ? 'Créer' : 'Modifier'}</LoadingButton>
                    <Button onClick={onClose}>Annuler</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}