import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function EntityNewAdmin() {
  const params = useParams();
  const entity = params.entity;
  console.log("entity is:", entity);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h5>This is the entity admin Dashboard</h5>
    </div>
  );
}

export default EntityNewAdmin;
