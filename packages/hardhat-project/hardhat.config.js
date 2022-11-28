require("@nomiclabs/hardhat-waffle");
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  solidity: "0.8.4",
  // networks: {
  //   ropsten: {
  //     url: 'https://eth-ropsten.alchemyapi.io/v2/z4WpA8UKgqnwbTYmrZu15yCOiijBKaRv',
  //     accounts: ['2f99db8cdb04655028eee1dc98230925202f6b3e010e43fad2883b4bea90a1a3'],
  //   },
  // },
};
