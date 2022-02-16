import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip} from "@mui/material";
import {displayDate} from "../../utils/date";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import {useState} from "react";
import ConfirmDialog from "../layout/ConfirmDialog";

export default function EventBookings({event}){
    const [refundingBookings, setRefundingBookings] = useState([]);
    const [confirmRefundBooking, setConfirmRefundBooking] = useState(null);

    const onRefund = (booking) => {
        //TODO : refund mutation here
        console.log('refunding ' + booking.user.uuid);
        setRefundingBookings(prev => [...prev, booking.uuid]);
        setTimeout(() => {
            setRefundingBookings(prev => prev.filter(b => b !== booking.uuid));
        },2000)
    };

    return (
        <div>
            <div className="mt-2">
                {event.bookings.length > 0 && <div>{event.bookings.length} réservations(s)</div>}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Personne</TableCell>
                                <TableCell>Tarif</TableCell>
                                <TableCell>Remboursé ?</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {event.bookings.map(booking => {
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
                                            {booking.refund ? displayDate(booking.refundedAt) : ''}
                                        </TableCell>
                                        <TableCell>
                                            {!booking.refund && (
                                                <Tooltip title={isRefunding ? 'Remboursement...' : 'Rembourser'} placement="top">
                                                <span>
                                                    <IconButton
                                                        disabled={booking.refund || isRefunding}
                                                        onClick={() => setConfirmRefundBooking(booking)}
                                                    >
                                                    <SettingsBackupRestoreIcon />
                                                </IconButton>
                                                </span>
                                                </Tooltip>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {event.bookings.length === 0 && (
                                <TableRow style={{height: 53}}>
                                    <TableCell className="text-center" colSpan={3} style={{fontStyle: 'italic'}}>
                                        Aucune réservation
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
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