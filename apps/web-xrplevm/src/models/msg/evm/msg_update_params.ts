import { Categories } from '@/models/types';

/* eslint-disable */
type UpdateParams = {
  evm_denom: string;
  extra_eips: string[];
  chain_config: {
    eip150_hash: string;
    berlin_block: string;
    cancun_block: string;
    eip150_block: string;
    eip155_block: string;
    eip158_block: string;
    london_block: string;
    dao_fork_block: string;
    istanbul_block: string;
    shanghai_block: string;
    byzantium_block: string;
    homestead_block: string;
    dao_fork_support: boolean;
    petersburg_block: string;
    gray_glacier_block: string;
    muir_glacier_block: string;
    arrow_glacier_block: string;
    constantinople_block: string;
    merge_netsplit_block: string;
  };
  evm_channels: string[];
  access_control: {
    call: {
      access_type: string;
      access_control_list: any[];
    };
    create: {
      access_type: string;
      access_control_list: any[];
    };
  };
  allow_unprotected_txs: boolean;
  active_static_precompiles: string[];
};

class MsgUpdateParams {
  public category: Categories;

  public type: string;

  public params: UpdateParams;

  public authority: string;

  public json: object;

  constructor(
    type: string,
    category: Categories,
    params: UpdateParams,
    authority: string,
    json: any
  ) {
    this.type = type;
    this.category = category;
    this.params = params;
    this.authority = authority;
    this.json = json;
  }

  static fromJson(object: any): MsgUpdateParams {
    const message = {} as MsgUpdateParams;

    message.category = 'evm';
    message.authority = object.authority;
    message.type = object['@type'];
    message.json = object;
    message.params = object.params;

    return message;
  }
}
/* eslint-enable */

export default MsgUpdateParams;
