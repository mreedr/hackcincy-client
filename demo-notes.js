var endpoint = 'http://localhost:8080';
var Web3 = require('web3');
var EthTx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.HttpProvider(endpoint));

var fromAddress = ''; // get from testrpc
var toAddress = ''; // get from client

var rawTx = {
  nonce: web3.toHex(web3.eth.getTransactionCount(fromAddress)),
  to: toAddress,
  gasPrice: web3.toHex(2100000),
  gasLimit: web3.toHex(21000),
  value: web3.toHex(web3.toWei(51, 'ether')),
  data: ""
}

var fromPrivKey = ''; // get from testrpc

var fromPrivKeyX = new Buffer(pKey1, 'hex');

var tx = new EthTx(rawTx);

tx.sign(fromPrivKeyX);

var serializedTx = `0x${tx.serialize().toString('hex')}`
web3.eth.sendRawTransaction(serializedTx, (err, data) => {
  if(!err) { console.log(data) } else { console.log(error) } }
})
