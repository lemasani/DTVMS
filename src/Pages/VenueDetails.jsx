import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
//component
import { FetchVenue, PostSession } from '../Components/Fetch';
import { useState, useEffect } from 'react';

//ICONS
import AddIcon from '@mui/icons-material/Add';
import CreateSessionDialog from '../Components/CreateSession';

export default function VenueDetails() {
    const { id } = useParams();
    const [venue, setVenue] = useState(null);

    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [openCreateSessionDialog, setOpenCreateSessionDialog] = useState(false);


    useEffect(() => {
        const fetchVenue = async () => {
        const fetchedVenue = await FetchVenue(id);
        setVenue(fetchedVenue);
        };

        fetchVenue();
    }, [id]);

    if (!venue) {
        return <div>Loading...</div>;
    }

   
    const handleOpenCreateSessionDialog = () => {
        setOpenCreateSessionDialog(true);
        console.log('button clicked');
    };


        // Utility function to format time to HH:MM:SS
    function formatTimeToHHMMSS(time) {
        const timeParts = time.match(/(\d{2})(\d{2})/);
        if (timeParts && timeParts.length === 3) {
        return `${timeParts[1]}:${timeParts[2]}:00`;
        }
        // Return the original time if it doesn't match the expected format
        return time;
    }

    const handleSubmitSession = () => {
            if (!date) {
            console.error('Date is empty');
            return;
            }
        
            // Format startTime and endTime to HH:MM:SS
            const formattedStartTime = formatTimeToHHMMSS(startTime);
            const formattedEndTime = formatTimeToHHMMSS(endTime);
        
            // Combine date and formattedStartTime to form a complete ISO string
            const isoDateTime = new Date(`${date}T${formattedStartTime}`).toISOString();
        
            console.log(isoDateTime); // Logs the date and time in ISO format
            console.log(formattedStartTime, formattedEndTime);
        
            // Now call PostSession with the formatted ISO date-time string and formatted times
            PostSession(venue.id, isoDateTime, formattedStartTime, formattedEndTime);
        }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                    <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <div className="venue-detaiCodels flex flex-col p-2">
                        <h1 className="font-bold p-2">Venue Name: {venue.name}</h1>
                        <img src={venue.imageUrl} alt={venue.name} />

                        <span className="p-2">Capacity: {venue.capacity}</span>
                        <div className="address flex gap-2 p-2">
                            <span>District: {venue.district}</span>
                            <span>Region: {venue.region}</span>
                        </div>
                        </div>
                    </Box>
                    </Grid>
                    <Grid item xs={8}>
                    <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <div className="venue-session container mx-auto p-4">
                        <div className="sessions flex justify-between">
                            <h2 className="font-bold">Sessions:</h2>
                            <button className="btn bg-blue-700 p-2 text-white rounded"
                                onClick={handleOpenCreateSessionDialog}
                            >
                            <AddIcon /> Create Session
                            </button>
                        </div>
                        {venue.sessions.length === 0 ? (
                            <p>No sessions available</p>
                        ) : (
                            <p>{venue.sessions}</p>
                        )}
                        </div>
                    </Box>
                    </Grid>
                </Grid>
            </Box>
            
            {
                    openCreateSessionDialog && (
                        <CreateSessionDialog
                            open={openCreateSessionDialog}
                            onClose={() => setOpenCreateSessionDialog(false)}
                            date={date}
                            setDate={setDate}
                            startTime={startTime}
                            setStartTime={setStartTime}
                            endTime={endTime}
                            setEndTime={setEndTime}
                            venueId={venue.id}
                            onSubmit={
                                handleSubmitSession
                            }

                        />
                    )
                }
        </>
    );
}
