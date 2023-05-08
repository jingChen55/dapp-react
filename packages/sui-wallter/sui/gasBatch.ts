import { RawSigner, TransactionBlock } from "@mysten/sui.js";
import { walletsImport } from './importWallet';

/**
 * 往临时钱包转gas
 * @param wallets 钱包  
 * @param signer  数量
 */
export async function gasBatch(wallets: { k: string, v: string }[], signer: RawSigner) {
  console.log('======================开始往临时钱包转gas============')
  for (let wallet of walletsImport(wallets)) {
    let walletAddress = wallet.getPublicKey().toSuiAddress();
    console.log('临时钱包address:' + walletAddress)
    const tx: Uint8Array | TransactionBlock = new TransactionBlock();
    const [coin] = tx.splitCoins(tx.gas, [tx.pure('1000000000')]);
    tx.transferObjects([coin], tx.pure(walletAddress));
    await signer.signAndExecuteTransactionBlock({ transactionBlock: tx });
  }
  console.log('======================往临时钱包转gas完毕============')
}