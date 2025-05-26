import chainConfig from '@/chainConfig';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import type { IbcExtension } from '@cosmjs/stargate';
import { QueryClient, setupIbcExtension } from '@cosmjs/stargate';

export function getCurrentRpcEndpoint() {
  const { endpoints } = chainConfig();
  return endpoints.cosmosRpc!;
}

let ibcQueryClient: (QueryClient & IbcExtension) | null = null;

/**
 * Get a QueryClient with IBC transfer extension
 */
async function getIbcQueryClient(): Promise<QueryClient & IbcExtension> {
  if (!ibcQueryClient) {
    const tmClient = (await Tendermint34Client.connect(getCurrentRpcEndpoint())) as any;

    ibcQueryClient = QueryClient.withExtensions(tmClient, setupIbcExtension);
  }
  return ibcQueryClient;
}

/**
 * Query the on-chain denom trace and metadata for an IBC denom
 * @param ibcDenom e.g. "ibc/27394FB0..."
 * @returns  baseDenom (on-chain unit),
 */
export async function parseIbcDenom(ibcDenom: string): Promise<string | undefined> {
  if (!/^ibc\//i.test(ibcDenom)) {
    return undefined;
  }

  const hash = ibcDenom.replace(/^ibc\//i, '');
  const ibcClient = await getIbcQueryClient();

  const denomTraceResponse = await ibcClient.ibc.transfer.denomTrace(hash);
  const trace = denomTraceResponse?.denomTrace;

  if (trace && typeof trace.baseDenom === 'string') {
    return trace.baseDenom;
  }
  return undefined;
}

export async function fetchParseIbcDenom(ibcDenom: string): Promise<string> {
  if (!/^ibc\//i.test(ibcDenom)) return ibcDenom;

  const hash = ibcDenom.replace(/^ibc\//i, '');
  const response = await fetch(`/xrplevm/api/parseDenom?hash=${hash}`);
  const data = await response.json();

  if (response.ok && data.baseDenom) {
    return data.baseDenom;
  }

  console.error('Error fetching denom:', data.error);
  return ibcDenom;
}
