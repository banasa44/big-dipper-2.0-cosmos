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
  const hash = ibcDenom.replace(/^ibc\//i, '');
  const ibcClient = await getIbcQueryClient();

  const denomTraceResponse = await ibcClient.ibc.transfer.denomTrace(hash);
  const trace = denomTraceResponse?.denomTrace;

  if (trace && typeof trace.baseDenom === 'string') {
    return trace.baseDenom;
  }
  return undefined;
}
