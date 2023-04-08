import {JsonRpcProvider, RawSigner,TransactionBlock} from "@mysten/sui.js";


export async function collectToken(provider: JsonRpcProvider,tempAdress: string,totalBalance:number,address:string,tempSigner:RawSigner) {
    let tx = new TransactionBlock();
    try {
        const coins = await provider.getCoins({
            owner: tempAdress,
            coinType: '0xe158e6df182971bb6c85eb9de9fbfb460b68163d19afc45873c8672b5cc521b2::TOKEN::TestSOL',
        });
        //merge coins
        let objectIds = coins.data.map(item => tx.object(item.coinObjectId));
        tx.mergeCoins(objectIds[0], objectIds.slice(1));

        //split coins
        let [coin] = tx.splitCoins(objectIds[0], [tx.pure(totalBalance)]);
        console.log(JSON.stringify([coin]));
        //transferObject
        tx.transferObjects([coin], tx.pure(address));
        tx.setGasBudget(10000000);
        const result = await tempSigner.signAndExecuteTransactionBlock({transactionBlock: tx});
        console.log({result});
    } catch (e) {
        console.log(e)
    }
}