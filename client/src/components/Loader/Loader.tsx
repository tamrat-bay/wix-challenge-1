import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from  './useStyles'


export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}