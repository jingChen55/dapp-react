import { RawSigner, TransactionBlock } from "@mysten/sui.js";
import { Sleep } from "./sleep.ts";
import { addresA } from "./walletsData/index.db.ts";

/**
 * 批量claim 测试token
 * @param tempSigner
 * @param tempAdress
 */
export async function tokenClaim(tempSigner: RawSigner, tempAdress: string) {
  const packageObjectId = addresA;
  //领50次
  let num: number = 20;
  let i: number;
  for (i = 0; i < num; i++) {
    let tx = new TransactionBlock();
    //节点负载过高时，测试网络的gas预估有问题，如果不设置gasbudgt为较低值,会发不出交易。正常不需设置，默认gas
    tx.setGasBudget(10000000);
    tx.moveCall({
      target: `${packageObjectId}::TOKEN::mint_test_token_sol`,
      arguments: [tx.pure(packageObjectId), tx.pure(tempAdress)]
    });
    let result;
    try {
      result = await tempSigner.signAndExecuteTransactionBlock({ transactionBlock: tx });
    } catch (e) {
      console.log(e)
    }
    console.log({ result });
    //睡10秒
    await Sleep(5000);
  }
}