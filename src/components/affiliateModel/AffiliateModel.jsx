import MuiBox from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useEventHandlers from "./useEventHandlers";

import css from "./AffiliateModel.module.css";
import Loader from "../loader/Loader";

const affiliateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .min(5, "Minimum 5 characters"),
  description: z.string().trim().min(1, "Description is required"),
  link: z.url("Enter a valid URL"),
});

function AffiliateModel(props) {
  const { open, handleClose } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(affiliateSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
    },
  });
  const { file, fileHandler, loading, submit } = useEventHandlers();
  if (loading) <Loader />;
  return (
    <MuiBox className={`${css.root} `}>
      <Dialog onClose={handleClose} open={open} fullWidth>
        <DialogTitle>Add Affiliate</DialogTitle>
        <MuiBox>
          <MuiBox className={css.textFieldContainer}>
            <TextField
              className={css.textField}
              id="outlined-basic"
              {...register("title")}
              label="Title"
              error={!!errors.title}
              variant="outlined"
              helperText={errors.title?.message}
            />
          </MuiBox>
          <MuiBox className={css.textFieldContainer}>
            <TextField
              className={css.textField}
              id="outlined-basic"
              {...register("description")}
              label="Description"
              error={!!errors.description}
              helperText={errors.description?.message}
              variant="outlined"
            />
          </MuiBox>
          <MuiBox className={css.textFieldContainer}>
            <TextField
              className={css.textField}
              id="outlined-basic"
              label="Link"
              {...register("link")}
              error={!!errors.link}
              helperText={errors.link?.message}
              variant="outlined"
            />
          </MuiBox>
          <MuiBox className={css.textFieldContainer}>
            <div className={css.button}>
              <label for="image" className={css.uploadButton}>
                Upload Image
              </label>
              <small>{file.name}</small>
              <input
                type="file"
                id="image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={fileHandler}
              />
            </div>
            <div className={css.button}>
              <Button
                variant="contained"
                disabled={isSubmitting}
                className={css.textField}
                onClick={handleSubmit(submit)}
              >
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
