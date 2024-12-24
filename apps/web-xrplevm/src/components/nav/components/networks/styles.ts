import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  networkList: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    '& img': {
      width: '25px',
      marginRight: theme.spacing(2),
    },
    '& .network': {
      flex: 1,
      minWidth: 0,
    },
  },
}));

export default useStyles;
