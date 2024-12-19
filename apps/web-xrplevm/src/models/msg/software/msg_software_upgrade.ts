// {
// 	"plan": {
// 		"info": "{\"binaries\":{\"linux/amd64\":\"https://github.com/Peersyst/exrp/releases/download/v5.0.0/node_5.0.0_Linux_amd64.tar.gz\",\"linux/arm64\":\"https://github.com/Peersyst/exrp/releases/download/v5.0.0/node_5.0.0_Linux_arm64.tar.gz\",\"darwin/amd64\":\"https://github.com/Peersyst/exrp/releases/download/v5.0.0/node_5.0.0_Darwin_amd64.tar.gz\",\"darwin/arm64\":\"https://github.com/Peersyst/exrp/releases/download/v5.0.0/node_5.0.0_Darwin_arm64.tar.gz\"}}",
// 		"name": "v5.0.0",
// 		"time": "0001-01-01T00:00:00Z",
// 		"height": "13242557",
// 		"upgraded_client_state": null
// 	},
// 	"@type": "/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade",
// 	"authority": "ethm10d07y265gmmuvt4z0w9aw880jnsr700jpva843"
// }

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
    console.log('MsgSoftwareUpgrade - constructor', plan);
    this.type = type;
    this.category = category;
    this.plan = plan;
    this.authority = authority;
    this.json = json;
  }

  static fromJson(object: any): MsgSoftwareUpgrade {
    const message = {} as MsgSoftwareUpgrade;

    message.category = 'xrpl-evm';
    message.authority = object.authority;
    message.type = object['@type'];
    message.json = object;
    message.plan = { ...object.plan, info: JSON.parse(object.plan.info) };

    return message;
  }
}
/* eslint-enable */

export default MsgSoftwareUpgrade;
