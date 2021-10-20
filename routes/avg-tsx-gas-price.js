import asyncHandler from 'express-async-handler';
import axios from 'axios';
import db from '../db.js';
import { getSqlBytesForHexadecimalString } from '../utils.js';

// rUSTD address '0xEf213441a85DF4d7acBdAe0Cf78004E1e486BB96';

const tranferEventHash =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

export default asyncHandler(async (req, res) => {
  try {
    const { address } = req.params;
    if (!address) throw new Error('Token address is not specified');

    const sqlStatement = `
    SELECT
        '0x' || encode(e.tx_hash, 'hex') AS tx_hash 
    FROM chain_rsk_mainnet.block_log_events e 
    WHERE 
        e.sender = $1
        AND e.topics @> array[$2::bytea]
        AND e.topics[1] = $2
    ORDER BY e.block_height DESC
    LIMIT 30
    `;
    const sqlQuery = {
      text: sqlStatement,
      values: [
        getSqlBytesForHexadecimalString(address),
        getSqlBytesForHexadecimalString(tranferEventHash),
      ],
    };
    const result = await db.query(sqlQuery);
    const latestTsx = result.rows.map((r) => r.tx_hash);
    const tsCosts = await Promise.all(
      latestTsx.map(async (hash) => {
        const apiResponse = await axios.get(
          `https://api.covalenthq.com/v1/30/transaction_v2/${hash}/?no-logs=true&quote-currency=USD&key=${process.env.COVALENT_API_KEY}`,
        );
        // `gas-quote` is the amount spent in `quote-currency` on gas
        const gasQuote = apiResponse.data?.data?.items[0]?.gas_quote;
        if (!gasQuote)
          throw new Error(
            `Gas price for the transaction ${hash} can not be retrieved`,
          );
        return gasQuote;
      }),
    );
    console.log(tsCosts);
    const avgTsCost =
      tsCosts.reduce((p, c) => p + Number(c), 0) / tsCosts.length;
    res.status(200).json({ avgTsCost });
  } catch (error) {
    const message =
      'Error calculating average transaction gas price for the token: ';
    console.error(message, error);
    res.status(404).json({ message });
  }
});
