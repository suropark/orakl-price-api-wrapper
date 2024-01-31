import chains, { ChainConfig } from "./chains";
import abis from "./abi";
import { ethers } from "ethers";

export interface Call {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: any[]; // Function params
}

export class OraklPriceFeed {
  public chainConfig: ChainConfig;

  private provider: ethers.JsonRpcProvider;
  private randomSigner;
  private multicallContract: any;
  private aggregatorRouterContract: any;

  constructor({ chainId, override }: { chainId: number; override?: Partial<ChainConfig> }) {
    if (!chains[chainId]) throw new Error("chainId is not supported");

    this.chainConfig = {
      ...chains[chainId],
      ...override,
    };

    this.provider = new ethers.JsonRpcProvider(this.chainConfig.rpcUrl);

    // mock pvt
    this.randomSigner = new ethers.Wallet(
      "0xa6345aa3cb40d80e010ad03b6caa9d5c5c129ecaea2c3d32a3b3da7d88907068",
      this.provider
    );

    this.multicallContract = new ethers.Contract(this.chainConfig.multicall3, abis.multicallAbi, this.randomSigner);

    this.aggregatorRouterContract = new ethers.Contract(
      this.chainConfig.aggregatorRouter,
      abis.aggregatorRouterAbi,
      this.randomSigner
    );
  }

  async getAllFeeds(feedNames: string[]) {
    const itf = new ethers.Interface(abis.aggregatorRouterAbi);
    const calldata = feedNames.map((feedName) => [
      this.chainConfig.aggregatorRouter,
      itf.encodeFunctionData("latestRoundData", [feedName]),
    ]);

    const result = await this.multicallContract.tryAggregate.staticCall(false, calldata);

    const res = result.map((call: any, i: number) => {
      try {
        const decoded = itf.decodeFunctionResult("latestRoundData", call.returnData);

        return {
          feedName: feedNames[i],
          price: decoded[1].toString(),
          startedAt: decoded[2].toString(),
          updatedAt: decoded[3].toString(),
          roundId: decoded[4].toString(),
        };
      } catch (error) {
        return {
          feedName: feedNames[i],
          price: "0",
          startedAt: "0",
          updatedAt: "0",
          roundId: "0",
        };
      }
    });
    return res;
  }

  async getFeed() {}
}
