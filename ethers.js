const { ethers } = require("ethers");

// Create a random wallet
const randomWallet = ethers.Wallet.createRandom();

// Display the wallet details
console.log("Address:", randomWallet.address);
console.log("Private Key:", randomWallet.privateKey);
console.log("Mnemonic:", randomWallet.mnemonic.phrase);