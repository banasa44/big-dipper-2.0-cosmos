import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useTransactionDetails } from './hooks';
import { TransactionDetailsDocument } from '@/graphql/types/general_types';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { tx: '7D373DE5C5FB03EA72006F6CEC8F908545D435AE1C598A1B53AD0770C243822A' },
  }),
}));

jest.mock('@/utils/parse_ibc', () => {
  const mockFetchParseIbcDenom = jest.fn(async (denom) => {
    if (denom === 'ibc/HASH123') return 'uosmo';
    return denom;
  });

  return {
    isIbcDenom: jest.fn((denom) => denom.startsWith('ibc/')),
    fetchParseIbcDenom: mockFetchParseIbcDenom,
  };
});

describe('useTransactionDetails', () => {
  let mockFetchParseIbcDenom: jest.Mock;

  beforeEach(() => {
    mockFetchParseIbcDenom = require('@/utils/parse_ibc').fetchParseIbcDenom;
    mockFetchParseIbcDenom.mockClear();
  });

  it('correctly parses IBC fee denominations', async () => {
    const mocks = [
      {
        request: {
          query: TransactionDetailsDocument,
          variables: { hash: '7D373DE5C5FB03EA72006F6CEC8F908545D435AE1C598A1B53AD0770C243822A' },
        },
        result: {
          data: {
            transaction: [
              {
                hash: '7D373DE5C5FB03EA72006F6CEC8F908545D435AE1C598A1B53AD0770C243822A',
                height: 54290,
                block: {
                  timestamp: '2021-05-01T07:47:40.855759',
                },
                fee: {
                  payer: '',
                  amount: [
                    {
                      denom: 'ibc/HASH123',
                      amount: '50',
                    },
                  ],
                  granter: '',
                  gas_limit: '200000',
                },
                gasUsed: 149488,
                gasWanted: 200000,
                success: true,
                memo: '',
                messages: [],
                logs: [],
                rawLog: '[]',
              },
            ],
          },
        },
      },
    ];

    const { result } = renderHook(() => useTransactionDetails(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    await waitFor(() => {
      expect(mockFetchParseIbcDenom).toHaveBeenCalledWith('ibc/HASH123');
    });

    expect(result.current.state.overview.fee.baseDenom).toBe('uosmo');
    expect(result.current.state.overview.fee.displayDenom).toBe('uosmo');
  });

  it('preserves non-IBC fee denominations', async () => {
    const mocks = [
      {
        request: {
          query: TransactionDetailsDocument,
          variables: { hash: '7D373DE5C5FB03EA72006F6CEC8F908545D435AE1C598A1B53AD0770C243822A' },
        },
        result: {
          data: {
            transaction: [
              {
                hash: '7D373DE5C5FB03EA72006F6CEC8F908545D435AE1C598A1B53AD0770C243822A',
                height: 54290,
                block: {
                  timestamp: '2021-05-01T07:47:40.855759',
                },
                fee: {
                  payer: '',
                  amount: [
                    {
                      denom: 'uatom',
                      amount: '50',
                    },
                  ],
                  granter: '',
                  gas_limit: '200000',
                },
                gasUsed: 149488,
                gasWanted: 200000,
                success: true,
                memo: '',
                messages: [],
                logs: [],
                rawLog: '[]',
              },
            ],
          },
        },
      },
    ];

    const { result } = renderHook(() => useTransactionDetails(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    expect(result.current.state.overview.fee.baseDenom).toBe('uatom');
    expect(result.current.state.overview.fee.displayDenom).toBe('uatom');

    expect(mockFetchParseIbcDenom).toHaveBeenCalledWith('uatom');
  });
});
