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

  public data: MsgEthereumTxData;

  public size: number;

  public hash: string;

  public from: string;

  public json: object;

  constructor(
    type: string,
    data: MsgEthereumTxData,
    size: number,
    hash: string,
    from: string,
    json: any
  ) {
    this.category = 'ethereum';
    this.type = type;
    this.data = data;
    this.size = size;
    this.hash = hash;
    this.from = from;
    this.json = json;
  }

  static fromJson(object: any): MsgEthereumTx {
    const message = {} as MsgEthereumTx;

    message.category = 'ethereum';
    message.type = object['@type'];
    message.data = object.data;
    message.size = object.size;
    message.hash = object.hash;
    message.from = object.from;
    message.json = object;

    return message;
  }
}
/* eslint-enable */

export default MsgEthereumTx;
