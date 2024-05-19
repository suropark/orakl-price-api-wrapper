import chains, { ChainConfig } from './chains';
import abis from './abi';
import { ethers } from 'ethers';

const baseAddresses = [
  ethers.ZeroAddress, // klay
  '0x754288077d0ff82af7a5317c7cb8c444d421d103', // ousdt
  '0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167', // ousdc
  '0x34d21b1e550d73cee41151c77f3c73359527a396', // oeth
  '0x9eaefb09fe4aabfbe6b1ca316a3c36afc83a393f', // oxrp
  '0x16d0e1fbd024c600ca0380a4c5d57ee7a2ecbf9c', // owbtc
];

export interface Call {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: any[]; // Function params
}

export class KlayswapPriceFeed {
  public chainConfig: ChainConfig;

  private provider: ethers.JsonRpcProvider;
  private randomSigner;
  private multicallContract: any;

  constructor({
    chainId,
    override,
  }: {
    chainId: number;
    override?: Partial<ChainConfig>;
  }) {
    if (!chains[chainId]) throw new Error('chainId is not supported');

    this.chainConfig = {
      ...chains[chainId],
      ...override,
    };

    this.provider = new ethers.JsonRpcProvider(this.chainConfig.rpcUrl);

    // mock pvt
    this.randomSigner = new ethers.Wallet(
      '0xa6345aa3cb40d80e010ad03b6caa9d5c5c129ecaea2c3d32a3b3da7d88907068',
      this.provider
    );

    this.multicallContract = new ethers.Contract(
      this.chainConfig.multicall3,
      abis.multicallAbi,
      this.randomSigner
    );
  }

  async getPrice(addresses: string[]) {
    const itf = new ethers.Interface(abis.klayswapOracleAbi);
    const calldata = addresses.map((address) => [
      this.chainConfig.klayswapOracle,
      itf.encodeFunctionData('getPrice', [address]),
    ]);

    const result = await this.multicallContract.tryAggregate.staticCall(
      false,
      calldata
    );

    const res = result.map((call: any, i: number) => {
      try {
        const decoded = itf.decodeFunctionResult('getPrice', call.returnData);

        return {
          address: addresses[i],
          price: decoded[0].toString(),
        };
      } catch (error) {
        return {
          address: addresses[i],
          price: '0',
        };
      }
    });
    return res;
  }

  async getAllPrices(addresses: string[]) {
    const allAddresses = [...baseAddresses, ...addresses];
    return await this.getPrice(allAddresses);
  }
}
