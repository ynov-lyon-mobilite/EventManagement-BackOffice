import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    TextField,
    Tooltip
} from "@mui/material";
import {displayDate} from "../../utils/date";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import {useContext, useEffect, useState} from "react";
import ConfirmDialog from "../layout/ConfirmDialog";
import {EventContext} from "../../context/EventContext";
import usePagination from "../../hooks/usePagination";

export default function EventBookings({event}){
    const {refundBooking} = useContext(EventContext);
    const [refundingBookings, setRefundingBookings] = useState([]);
    const [confirmRefundBooking, setConfirmRefundBooking] = useState(null);
    const [displayedBookings, setDisplayedBookings] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const {page, rowsPerPage, initialIndex, changeRowsPerPage, changePage} = usePagination(0,5);

    const onRefund = async (booking) => {
        setRefundingBookings(prev => [...prev, booking.uuid]);
        try{
            await refundBooking(booking, event);
            setRefundingBookings(prev => prev.filter(b => b !== booking.uuid));
        }catch(e){
            console.error(e);
        }
    };

    useEffect(() => {
        if(event && event.bookings && event.bookings.length > 0){
            if(searchValue){
                const loweredValue = searchValue.toLowerCase();
                setDisplayedBookings(event.bookings.filter(booking => booking.user.displayName.toLowerCase().includes(loweredValue)));
            }else{
                setDisplayedBookings(event.bookings)
            }
        } else{
            setDisplayedBookings([]);
        }
    },[searchValue,event]);

    return (
        <div>
            <div className="mt-2">
                {event.bookings.length > 0 && (
                    <div className="d-flex">
                        <div className="my-auto mr-2">{event.bookings.length} réservations(s) totales</div>
                        <div>
                            <TextField
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                                type="text"
                                size="small"
                                className="mr-2"
                                placeholder="Rechercher"
                            />
                        </div>
                    </div>
                )}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="font-bold">Personne</TableCell>
                                <TableCell className="font-bold">Tarif</TableCell>
                                <TableCell className="font-bold">Remboursé ?</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedBookings.slice(initialIndex, initialIndex + rowsPerPage).map(booking => {
                                const isRefunding = refundingBookings.includes(booking.uuid);
                                return (
                                    <TableRow key={booking.uuid}>
                                        <TableCell>
                                            {booking.user.displayName}
                                        </TableCell>
                                        <TableCell>
                                            {booking.price}
                                        </TableCell>
                                        <TableCell>
                                            {booking.refunded ? displayDate(booking.refundedAt, true) : ''}
                                        </TableCell>
                                        <TableCell>
                                            {(!booking.refunded && !isRefunding) && (
                                                <Tooltip title="Rembourser" placement="top">
                                                <span>
                                                    <IconButton
                                                        disabled={booking.refunded || isRefunding}
                                                        onClick={() => setConfirmRefundBooking(booking)}
                                                    >
                                                    <SettingsBackupRestoreIcon />
                                                </IconButton>
                                                </span>
                                                </Tooltip>
                                            )}
                                            {isRefunding && 'Remboursement...'}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {displayedBookings.length === 0 && (
                                <TableRow style={{height: 53}}>
                                    <TableCell className="text-center" colSpan={4} style={{fontStyle: 'italic'}}>
                                        Aucune réservation
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {displayedBookings.length > 0 && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={displayedBookings.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={changePage}
                        onRowsPerPageChange={changeRowsPerPage}
                    />
                )}
            </div>
            <ConfirmDialog
                open={confirmRefundBooking !== null}
                title="Rembourser l'évènement"
                onConfirm={() => onRefund(confirmRefundBooking)}
                onClose={() => setConfirmRefundBooking(null)}
            >Confirmez-vous le remboursement de l'évènement pour {' '}
                {confirmRefundBooking !== null ? confirmRefundBooking.user.displayName : ''} ?
            </ConfirmDialog>
        </div>
    );
}
