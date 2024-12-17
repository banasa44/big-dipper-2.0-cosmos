import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useAppTranslation from '@/hooks/useAppTranslation';
import numeral from 'numeral';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import Box from '@/components/box';
import Markdown from '@/components/markdown';
import Name from '@/components/name';
import SingleProposal from '@/components/single_proposal';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import { readDate, readTimeFormat } from '@/recoil/settings';
import type { OverviewType } from '@/screens/proposal_details/types';
import dayjs, { formatDayJs } from '@/utils/dayjs';
import useStyles from './styles';

const Overview: FC<{ className?: string; overview: OverviewType }> = ({ className, overview }) => {
  const dateFormat = useRecoilValue(readDate);
  const timeFormat = useRecoilValue(readTimeFormat);
  const { classes, cx } = useStyles();
  const { t } = useAppTranslation('proposals');

  const { address: proposerAddress, name: proposerName } = useProfileRecoil(overview.proposer);
  const proposerMoniker = proposerName || overview.proposer;

  return (
    <Box className={cx(classes.root, className)}>
      <SingleProposal
        id={`#${numeral(overview.id).format('0,0')}`}
        title={overview.title}
        status={overview.status}
      />
      <Divider />
      <div className={classes.content}>
        <Typography variant="body1" className="label">
          {t('proposer')}
        </Typography>
        <Name name={proposerMoniker} address={proposerAddress} />
        {overview?.submitTime && (
          <>
            <Typography variant="body1" className="label">
              {t('submitTime')}
            </Typography>
            <Typography variant="body1" className="value">
              {formatDayJs(dayjs.utc(overview.submitTime), dateFormat, timeFormat)}
            </Typography>
          </>
        )}
        {overview?.depositEndTime && (
          <>
            <Typography variant="body1" className="label">
              {t('depositEndTime')}
            </Typography>
            <Typography variant="body1" className="value">
              {formatDayJs(dayjs.utc(overview.depositEndTime), dateFormat, timeFormat)}
            </Typography>
          </>
        )}
        {overview?.votingStartTime && (
          <>
            <Typography variant="body1" className="label">
              {t('votingStartTime')}
            </Typography>
            <Typography variant="body1" className="value">
              {formatDayJs(dayjs.utc(overview.votingStartTime), dateFormat, timeFormat)}
            </Typography>
          </>
        )}
        {overview?.votingEndTime && (
          <>
            <Typography variant="body1" className="label">
              {t('votingEndTime')}
            </Typography>
            <Typography variant="body1" className="value">
              {formatDayJs(dayjs.utc(overview.votingEndTime), dateFormat, timeFormat)}
            </Typography>
          </>
        )}
        <Typography variant="body1" className="label">
          {t('description')}
        </Typography>
        <Markdown markdown={overview.description} />
      </div>
    </Box>
  );
};

export default Overview;
