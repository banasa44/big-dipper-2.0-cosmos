import { Categories } from '@/models/types';

type Pubkey = {
  key: string;
  type: string;
};

type Description = {
  moniker: string;
  identity?: string;
  website?: string;
  security_contact?: string;
  details?: string;
};

/* eslint-disable */
class MsgAddValidator {
  public category: Categories;

  public type: string;

  public pubkey: Pubkey;

  public authority: string;

  public description: Description;

  public validator_address: string;

  public json: object;

  constructor(
    type: string,
    category: Categories,
    authority: string,
    validator_address: string,
    pubkey: Pubkey,
    description: Description,
    json: any
  ) {
    this.type = type;
    this.category = category;
    this.authority = authority;
    this.validator_address = validator_address;
    this.pubkey = pubkey;
    this.description = description;
    this.json = json;
  }

  static fromJson(object: any): MsgAddValidator {
    const message = {} as MsgAddValidator;

    message.category = 'poa';
    message.authority = object.authority;
    message.type = object['@type'];
    message.json = object;
    message.validator_address = object.validator_address;
    message.pubkey = object.pubkey;
    message.description = object.description;

    return message;
  }
}
/* eslint-enable */

export default MsgAddValidator;
