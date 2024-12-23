import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import XrplLogoBlack from 'shared-utils/assets/xrpl-evm-black.svg';
import XrplLogoWhite from 'shared-utils/assets/xrpl-evm-white.svg';
import Box from '@/components/box';
import useStyles from '@/components/nav/components/desktop/components/action_bar/components/network_list/styles';
import Networks from '@/components/nav/components/networks';
import { readTheme } from '@/recoil/settings';

type NetworkListProps = {
  className?: string;
  actionHeight?: number;
};

const NetworkList: FC<NetworkListProps> = ({ className, actionHeight }) => {
  const { classes, cx } = useStyles();
  const theme = useRecoilValue(readTheme);

  return (
    <Box className={cx(classes.root, className)}>
      <div
        style={{
          height: actionHeight,
        }}
      >
        {theme === 'light' ? <XrplLogoBlack /> : <XrplLogoWhite />}
      </div>
      <Networks className={classes.content} />
    </Box>
  );
};

export default NetworkList;
