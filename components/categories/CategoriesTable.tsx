import {
    Checkbox,
    IconButton,
    Paper, Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {alpha} from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

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

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'Sélection de toutes les catégories',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableToolbar = ({ numSelected, onCreation, onDelete }) => {
    const [deleting, setDeleting] = useState(false);
    const handleDelete = async () => {
        setDeleting(true);
        await onDelete();
        setDeleting(false);
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="categoriesTableTitle"
                    component="div"
                >
                    Catégories
                </Typography>
            )}

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
        </Toolbar>
    );
};

export default function CategoriesTable({
        categories = [],
        onCreation = () => {},
        onDeletion = (uuids) => {},
        onRestore = (category) => {}
    }) {
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [restoreIds, setRestoreIds] = useState([]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = categories.map((n) => n.uuid);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = () => {
        onDeletion(selected);
    };

    const handleRestore = async (category) => {
        setRestoreIds(prev => [...prev, category.uuid]);
        await onRestore(category);
        setRestoreIds(prev => prev.filter(id => id !== category.uuid));
    };

    const isSelected = (uuid) => selected.indexOf(uuid) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

    const initialIndex = page * rowsPerPage;

    return (
        <div className="w-full">
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
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
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={categories.length}
                        />
                        <TableBody>
                            {categories.slice(initialIndex, initialIndex + rowsPerPage).map((category, index) => {
                                const isItemSelected = isSelected(category.uuid);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, category.uuid)}
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
                                        <TableCell align="left">{category.isActive.toString()}</TableCell>
                                        <TableCell align="left">
                                            {!category.isActive && (
                                                <IconButton disabled={restoreIds.includes(category.uuid)}
                                                            onClick={async (e) => {e.stopPropagation();await handleRestore(category)}}>
                                                    <PowerSettingsNewIcon/>
                                                </IconButton>
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
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}