# OrdinalsBot Node.js Library

[![Version](https://img.shields.io/npm/v/ordinalsbot.svg)](https://www.npmjs.org/package/ordinalsbot)
[![](https://badgen.net/npm/dt/ordinalsbot)](https://www.npmjs.com/package/ordinalsbot)
[![Try ordinalsbot on RunKit](https://badge.runkitcdn.com/ordinalsbot.svg)](https://npm.runkit.com/ordinalsbot)

The OrdinalsBot Node library provides convenient access to the OrdinalsBot API from
applications written in JavaScript.

## Documentation

You can find examples [here](examples/example.ts). For more information refer to our [API docs](https://docs.ordinalsbot.com).

## Installation

Install the package with:

    npm install ordinalsbot --save
    or
    yarn add ordinalsbot

## Import and intialization

The package needs to be configured with your account's API key which you can get by opening a ticket in our Discord for now. Our developer dashboard is coming soon...

```js
import { MarketPlace, Inscription } from "ordinalsbot";

// if no parameter given, default environment is 'live'
let inscription = new Inscription("API_KEY", "dev");
let marketplace = new MarketPlace("API_KEY", "dev");
```

## Usage

```js
try {
  // create new order
  const order = await inscription.createOrder({
    files: [
      {
        size: 10,
        type: "plain/text",
        name: "my-text-inscription-file.txt",
        dataURL: "data:plain/text;base64,dGVzdCBvcmRlcg==",
      },
    ],
    lowPostage: true,
    receiveAddress: "",
    fee: 11,
  });
  console.log("Order: ", order);
} catch (error) {
  console.log("Exception: ", error);
}

try {
  // get marketplace listings
  const listing = await marketplace.getListing();
  console.log("Marketplaces: ", listing);
} catch (e) {
  console.log("Exception: ", e);
}
```

### Using Promises

Every method returns a chainable promise which can be used instead of a regular
callback:

```js
// create new order
inscription
  .createOrder({
    files: [
      {
        size: 10,
        type: "plain/text",
        name: "my-text-inscription-file.txt",
        dataURL: "data:plain/text;base64,dGVzdCBvcmRlcg==",
      },
    ],
    lowPostage: true,
    receiveAddress: "",
    fee: 11,
  })
  .then((order) => {
    console.log("Order: ", order);
  })
  .catch((error) => {
    console.log("Exception: ", error);
  });

// get marketplace listings
marketplace
  .getListing()
  .then((listings) => {
    console.log("Order: ", listings);
  })
  .catch((error) => {
    console.log("Exception: ", error);
  });
```


### Using Wallets on the client side

For client-side applications, the methods `marketplace.createListing()`, `marketplace.createOffer()`, and `marketplace.setupPaddingOutputs()` support the `walletProvider` parameter. This optional string parameter allows for specifying the wallet name, with current support for the Xverse wallet and plans to include additional wallets soon. When the `walletProvider` parameter is specified it triggers the invocation of the specified wallet, prompting the user to sign the transaction. This integration significantly streamlines the process by reducing the need for multiple API calls and simplifies the structuring of data required for wallet invocation and transaction signing. Upon successful signing, the method also calls savelisting api with the correct data and returns the saved listing as the response.

```js

import { marketplace, WALLET_PROVIDER } from "ordinalsbot";

const listingRequest = {
  sellerOrdinals: [{
    id: "0c9ac6fb5d4516aade728882e230b0d78337732ea71915c7fbc0cdabe5d29f3ci0",
    price: "1234"
  }],
  sellerPaymentAddress: "2NAurbuXjBK5dztb416bh98ibDS7MKxV75C",
  sellerOrdinalPublicKey: "594a4aaf5da5b144d0fa6b47987d966029d892fbc4aebb23214853e8b053702e",
  sellerOrdinalAddress: "tb1p79l2gnn7u8uqxfepd7ddeeajzrmuv9nkl20wpf77t2u473a2h89s483yk3",
  walletProvider: WALLET_PROVIDER.xverse
};

//call the marketplace listing method
const response = await marketPlace.createListing(listingRequest);

// this will invoke wallet and prompt the user to sign the transaction
// Once signed the listing data will be saved and the saved listing will be
// returned as the response

```js