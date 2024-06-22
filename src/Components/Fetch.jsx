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

//function to post venue 
export async function PostVenue(venueName, district, region, capacity, address, image){
    try {
        const response = await axios.post('api/venue', {
          name: venueName,
          districtId: district,
          regionId: region,
          capacity: capacity,
          address: address,
          imageUrl: image
        });
    
        if (response.status === 200) {
          alert('Venue created successfully');
           // Refresh the venue list
        } else {
          alert('Error creating venue');
        }
      } catch (error) {
        console.error('Error creating venue: ', error);
        alert('Error creating venue');
      }
}

export async function DeleteVenue(venueId){
    try {
        const id = venueId
        const response = await axios.delete(`api/venue/${id}`);
        console.log(response)
        return response.status === 200;
    } catch (error) {
        console.log('something went wrong',error);
        return false;
    }
}


export async function FetchVenue(venueId){
    try {
        const id = venueId
        const response = await axios.get(`api/venue/${id}`);
        console.log(response.data.value)
        return response.data.value;
    } catch (error) {
        console.log('something went wrong',error);
        return false;
    }
}


//sessions
export async function PostSession(venueId, date, startTime, endTime){
    try {
        const response = await axios.post('api/session', {
            date: date,
            startTime: startTime,
            endTime: endTime,
            venueId: venueId
        });
    
        if (response.status === 200) {
          alert('Session created successfully');
           // Refresh the venue list
        }
      } catch (error) {
        console.error('Error creating venue: ', error);
        alert('Error creating venue');
      }
}