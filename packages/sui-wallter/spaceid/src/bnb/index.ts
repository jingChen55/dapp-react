// @ts-ignore
import SID, { getSidAddress } from '@siddomains/sidjs';
import Web3 from 'web3';

let sid

async function main(name: string) {
  const rpc = "https://data-seed-prebsc-1-s1.binance.org:8545/"
  const provider = new Web3.providers.HttpProvider(rpc)
  const chainId = '97'
  sid = new SID.default({ provider, sidAddress: getSidAddress(chainId) })

  const address = await sid.name(name).getAddress() // 0x123                                                                                
  console.log("name: %s, address: %s", name, address)

}
main("felix.bnb")
main("newregister.bnb")
main("nft.bnb")