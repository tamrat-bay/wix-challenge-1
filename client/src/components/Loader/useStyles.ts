import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    height: "34vh",
  },
}),
);

