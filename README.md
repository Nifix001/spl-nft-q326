# scripts-solana

Scripts for creating SPL tokens and NFTs on Solana devnet.

---

## Setup

### 1. Add your wallet

Place your devnet wallet keypair file at the project root:

```
root/
└── devnet-wallet.json   ← here
```

It should be a JSON array of numbers, e.g. `[174, 23, ...]`.

### 2. Install dependencies

```bash
npm install
```

```bash
npm install --save-dev @types/node ts-node typescript
```

### 3. Add your image

Place your image at the project root.

```
root/
└── image.png   ← here
```

### 4. (Optional) Set a custom RPC URL

By default, scripts use `https://api.devnet.solana.com`. To use a different RPC provider, set `SOLANA_RPC_URL` in a `.env` file or your shell environment.

> ⚠️ Make sure every script points at the **same** RPC URL / cluster. Minting an asset on one endpoint and then trying to fetch/transfer/burn it on another will fail with `AccountNotFoundError`, since the account simply won't exist there.

---

> Before running the scripts, go through these docs:
> - [Solana token docs](https://solana.com/docs/tokens) — mint accounts, token accounts, and ATAs
> - [Solana Kit](https://www.solanakit.com/) — the JS SDK used for building and sending transactions
> - [Metaplex Token Metadata](https://www.metaplex.com/docs/smart-contracts/token-metadata) — attaching metadata to SPL tokens
> - [Metaplex Core](https://www.metaplex.com/docs/smart-contracts/core) — the NFT standard used in the NFT scripts

## SPL Token

Uses **@solana/kit** and **@solana-program/token** for transactions, and **mpl-token-metadata** via UMI for on-chain metadata.

| Script | Command | What it does |
|---|---|---|
| `spl_init.ts` | `npm run spl:init` | Creates a new mint account |
| `spl_metadata.ts` | `npm run spl:metadata` | Attaches a name, symbol, and URI to the mint |
| `spl_mint.ts` | `npm run spl:mint` | Creates your associated token account and mints tokens into it |
| `spl_transfer.ts` | `npm run spl:transfer` | Sends tokens to another wallet i.e ata to ata |

Run them in order. Each script logs the addresses/signatures you'll need to paste into the next one.

---

## NFT

Uses **@solana/kit** and **mpl-core** via UMI. Images and metadata are stored on Irys (decentralized storage).

| Script | Command | What it does |
|---|---|---|
| `nft_image.ts` | `npm run nft:image` | Uploads your image to Irys, logs the image URI |
| `nft_metadata.ts` | `npm run nft:metadata` | Builds the metadata JSON and uploads it, logs the metadata URI |
| `nft_mint.ts` | `npm run nft:mint` | Mints the NFT on-chain using the metadata URI |
| `nft_transfer.ts` | `npm run nft:transfer` | Transfers the NFT to another wallet |
| `nft_burn.ts` | `npm run nft:burn` | Permanently destroys the NFT and reclaims the rent |

Run the mint scripts in order first. Paste the URI/address logged by each step into the next script before running it. `nft_transfer.ts` and `nft_burn.ts` operate on an already-minted asset — paste the asset address logged by `nft_mint.ts` into whichever one you run.

> ⚠️ `nft_burn.ts` is irreversible — the asset account is closed on-chain and cannot be recovered. Double-check the asset address before running it.

![SPL Initialize test passing](./src/nft/img/Screenshot%20spl%20init.png)
![SPL metadata test passing](./src/nft/img/Screenshot%20spl-metadata.png)
![SPL Mint and transfer test passing](./src/nft/img/Screenshot%20spl%20mint-transfer.png)
![NFT test passing](./src/nft/img/Screenshot%20nft.png)