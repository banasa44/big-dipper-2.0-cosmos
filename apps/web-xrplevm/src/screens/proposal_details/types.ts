export interface OverviewType {
  title: string;
  id: number;
  proposer: string;
  description: string;
  metadata: string;
  status: string;
  submitTime: string;
  depositEndTime: string;
  votingStartTime: string | null;
  votingEndTime: string | null;
  content: {
    '@type': string;
  }[];
}

export interface ProposalState {
  loading: boolean;
  exists: boolean;
  viewRaw: boolean;
  filterBy: string;
  overview: OverviewType;
}
