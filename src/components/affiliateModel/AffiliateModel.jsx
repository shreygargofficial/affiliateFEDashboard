import MuiBox from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import css from "./AffiliateModel.module.css";

function AffiliateModel(props) {
  const { open, handleClose } = props;
  return (
    <MuiBox className={`${css.root} `}>
      <Dialog onClose={handleClose} open={open} fullWidth>
        <DialogTitle>Add Affiliate</DialogTitle>
        <MuiBox>
          <MuiBox className={css.textFieldContainer}>
            <TextField
              className={css.textField}
              id="outlined-basic"
              label="Title"
              variant="outlined"
            />
          </MuiBox>
          <MuiBox className={css.textFieldContainer}>
            <TextField
              className={css.textField}
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
          </MuiBox>
          <MuiBox className={css.textFieldContainer}>
            <TextField
              className={css.textField}
              id="outlined-basic"
              label="Link"
              variant="outlined"
            />
          </MuiBox>
          <MuiBox className={css.textFieldContainer}>
            <div className={css.button}>
              <Button variant="outlined" className={css.textField}>
                upload image
              </Button>
            </div>
            <div className={css.button}>
              <Button variant="contained" className={css.textField}>
                Submit
              </Button>
            </div>
          </MuiBox>
        </MuiBox>
      </Dialog>
    </MuiBox>
  );
}

export default AffiliateModel;
