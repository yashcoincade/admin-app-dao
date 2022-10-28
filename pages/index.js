import Head from 'next/head'
import { useState } from 'react';
import{ethers, BigNumber} from 'ethers';
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Network, Alchemy } from "alchemy-sdk";
import toast from "react-hot-toast";

export default function Home() {
  const [description, setDescription] = useState("")
  const [proposalId, setProposalId] = useState("")
  let NFTOwners = [];

  const DaoAddress = "0x7E08c5E0D1548d4b100e3137F91A8339C4d4AA01";
  const DaoAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "votesUp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "votesDown",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "proposal",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "votedFor",
          "type": "bool"
        }
      ],
      "name": "newVote",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "passed",
          "type": "bool"
        }
      ],
      "name": "proposalCount",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "maxVotes",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "proposer",
          "type": "address"
        }
      ],
      "name": "proposalCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "Proposals",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "votesUp",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "votesDown",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maxVotes",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "countConducted",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "passed",
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
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "addTokenId",
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
        }
      ],
      "name": "countVotes",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "address[]",
          "name": "_canVote",
          "type": "address[]"
        }
      ],
      "name": "createProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getValidTokens",
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
      "inputs": [],
      "name": "nextProposal",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        }
      ],
      "name": "setNFTAddress",
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
      "name": "validTokens",
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
        },
        {
          "internalType": "bool",
          "name": "_vote",
          "type": "bool"
        }
      ],
      "name": "voteOnProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]


  const { contract } = useContract(DaoAddress, DaoAbi);
  const { mutateAsync: createProposal } = useContractWrite(contract, "createProposal");
  const { mutateAsync: countVotes } = useContractWrite(contract, "countVotes");
  
  //Alchemy
  const settings = {
    apiKey: "8DPNTl20OyOIKSU5DfV6wc7rtK6S24PH",
    network: Network.MATIC_MUMBAI,
  };
  const alchemy = new Alchemy(settings);
  const getNftOwners = async () => {
    const ownerAccounts = await alchemy.nft.getOwnersForNft("0xb4EDF0E780aCd479B6f051374a50d25E830f1557", "0")
    console.log(ownerAccounts.owners[0]);
    for (let i = 0; i < ownerAccounts.owners.length; i++) {
      NFTOwners.push(ownerAccounts.owners[i]);
    }
    console.log(NFTOwners);
  }


  const handleCreateProposal = async () => {
    const notification = toast.loading("Creating Proposal...");
    await getNftOwners();
    try {
      const data = await createProposal([description, NFTOwners]);
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
        <h1 className='pb-2 text-3xl'>Create a New Proposal</h1>
        <p className='pb-1 text-2xl'>Description:</p>
        <input type="text" placeholder=" Enter Description Here" onChange={(e) => { setDescription(e.target.value) }} className=" m-1 rounded-lg border border-b-gray-900 lg:w-[1000px] text-black text-2xl" />
        <button className="border-2 rounded-sm p-1 bg-[#256D85]" onClick={handleCreateProposal}>Create Proposal</button>
        {/* <button onClick={getNftOwners} className="border-2 rounded-sm p-1 bg-[#256D85] ">Get Owners</button> */}
      </div>

      <div className="cont">
      <h1 className='pb-2 text-3xl'>Count Votes</h1>
      <p className='pb-1 text-2xl'>Proposal ID:</p>
        <input type="Number" placeholder="Enter Proposal ID Here" onChange={(e) => { setProposalId(e.target.value) }} className=" m-1 rounded-lg border border-b-gray-900 lg:w-[1000px] text-black text-2xl" />
        <button className="border-2 rounded-sm p-1 bg-[#256D85]" onClick={countVotesOnProposal}>Count Votes</button>
      </div>
    </div>
  )
}
