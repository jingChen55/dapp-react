import {Ed25519Keypair, RawSigner,Connection,JsonRpcProvider} from "@mysten/sui.js";
import {swap2sui} from "./swap2sui.ts";

//1.1 导入主钱包
const keypair = Ed25519Keypair.fromSecretKey(Buffer.from('0xfba038913db90ef3312b672552891d1f5a8739519e83ae15aeeb3bdfacda6199'.slice(2),'hex'));
const address = keypair.getPublicKey().toSuiAddress();
console.log('主钱包地址：'+address)

//1.2 创建rpc连接
const connection = new Connection({
    fullnode: 'https://testnet.sui.wav3.net',
    faucet: 'https://faucet.testnet.sui.io/gas',
});
//1.3 连接到rpc
const provider = new JsonRpcProvider(connection);
const signer = new RawSigner(keypair, provider);

await swap2sui(provider, address, signer);