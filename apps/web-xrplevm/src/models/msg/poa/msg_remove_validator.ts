import { Categories } from '@/models/types';

/* eslint-disable */
class MsgRemoveValidator {
  public category: Categories;

  public type: string;

  public authority: string;

  public validator_address: string;

  public json: object;

  constructor(
    type: string,
    category: Categories,
    authority: string,
    validator_address: string,
    json: any
  ) {
    this.type = type;
    this.category = category;
    this.authority = authority;
    this.validator_address = validator_address;
    this.json = json;
  }

  static fromJson(object: any): MsgRemoveValidator {
    const message = {} as MsgRemoveValidator;

    message.category = 'poa';
    message.authority = object.authority;
    message.type = object['@type'];
    message.json = object;
    message.validator_address = object.validator_address;

    return message;
  }
}
/* eslint-enable */

export default MsgRemoveValidator;
