import { TokenomicsDocument } from '@/graphql/types/general_types';
import Tokenomics from '@/screens/home/components/tokenomics';
import { mockClient } from '@/tests/mocks/mockApollo';
import MockTheme from '@/tests/mocks/MockTheme';
import wait from '@/tests/utils/wait';
import { ApolloProvider } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { waitFor, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';

// ==================================
// mocks
// ==================================
jest.mock('@/components/box', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="box" {...props} />
));
// to fix error, this.wrapperNode is null node_modules/recharts/src/component/Tooltip.tsx:143
jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  Tooltip: () => <div id="test-tooltip" />,
}));

jest.mock('@/hooks/use_parse_ibc_denom', () => {
  const mockFn = jest.fn((denom) => {
    if (denom === 'ibc/HASH123') return 'uosmo';
    return denom;
  });

  return {
    useFetchParseIbcDenom: mockFn,
  };
});

jest.mock('@/utils/parse_ibc', () => ({
  isIbcDenom: jest.fn((denom) => denom.startsWith('ibc/')),
  extractIbcHash: jest.fn((denom) => denom.replace(/^ibc\//i, '')),
  fetchParseIbcDenom: jest.fn(async (denom) => {
    if (denom === 'ibc/HASH123') return 'uosmo';
    return denom;
  }),
}));

const mockTokenomics = jest.fn().mockReturnValue({
  data: {
    stakingParams: [
      {
        params: {
          bond_denom: 'udsm',
          max_entries: 7,
          max_validators: 125,
          unbonding_time: 1209600000000000,
          historical_entries: 10000,
        },
      },
    ],
    stakingPool: [
      {
        bonded: 254578529800,
        unbonded: 204887435198,
      },
    ],
    supply: [
      {
        coins: [
          {
            denom: 'udaric',
            amount: '7987725829900',
          },
          {
            denom: 'upotin',
            amount: '80000000000000',
          },
        ],
      },
    ],
  },
});

// ==================================
// unit tests
// ==================================
describe('screen: Home/Tokenomics', () => {
  it('matches snapshot', async () => {
    let component: renderer.ReactTestRenderer | undefined;

    renderer.act(() => {
      component = renderer.create(
        <ApolloProvider client={mockClient}>
          <MockedProvider
            mocks={[{ request: { query: TokenomicsDocument }, result: mockTokenomics }]}
          >
            <MockTheme>
              <Tokenomics />
            </MockTheme>
          </MockedProvider>
        </ApolloProvider>
      );
    });
    await wait(renderer.act);

    const tree = component?.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('correctly parses IBC denoms in UI', async () => {
    const ibcMockTokenomics = {
      data: {
        stakingParams: [{ params: { bond_denom: 'ibc/HASH123' } }],
        stakingPool: [{ bonded: 254578529800, unbonded: 204887435198 }],
        supply: [{ coins: [{ denom: 'ibc/HASH123', amount: '7987725829900' }] }],
      },
    };

    const { container } = render(
      <ApolloProvider client={mockClient}>
        <MockedProvider
          mocks={[{ request: { query: TokenomicsDocument }, result: ibcMockTokenomics }]}
        >
          <MockTheme>
            <Tokenomics />
          </MockTheme>
        </MockedProvider>
      </ApolloProvider>
    );

    const hookMock = require('@/hooks/use_parse_ibc_denom').useFetchParseIbcDenom;

    await waitFor(() => {
      expect(hookMock).toHaveBeenCalledWith('ibc/HASH123');
      expect(
        hookMock.mock.results.find(
          (r: { type: string; value: any }) => r.type === 'return' && r.value === 'uosmo'
        )
      ).toBeTruthy();
    });

    expect(container.textContent).not.toMatch(/ibc\/HASH123/i);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
