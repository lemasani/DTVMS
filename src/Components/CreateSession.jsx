import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    } from '@mui/material';

   

const CreateSessionDialog = ({
    open,
    onClose,
    onSubmit,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    venueId,
    }) => {
    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create Session</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="venueId"
            type="text"
            fullWidth
            value={venueId}
            disabled
            />
            <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
                shrink: true,
            }}
            />
            <TextField
            autoFocus
            margin="dense"
            id="startTime"
            label="Start Time"
            type="text"
            fullWidth
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            />
            <TextField
            autoFocus
            margin="dense"
            id="endTime"
            label="End Time"
            type="text"
            fullWidth
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            />
        {/* <DateTimePicker
          onChange={setStartTime}
          value={new Date(startTime)}
          format="y-MM-dd HH:mm:ss"
        />
        <DateTimePicker
          onChange={setEndTime}
          value={new Date(endTime)}
          format="y-MM-dd HH:mm:ss"
        /> */}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit}>Create</Button>
        </DialogActions>
        </Dialog>
    );
};

export default CreateSessionDialog;

CreateSessionDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
    setDate: PropTypes.func.isRequired,
    startTime: PropTypes.string.isRequired,
    setStartTime: PropTypes.func.isRequired,
    endTime: PropTypes.string.isRequired,
    setEndTime: PropTypes.func.isRequired,
    venueId: PropTypes.string.isRequired,
};