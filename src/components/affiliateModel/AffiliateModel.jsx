import { useEffect, useState } from "react";
import MuiBox from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockResetIcon from "@mui/icons-material/LockResetOutlined";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useEventHandlers from "./useEventHandlers";

import css from "./AffiliateModel.module.css";
import Loader from "../loader/Loader";
import { endpoint } from "../../../endpoint/endpoint";

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
  const { handleClose, id } = props;
  const [affiliateData, setAffiliateData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(affiliateSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
    },
  });
  const { error, file, fileHandler, loading, resetHandler, submit } =
    useEventHandlers({
      affiliateData,
      handleClose,
      reset,
    });

  useEffect(() => {
    const fetchAffiliateDataById = async () => {
      const response = await fetch(`${endpoint}/api/getAffiliateById/${id}`);
      const myData = await response.json();
      setAffiliateData(myData);
      reset({
        title: myData.title || "",
        description: myData.description || "",
        link: myData.link || "",
      });
    };
    fetchAffiliateDataById();
  }, []);

  if (loading) <Loader />;
  return (
    <MuiBox className={`${css.root} `}>
      <Dialog onClose={handleClose} open={true} fullWidth>
        <DialogTitle>{id ? "Update Affiliate" : "Add Affilate"}</DialogTitle>
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
            {!id && (
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
            )}
            {id && (
              <MuiBox sx={{ marginBottom: "10px", textAlign: "center" }}>
                <LockResetIcon color="primary" onClick={resetHandler} />
              </MuiBox>
            )}
            <div className={css.button}>
              <Button
                variant="contained"
                disabled={isSubmitting}
                className={css.textField}
                onClick={
                  id
                    ? handleSubmit(submit.bind(null, id))
                    : handleSubmit(submit)
                }
              >
                {id ? "Update" : "Add"}
              </Button>
              <small className={css.error}>{error}</small>
            </div>
          </MuiBox>
        </MuiBox>
      </Dialog>
    </MuiBox>
  );
}

export default AffiliateModel;
