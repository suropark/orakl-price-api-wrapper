# orakl-price-api-wrapper

Price feed wrapper for [Orakl Network](https://orakl.network)

## Installation

Install with package manager

```bash
  npm i orakl-price-api-wrapper

  yarn add orakl-price-api-wrapper
```

## Usage/Examples

```javascript
const feedWrapper = new OraklPriceFeed({
  chainId: 8217,
});

const result = await feed.getAllFeeds(["TRX-USDT", "BTC-USDT"]);

console.log(result);

/* result
[
  {
    feedName: 'TRX-USDT',
    price: '11284500',
    startedAt: '1706686297',
    updatedAt: '1706686297',
    roundId: '18446744073710786048'
  },
  {
    feedName: 'BTC-USDT',
    price: '4298706000000',
    startedAt: '1706686309',
    updatedAt: '1706686309',
    roundId: '18446744073710787399'
  },
*/
```

[Available Data Feed List](https://orakl.network/data-feed?network=All)

## API Reference

#### Get all Feeds

```javascript
feed.getAllFeeds(["BTC-USDT"]);
```

| Parameter   | Type       | Description                   |
| :---------- | :--------- | :---------------------------- |
| `feedNames` | `string[]` | **Required**. data feed names |

## License

[MIT](https://choosealicense.com/licenses/mit/)
