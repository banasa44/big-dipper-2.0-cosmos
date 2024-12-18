import { MsgEthereumTx } from '@/models';
import Typography from '@mui/material/Typography';

const EthereumTx = (props: { message: MsgEthereumTx }) => {
  const { message } = props;

  return <Typography>{message.category}</Typography>;
};

export default EthereumTx;
