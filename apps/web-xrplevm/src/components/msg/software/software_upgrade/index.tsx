import { MsgSoftwareUpgrade } from '@/models';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import useAppTranslation from 'ui/src/hooks/useAppTranslation';
import useStyles from '@/components/msg/software/software_upgrade/styles';

const SoftwareUpgrade = (props: { message: MsgSoftwareUpgrade }) => {
  const { message } = props;

  const { t } = useAppTranslation('message_contents');
  const { classes } = useStyles();

  return (
    <div>
      <Typography>
        {t('MsgSoftwareUpgrade', {
          version: message.plan.name,
          height: message.plan.height,
        })}
      </Typography>
      <div className={classes.binariesContainer}>
        {Object.keys(message.plan.info.binaries).map((key) => (
          <Link
            key={key}
            href={message.plan.info.binaries[key as keyof typeof message.plan.info.binaries]}
            target="_blank"
          >
            {key}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SoftwareUpgrade;
