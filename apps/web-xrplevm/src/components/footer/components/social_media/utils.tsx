import { ReactNode } from 'react';
import { DiscordIcon, GithubIcon, XIcon } from '@/components/icons';

export const socialMediaLinks: {
  component: ReactNode;
  className: string;
  url: string;
}[] = [
  {
    component: <XIcon />,
    className: 'x',
    url: 'https://x.com/Peersyst ',
  },
  {
    component: <GithubIcon />,
    className: 'github',
    url: 'https://github.com/xrplevm',
  },
  {
    component: <DiscordIcon />,
    className: 'discord',
    url: 'https://discord.com/invite/xrplevm',
  },
];
