import {Checkbox, TableCell, TableHead, TableRow} from "@mui/material";

export default function EnhancedTableHead({ onSelectAllClick = null, order = null, orderBy = null, numSelected = 0, rowCount, headCells }) {
    return (
        <TableHead>
            <TableRow>
                {!!onSelectAllClick && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                )}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        className="font-bold"
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}