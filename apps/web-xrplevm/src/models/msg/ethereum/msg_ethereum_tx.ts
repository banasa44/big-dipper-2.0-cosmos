import { Categories } from '@/models/types';

/* eslint-disable */
type MsgEthereumTxData = {
  type: string;
  chain_id: string;
  nonce: string;
  gas_tip_cap: string;
  gas_fee_cap: string;
  gas: string;
  to: string;
  value: string;
  data: string;
  accesses: any[];
  v: string;
  r: string;
  s: string;
};

class MsgEthereumTx {
  public category: Categories;

  public type: string;

  public data: MsgEthereumTxData[];

  public size: number;

  public hash: string;

  public from: string;

  constructor(type: string, data: MsgEthereumTxData[], size: number, hash: string, from: string) {
    this.category = 'xrpl-evm';
    this.type = type;
    this.data = data;
    this.size = size;
    this.hash = hash;
    this.from = from;
  }

  static fromJson(object: any): MsgEthereumTx {
    return new MsgEthereumTx(object['@type'], object.data, object.size, object.hash, object.from);
  }
}
/* eslint-enable */

export default MsgEthereumTx;
