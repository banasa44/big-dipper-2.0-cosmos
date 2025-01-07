import { Typography } from '@mui/material';
import useAppTranslation from 'ui/src/hooks/useAppTranslation';

const UpdateParams = () => {
  const { t } = useAppTranslation('message_contents');

  return <Typography>{t('MsgUpdateParams')}</Typography>;
};

export default UpdateParams;
