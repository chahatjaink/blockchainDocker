import React, { useState, useEffect } from "react";
import Web3 from "web3";

const Search = async () => {
  const [blockHashOrNumber, setBlockHashOrNumber] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [block, setBlock] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [web3, setWeb3] = useState(null);
  //Examples of blockHashOrNumber and TransactionHash
  //   const blockHash =
  //     "0xe898b493166f62c2473cc77dd293469943bb4ce60e4c46ab66a6fc75801c7c48";
  //   const blockNumber = 16576415;
  //   const TRANSACTION_HASH =
  //     "0x64fb54e719d07b76adc97d9f576c235f5e2d57650bcdb72aaae9481bd42a7fc1";

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const provider = window.ethereum;
        await provider.enable();
        setWeb3(new Web3(provider));
      } else {
        setWeb3(
          new Web3(
            new Web3.providers.HttpProvider(
              "https://mainnet.infura.io/v3/b88dbc149ab5439a90bc787d739dfcfa"
            )
          )
        );
      }
    };

    initWeb3();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (web3) {
      setBlock(await web3.eth.getBlock(blockHashOrNumber));
      setTransaction(await web3.eth.getTransaction(transactionHash));
    } else {
      fetch(`http://localhost:3000/block/${blockHashOrNumber}`)
        .then((response) => response.json())
        .then((block) => {
          setBlock(block);
        });
      fetch(`http://localhost:3000/transaction/${transactionHash}`)
        .then((response) => response.json())
        .then((transaction) => {
          setTransaction(transaction);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="blockHashOrNumber">Block Hash or Number:</label>
        <input
          type="text"
          id="blockHashOrNumber"
          value={blockHashOrNumber}
          onChange={(e) => setBlockHashOrNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="transactionHash">Transaction Hash:</label>
        <input
          type="text"
          id="transactionHash"
          value={transactionHash}
          onChange={(e) => setTransactionHash(e.target.value)}
        />
      </div>
      <button type="submit">Search</button>
      {block && <pre>{JSON.stringify(block, null, 2)}</pre>}
      {transaction && <pre>{JSON.stringify(transaction, null, 2)}</pre>}
    </form>
  );
};

export default Search;
