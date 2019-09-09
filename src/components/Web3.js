import Web3 from 'web3';
import { utils } from 'web3';
utils.toAsciiOriginal = utils.toAscii;
utils.toAscii = function(input) { return utils.toAsciiOriginal(input).replace(/\u0000/g, '') };

let web3 = new Web3(new Web3.providers.HttpProvider(WEB3_ADDRESS));

export default web3;
