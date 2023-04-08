import {Ed25519Keypair, fromB64} from "@mysten/sui.js";


/**
 * 导入钱包
 * @param wallets
 */
export function walletsImport(wallets: { k:string, v:string } []) : Ed25519Keypair[]{
    const keyPairs = [];
    for (let wallet of wallets) {
        console.log(wallet)
        let row = fromB64(wallet.v);
        let keypair = Ed25519Keypair.fromSecretKey(row);
        keyPairs.push(keypair);
    }
    return keyPairs;
}