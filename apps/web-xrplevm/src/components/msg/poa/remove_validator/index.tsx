import { MsgRemoveValidator } from '@/models';
import { Typography } from '@mui/material';
import useAppTranslation from 'ui/src/hooks/useAppTranslation';

const RemoveValidator = (props: { message: MsgRemoveValidator }) => {
  const { message } = props;

  const { t } = useAppTranslation('message_contents');

  return <Typography>{t('MsgRemoveValidator', { address: message.validator_address })}</Typography>;
};

export default RemoveValidator;
