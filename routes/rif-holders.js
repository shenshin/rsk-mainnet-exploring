import asyncHandler from 'express-async-handler';

import db from '../db.js';

const rifTokenAddress = '0x2acc95758f8b5f583470ba265eb685a8f45fc9d5';
const erc20TopicIdForTransfer =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

function getSqlBytesForHexadecimalString(input) {
  return `\\x${input.substring(2)}`;
}

const getRifHolders = asyncHandler(async (req, res) => {
  try {
    const { dateTime } = req.params;
    const dateUntil = (
      dateTime ? new Date(dateTime) : new Date()
    ).toISOString();

    const sqlStatement = `
    SELECT
      COUNT(DISTINCT '0x' || encode(extract_address(e.topics[3]), 'hex')) AS receivers
    FROM chain_rsk_mainnet.block_log_events e 
    WHERE 
      e.sender = $1 
      AND e.topics @> array[$2::bytea]
      AND e.topics[1] = $2
      AND e.block_signed_at BETWEEN '2018-11-09 20:00:00' AND $3
    `;
    const sqlQuery = {
      text: sqlStatement,
      values: [
        getSqlBytesForHexadecimalString(rifTokenAddress),
        getSqlBytesForHexadecimalString(erc20TopicIdForTransfer),
        dateUntil,
      ],
    };
    const result = await db.query(sqlQuery);
    const { receivers } = result.rows[0];
    res.status(200).json({ holdersCount: receivers });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Unable to get the number of holders' });
  }
});

export default getRifHolders;
