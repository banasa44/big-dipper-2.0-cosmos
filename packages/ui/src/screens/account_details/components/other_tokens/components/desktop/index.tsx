import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useAppTranslation from '@/hooks/useAppTranslation';
import { FC } from 'react';
import { formatNumber, formatSymbol } from '@/utils/format_token';
import type { OtherTokenType } from '@/screens/account_details/types';
import { columns } from '@/screens/account_details/components/other_tokens/components/desktop/utils';
import { CircularProgress, Link } from '@mui/material';
import { isIbcDenom } from '@/utils/parse_ibc';

type DesktopProps = {
  className?: string;
  items?: OtherTokenType[];
  ibcParsingInProgress?: boolean;
  erc20ParsingInProgress?: boolean;
};

const Desktop: FC<DesktopProps> = ({
  className,
  items,
  ibcParsingInProgress,
  erc20ParsingInProgress,
}) => {
  const { t } = useAppTranslation('accounts');

  const formattedItems = items?.map((x, i) => ({
    key: i,
    token: x.denom.toUpperCase(),
    symbol: formatSymbol(x.parsedDenom),
    commission: x.commission ? formatNumber(x.commission.value, x.commission.exponent) : '',
    available: formatNumber(x.available.value, x.available.exponent),
    reward: x.reward ? formatNumber(x.reward.value, x.reward.exponent) : '',
    erc20Address: x.erc20Address,
    isDenom: isIbcDenom(x.denom),
  }));

  return (
    <div className={className}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align}
                style={{ width: `${column.width}%` }}
              >
                {t(column.key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedItems?.map((row) => (
            <TableRow key={`holders-row-${row.key}`}>
              {columns.map((column) => (
                <TableCell
                  key={`holders-row-${row.key}-${column.key}`}
                  align={column.align}
                  style={{ width: `${column.width}%` }}
                >
                  {column.key === 'symbol' && ibcParsingInProgress ? (
                    <CircularProgress size={16} />
                  ) : column.key === 'token' && row.isDenom ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {row.erc20Address ? (
                        <Link
                          href={`https://explorer.testnet.xrplevm.org/token/${row.erc20Address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {row.token}
                        </Link>
                      ) : (
                        row.token
                      )}
                      {erc20ParsingInProgress && (
                        <CircularProgress size={12} style={{ marginLeft: '4px' }} />
                      )}
                    </div>
                  ) : (
                    row[column.key as keyof typeof row]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Desktop;
