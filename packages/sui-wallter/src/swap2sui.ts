import {JsonRpcProvider, RawSigner,TransactionBlock} from "@mysten/sui.js";

export async function swap2sui(provider:JsonRpcProvider,address:string,signer:RawSigner) {
    //查询主钱包usdt数量
    const coinBalance = await provider.getBalance({
        owner: address,
        coinType: '0xe158e6df182971bb6c85eb9de9fbfb460b68163d19afc45873c8672b5cc521b2::TOKEN::TestUSDT',
    });
    let totalBalance = coinBalance.totalBalance.toString();
    console.log('主钱包USDT数量：' + totalBalance.slice(0,totalBalance.length - 8));
    //查询主钱包usdt objects
    const coins = await provider.getCoins({
        owner: address,
        coinType: '0xe158e6df182971bb6c85eb9de9fbfb460b68163d19afc45873c8672b5cc521b2::TOKEN::TestUSDT',
    });
    console.log(JSON.stringify(coins))
    const txb = new TransactionBlock();
    let data = coins.data.filter(item => item.balance > 0);
    let objectIds = data.map(item => txb.object(item.coinObjectId))
        //构造txb - moveVec
        let moveVec = txb.makeMoveVec({objects: objectIds});

        //moveCall
        //节点负载过高时，测试网络的gas预估有问题，如果不设置gasbudgt为较低值,会发不出交易。正常不需设置，默认gas
        txb.setGasBudget(10000000);
        const packageObjectId = '0xe158e6df182971bb6c85eb9de9fbfb460b68163d19afc45873c8672b5cc521b2';
        txb.moveCall({
            target: `${packageObjectId}::pool::swap_x_to_y`,
            arguments: [txb.pure('0x2e55c50de33e4b3906ccc26dadd20198d4f6369237dc2bd4232ccd3a3c839e01'), moveVec, txb.pure(totalBalance), txb.pure(0)],
            typeArguments: ['0xe158e6df182971bb6c85eb9de9fbfb460b68163d19afc45873c8672b5cc521b2::TOKEN::TestUSDT0x2::sui::SUI']
        });
        let result;
        try {
            result = await signer.signAndExecuteTransactionBlock({transactionBlock: txb});
        } catch (e) {
            console.log(e)
        }
        console.log({result});
    };