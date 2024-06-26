const abis = {
  multicallAbi: [
    'function aggregate((address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes[] returnData)',
    'function aggregate3((address target, bool allowFailure, bytes callData)[] calls) payable returns ((bool success, bytes returnData)[] returnData)',
    'function aggregate3Value((address target, bool allowFailure, uint256 value, bytes callData)[] calls) payable returns ((bool success, bytes returnData)[] returnData)',
    'function blockAndAggregate((address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes32 blockHash, (bool success, bytes returnData)[] returnData)',
    'function getBasefee() view returns (uint256 basefee)',
    'function getBlockHash(uint256 blockNumber) view returns (bytes32 blockHash)',
    'function getBlockNumber() view returns (uint256 blockNumber)',
    'function getChainId() view returns (uint256 chainid)',
    'function getCurrentBlockCoinbase() view returns (address coinbase)',
    'function getCurrentBlockDifficulty() view returns (uint256 difficulty)',
    'function getCurrentBlockGasLimit() view returns (uint256 gaslimit)',
    'function getCurrentBlockTimestamp() view returns (uint256 timestamp)',
    'function getEthBalance(address addr) view returns (uint256 balance)',
    'function getLastBlockHash() view returns (bytes32 blockHash)',
    'function tryAggregate(bool requireSuccess, (address target, bytes callData)[] calls) payable returns ((bool success, bytes returnData)[] returnData)',
    'function tryBlockAndAggregate(bool requireSuccess, (address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes32 blockHash, (bool success, bytes returnData)[] returnData)',
  ],
  aggregatorRouterAbi: [
    'function aggregator(string feedName) view returns (address)',
    'function aggregatorProxies(string feedName) view returns (address)',
    'function decimals(string feedName) view returns (uint8)',
    'function description(string feedName) view returns (string)',
    'function getRoundData(string feedName, uint80 roundId) view returns (uint80 id, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
    'function latestRoundData(string feedName) view returns (uint80 id, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
    'function phaseAggregators(string feedName, uint16 phaseId_) view returns (address)',
    'function phaseId(string feedName) view returns (uint16)',
    'function proposedAggregator(string feedName) view returns (address)',
    'function proposedGetRoundData(string feedName, uint80 roundId) view returns (uint80 id, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
    'function proposedLatestRoundData(string feedName) view returns (uint80 id, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
    'function typeAndVersion(string feedName) view returns (string)',
    'function updateProxy(string feedName, address proxyAddress)',
    'function updateProxyBulk(string[] feedNames, address[] proxyAddresses)',
  ],
  klayswapOracleAbi: [
    'function getPrice(address token) view returns (uint256)', // in usd_e18
  ],
};

export default abis;
