import type { TFunction } from '@/hooks/useAppTranslation';

export const getStatusInfo = (status: string, t: TFunction) => {
  const statusDict = {
    PROPOSAL_STATUS_DEPOSIT_PERIOD: {
      value: t('deposit'),
      tag: 'zero',
    },
    PROPOSAL_STATUS_INVALID: {
      value: t('invalid'),
      tag: 'five',
    },
    PROPOSAL_STATUS_VOTING_PERIOD: {
      value: t('voting'),
      tag: 'one',
    },
    PROPOSAL_STATUS_PASSED: {
      value: t('passed'),
      tag: 'eight',
    },
    PROPOSAL_STATUS_REJECTED: {
      value: t('rejected'),
      tag: 'five',
    },
    PROPOSAL_STATUS_FAILED: {
      value: t('failed'),
      tag: 'five',
    },
  };

  if (statusDict[status as keyof typeof statusDict]) {
    return statusDict[status as keyof typeof statusDict];
  }
  return {
    value: status,
    tag: 'zero',
  };
};
