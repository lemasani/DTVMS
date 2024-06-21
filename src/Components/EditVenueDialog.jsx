import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

const EditVenueDialog = ({ open, onClose, currentVenue, onUpdate }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Venue</DialogTitle>
      <DialogContent>
        {currentVenue && (
          <>
            <TextField
                autoFocus
                label="Venue Name"
                margin="dense"
                fullWidth
                id="venueName"
                type="text"
                defaultValue={currentVenue.name}
            />
            <TextField
                label="District"
                autoFocus
                margin="dense"
                type="text"
                defaultValue={currentVenue.district}
            />
            <TextField
                label="Region"
                margin="dense"
                autoFocus
                defaultValue={currentVenue.region}
            />
            <TextField
                label="Capacity"
                margin="dense"
                autoFocus
                defaultValue={currentVenue.capacity}
            />
            {/* <TextField label="Address" defaultValue={currentVenue.address} /> */}
            <TextField
                label="Image"
                margin="dense"
                autoFocus
                defaultValue={currentVenue.image}
            />

            {/* Add more fields as necessary */}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditVenueDialog;

EditVenueDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentVenue: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};
