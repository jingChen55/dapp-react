//@ts-ignore
import SID from '@siddomains/sidjs';
import Web3 from 'web3';
let sid
async function main(name: string) {
  const rpc = "https://arb1.arbitrum.io/rpc" //Arbitrum One rpc
  const provider = new Web3.providers.HttpProvider(rpc)
  const chainId = 42161 //Arbitrum One chain id
  sid = new SID.default({ provider, sidAddress: SID.getSidAddress(chainId) })
  const arbitrum1_address = await sid.name(name).getAddress("ARB1")
  const arbirum_nova_address = await sid.name(name).getAddress("ARB_NOVA")

  console.log("name: %s,arb1 address: %s", name, arbitrum1_address)
  console.log("name: %s,arb_nova address: %s", name, arbirum_nova_address)
}

main("test.arb")