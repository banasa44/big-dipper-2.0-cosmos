import LinearProgress from '@mui/material/LinearProgress';
import { useRecoilValue } from 'recoil';
import XrplLogoBlack from 'shared-utils/assets/xrpl-evm-black.svg';
import XrplLogoWhite from 'shared-utils/assets/xrpl-evm-white.svg';
import useStyles from '@/screens/initial_load/styles';
import { readTheme } from '@/recoil/settings';
import ChainIcon from '@/components/ChainIcon';

const InitialLoad = () => {
  const theme = useRecoilValue(readTheme);
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <ChainIcon type="logo" className={classes.logo} alt="logo" />
        </div>
        <LinearProgress className={classes.divider} />
        {theme === 'light' ? <XrplLogoBlack /> : <XrplLogoWhite />}
      </div>
    </div>
  );
};

export default InitialLoad;
