import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useAppTranslation from '@/hooks/useAppTranslation';
import { FC, Fragment } from 'react';
import { formatNumber, formatSymbol } from '@/utils/format_token';
import type { OtherTokenType } from '@/screens/account_details/types';
import useStyles from '@/screens/account_details/components/other_tokens/components/mobile/styles';
import { CircularProgress, Link } from '@mui/material';
import chainConfig from '@/chainConfig';

type MobileProps = {
  className?: string;
  items?: OtherTokenType[];
  ibcParsingInProgress?: boolean;
  erc20ParsingInProgress?: boolean;
};

const explorerUrl = chainConfig().endpoints.blockExplorer;

const Mobile: FC<MobileProps> = ({
  className,
  items,
  ibcParsingInProgress,
  erc20ParsingInProgress,
}) => {
  const { classes } = useStyles();
  const { t } = useAppTranslation('accounts');
  return (
    <div className={className}>
      {items?.map((x, i) => {
        const available = formatNumber(x.available.value, x.available.exponent);
        const reward = x.reward ? formatNumber(x.reward.value, x.reward.exponent) : '';
        const commission = x.commission
          ? formatNumber(x.commission.value, x.commission.exponent)
          : '';
        const isLast = !items || i === items.length - 1;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={`votes-mobile-${i}`}>
            <div className={classes.list}>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('token')}
                </Typography>
                <Typography
                  variant="body1"
                  className="value"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {ibcParsingInProgress ? (
                    <CircularProgress size={16} />
                  ) : x.erc20Address ? (
                    <Link
                      href={`${explorerUrl}/token/${x.erc20Address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {x.denom.toUpperCase()}
                    </Link>
                  ) : (
                    <>
                      {x.denom.toUpperCase()}
                      {erc20ParsingInProgress ? (
                        <CircularProgress size={12} style={{ marginLeft: 4 }} />
                      ) : null}
                    </>
                  )}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('symbol')}
                </Typography>
                <Typography variant="body1" className="value">
                  {ibcParsingInProgress ? (
                    <CircularProgress size={16} />
                  ) : (
                    formatSymbol(x.parsedDenom)
                  )}
                </Typography>
              </div>

              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('available')}
                </Typography>
                <Typography variant="body1" className="value">
                  {available}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('reward')}
                </Typography>
                <Typography variant="body1" className="value">
                  {reward}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('commission')}
                </Typography>
                <Typography variant="body1" className="value">
                  {commission}
                </Typography>
              </div>
            </div>
            {!isLast && <Divider />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Mobile;
