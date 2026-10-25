import CircularProgress from "@mui/material/CircularProgress";
import MuiBox from "@mui/material/Box";
import css from "./Loader.module.css";

function Loader() {
  return (
    <MuiBox className={css.root}>
      <CircularProgress
        className={css.loader}
        color="secondary"
        aria-label="Loading…"
      />
    </MuiBox>
  );
}

export default Loader;
