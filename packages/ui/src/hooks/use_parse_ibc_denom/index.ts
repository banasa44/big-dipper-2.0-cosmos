import { useEffect, useState } from 'react';
import { fetchParseIbcDenom } from '@/utils/parse_ibc';

export function useFetchParseIbcDenom(ibcDenom: string) {
  const [baseDenom, setBaseDenom] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    if (/^ibc\//i.test(ibcDenom)) {
      fetchParseIbcDenom(ibcDenom).then((result) => {
        if (mounted) setBaseDenom(result ?? null);
      });
    } else {
      setBaseDenom(ibcDenom);
    }

    return () => {
      mounted = false;
    };
  }, [ibcDenom]);

  return baseDenom;
}
