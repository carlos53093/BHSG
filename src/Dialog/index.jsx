import {Dialog, DialogContent, DialogTitle, IconButton, Box} from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';

const PopupDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=>{
    if(props.open !== open) {
      setOpen(props.open);
    }
  },[props.open])

  const handleClose = () => {
    setOpen(false);
    props.onClose && props.onClose();
  };
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={props.maxWidth}
        style={props.style}
        className={props.className}
      >
        <DialogTitle id="alert-dialog-title" style={props.titleStyle}>
          <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
            <span>{props.title}</span>
            <IconButton onClick={handleClose}>
                <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {props.children}
        </DialogContent>
      </Dialog>
    )
}

export default PopupDialog