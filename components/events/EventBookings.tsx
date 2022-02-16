import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {displayDate} from "../../utils/date";

export default function EventBookings({event}){
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
                            {event.bookings.map(booking => (
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
                                    <TableCell/>
                                </TableRow>
                            ))}
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
        </div>
    );
}