import chainConfig from '@/chainConfig';
import useApollo from '@/graphql/useApollo';
import { useWindowOrigin } from '@/hooks/use_window';
import Main, { MainProps } from '@/screens/app/components/main';
import { useApp } from '@/screens/app/hooks';
import {
  ADDITIONAL_LINK_TAGS_SEO,
  ADDITIONAL_META_TAGS,
  OPEN_GRAPH_SEO,
  TWITTER_SEO,
} from '@/screens/app/utils';
import { ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { DefaultSeo } from 'next-seo';
import { RecoilRoot } from 'recoil';

const { title } = chainConfig();

function MyApp(props: MainProps<{ initialApolloState?: NormalizedCacheObject }>) {
  useApp();
  const { pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);
  const { location } = useWindowOrigin();

  return (
    <RecoilRoot>
      <DefaultSeo
        titleTemplate="XRPL EVM Governance"
        title={`XRPL EVM Governance | ${title}`}
        description="Explore the XRPL EVM Governance, a decentralized platform for community governance."
        openGraph={{
          title: 'XRPL EVM Governance',
          description:
            'Explore the XRPL EVM Governance, a decentralized platform for community governance.',
          url: location,
          ...OPEN_GRAPH_SEO,
        }}
        twitter={TWITTER_SEO}
        additionalLinkTags={ADDITIONAL_LINK_TAGS_SEO}
        additionalMetaTags={ADDITIONAL_META_TAGS}
      />
      <ApolloProvider client={apolloClient}>
        <Main {...props} />
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;
