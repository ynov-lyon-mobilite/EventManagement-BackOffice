import {
    Checkbox,
    IconButton,
    Paper, Table, TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {useContext} from "react";
import EnhancedTableHead from "../table/EnhancedTableHead";
import EnhancedTableToolbar from "../table/EnhancedTableToolbar";
import {EventContext} from "../../context/EventContext";
import useSelectedItems from "../../hooks/useSelectedItems";
import usePagination from "../../hooks/usePagination";

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
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



const EventsTableToolbar = ({ numSelected, onCreation }) => {
    return (
        <EnhancedTableToolbar numSelected={numSelected} title="Evènements">
            {numSelected > 0 ? (
                <Tooltip title="Désactivation">
                    <IconButton onClick={() => {}}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Nouvel évènement">
                    <IconButton onClick={onCreation}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            )}
        </EnhancedTableToolbar>
    );
};

export default function EventsTable({events = [], onCreation = () => {}}) {
    const {} = useContext(EventContext);
    const {selected, selection, selectAll, isSelected} = useSelectedItems([]);
    const {page, rowsPerPage, initialIndex, changeRowsPerPage, changePage} = usePagination(0,10);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0;

    return (
        <div className="w-full">
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EventsTableToolbar
                    numSelected={selected.length}
                    onCreation={onCreation}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={(e) => selectAll(e, events)}
                            rowCount={events.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {events.slice(initialIndex, initialIndex + rowsPerPage).map((event, index) => {
                                const isItemSelected = isSelected(event.uuid);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(e) => selection(e, event.uuid)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={event.uuid}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {event.uuid}
                                        </TableCell>
                                        <TableCell align="left">{event.title}</TableCell>
                                        <TableCell align="left">{event.category.name}</TableCell>
                                        <TableCell align="left">{event.startDate}</TableCell>
                                        <TableCell align="left">{event.endDate}</TableCell>
                                        <TableCell align="left">{event.participantsCount}</TableCell>
                                        <TableCell align="left">
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