import { useRouter } from 'next/router';
import * as R from 'ramda';
import { useCallback, useState } from 'react';
import chainConfig from '@/chainConfig';
import {
  ProposalDetailsDepositsQuery,
  useProposalDetailsDepositsQuery,
} from '@/graphql/types/general_types';
import type { DepositState } from '@/screens/proposal_details/components/deposits/types';
import { formatToken } from '@/utils/format_token';
import { fetchParseIbcDenom } from '@/utils/parse_ibc';

const { primaryTokenUnit } = chainConfig();

export const useDeposits = () => {
  const router = useRouter();
  const [state, setState] = useState<DepositState>({
    data: [],
  });

  const handleSetState = useCallback((stateChange: (prevState: DepositState) => DepositState) => {
    setState((prevState) => {
      const newState = stateChange(prevState);
      return R.equals(prevState, newState) ? prevState : newState;
    });
  }, []);

  useProposalDetailsDepositsQuery({
    variables: {
      proposalId: parseFloat((router?.query?.id as string) ?? '0'),
    },
    onCompleted: async (data) => {
      const formatted = formatProposalDeposits(data);
      const parsedDeposits = await parseIbcDenoms(formatted.data);

      handleSetState((prevState) => ({
        ...prevState,
        data: parsedDeposits,
      }));
    },
  });

  const formatProposalDeposits = (data: ProposalDetailsDepositsQuery) => {
    const format = data.proposalDeposit.map((x) => ({
      amount: formatToken(x?.amount?.[0]?.amount ?? '0', x?.amount?.[0]?.denom ?? primaryTokenUnit),
      user: x?.depositorAddress ?? '',
      timestamp: x?.block?.timestamp ?? '',
    }));

    return {
      data: format,
    };
  };

  const parseIbcDenoms = async (deposits: any[]): Promise<any[]> => {
    return Promise.all(
      deposits.map(async (deposit) => {
        const parsedBase = await fetchParseIbcDenom(deposit.amount.baseDenom);
        const parsedDisplay = await fetchParseIbcDenom(deposit.amount.displayDenom);

        return {
          ...deposit,
          amount: {
            ...deposit.amount,
            baseDenom: parsedBase,
            displayDenom: parsedDisplay,
          },
        };
      })
    );
  };

  return {
    state,
  };
};
