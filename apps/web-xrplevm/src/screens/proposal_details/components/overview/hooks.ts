import * as R from 'ramda';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';

type ProposalMesagesState = {
  filterBy: string;
  viewRaw: boolean;
  items: unknown[];
};

export const useProposalMessages = (items: unknown[]) => {
  const [state, setState] = useState<ProposalMesagesState>({
    filterBy: 'none',
    viewRaw: false,
    items,
  });

  const handleSetState = useCallback(
    (stateChange: (prevState: ProposalMesagesState) => ProposalMesagesState) => {
      setState((prevState) => {
        const newState = stateChange(prevState);
        return R.equals(prevState, newState) ? prevState : newState;
      });
    },
    []
  );

  useEffect(() => {
    handleSetState((prevState) => ({
      ...prevState,
    }));
  }, [handleSetState]);

  const onMessageFilterCallback = useCallback(
    (value: string) => {
      handleSetState((prevState) => ({
        ...prevState,
        messages: {
          filterBy: value,
          viewRaw: prevState.viewRaw,
          items: prevState.items,
        },
      }));
    },
    [handleSetState]
  );

  const toggleMessageDisplay = useCallback(
    (_: SyntheticEvent<HTMLInputElement>, checked: boolean) => {
      handleSetState((prevState) => ({
        ...prevState,
        messages: {
          filterBy: prevState.filterBy,
          viewRaw: checked,
          items: prevState.items,
        },
      }));
    },
    [handleSetState]
  );

  const filterMessages = useCallback(
    (messages: unknown[]) =>
      messages.filter((x) => {
        if (state.filterBy !== 'none') {
          return (x as { category: string }).category === state.filterBy;
        }
        return true;
      }),
    [state.filterBy]
  );

  return {
    state,
    onMessageFilterCallback,
    toggleMessageDisplay,
    filterMessages,
  };
};
