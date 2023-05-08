import { Contract, EventFilter, ethers, providers } from 'ethers';

export default class ContractTransaction {
  private readonly provider: providers.JsonRpcProvider;
  private readonly signer: ethers.Wallet;
  private readonly contract: Contract;

  /**
   * 构造函数
   * @param privateKey 私钥
   * @param providerUrl 以太坊客户端节点 URL
   * @param contractAddress 合约地址
   * @param contractAbi 合约 ABI
   */
  constructor(privateKey: string, providerUrl: string, contractAddress: string, contractAbi: any) {
    // 初始化 provider、signer 和 contract 对象
    this.provider = new ethers.providers.JsonRpcProvider(providerUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);
    this.contract = new ethers.Contract(contractAddress, contractAbi, this.signer);
  }

  /**
   * 执行指定合约方法
   * @param methodName 方法名称
   * @param methodParams 方法参数
   * @returns 方法执行结果
   */
  async executeMethod(methodName: string, methodParams: Array<any>): Promise<any> {
    // 发送交易
    const tx = await this.sendTransaction(methodName, methodParams);

    // 等待交易确认
    const receipt = await this.waitForTransaction(tx.hash);

    // 获取方法执行结果
    return this.getExecutionResult(receipt);
  }

  /**
   * 发送交易
   * @param methodName 方法名称
   * @param methodParams 方法参数
   * @returns 交易对象
   */
  async sendTransaction(methodName: string, methodParams: Array<any>) {
    return await this.contract.signer.sendTransaction({
      to: this.contract.address,
      data: this.contract.interface.encodeFunctionData(methodName, methodParams),
    });
  }

  /**
   * 等待交易确认
   * @param txHash 交易哈希
   * @returns 交易确认对象
   */
  async waitForTransaction(txHash: string) {
    return await this.provider.waitForTransaction(txHash);
  }

  /**
   * 获取方法执行结果
   * @param receipt 交易确认对象
   * @returns 方法执行结果
   */
  async getExecutionResult(receipt: ethers.providers.TransactionReceipt) {
    // 创建事件过滤器，以监听合约事件
    const filter: EventFilter = this.contract.filters.MethodExecuted(null, null, null);

    // 查询合约事件
    const events = await this.contract.queryFilter(filter, receipt.blockNumber, receipt.blockNumber);

    // 返回最后一个事件的返回值作为执行结果
    if (events.length > 0) {
      const lastEvent = events[events.length - 1];
      return lastEvent.args.result;
    } else {
      throw new Error('No events found');
    }
  }
}
