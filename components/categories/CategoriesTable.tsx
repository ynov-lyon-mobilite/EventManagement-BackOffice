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
import {useContext, useState} from "react";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {CategoryContext} from "../../context/CategoryContext";
import EnhancedTableHead from "../table/EnhancedTableHead";
import EnhancedTableToolbar from "../table/EnhancedTableToolbar";
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
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Nom',
    },
    {
        id: 'active',
        numeric: false,
        disablePadding: false,
        label: 'Active',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: '',
    },
];



const CategoriesTableToolbar = ({ numSelected, onCreation, onDelete }) => {
    const [deleting, setDeleting] = useState(false);
    const handleDelete = async () => {
        setDeleting(true);
        await onDelete();
        setDeleting(false);
    };

    return (
        <EnhancedTableToolbar numSelected={numSelected} title="Catégories">
            {numSelected > 0 ? (
                <Tooltip title="Désactivation">
                    <IconButton disabled={deleting} onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Nouvelle catégorie">
                    <IconButton onClick={onCreation}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            )}
        </EnhancedTableToolbar>
    );
};

export default function CategoriesTable({categories = [], onCreation = () => {}}) {
    const {deleteCategoriesFromId, restoreCategory} = useContext(CategoryContext);
    const {selected, selection, selectAll, isSelected} = useSelectedItems([]);
    const {page, rowsPerPage, changePage, changeRowsPerPage, initialIndex} = usePagination(0, 10);
    const [restoreIds, setRestoreIds] = useState([]);

    const handleRestore = async (category) => {
        setRestoreIds(prev => [...prev, category.uuid]);
        await restoreCategory(category);
        setRestoreIds(prev => prev.filter(id => id !== category.uuid));
    };

    const handleDelete = async () => {
        await deleteCategoriesFromId(selected);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

    return (
        <div className="w-full">
            <Paper sx={{ width: '100%', mb: 2 }}>
                <CategoriesTableToolbar
                    numSelected={selected.length}
                    onCreation={onCreation}
                    onDelete={handleDelete}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={(e) => selectAll(e, categories)}
                            rowCount={categories.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {categories.slice(initialIndex, initialIndex + rowsPerPage).map((category, index) => {
                                const isItemSelected = isSelected(category.uuid);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => selection(event, category.uuid)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={category.uuid}
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
                                            {category.uuid}
                                        </TableCell>
                                        <TableCell align="left">{category.name}</TableCell>
                                        <TableCell align="left">{category.isActive ? 'Oui' : 'Non'}</TableCell>
                                        <TableCell align="left">
                                            {!category.isActive && (
                                                <Tooltip title="Activer">
                                                    <IconButton disabled={restoreIds.includes(category.uuid)}
                                                                onClick={async (e) => {e.stopPropagation();await handleRestore(category)}}>
                                                        <PowerSettingsNewIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            )}
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
                    count={categories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={changePage}
                    onRowsPerPageChange={changeRowsPerPage}
                />
            </Paper>
        </div>
    );
}