export type ChainConfig = {
  displayName: string;
  rpcUrl: string;
  rpcUrl2?: string;
  chainId: number;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  aggregatorRouter: string;
  multicall3: string;
  klayswapOracle: string;
};
const chains: Record<string, ChainConfig> = {
  8217: {
    displayName: 'KLAYTN',
    rpcUrl: 'https://klaytn-pokt.nodies.app',
    rpcUrl2: 'https://klaytn.blockpi.network/v1/rpc/public',
    chainId: 8217,
    nativeCurrency: {
      name: 'KLAY',
      symbol: 'KLAY',
      decimals: 18,
    },
    aggregatorRouter: '0x16937CFc59A8Cd126Dc70A75A4bd3b78f690C861',
    multicall3: '0xd11dfc2ab34abd3e1abfba80b99aefbd6255c4b8',
    klayswapOracle: '0x6Fd2FDc022a1B9983EeE3b191E0B9aBF4D3652f4',
  },
};

export default chains;
