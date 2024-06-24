import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
//component
import { FetchVenue, PostSession, DeleteSession } from '../Components/Fetch';
import { useState, useEffect } from 'react';
import { useAuth } from '../Utils/Auth';

//ICONS
import AddIcon from '@mui/icons-material/Add';
import CreateSessionDialog from '../Components/CreateSession';
import Loader from '../Components/Loader';

export default function VenueDetails() {
    useAuth()

    const [isLoading, setIsLoading] = useState(false)
    const LoaderSize = 60
    const { id } = useParams();
    const [venue, setVenue] = useState(null);

    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [openCreateSessionDialog, setOpenCreateSessionDialog] = useState(false);


    useEffect(() => {
        const fetchVenue = async () => {
            setIsLoading(true)
            const fetchedVenue = await FetchVenue(id);
            setVenue(fetchedVenue);
            setIsLoading(false)
        };

        fetchVenue();
    }, [id]);

    if (!venue) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader p-20 w-50">
                    <Loader size={LoaderSize} />
                </div>
            </div>
        );
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

    const refreshVenueDetails = async () => {
        setIsLoading(true)
        const fetchedVenue = await FetchVenue(id);
        setVenue(fetchedVenue);
        setIsLoading(false)
    };

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
        
            setIsLoading(true)
            console.log('startTime',startTime)
            // Now call PostSession with the formatted ISO date-time string and formatted times
            const success = PostSession(venue.id, isoDateTime, formattedStartTime, formattedEndTime);
            setIsLoading(false)
            setOpenCreateSessionDialog(false)
            if(success){
                refreshVenueDetails();

            }
           
        }

        const handleDeleteSession = async (sessionId) =>{
            setIsLoading(true)
            const success = await DeleteSession(sessionId);
            setIsLoading(false)
            if(success){
                refreshVenueDetails()
            }
            console.log('sessionId',sessionId);
        }

    return (
        <>
            {
                !isLoading ? (
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                            <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                                <div className="venue-detaiCodels flex flex-col p-2">
                                <img src={venue.imageUrl} alt={venue.name} />
                                <h1 className="font-bold p-2">Venue: {venue.name}</h1>

                                <span className="p-2">Capacity: {venue.capacity}</span>
                                <div className="address flex gap-2 p-2">
                                    <span>location: {venue.district}, {venue.region}</span>
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
                                        {
                                            isLoading? (
                                                <Loader />
                                            ) : (
                                                <AddIcon />
                                            )
                                        }
                                        Create Session
                                    </button>
                                </div>
                                <div className="session-container mt-4 grid grid-cols-2 gap-3">
                                    {venue.sessions.length === 0 ? (
                                        <p>No sessions available</p>
                                    ) : (
                                        venue.sessions.map(session => (
                                            <div key={session.id} className="session-card shadow p-2 bg-blue-100 rounded">
                                                <p className='flex justify-between'><span className='font-bold'>Date:</span> {new Date(session.date).toDateString()}</p>
                                                <p className='flex justify-between'><span className='font-bold'>Start Time:</span> {session.startTime}</p>
                                                <p className='flex justify-between'><span className='font-bold'>End Time:</span>{session.endTime}</p>
                                                <p className='flex justify-between'><span className='font-bold'>Capacity:</span> {session.capacity}</p>
                                                <div className="button-container flex justify-between">
                                                    <button className='btn bg-red-400 rounded p-1' onClick={() => handleDeleteSession(session.id)}>Delete</button>
                                                    <button className='btn bg-blue-400 rounded p-1 text-white'>Booked users</button>
                                                </div>
                                            </div>
                                        ))
                                    )}

                                </div>
                                </div>
                            </Box>
                            </Grid>
                        </Grid>
                    </Box>

                ) : (
                    <div className="flex justify-center">
                    <div className="loader p-20 w-50">
                    <Loader  size="58" speed="1.75" color="blue" message="Loading..." />
                    </div>
                </div>
                )
            }
            
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
