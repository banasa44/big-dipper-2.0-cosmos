import { Categories } from '@/models/types';

/* eslint-disable */
type MsgSoftwareUpgradeBinaries = {
  'linux/amd64': string;
  'linux/arm64': string;
  'darwin/amd64': string;
  'darwin/arm64': string;
};

type MsgSoftwareUpgradePlan = {
  info: { binaries: MsgSoftwareUpgradeBinaries };
  name: string;
  time: string;
  height: string;
  upgraded_client_state: any;
};

class MsgSoftwareUpgrade {
  public category: Categories;

  public type: string;

  public plan: MsgSoftwareUpgradePlan;

  public authority: string;

  public json: object;

  constructor(
    type: string,
    category: Categories,
    plan: MsgSoftwareUpgradePlan,
    authority: string,
    json: any
  ) {
    this.type = type;
    this.category = category;
    this.plan = plan;
    this.authority = authority;
    this.json = json;
  }

  static fromJson(object: any): MsgSoftwareUpgrade {
    const message = {} as MsgSoftwareUpgrade;

    message.category = 'software';
    message.authority = object.authority;
    message.type = object['@type'];
    message.json = object;
    message.plan = { ...object.plan, info: JSON.parse(object.plan.info) };

    return message;
  }
}
/* eslint-enable */

export default MsgSoftwareUpgrade;
