import SingleNetwork from '@/components/nav/components/networks/components/single_network';
import useStyles from '@/components/nav/components/networks/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { FC } from 'react';

const Networks: FC<ComponentDefault> = ({ className }) => {
  const { classes } = useStyles();

  interface NetworkUrl {
    chainId: string;
    url: string;
    name: string;
  }

  interface Network {
    logo: string;
    name: string;
    mainnet: NetworkUrl[];
    testnet: NetworkUrl[];
    retired: NetworkUrl[];
    other: NetworkUrl[];
  }

  const networks: Network[] = [
    {
      logo: '/xrplevm/images/xrpl-evm-logo.png',
      name: 'XRPL',
      mainnet: [
        {
          chainId: 'xrpl-mainnet',
          url: 'https://livenet.xrpl.org/',
          name: 'Mainnet',
        },
      ],
      testnet: [
        {
          chainId: 'xrpl-testnet',
          url: 'https://testnet.xrpl.org/',
          name: 'Testnet',
        },
      ],
      retired: [],
      other: [
        {
          chainId: 'xrpl-devnet',
          url: 'https://explorer.xrplevm.org/',
          name: 'Devnet',
        },
      ],
    },
  ];
  return (
    <div className={className}>
      {networks.map((x) => (
        <div className={classes.networkList} key={x.name}>
          <Image
            width={6}
            height={26}
            className={classes.img}
            src={x.logo}
            alt="logo"
            unoptimized
          />
          <div className="network">
            <Typography variant="h4">{x.name}</Typography>
            {x.mainnet.map((network) => (
              <SingleNetwork
                className="mainnet"
                key={network.chainId}
                url={network.url}
                name={network.name}
                chainId={network.chainId}
              />
            ))}
            {x.testnet.map((network) => (
              <SingleNetwork
                className="testnet"
                key={network.chainId}
                url={network.url}
                name={network.name}
                chainId={network.chainId}
              />
            ))}
            {x.retired.map((network) => (
              <SingleNetwork
                className="retired"
                key={network.chainId}
                url={network.url}
                name={network.name}
                chainId={network.chainId}
              />
            ))}
            {x.other.map((network) => (
              <SingleNetwork
                className="other"
                key={network.chainId}
                url={network.url}
                name={network.name}
                chainId={network.chainId}
                disabled
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Networks;
