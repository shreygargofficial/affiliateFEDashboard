import MuiBox from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import useEventhandler from "./useEventHandler";
import { endpoint } from "../../../endpoint/endpoint";
import Loader from "../loader/Loader";
import AffiliateModel from "../affiliateModel/AffiliateModel";

import css from "./Affiliate.module.css";

function AllAffiliate() {
  const {
    addClickHandler,
    affiliateData,
    dialogOpen,
    fetchAffiliateData,
    handleDelete,
    handleUpdate,
    loading,
    setDialogOpen,
  } = useEventhandler();

  useEffect(() => {
    fetchAffiliateData();
  }, []);
  if (loading) return <Loader />;
  return (
    <MuiBox className={css.root}>
      <h1>All Affiliates</h1>
      <AffiliateModel
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
      />
      <MuiBox className={css.floatButton} onClick={addClickHandler}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </MuiBox>
      <TableContainer component={Paper} className={css.container}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">AffiliateId</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">link</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {affiliateData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.affiliateId}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  <img
                    className={css.image}
                    src={`${endpoint}/public/images/${row.image}`}
                    alt={row.title}
                  />
                </TableCell>
                <TableCell align="right">{row.link}</TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    className={css.icon}
                    color="secondary"
                    onClick={handleDelete.bind(null, row.affiliateId)}
                  />
                </TableCell>
                <TableCell align="right">
                  <UpdateIcon
                    className={css.icon}
                    color="primary"
                    onClick={handleUpdate.bind(null, row.affiliateId)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MuiBox>
  );
}

export default AllAffiliate;
