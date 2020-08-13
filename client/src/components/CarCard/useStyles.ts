import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    root: {
      maxWidth: "100%",
      marginTop: 5,
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      flexDirection: "column",
      padding: 10,
    },
    media: {
      height: 150,
      width: 300,
    },
  });