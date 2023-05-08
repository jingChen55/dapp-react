import { ethers } from "ethers";

interface WalletConfig {
  privateKey: string; // 钱包私钥
}

interface RegisterConfig {
  domain: string; // 域名，例如 "mydomain.bnb"
  registryAddress: string; // SDO Registry 合约地址
  resolverAddress?: string; // 默认为 null。如果需要创建 Resolver，可以传入 Resolver 合约地址
  gasLimit?: number; // 默认为 200000。交易的 gas 限制
}

class DomainRegistrar {
  private wallets: Array<ethers.Wallet>;

  constructor(private walletConfigs: WalletConfig[]) {
    this.wallets = walletConfigs.map((config) => new ethers.Wallet(config.privateKey));
  }

  async register(config: RegisterConfig) {
    const { domain, registryAddress, resolverAddress = null, gasLimit = 200000 } = config;

    // 计算节点哈希
    const nodehash = await this.hashNode(domain);

    // 在 SDO Registry 上解析节点哈希以获取 Resolver 地址
    let resolver = resolverAddress;

    if (!resolver) {
      const registry = this.getRegistryContract(registryAddress);
      resolver = await registry.resolver(nodehash);

      // 如果 Resolver 地址不存在，则创建
      if (resolver === ethers.constants.AddressZero) {
        const resolverTx = await registry.registerResolver(nodehash, this.wallets[0].address, { gasLimit });
        await resolverTx.wait();

        resolver = await registry.resolver(nodehash);
      }
    }

    // 注册节点
    const registerPromises: Promise<ethers.providers.TransactionResponse>[] = [];

    await Promise.all(
      this.wallets.map((wallet) => {
        const registry = this.getRegistryContract(registryAddress, wallet);
        const registerTx = registry.register(nodehash, wallet.address, { gasLimit });
        registerPromises.push(registerTx);
      })
    );

    await Promise.all(registerPromises);

    return { nodehash, resolver };
  }

  async hashNode(domain: string) {
    return ethers.utils.namehash(domain);
  }

  getRegistryContract(address: string, signer?: ethers.Signer) {
    const abi = [
      // 在这里放置 SDO Registry 合约 ABI
    ];

    const provider = signer ? signer.provider : ethers.getDefaultProvider();
    const contract = new ethers.Contract(address, abi, provider);

    if (signer) {
      return contract.connect(signer);
    }

    return contract;
  }
}

// 使用示例，假定您有 3 个 Binance Smart Chain 钱包，以下是它们的私钥
const walletConfigs: WalletConfig[] = [
  {
    privateKey: "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  },
  {
    privateKey: "0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
  },
  {
    privateKey: "0x23456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01",
  },
];

const registrar = new DomainRegistrar(walletConfigs);
await registrar.register({
  domain: "mydomain.bnb",
  registryAddress: "0x2dfF88A56767223A5529eA5960Da7A3F5f766406",
});

