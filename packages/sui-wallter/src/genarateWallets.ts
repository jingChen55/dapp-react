import { Ed25519Keypair } from "@mysten/sui.js";

export function walletsGenerate() {
    const WALLETS = [];
    const easyWallets = [];
    let num = 19;
    let i;
    for (i = 0; i < num; i++) {
        const keypair = new Ed25519Keypair();
        WALLETS.push(keypair);
        easyWallets.push({k: keypair.getPublicKey().toSuiAddress(),v: keypair.export().privateKey})
    }
    console.log(JSON.stringify(easyWallets));
    return WALLETS;
}

walletsGenerate()