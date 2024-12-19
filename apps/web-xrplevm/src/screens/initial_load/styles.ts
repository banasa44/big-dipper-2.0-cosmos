import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    minWidth: '100vw',
    padding: theme.spacing(6),
    position: 'fixed',
    zIndex: 10000000,
    backgroundColor: theme.palette.background.default,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '300px',
    },
  },
  divider: {
    margin: theme.spacing(2, 0),
    width: '100%',
  },
}));

export default useStyles;
