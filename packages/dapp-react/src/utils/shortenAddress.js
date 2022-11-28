/**
 * 地址脱敏
 * @param {*} address  钱包地址
 * @returns 
 */
export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
