# OSED

**This was made for a hackathon, don't take any of this to be production-ready. Thanks, Sygma Protocol!**

## What Is OSED?

### In Short

OSED is an extension to Solidity that allows you to effortlessly write dApps such that logic is split between different blockchains: you can easily offload execution to where it is cheapest and store the result on Ethereum. You don't need to think about cross-chain message passing, you just write the logic as if it were happening on one chain and annotate the functions and shared state variables.

### Why?

New L1's are thousands of times cheaper and more versatile than Ethereum, yet the Ethereum main-chain is much better supported. We need to write dApps that use faster and cheaper L1's to do what Ethereum can not whilst keeping all of our assets on the main-chain.

This requires **a language for mixed dApps**: a smart-contracting language whereby dApps which can flexibly allocate computational and storage tasks across different chains without thinking about the cross-chain interactions.

OSED handles the cross-chain interactions gracefully. This allows you to **o**ut **s**ource **e**xecution and **d**ata storage from Ethereum to another chain, absorbing all of it's advantages.

OSED code compiles down to a pair of regular Solidity smart-contracts, one of which is accessible via main-chain and the other of which is published on the foreign chain. We use Sygma Protocol's generic message passing technology to send messages across EVM chains.

## The OSED Language

**This is all in the `./OSED` subdirectory.**

It's dead simple: when you declare a state variable that you might want to reference across chains, prepend `shared` and append `with Ethereum, Polygon`

Then, for each function, declare what chain you want it to execute on adding the line `@Chain(NAME)` on the line before the function.

Example Contract:

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Counter {
    shared uint public count with Ethereum, Polygon;

    // Function to get the current count.
    @Chain(Ethereum)
    function get() public view returns (uint) {
        return count;
    }

    // Function to increment count by 1.
    @Chain(Polygon)
    function inc() public {
        count += 1;
    }

    // Function to decrement count by 1.
    @Chain(Polygon)
    function dec() public {
        // This function will fail if count = 0
        count -= 1;
    }

}
```

The compiler knows when to send parts of the state cross-chain and spits out a pair of contracts, one for Ethereum and the other for Polygon, which will communicate when necessary. Then, you can just call the `inc()` function on Ethereum.

### Using The Compiler

It's a simple Python script in the OSED directory. You just run it on a `.osed` file and it generate two contracts in your working directory, each with a name ending in `.[chain name].sol`

`python3 main.py demo.osed`

## Web App

The web app is a demo of that simple counter example that I described previously. It offloads the (not very expensive) computation of incrementing or decrementing the counter to Polygon's Mumbai testnet from the Ethereum Sepolia testnet.

1. Clone this repo & install dependencies

```

git clone https://github.com/ToxicPine/OSED.git
cd OSED
yarn install

```

2. Deploy the test contract:

```

yarn deploy

```

You will need to set a valid private key in your env which has Sepolia Eth testnet tokens.

4. On a second terminal, start the NextJS app:

```

yarn start

```

Visit the app on: `http://localhost:3000`.
