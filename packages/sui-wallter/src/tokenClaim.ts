import {RawSigner, TransactionBlock} from "@mysten/sui.js";
import {Sleep} from "./sleep.ts";


export async function tokenClaim(tempSigner: RawSigner, tempAdress: string) {
    const packageObjectId = '0xe158e6df182971bb6c85eb9de9fbfb460b68163d19afc45873c8672b5cc521b2';
    //领50次
    let num: number = 20;
    let i: number;
    for (i = 0; i < num; i++) {
        let tx = new TransactionBlock();
        //节点负载过高时，测试网络的gas预估有问题，如果不设置gasbudgt为较低值,会发不出交易。正常不需设置，默认gas
        tx.setGasBudget(10000000);
        tx.moveCall({
            target: `${packageObjectId}::TOKEN::mint_test_token_sol`,
            arguments: [tx.pure('0x4d511e8e21f0b2d2f8ae3aa4dc0ea1efb41e65d78ab1f42869f13d527effae12'), tx.pure(tempAdress)]
        });
        let result;
        try {
            result = await tempSigner.signAndExecuteTransactionBlock({transactionBlock: tx});
        } catch (e) {
            console.log(e)
        }
        console.log({result});
        //睡10秒
        await Sleep(5000);
    }
}