/**
 * @jest-environment node
 */
import { parseIbcDenom } from './index';

jest.mock('@/chainConfig', () => ({
  __esModule: true,
  default: () => ({
    endpoints: {
      cosmosRpc: 'http://cosmos.testnet.xrplevm.org:26657',
    },
  }),
}));

describe('utils: parseIbcDenom (integration)', () => {
  it('should return path and baseDenom for a valid IBC denom', async () => {
    // Replace with a real, valid IBC denom hash for your chain
    const ibcDenom = 'ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518';
    const result = await parseIbcDenom(ibcDenom);
    console.log('📦 parseIbcDenom result:', JSON.stringify(result, null, 2));

    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('baseDenom');
    expect(typeof result).toBe('string');
    expect(result?.length).toBeGreaterThan(0);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
