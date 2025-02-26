import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    width: '100%',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(3, 0),
    '& p': {
      flex: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginRight: theme.spacing(1),
    },
  },
  status: {
    padding: theme.spacing(0.5, 1),
    color: 'white',
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.custom.general.icon,
    '&.devnet': {
      background: theme.palette.custom.primaryData.four,
      pointerEvents: 'none',
      cursor: 'default',
      opacity: 0.5,
    },
    '&.testnet': {
      background: theme.palette.custom.primaryData.one,
    },
    '&.mainnet': {
      background: theme.palette.grey[500],
    },
  },
}));

export default useStyles;
