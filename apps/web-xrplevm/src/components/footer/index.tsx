import SocialMedia from '@/components/footer/components/social_media';
import useStyles from '@/components/footer/styles';
import Divider from '@mui/material/Divider';

import useAppTranslation from '@/hooks/useAppTranslation';
import { FC } from 'react';
import { PeersystIcon } from '@/components/icons';

const Footer: FC<{ className?: string }> = ({ className }) => {
  const { t } = useAppTranslation();
  const { classes, cx } = useStyles();

  return (
    <footer className={cx(classes.root, className)}>
      <div className="footer">
        {/* links */}
        {/* ============================= */}
        <div className="footer__links">
          <div>
            <PeersystIcon />
            <p className="xrp_text">
              The XRP Ledger Ethereum Virtual Machine (EVM) sidechain is a fast and secure
              blockchain that brings web3 applications to the XRP Ledger community.
            </p>
          </div>
          <div />
          {/* ============================= */}
          {/* social */}
          {/* ============================= */}
          <div className="footer__social">
            <h3>{t('common:community')}</h3>
            <SocialMedia />
          </div>
          <div className="unColor" />
        </div>
      </div>
      <Divider />
    </footer>
  );
};

export default Footer;
