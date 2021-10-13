import asyncHandler from 'express-async-handler';
import db from '../db.js';

const getBlockHeight = asyncHandler(async (req, res) => {
  try {
    const { dateTime } = req.params;
    // if dateTime is not defined, sets current time
    // next line throws an error if dateTime is invalid
    const date = dateTime ? new Date(dateTime) : new Date();
    // 10 minutes before dateTime
    const dateSince = new Date(date.getTime() - 60000 * 10).toISOString();
    const dateUntil = date.toISOString();

    const sqlStatement = `
      SELECT height
      FROM chain_rsk_mainnet.blocks
      WHERE signed_at BETWEEN $1 and $2
      ORDER BY height DESC
      LIMIT 1
    `;
    const sqlQuery = {
      text: sqlStatement,
      values: [dateSince, dateUntil],
    };
    const results = await db.query(sqlQuery);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: 'Unable to get block height at specified time' });
  }
});

export default getBlockHeight;
