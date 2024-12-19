import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  binariesContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
  },
}));

export default useStyles;
