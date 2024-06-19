import axios from './../Axios/axios'

// Function to fetch the number of venues
export async function fetchVenueCount() {
    try {
        const response = await axios.get('api/venues');
        console.log('No of venues',response.data.value.length);
        return response.data.value.length;
    } catch (error) {
        console.error('Error fetching venue count:', error);
        return 0;
    }
}

// Function to fetch the list of venues
export async function fetchVenueList() {
    try {
        const response = await axios.get('api/venues');
        console.log(response.data.value);
        return response.data.value;
    } catch (error) {
        console.error('Error fetching venue list:', error);
        return [];
    }
}