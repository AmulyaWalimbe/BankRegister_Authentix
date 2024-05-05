// Event listener for the "Register" button click
import {ethers} from './ether.js';

const regButton = document.getElementById('regButton');
regButton.addEventListener('click', async () => {
            // Get user input from the form
            const bankname = document.getElementById('bankname').value;
            const ethadd = document.getElementById('ethadd').value;

            try {
                // Connect to your Ethereum provider and prepare the transaction
                const provider = new ethers.providers.JsonRpcProvider('https://ethereum-sepolia.blockpi.network/v1/rpc/public'); // Replace with your Ethereum provider URL
                const privateKey = '53edabd8e9dd5a6fffe4d3bad340b4378bbdc40140315435467e08de907e2376'; // Replace with your private key
                const wallet = new ethers.Wallet(privateKey, provider);

                const contractABI = [{
                        "inputs": [{
                                "internalType": "address",
                                "name": "bankAddress",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "bankName",
                                "type": "string"
                            }
                        ],
                        "name": "addPartyMember",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [{
                                "internalType": "string",
                                "name": "hashString",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "originID",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "data",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "timestamp",
                                "type": "uint256"
                            }
                        ],
                        "name": "apiEquivalentCaller",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                    },
                    {
                        "anonymous": false,
                        "inputs": [{
                                "indexed": false,
                                "internalType": "string",
                                "name": "encryptedData",
                                "type": "string"
                            },
                            {
                                "indexed": false,
                                "internalType": "uint256",
                                "name": "timestamp",
                                "type": "uint256"
                            }
                        ],
                        "name": "DataEncrypted",
                        "type": "event"
                    }
                ];
                const contractAddress = '0x308825b3AA98E85512BDeBD30c85D54BFD39Da9a'; // Replace with your contract address
                const contract = new ethers.Contract(contractAddress, contractABI, wallet);

                // Set gas price and gas limit
                const gasPrice = ethers.utils.parseUnits('5', 'gwei');
                const initialGasLimit = 3000000;

                // Send the transaction to store the data
        const tx = await contract.addPartyMember(ethadd, bankname, {
            gasLimit: initialGasLimit,
            gasPrice: gasPrice,
        });

        console.log('Transaction Hash:', tx.hash);
        //console.log('Ethereum Address ', ethadd);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();

        // Check if the transaction was successful
        if (receipt.status === 1) {
            console.log('Transaction Successful');
            // View the stored data (replace with your contract's method to retrieve data)
            // const storedData = await contract.searchMapping(hashedDataBytes32); // Change to use 'hashedDataBytes32'
            // console.log('Stored Ethereum Address:', storedData);
        } else {
            console.error('Transaction Failed');
            console.error('Transaction Receipt:', receipt);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});