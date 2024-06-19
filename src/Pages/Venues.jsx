import { fetchVenueList } from './../Components/Fetch'
import CreateVenueDialog from '../Components/CreateVenue';
import EditVenueDialog from '../Components/EditVenueDialog';



import { useState, useEffect } from 'react'

//ICONS
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';




export default function Venues() {

  const [venues, setVenues] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showVenueForm, setShowVenueForm] = useState(false)

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(null);

  //states for createVenueDialog
  const [venueName, setVenueName] = useState('')
  const [district, setDistrict] = useState('')
  const [region, setRegion] = useState('');
  const [capacity, setCapacity] = useState('');
  const [address, setAddress] = useState('')
  const [image, setImage] = useState(null);

  //submit and validation for createVenueDialog
  const handleCreateVenue = () =>{
    if(region && capacity && image){
      setShowVenueForm(false)
      setRegion('')
      setCapacity('')
      setImage(null)
    }
  }

  const fetchVenues = async () => {
    setIsLoading(true)
    try {
      const venues = await fetchVenueList()
      setVenues(venues)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchVenues()
  }, [])

  const openVenueForm = ()=> {
    console.log('Open Venue Form')
    setShowVenueForm(prevState => !prevState)
  }

  const handleEditClick = (venue) => {
    setCurrentVenue(venue);
    setOpenEditDialog(true);
  };
  const handleUpdateVenue = () => {
    // Make a request to your API to update the venue
    // After the request is successful, you can close the dialog
    setOpenEditDialog(false);
  };
return (
  <div className="container">
    <div className="heading flex justify-between p-10">
      <h1 className='text-lg font-bold'>Venues</h1>
      <button className='btn bg-blue-700 py-3 px-2 rounded text-stone-50' onClick={openVenueForm}><AddIcon/> Create Venue</button>
    </div>
    {showVenueForm ? (
      <CreateVenueDialog
      open={showVenueForm}
      onClose={() => setShowVenueForm(false)}
      venueName={venueName}
      setVenueName={setVenueName}
      district={district}
      setDistrict={setDistrict}
      region={region}
      setRegion={setRegion}
      capacity={capacity}
      setCapacity={setCapacity}
      address={address}
      setAddress={setAddress}
      image={image}
      setImage={setImage}
      onSubmit={handleCreateVenue}
    />
    ) : (
      <>

        <div className="filter-options flex justify-around p-4">
          <input type="text" className="border border-gray-300 rounded px-4 py-2" placeholder="Filter" />
          <button className="btn bg-blue-700 py-2 px-2 rounded text-white">Filter</button>
        </div>
        <div className="venue-grid container m-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Venue name</th>
                  <th className="px-4 py-2">District</th>
                  <th className="px-4 py-2">Region</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {venues.map(venue => (
                  <tr key={venue.id}>
                    <td className="border px-4 py-2">{venue.name}</td>
                    <td className="border px-4 py-2">{venue.district}</td>
                    <td className="border px-4 py-2">{venue.region}</td>
                    <td className="border px-4 py-2 flex gap-4">
                    <button className="btn bg-blue-700 p-2 rounded text-white" title='Edit' onClick={() => handleEditClick(venue)}><EditIcon /></button>
                      <button className="btn bg-red-700 p-2 rounded text-white" title='Delete'><DeleteOutlineIcon /></button>
                      <button className="btn bg-green-700 p-2 rounded text-white" title='View More'><VisibilityIcon /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <EditVenueDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          currentVenue={currentVenue}
          onUpdate={handleUpdateVenue}
        />
      
      </>
    )

    }
  </div>
)
}