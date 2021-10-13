# Wallet Quest 2

![Secret Room](https://uploads-ssl.webflow.com/605df6240893c6c5b2c7388e/606b66baf025e991e3fa2687_9Z_2102.w015.n001.334B.p15.334.jpg)

[French](../French/index.html), [Spanish](../Spanish/index.html), [Tagalog](../Tagalog/index.html), [Ukraine](../Ukraine/index.html), [Vietnamese](../Vietnamese/index.html)

# Exploring RSK Mainnet and RIF Token

The RIF Token allows any token holder to consume the services that are compatible with the RIF architecture.

We will be exploring the RIF Token holders information for the month of August in 2021!

&nbsp;
## Setup:

- Ensure your Covalent API key, set up during the #OneMillionWallets registration process, is activated in the [Covalent API reference](https://www.covalenthq.com/docs/api) so you can make API calls directly in the Chrome browser.

&nbsp;
## Your Secret Weapons

1. [GET Block Height endpoint](https://www.covalenthq.com/docs/api/#get-/v1/{chain_id}/block_v2/{start_date}/{end_date}/)

2. [Get token holders as of a block height](https://www.covalenthq.com/docs/api/#get-/v1/{chain_id}/tokens/{address}/token_holders/)

2. [RSK Network Explorer](https://explorer.rsk.co//)

&nbsp;
### Step 1:

Using the Covalent API find the last Block Height of the RSK Mainnet network for the month of August 2021.

*see /routes/block-height.js*

### Step 2:

Using the Block Height information from step 1 above, query the API for the list of all RIF token holders as at the Block height.

*see /routes/rif-holders.js*

### Step 3:

Access your secret room for the next task at the URL:

`www.onemillionwallets.com/rsk-{Block Height from Step 1}-{Number from Step 5}`

*https://www.onemillionwallets.com/rsk-3648350-16512*

Then complete the task in the secret room.

&nbsp;
## Submission
Complete the instructions in `Submission.md` and then submit your repl.

**Note: If you are submitting in one of the non-English supported regional languages, please delete all other `README-*.md` and `Submission-*.md` files which are not applicable for your submission.**