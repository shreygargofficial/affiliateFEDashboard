import MuiBox from "@mui/material/Box";
import css from "./Loader.module.css";

function Loader() {
  return (
    <MuiBox className={css.root}>
      <div className={css.loader}></div>
    </MuiBox>
  );
}

export default Loader;
