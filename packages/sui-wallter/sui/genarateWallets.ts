import { Ed25519Keypair } from "@mysten/sui.js";

/**
 * 生成临时钱包
 */
/**
 * The function generates 19 Ed25519 keypairs and returns them as an array, while also logging a JSON
 * string of the public and private keys.
 * @returns The function `walletsGenerate()` returns an array of `Ed25519Keypair` objects.
 */
export function walletsGenerate() {
  const WALLETS = [];
  const easyWallets = [];
  let num = 19;
  let i;
  for (i = 0; i < num; i++) {
    const keypair: any = new Ed25519Keypair();
    WALLETS.push(keypair);

    easyWallets.push({
      k: keypair.getPublicKey().toSuiAddress(),
      v: keypair.export().privateKey
    })
  }
  console.log(JSON.stringify(easyWallets));
  return WALLETS;
}


walletsGenerate();