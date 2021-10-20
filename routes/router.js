import express from 'express';
import getRifHolders from './rif-holders.js';
import getBlockHeight from './block-height.js';
import getAvgGasPrice from './avg-tsx-gas-price.js';

const router = express.Router();
/* 

### Step 1:

Using the Covalent API find the last Block Height of the RSK Mainnet network for the month of August 2021.

*/

// retrieves block hight for a specified date and time in yyyy-MM-ddTHH:mm:ssZ format
router.route('/block-height/:dateTime').get(getBlockHeight);

// retrieves current block height
router.route('/block-height/').get(getBlockHeight);

/* 

### Step 2:

Using the Block Height information from step 1 above, query the API for the list of all RIF token holders as at the Block height.

*/
// retrieves the number of RIF token holders at a specified date and time in yyyy-MM-ddTHH:mm:ssZ format
router.route('/rif-holders/:dateTime').get(getRifHolders);
// retrieves the number of current RIF token holders
router.route('/rif-holders/').get(getRifHolders);

router.route('/avg-gas-price/:address').get(getAvgGasPrice);
router.route('/avg-gas-price/').get(getAvgGasPrice);

export default router;
