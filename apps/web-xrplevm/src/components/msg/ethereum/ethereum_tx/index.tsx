import { MsgEthereumTx } from '@/models';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import useAppTranslation from 'ui/src/hooks/useAppTranslation';

const EthereumTx = (props: { message: MsgEthereumTx }) => {
  const { message } = props;

  const { t: tMessage } = useAppTranslation('message_contents');
  const { t: tHome } = useAppTranslation('home');

  return (
    <>
      <Typography>
        {tMessage('MsgEthereumTx', {
          to: message.data.to,
          value: message.data.value,
        })}
      </Typography>
      <Link href={`https://explorer.xrplevm.org/tx/${message.hash}`} target="_blank">
        {tHome('seeMore')}
      </Link>
    </>
  );
};

export default EthereumTx;
