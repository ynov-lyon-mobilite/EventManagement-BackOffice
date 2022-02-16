import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip} from "@mui/material";
import {displayDate} from "../../utils/date";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import {useContext, useState} from "react";
import ConfirmDialog from "../layout/ConfirmDialog";
import {EventContext} from "../../context/EventContext";

export default function EventBookings({event}){
    const {refundBooking} = useContext(EventContext)
    const [refundingBookings, setRefundingBookings] = useState([]);
    const [confirmRefundBooking, setConfirmRefundBooking] = useState(null);

    const onRefund = async (booking) => {
        setRefundingBookings(prev => [...prev, booking.uuid]);
        try{
            await refundBooking(booking, event);
            setRefundingBookings(prev => prev.filter(b => b !== booking.uuid));
        }catch(e){
            console.error(e);
        }
    };

    return (
        <div>
            <div className="mt-2">
                {event.bookings.length > 0 && <div>{event.bookings.length} réservations(s)</div>}
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