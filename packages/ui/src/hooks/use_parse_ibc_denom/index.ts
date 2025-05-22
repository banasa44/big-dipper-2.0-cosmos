import { useEffect, useState } from 'react';
import { parseIbcDenom } from '@/utils/parse_ibc';

export function useParseIbcDenom(ibcDenom: string) {
  const [baseDenom, setBaseDenom] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Check before calling parseIbcDenom
    if (/^ibc\//i.test(ibcDenom)) {
      parseIbcDenom(ibcDenom).then((result) => {
        if (mounted) setBaseDenom(result ?? null);
      });
    } else {
      setBaseDenom(ibcDenom); // Directly set for non-IBC denoms
    }

    return () => {
      mounted = false;
    };
  }, [ibcDenom]);

  return baseDenom;
}
