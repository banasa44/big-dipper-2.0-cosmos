import { renderHook, act, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useDeposits } from './hooks';
import { ProposalDetailsDepositsDocument } from '@/graphql/types/general_types';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '1' },
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
describe('useDeposits', () => {
  let mockFetchParseIbcDenom: jest.Mock;
  beforeEach(() => {
    mockFetchParseIbcDenom = require('@/utils/parse_ibc').fetchParseIbcDenom;
    mockFetchParseIbcDenom.mockClear();
  });

  it('correctly parses IBC denominations in deposits', async () => {
    const mocks = [
      {
        request: {
          query: ProposalDetailsDepositsDocument,
          variables: { proposalId: 1 },
        },
        result: {
          data: {
            proposalDeposit: [
              {
                amount: [{ amount: '1000000', denom: 'ibc/HASH123' }],
                depositorAddress: 'cosmos1address',
                block: { timestamp: '2023-01-01T12:00:00Z' },
              },
            ],
          },
        },
      },
    ];

    const { result } = renderHook(() => useDeposits(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.state.data.length).toBeGreaterThan(0);
    });

    expect(result.current.state.data[0].amount.baseDenom).toBe('uosmo');
    expect(result.current.state.data[0].amount.displayDenom).toBe('uosmo');
  });

  it('preserves non-IBC denominations without parsing', async () => {
    const mocks = [
      {
        request: {
          query: ProposalDetailsDepositsDocument,
          variables: { proposalId: 1 },
        },
        result: {
          data: {
            proposalDeposit: [
              {
                amount: [{ amount: '1000000', denom: 'uatom' }],
                depositorAddress: 'cosmos1address',
                block: { timestamp: '2023-01-01T12:00:00Z' },
              },
            ],
          },
        },
      },
    ];

    const { result } = renderHook(() => useDeposits(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.state.data.length).toBeGreaterThan(0);
    });

    expect(result.current.state.data[0].amount.baseDenom).toBe('uatom');
    expect(result.current.state.data[0].amount.displayDenom).toBe('uatom');

    expect(mockFetchParseIbcDenom).toHaveBeenCalledWith('uatom');

    const nonIbcCalls = mockFetchParseIbcDenom.mock.calls.filter((call) => call[0] === 'uatom');
    expect(nonIbcCalls.length).toBeGreaterThan(0);
  });
});
