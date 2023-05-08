import ContractTransaction from "../src/signerContrat";

// index.test.ts
const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
const providerUrl = 'http://localhost:8545';
const contractAddress = '0x1234567890...';

const contractAbi = [
  {
    "name": "MethodExecuted",
    "inputs": [
      { "type": "string", "name": "methodName" },
      { "type": "bytes", "name": "methodParams" },
      { "type": "bytes", "name": "result" }
    ],
    "anonymous": false
  },
  // TODO: 添加其他方法的 ABI
];

const tx = new ContractTransaction(privateKey, providerUrl, contractAddress, contractAbi);

tx.executeMethod('set', [42]).then((result) => console.log(`Method returned: ${result}`));
