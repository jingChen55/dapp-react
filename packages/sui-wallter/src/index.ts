import {Ed25519Keypair, JsonRpcProvider, RawSigner, Connection, Keypair} from '@mysten/sui.js';
import {Sleep} from "./sleep.ts";
import {tokenClaim} from "./tokenClaim.ts";
import {walletsImport} from './importWallet.ts'
import {collectToken} from "./collectToken.ts";


//1.1 导入主钱包
const keypair = Ed25519Keypair.fromSecretKey(Buffer.from('0xfba038913db90ef3312b672552891d1f5a8739519e83ae15aeeb3bdfacda6199'.slice(2), 'hex'));
const address = keypair.getPublicKey().toSuiAddress();
console.log('主钱包地址：' + address)

//1.2 创建rpc连接
const connection = new Connection({
  fullnode: 'https://testnet.sui.wav3.net',
  faucet: 'https://faucet.testnet.sui.io/gas',
});
//1.3 连接到rpc
const provider = new JsonRpcProvider(connection);

//2.1 往临时钱包批量转入少量sui作为gas
const wallets = [
  {
    "k": "0xde0e494af496e4604747efd7ed1faa80d0a2f38e0352b3c26a9b4fa0fd39b860",
    "v": "7UWj0svK6DToEQb8RxbOvgQp6BjRmbRDsyxRkhXZG3Y="
  },
  {
    "k": "0xc522e8349fe2897aeba4a582e69bcb581d8bc61eec37869433dbe6c8ff7c6513",
    "v": "M485VsDP54ekryapgx528dNrPLqTqsBXahPV53Got+Y="
  },
  {
    "k": "0xa1309b6ca8de5a61ba9f2e0569ad7cf7db8c0c12eac0507bbbb15794f0714b28",
    "v": "c5UD1SjgIjwGVDI2ODgwWZkNDNCoqzzBSn/guz2W/oE="
  },
  {
    "k": "0xedd4a4e802d14a6e5f9b3ee2d3566b3fddec28d3617756d602b8931a68bdbafe",
    "v": "4/sf/Ic/ym42Xj8bSrKzHqcBvUGM4UJ9ehH1ALMj/Ls="
  },
  {
    "k": "0x9db23d257e19b347dd61ecd5423bccad50cf89c5a0fb50b3b90a25fc159199d1",
    "v": "MMdTCq70E2v4I7KmBMhMgKVzVKf58iHoGwXGbHIf4BE="
  },
  {
    "k": "0x0468d6e9f5aff3e5c42424f8db7dca593a0fca878ccf7ba4908b39eb7f2c7186",
    "v": "QwwvafvDCZ+sDoEFxwnXEp9iVHOUr+tv9lvBkfWT88c="
  },
  {
    "k": "0x37035f0eab5a8b596ad33412d5b3d579200026dd6862d652da068a8232fa4531",
    "v": "QaBOORFShVk3lU8L4L+ONijf0j6yX72ado5yHb8x0cw="
  },
  {
    "k": "0x5af8ecbbd5237a90e7ea7f6a92fe5c0e4d4977c2e985399bab3ab4f099d62c04",
    "v": "0JpSFYfrGs/8yeBudjZLTJbaH4sgBp56p20MrPtZ3EE="
  },
  {
    "k": "0x41c037114442154d76082bd3b666656df6a1839a1504f6d13e92f14bfb166b25",
    "v": "+GPedPFCuP6f5Jbwu/cvrB5cvGSyECUAIbhxdfiidXw="
  },
  {
    "k": "0xbf7c9fd9573e05738338ce222e1f763cdd2c6da27aeb293f6c2fbec949ef1887",
    "v": "llDTYRJkFQggnMVjYC7ZwjslwznTu2dfQuMYAEtkedM="
  },
  {
    "k": "0x19431b6ea36e3cff69f6e573a4eb9e3d10245aaaaa1981feb40d1980e9167d3e",
    "v": "gI80Z5hAIfpVh5G29F7HuV/9fXE3kZLeD4PyAhmGGQc="
  },
  {
    "k": "0xdcc8f4f0975d5efe5246595b0df10c03eee73e8cef936d4b6c60283be50a3b48",
    "v": "2052qnee4mIVaOBoKAsRQACLvNbUj38EqpQ07CMsNiE="
  },
  {
    "k": "0xcb39c4abcf362506173de21943b7b2005f9095b8b44ea8543d1eacf1c621133f",
    "v": "pUz5CVYvjRPC40wxO676hfVgs1Nej1W43Yjg7ZJXWI4="
  },
  {
    "k": "0x159f5c95ac3dc8aa325b74f7b2c2e90d8ad3da83582190daad9cc6293a134df6",
    "v": "YM12r5rRWZo6/mqrkCfbiQNPSbT576z50ns5h2In8J0="
  },
  {
    "k": "0xef27e04ddba48779c0e2e1613f41832da314b029ef64d2d6c07db242e4b10150",
    "v": "98aMOFpTkj3J9DiOrrKWt3k0h01+55Yw1srJOclzFgM="
  },
  {
    "k": "0xbcddd9c4ba5e8f998613227969d58c0df1b0e2db0aa0cd444b0775ac9ffd439d",
    "v": " ///rdQbAZmf9kf0fgFxIrUDqfU3JgctxywRP8UmAGVA="
  },
  {
    "k": "0x02be64a473a37906dfdbc28ad6e160317369d61fe9f2660769ec0bc182bea5a2",
    "v": "qcpepOfBl1nunq2fKJ3yQrFw8FZ16hlAKvOtCuxINtE="
  },
  {
    "k": "0xb0f8b05b3f5193c46186d694167490422e1fec6c1b938ab8202e354895caa2e9",
    "v": "FP3GaDwUSkjzdO8LbHIGB5O6OqtkFzy47fwO2mcXkJs="
  },
  {
    "k": "0x395fb91082d721aa80f5639cd683f11f3986126ea28c6ba1bd917eedf2870734",
    "v": "i/yE4ZtF/0SzkJu97zetlDLv3BZi/ZzU6bZKagvj8MU="
  }
];

/**
 * 如果临时钱包不是首次运行该脚本，就不用重复充gas，只有首次需要转gas，或者重复运行脚本，临时钱包gas耗光
 */
// gasBatch(wallets, signer);

//等待5秒钟
await Sleep(5000);

console.log('======================开始批量临时钱包领测试token并往主钱包归集============')
walletsImport(wallets).forEach(async function (wallet:Keypair) {
  let tempAdress = wallet.getPublicKey().toSuiAddress();
  let tempSigner = new RawSigner(wallet, provider);


  console.log('=====临时钱包地址：' + tempAdress + '领测试token50次开始===========');
  //3.1 批量claim 测试token
  await tokenClaim(tempSigner, tempAdress);
  console.log('=====临时钱包地址：' + tempAdress + '领测试token50次结束===========');

  //4.1 查询临时钱包 测试token数量
  const coinBalance = await provider.getBalance({
    owner: tempAdress,
    // coinType: '0xe158e6df182971bb6c85eb9de9fbfb460b68163d19afc45873c8672b5cc521b2::TOKEN::TestUSDT',
    coinType: '0xe158e6df182971bb6c85eb9de9fbfb460b68163d19afc45873c8672b5cc521b2::TOKEN::TestSOL',
  });
  // console.log('address:'+ tempAdress +'的USDT数量：'+JSON.stringify(coinBalance))
  console.log('address:' + tempAdress + '的SOL数量：' + JSON.stringify(coinBalance))

  if (coinBalance.totalBalance > 0) {
    //4.2 往主钱包归集
    console.log('=====临时钱包地址：' + tempAdress + '开始往主钱包归集===========');
    collectToken(provider, tempAdress, coinBalance.totalBalance, address, tempSigner);
    console.log('=====临时钱包地址：' + tempAdress + '往主钱包归集结束===========');
  }
})
console.log('======================批量临时钱包领测试token并往主钱包归集结束============')


//5.1主钱包将测试token换成sui
