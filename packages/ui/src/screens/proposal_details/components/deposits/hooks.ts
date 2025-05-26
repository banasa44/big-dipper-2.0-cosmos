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
      const formatted = await parseProposalDeposits(data);
      handleSetState((prevState) => ({
        ...prevState,
        ...formatted,
      }));
    },
  });

  const parseProposalDeposits = async (
    data: ProposalDetailsDepositsQuery
  ): Promise<DepositState> => {
    const format = await Promise.all(
      data.proposalDeposit.map(async (x) => {
        const rawAmount = x?.amount?.[0];
        const amount = formatToken(rawAmount?.amount ?? '0', rawAmount?.denom ?? primaryTokenUnit);

        const parsedBase = /^ibc\//i.test(amount.baseDenom)
          ? await fetchParseIbcDenom(amount.baseDenom)
          : amount.baseDenom;

        const parsedDisplay = /^ibc\//i.test(amount.displayDenom)
          ? await fetchParseIbcDenom(amount.displayDenom)
          : amount.displayDenom;

        return {
          amount: {
            ...amount,
            baseDenom: parsedBase ?? amount.baseDenom,
            displayDenom: parsedDisplay ?? amount.displayDenom,
          },
          user: x?.depositorAddress ?? '',
          timestamp: x?.block?.timestamp ?? '',
        };
      })
    );

    return { data: format };
  };

  return {
    state,
  };
};
