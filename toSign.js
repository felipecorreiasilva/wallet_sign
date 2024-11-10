require('dotenv').config()
const StellarSdk = require('@stellar/stellar-sdk');

async function main() {
    

    const keypair = StellarSdk.Keypair.fromSecret(process.env.SECRET_KEY);

    // Create and send a transaction with a memo
    const server = new StellarSdk.Horizon.Server('https://horizon.stellar.org');

    // Sign a message
    const message = "DEV30K";
    console.log('message b64: ', btoa(message))
    const messageBuffer = Buffer.from(encodeURIComponent(message), 'utf8').toString('base64');
    const signature = keypair.sign(messageBuffer);
    // Verify the signature
    const isValid = keypair.verify(messageBuffer, signature);
    console.log("Signature valid:", isValid);
    console.log("Btoa signature:", btoa(signature.toString('base64')));
    console.log("Atob signature:", atob(signature.toString('base64')));
    
    // Create a new key-value pair to store
    const key = "desafio";
    const value = signature;

    // Create a Manage Data operation
    const manageDataOp = StellarSdk.Operation.manageData({
    name: key,
    value: value
    });

    // load account
    const account = await server.loadAccount(keypair.publicKey());

    const tx = new StellarSdk.TransactionBuilder(account, {
        fee: await server.fetchBaseFee(),
        networkPassphrase: StellarSdk.Networks.PUBLIC,
    })
    .addOperation(manageDataOp)
    .addMemo(StellarSdk.Memo.text(message))
    .setTimeout(30)
    .build();

    tx.sign(keypair);
    const txResult = await server.submitTransaction(tx);
    console.log('Transaction successful:', txResult);

    
}

main().catch(console.error);