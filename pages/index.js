import Head from 'next/head'
import { useState, useEffect } from 'react';
import{ethers, BigNumber} from 'ethers';
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Network, Alchemy } from "alchemy-sdk";
import toast from "react-hot-toast";

export default function Home() {
  const [description, setDescription] = useState("")
  const [proposalId, setProposalId] = useState("")
  const [contractBal, setContractBal] = useState(0)
  let NFTOwners = [];
  let finalNFTOwners = [];
  const currency= "MATIC"
  const tokenId = "2"

  const DaoAddress = "0xd3ac637eb34246d4b6A4b0084759E27b51b1416D";
  // const DaoAbi = [
  //   {
  //     "inputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "constructor"
  //   },
  //   {
  //     "anonymous": false,
  //     "inputs": [
  //       {
  //         "indexed": false,
  //         "internalType": "uint256",
  //         "name": "votesUp",
  //         "type": "uint256"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "uint256",
  //         "name": "votesDown",
  //         "type": "uint256"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "address",
  //         "name": "voter",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "uint256",
  //         "name": "proposal",
  //         "type": "uint256"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "bool",
  //         "name": "votedFor",
  //         "type": "bool"
  //       }
  //     ],
  //     "name": "newVote",
  //     "type": "event"
  //   },
  //   {
  //     "anonymous": false,
  //     "inputs": [
  //       {
  //         "indexed": false,
  //         "internalType": "uint256",
  //         "name": "id",
  //         "type": "uint256"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "bool",
  //         "name": "passed",
  //         "type": "bool"
  //       }
  //     ],
  //     "name": "proposalCount",
  //     "type": "event"
  //   },
  //   {
  //     "anonymous": false,
  //     "inputs": [
  //       {
  //         "indexed": false,
  //         "internalType": "uint256",
  //         "name": "id",
  //         "type": "uint256"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "string",
  //         "name": "description",
  //         "type": "string"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "uint256",
  //         "name": "maxVotes",
  //         "type": "uint256"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "address",
  //         "name": "proposer",
  //         "type": "address"
  //       }
  //     ],
  //     "name": "proposalCreated",
  //     "type": "event"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "Proposals",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "id",
  //         "type": "uint256"
  //       },
  //       {
  //         "internalType": "bool",
  //         "name": "exists",
  //         "type": "bool"
  //       },
  //       {
  //         "internalType": "string",
  //         "name": "description",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "deadline",
  //         "type": "uint256"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "votesUp",
  //         "type": "uint256"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "votesDown",
  //         "type": "uint256"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "maxVotes",
  //         "type": "uint256"
  //       },
  //       {
  //         "internalType": "bool",
  //         "name": "countConducted",
  //         "type": "bool"
  //       },
  //       {
  //         "internalType": "bool",
  //         "name": "passed",
  //         "type": "bool"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "_tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "addTokenId",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "_id",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "countVotes",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "_description",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "address[]",
  //         "name": "_canVote",
  //         "type": "address[]"
  //       }
  //     ],
  //     "name": "createProposal",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "getValidTokens",
  //     "outputs": [
  //       {
  //         "internalType": "uint256[]",
  //         "name": "",
  //         "type": "uint256[]"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "nextProposal",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "owner",
  //     "outputs": [
  //       {
  //         "internalType": "address",
  //         "name": "",
  //         "type": "address"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "_nftAddress",
  //         "type": "address"
  //       }
  //     ],
  //     "name": "setNFTAddress",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "validTokens",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "_id",
  //         "type": "uint256"
  //       },
  //       {
  //         "internalType": "bool",
  //         "name": "_vote",
  //         "type": "bool"
  //       }
  //     ],
  //     "name": "voteOnProposal",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }
  // ]
  const NftAddress= "0xe2Cede84EEfD3Dc407108b9F92746db9b235B61f";
  const NftAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
        }
      ],
      "name": "TransferBatch",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "TransferSingle",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "value",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "URI",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "Admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_totalCount",
          "type": "uint256"
        }
      ],
      "name": "addNewCollectionSupply",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "accounts",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        }
      ],
      "name": "balanceOfBatch",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_whitelistUsers",
          "type": "address[]"
        },
        {
          "internalType": "bool",
          "name": "_isWhiteListed",
          "type": "bool"
        }
      ],
      "name": "batchWhiteList",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "exists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLastTokenId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getTokenUriForId",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getTotalNFTsForId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getTotalNFTsMintedForId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isWhitelistActive",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isWhitelisted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mintRate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "minted",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeBatchTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_mintRate",
          "type": "uint256"
        }
      ],
      "name": "setMintRate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_uri",
          "type": "string"
        }
      ],
      "name": "setURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "_status",
          "type": "bool"
        }
      ],
      "name": "setWhitelistStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_wlMintRate",
          "type": "uint256"
        }
      ],
      "name": "setWlMintRate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "supplies",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "totalMint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "uri",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_isWhiteListed",
          "type": "bool"
        }
      ],
      "name": "whitelistUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "whitelistUsers",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "wlMintRate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  


  const { contract } = useContract(DaoAddress);
  const { mutateAsync: createProposal } = useContractWrite(contract, "createProposal");
  const { mutateAsync: countVotes } = useContractWrite(contract, "countVotes");

  const {contract: NftContract} = useContract(NftAddress, NftAbi);
  const {mutateAsync: withdrawNftBalance} = useContractWrite(NftContract, "withdraw")
  
  //Alchemy
  const settings = {
    apiKey: "8DPNTl20OyOIKSU5DfV6wc7rtK6S24PH",
    network: Network.MATIC_MUMBAI,
  };
  const alchemy = new Alchemy(settings);
  const getNftOwners = async () => {
    for(let j=0; j<= tokenId; j++){
      const ownerAccounts = await alchemy.nft.getOwnersForNft(NftAddress, tokenId)
      // console.log(ownerAccounts.owners[0]);
      for (let i = 0; i < ownerAccounts.owners.length; i++) {
        NFTOwners.push(ownerAccounts.owners[i]);
      }
    }
    console.log(NFTOwners);
    finalNFTOwners = [...new Set(NFTOwners)];
    console.log(finalNFTOwners);
  }


  const handleWithdraw = async () => {
    const notification = toast.loading("Withdrawing Balance...");
    try {
      const data = await withdrawNftBalance([]);
      console.info("Balance Withdraw successs", data);
      toast.success("Balance Withdrawn Successfully!", {
        id: notification,
      });
    } catch (err) {
      toast.error(err.reason, {
        id: notification,
      });
      console.error("contract call failure", err);
    }
  }

  const handleCreateProposal = async () => {
    const notification = toast.loading("Creating Proposal...");
    await getNftOwners();
    try {
      const data = await createProposal([description, finalNFTOwners]);
      console.info("contract call successs", data);
      toast.success("Proposal Created Successfully!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Whoops, something went wrong!", {
        id: notification,
      });
      console.error("contract call failure", err);
    }
  }

  const countVotesOnProposal = async () => {
    const notification = toast.loading("Counting votes on Proposal...");
    try{
      const data = await countVotes([proposalId])
      console.info("contract call successs", data);
      toast.success("Votes counted Successfully!", {
        id: notification,
      });
    }catch (err) {
      toast.error("Whoops, something went wrong!", {
        id: notification,
      });
      console.log("Error ==> ", err);
    }
  }

  async function getBalance (){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(NftAddress);
    console.log((balance/1e18).toString());
    setContractBal((balance/1e18).toString());
  }
  useEffect(() => {
    getBalance();
  }, [])
  
  getBalance();


  return (
    <div className="bg-[#06283D] h-screen text-white">
      <Head>
        <title>Admin App</title>
        <meta name="description" content="Admin Dashboard for 3T DAO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex space-x-[160px] lg:space-x-[1200px] bg-[#256D85]">
        <h1 className="text-4xl m-2">Admin</h1>
        <ConnectWallet accentColor='#47B5FF' className="m-1" />
      </div>
      <div className="cont">
        <h1 className='pb-2 text-3xl'>Create a New Proposal for DAO</h1>
        <p className='pb-1 text-2xl'>Description:</p>
        <input type="text" placeholder=" Enter Description Here" onChange={(e) => { setDescription(e.target.value) }} className=" m-1 rounded-lg border border-b-gray-900 lg:w-[1000px] text-black text-2xl" />
        <button className="border-2 rounded-sm p-1 bg-[#256D85]" onClick={handleCreateProposal}>Create Proposal</button>
        <button onClick={getNftOwners} className="border-2 rounded-sm p-1 bg-[#256D85] ">Get Owners</button>
      </div>

      <div className="cont">
      <h1 className='pb-2 text-3xl'>Count Votes For DAO</h1>
      <p className='pb-1 text-2xl'>Proposal ID:</p>
        <input type="Number" placeholder="Enter Proposal ID Here" onChange={(e) => { setProposalId(e.target.value) }} className=" m-1 rounded-lg border border-b-gray-900 lg:w-[1000px] text-black text-2xl" />
        <button className="border-2 rounded-sm p-1 bg-[#256D85]" onClick={countVotesOnProposal}>Count Votes</button>
      </div>

      <div className="cont">
        <h1 className='pb-2 text-3xl'>NFT Admin Control</h1>
        <p className='pb-1 text-2xl'>NFT Contract Balance is: {contractBal + " " + currency} </p>
        <button className="border-2 rounded-sm p-1 bg-[#256D85]" onClick={handleWithdraw}>Withdraw Balance</button>
      </div>
    </div>
  )
}