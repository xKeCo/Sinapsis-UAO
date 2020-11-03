import React from "react";
import { Paper, IconButton, InputBase, Divider, makeStyles } from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
// import DirectionsIcon from "@material-ui/icons/Directions";
import TuneIcon from "@material-ui/icons/Tune";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "auto",
    border: "1px solid rgba(0,0,0,0.20)",
    boxShadow: "unset !important",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Searchbar() {
  const classes = useStyles();
  return (
    <div>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Busca un emprendedor"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton color="primary" className={classes.iconButton} aria-label="directions">
          <TuneIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          // type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
