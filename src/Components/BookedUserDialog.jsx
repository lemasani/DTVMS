    import PropTypes from 'prop-types';
    import { useState, useEffect } from 'react';
    import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
    import axios from 'axios';
    import Message from './Message';
    import Loader from './Loader'

    function BookedUsersDialog({ open, onClose, sessionId }) {
    const [bookedUsers, setBookedUsers] = useState([]);
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        if (open) {
        const fetchBookedUsers = async () => {
            try {
            setisLoading(true)
            const response = await axios.get(`/api/sessions/${sessionId}/users`);
            setBookedUsers(response.data.value);
            setisLoading(false)
            } catch (error) {
            console.error('Error fetching booked users:', error);
            setMessage('Error Fetching booked users')
            setMessageType('error')
            }
        };

        fetchBookedUsers();
        }
    }, [open, sessionId]);

    if (isLoading) { 
        return <Loader message="Loading booked users..." />;
    }

    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>Booked Users</DialogTitle>
        <DialogContent>
        {message && <Message message={message} type={messageType}/>}
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Middle Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {Array.isArray(bookedUsers) && bookedUsers.length > 0 ? (
                        bookedUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.middleName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                            No booked users
                        </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </DialogContent>
        </Dialog>
    );
    }

    export default BookedUsersDialog;

    BookedUsersDialog.propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        sessionId: PropTypes.string.isRequired,
    };
    