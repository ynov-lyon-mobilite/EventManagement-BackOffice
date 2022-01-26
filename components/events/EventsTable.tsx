import {
    IconButton,
    Paper, Table, TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow, TextField,
    Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EnhancedTableHead from "../table/EnhancedTableHead";
import EnhancedTableToolbar from "../table/EnhancedTableToolbar";
import usePagination from "../../hooks/usePagination";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useRouter} from "next/router";
import EditIcon from '@mui/icons-material/Edit';
import {displayDate} from "../../utils/date";
import {useEffect, useState} from "react";

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'ID',
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'Intitulé',
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'Catégorie',
    },
    {
        id: 'startDate',
        numeric: false,
        disablePadding: false,
        label: 'Début',
    },
    {
        id: 'endDate',
        numeric: false,
        disablePadding: false,
        label: 'Fin',
    },
    {
        id: 'participantCount',
        numeric: false,
        disablePadding: false,
        label: 'Nombre de participants',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: '',
    },
];

const EventsTableToolbar = ({ numSelected = 0, onCreation, searchValue, onSearchChange}) => {
    return (
        <EnhancedTableToolbar numSelected={numSelected} title="Evènements">
            <TextField
                value={searchValue}
                onChange={onSearchChange}
                type="text"
                size="small"
                className="mr-2"
                placeholder="Rechercher"
            />
            <Tooltip title="Nouvel évènement">
                <IconButton onClick={onCreation}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
        </EnhancedTableToolbar>
    );
};

export default function EventsTable({events = [], onCreation = () => {}, onEdition = (event) => {}}) {
    const router = useRouter();
    const {page, rowsPerPage, initialIndex, changeRowsPerPage, changePage} = usePagination(0,10);
    const [displayedEvents, setDisplayedEvents] = useState(events);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const loweredSearch = search.toLowerCase();
        setDisplayedEvents(events.filter(event =>
            event.title.toLowerCase().includes(loweredSearch) ||
            event.uuid.toLowerCase().includes(loweredSearch) ||
            event.category.name.toLowerCase().includes(loweredSearch)));
    }, [events, search])

    const handleView = (event) => {
        router.push(`/events/${event.uuid}`);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0;

    return (
        <div className="w-full">
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EventsTableToolbar
                    searchValue={search}
                    onSearchChange={(e) => setSearch(e.target.value)}
                    onCreation={onCreation}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            rowCount={events.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {displayedEvents.slice(initialIndex, initialIndex + rowsPerPage).map((event, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={event.uuid}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                        >
                                            {event.uuid}
                                        </TableCell>
                                        <TableCell align="left">{event.title}</TableCell>
                                        <TableCell align="left">{event.category.name}</TableCell>
                                        <TableCell align="left">{displayDate(event.startDate)}</TableCell>
                                        <TableCell align="left">{displayDate(event.endDate)}</TableCell>
                                        <TableCell align="left">{event.participantsCount}</TableCell>
                                        <TableCell align="left" className="d-flex">
                                            <Tooltip title="Voir l'évènement">
                                                <IconButton onClick={(e) => {e.stopPropagation();handleView(event)}}>
                                                    <VisibilityIcon/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Modifier l'évènement">
                                                <IconButton onClick={(e) => {e.stopPropagation();onEdition(event)}}>
                                                    <EditIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 53 * emptyRows,}}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={events.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={changePage}
                    onRowsPerPageChange={changeRowsPerPage}
                />
            </Paper>
        </div>
    );
}