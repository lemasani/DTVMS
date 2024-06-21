// import { useState } from 'react';

// export default function CreateVenue() {
//   const [venueName, setVenueName] = useState('');
//   const [district, setDistrict] = useState('');
//   const [region, setRegion] = useState('');
//   const [capacity, setCapacity] = useState('');
//   const [image, setImage] = useState('');
//   const [address, setAddress] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission here
//   };

//   return (

//     <>
//         <div className='form-container container w-25 border-blue-700 flex justify-center'>
//             <form onSubmit={handleSubmit} className=" flex flex-col" style={{width: "500px"}}>
//             <label htmlFor="venueName" className="block text-sm font-medium text-gray-700">
//                 Venue Name
//             </label>
//             <input
//                 id="venueName"
//                 type="text"
//                 required
//                 value={venueName}
//                 onChange={(e) => setVenueName(e.target.value)}
//                 className="mb-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
//                 placeholder="Venue Name"
//             />
//             <label htmlFor="district" className="block text-sm font-medium text-gray-700">
//                 District
//             </label>
//             <input
//                 id="district"
//                 required
//                 type="text"
//                 value={district}
//                 onChange={(e) => setDistrict(e.target.value)}
//                 className="mb-3  px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
//                 placeholder="District"
//             />
//             <label htmlFor="region" className="block text-sm font-medium text-gray-700">
//                 Region
//             </label>
//             <input
//                 id="region"
//                 required
//                 type="text"
//                 value={region}
//                 onChange={(e) => setRegion(e.target.value)}
//                 className="mb-3  px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
//                 placeholder="Region"
//             />
//             <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
//                 Capacity
//             </label>
//             <input
//                 id="capacity"
//                 required
//                 type="number"
//                 value={capacity}
//                 onChange={(e) => setCapacity(e.target.value)}
//                 className="mb-3  px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
//                 placeholder="Capacity"
//             />
//             <label htmlFor="image" className="block text-sm font-medium text-gray-700">
//                 Image
//             </label>
//             <input
//                 id="image"
//                 required
//                 type="file"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//                 className="mb-3  px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
//                 placeholder="Choose image"
//             />
//             <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                 Address
//             </label>
//             <textarea
//                 id="address"
//                 required
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 className="mb-3  px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
//                 placeholder="Address"
//             />
//             <button type="submit" className="mb-3  px-3 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none">
//                 Create Venue
//             </button>
//             </form>

//         </div>
//     </>
//   );
// }

import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

const CreateVenueDialog = ({
  open,
  onClose,
  venueName,
  setVenueName,
  district,
  setDistrict,
  region,
  setRegion,
  capacity,
  setCapacity,
  address,
  setAddress,
  handleImageChange,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Venue</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="venueName"
          label="Venue Name"
          type="text"
          fullWidth
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="district"
          label="District"
          type="text"
          fullWidth
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="region"
          label="Region"
          type="text"
          fullWidth
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="capacity"
          label="Capacity"
          type="text"
          fullWidth
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="image"
          label="Image"
          type="file"
          fullWidth
          onChange={(e) => handleImageChange(e)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="address"
          label="Address"
          type="text"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateVenueDialog;

CreateVenueDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  venueName: PropTypes.string.isRequired,
  setVenueName: PropTypes.func.isRequired,
  district: PropTypes.string.isRequired,
  setDistrict: PropTypes.func.isRequired,
  region: PropTypes.string.isRequired,
  setRegion: PropTypes.func.isRequired,
  capacity: PropTypes.string.isRequired,
  setCapacity: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
