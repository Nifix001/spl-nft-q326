import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from "../../devnet-wallet.json";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { fetchAsset, transfer, mplCore } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));
umi.use(mplCore());

(async () => {
  try {
    const assetAddress = publicKey("Fg2nvv7LsQn77UXbNik2TnMk1Z4EG1CY8a7qtG9xtM18"); // NFT mint address
    const newOwner = publicKey("9hAMtLfZojhD5efNHimyhXQrb5p13K7Z6Vrfnp6PrQUv"); // new NFT owner

    // fetch the real on-chain asset object — no manual/stub construction
    const asset = await fetchAsset(umi, assetAddress);

    const tx = await transfer(umi, {
      asset,
      newOwner,
    }).sendAndConfirm(umi);

    const signature = base58.deserialize(tx.signature)[0];
    console.log(`transferred! signature: ${signature}. New owner: ${newOwner}`);
  } catch (e) {
    console.log(`error ${e}`);
  }
})();

// signature: FW5yAwsya2bXdEPghEQNxPrEEiWaTyu83bTCW56uU8yTCJy8L9t9hUNbyQfxp7xExatU464o1Abyorq65AC541r. New owner: 9hAMtLfZojhD5efNHimyhXQrb5p13K7Z6Vrfnp6PrQUv