import { Connection, Ed25519Keypair, JsonRpcProvider, Keypair, RawSigner } from '@mysten/sui.js';
import { collectToken } from "./collectToken";
import { walletsImport } from './importWallet';
import { Sleep } from "./sleep";
import { tokenClaim } from "./tokenClaim";
//2.1 往临时钱包
import { gasBatch } from './gasBatch';
import { addresA, wallets } from "./walletsData/index.db";



//1.1 导入主钱包
const keypair = Ed25519Keypair.fromSecretKey(Buffer.from(addresA.slice(2), 'hex'));
const address = keypair.getPublicKey().toSuiAddress();
console.log('主钱包地址：' + address)

//1.2 创建rpc连接
const connection = new Connection({
  fullnode: 'https://testnet.sui.wav3.net',
  faucet: 'https://faucet.testnet.sui.io/gas',
});
//1.3 连接到rpc
const provider = new JsonRpcProvider(connection);

/**
 * 批量转入少量sui作为gas
 * 如果临时钱包不是首次运行该脚本，就不用重复充gas，只有首次需要转gas，或者重复运行脚本，临时钱包gas耗光
 */
const signer: RawSigner = new RawSigner(keypair, provider);
await gasBatch(wallets, signer);

//等待5秒钟
await Sleep(5000);

console.log('======================开始批量临时钱包领测试token并往主钱包归集============')
walletsImport(wallets).forEach(async function (wallet: Keypair) {
  let tempAdress = wallet.getPublicKey().toSuiAddress();
  let tempSigner = new RawSigner(wallet, provider);

  console.log('=====临时钱包地址：' + tempAdress + '领测试token50次开始===========');
  //3.1 批量claim 测试token
  await tokenClaim(tempSigner, tempAdress);
  console.log('=====临时钱包地址：' + tempAdress + '领测试token50次结束===========');

  //4.1 查询临时钱包 测试token数量
  const coinBalance = await provider.getBalance({
    owner: tempAdress,
    coinType: '0x8e587754ddc59384a3589f7f965973855c46af532f3460c918cd7b713ab0f738::TOKEN::TestSOL',
  });
  // console.log('address:'+ tempAdress +'的USDT数量：'+JSON.stringify(coinBalance))
  console.log('address:' + tempAdress + '的SOL数量：' + JSON.stringify(coinBalance))

  if (coinBalance.totalBalance > 0) {
    //4.2 往主钱包归集
    console.log('=====临时钱包地址：' + tempAdress + '开始往主钱包归集===========');
    await collectToken(provider, tempAdress, coinBalance.totalBalance, address, tempSigner);
    console.log('=====临时钱包地址：' + tempAdress + '往主钱包归集结束===========');
  }
})
console.log('======================批量临时钱包领测试token并往主钱包归集结束============')


//5.1主钱包将测试token换成sui
