import { DeleteVenue, PostVenue, fetchVenueList } from './../Components/Fetch';
import CreateVenueDialog from '../Components/CreateVenue';
import EditVenueDialog from '../Components/EditVenueDialog';
import axios from 'axios';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Utils/Auth';

//ICONS
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from '../Components/Loader';

export default function Venues() {
  useAuth()

  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showVenueForm, setShowVenueForm] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(null);

  //states for createVenueDialog
  const [venueName, setVenueName] = useState('');
  const [district, setDistrict] = useState('');
  const [region, setRegion] = useState('');
  const [capacity, setCapacity] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');

  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    // Check for supported file types
    const supportedFileTypes = ['image/jpeg', 'image/png'];
    if (!supportedFileTypes.includes(file.type)) {
      console.error('Unsupported file type');
      return;
    }

    // Check for file size
    const maxFileSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxFileSize) {
      console.error('File size exceeds the maximum limit');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('cloud_name', 'dyanv91td');
    formData.append('upload_preset', upload_preset);

    axios
      .post('https://api.cloudinary.com/v1_1/dyanv91td/image/upload', formData)
      .then((response) => setImage(response.data.url.toString()))
      .catch((err) => {
        console.error(err);
        // Set the error in your component's state
        // setError(err.message);
      });
  };
  //submit and validation for createVenueDialog
  const handleCreateVenue = async (e) => {
    e.preventDefault();
    if (!venueName || !district || !region || !capacity || !address || !image) {
      alert('Please fill in all fields.');
      return;
    }

    await PostVenue(venueName, district, region, capacity, address, image);
    fetchVenues();
  };

  const fetchVenues = async () => {
    setIsLoading(true);
    try {
      const venues = await fetchVenueList();
      setVenues(venues);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const openVenueForm = () => {
    console.log('Open Venue Form');
    setShowVenueForm((prevState) => !prevState);
  };

  const handleEditClick = (venue) => {
    setCurrentVenue(venue);
    setOpenEditDialog(true);
  };
  const handleUpdateVenue = () => {
    // Make a request to your API to update the venue
    // After the request is successful, you can close the dialog
    setOpenEditDialog(false);
  };

  const handleDeleteClick = async (venueId) => {
    console.log('Delete Venue', venueId);
    const success = await DeleteVenue(venueId);
    if (success) {
        setVenues(venues.filter(venue => venue.id !== venueId));
    }
};

  const navigate = useNavigate()
  const handleViewMoreClick =(venueId) =>{
    console.log('View More', venueId);
    navigate(`/venues/${venueId}`)
  }

  return (
    <div className="container">
      <div className="heading flex justify-between p-10">
        <h1 className="text-lg font-bold">Venues</h1>
        <button
          className="btn bg-blue-700 py-3 px-2 rounded text-stone-50"
          onClick={openVenueForm}
        >
          <AddIcon /> Create Venue
        </button>
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
          handleImageChange={handleImageChange}
          onSubmit={handleCreateVenue}
        />
      ) : (
        <>
          <div className="filter-options flex justify-around p-4">
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2"
              placeholder="Filter"
            />
            <button className="btn bg-blue-700 py-2 px-2 rounded text-white">
              Filter
            </button>
          </div>
          <div className="venue-grid container m-4">
            {isLoading ? (
              <div className="flex justify-center">
                <div className="loader p-20 w-50">
                <Loader  size="58" speed="1.75" color="blue" message="Loading..." />
                </div>
              </div>
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
                  {venues.map((venue) => (
                    <tr key={venue.id}>
                      <td className="border px-4 py-2">{venue.name}</td>
                      <td className="border px-4 py-2">{venue.district}</td>
                      <td className="border px-4 py-2">{venue.region}</td>
                      <td className="border px-4 py-2 flex gap-4">
                        <button
                          className="btn bg-blue-700 p-2 rounded text-white"
                          title="Edit"
                          onClick={() => handleEditClick(venue)}
                        >
                          <EditIcon />
                        </button>
                        <button
                          className="btn bg-red-700 p-2 rounded text-white"
                          title="Delete"
                          onClick={() => handleDeleteClick(venue.id)}
                        >
                          <DeleteOutlineIcon />
                        </button>
                        <button
                          className="btn bg-green-700 p-2 rounded text-white"
                          title="View More"
                          onClick={()=> handleViewMoreClick(venue.id)}
                        >
                          <VisibilityIcon />
                        </button>
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
      )}
    </div>
  );
}
