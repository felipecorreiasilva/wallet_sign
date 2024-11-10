const {Keypair} = require('@stellar/stellar-sdk')
const bip39 = require('bip39');

// Generate a random mnemonic (12 words)
const mnemonic = bip39.generateMnemonic();
console.log("Generated Mnemonic Phrase:", mnemonic);

// Derive a seed from the mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Generate a keypair from the seed
const keypair = Keypair.fromRawEd25519Seed(seed.slice(0, 32)); // Stellar requires 32 bytes

console.log("Public Key:", keypair.publicKey());
console.log("Secret Key:", keypair.secret());
