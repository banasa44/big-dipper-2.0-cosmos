import { NextApiRequest, NextApiResponse } from 'next';
import { parseIbcDenom } from '@/utils/parse_ibc';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const hash = req.query.hash as string;

  if (!hash) {
    return res.status(400).json({ error: 'Missing hash parameter' });
  }

  try {
    const baseDenom = await parseIbcDenom(hash); // use lowercase for consistency
    res.status(200).json({ baseDenom });
  } catch (error: any) {
    console.error('Error in /api/parse_denom:', error);
    res.status(500).json({ error: error.message });
  }
}
