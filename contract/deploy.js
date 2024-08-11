const ethers = require('ethers');

// Replace with your contract's ABI and bytecode
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "uid", "type": "string" },
      { "internalType": "string", "name": "issuedTo", "type": "string" },
      { "internalType": "string", "name": "issuer", "type": "string" },
      { "internalType": "string", "name": "course", "type": "string" },
      { "internalType": "string", "name": "issuedOn", "type": "string" }
    ],
    "name": "addCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string[]", "name": "uid", "type": "string[]" },
      { "internalType": "string[]", "name": "issuedTo", "type": "string[]" },
      { "internalType": "string[]", "name": "issuer", "type": "string[]" },
      { "internalType": "string[]", "name": "course", "type": "string[]" },
      { "internalType": "string[]", "name": "issuedOn", "type": "string[]" }
    ],
    "name": "addCertificateForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "uid", "type": "string" },
      { "internalType": "string", "name": "issuedTo", "type": "string" },
      { "internalType": "string", "name": "issuer", "type": "string" },
      { "internalType": "string", "name": "course", "type": "string" },
      { "internalType": "string", "name": "issuedOn", "type": "string" }
    ],
    "name": "verifyCertificate",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const bytecode = '0x' + "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610944806100606000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806312320a04146100465780631e44f0ea146100625780635fdc898f1461007e575b600080fd5b610060600480360381019061005b919061056e565b6100ae565b005b61007c60048036038101906100779190610675565b610216565b005b61009860048036038101906100939190610675565b6102c4565b6040516100a59190610797565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461010657600080fd5b60005b85518161ffff16101561020e57848161ffff168151811061012d5761012c6107b2565b5b6020026020010151848261ffff168151811061014c5761014b6107b2565b5b6020026020010151848361ffff168151811061016b5761016a6107b2565b5b6020026020010151848461ffff168151811061018a576101896107b2565b5b60200260200101516040516020016101a59493929190610852565b604051602081830303815290604052805190602001206001878361ffff16815181106101d4576101d36107b2565b5b60200260200101516040516101e99190610890565b9081526020016040518091039020819055508080610206906108e4565b915050610109565b505050505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461026e57600080fd5b838383836040516020016102859493929190610852565b604051602081830303815290604052805190602001206001866040516102ab9190610890565b9081526020016040518091039020819055505050505050565b6000848484846040516020016102dd9493929190610852565b604051602081830303815290604052805190602001206001876040516103039190610890565b908152602001604051809103902054036103205760019050610325565b600090505b95945050505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61039082610347565b810181811067ffffffffffffffff821117156103af576103ae610358565b5b80604052505050565b60006103c261032e565b90506103ce8282610387565b919050565b600067ffffffffffffffff8211156103ee576103ed610358565b5b602082029050602081019050919050565b600080fd5b600080fd5b600067ffffffffffffffff82111561042457610423610358565b5b61042d82610347565b9050602081019050919050565b82818337600083830152505050565b600061045c61045784610409565b6103b8565b90508281526020810184848401111561047857610477610404565b5b61048384828561043a565b509392505050565b600082601f8301126104a05761049f610342565b5b81356104b0848260208601610449565b91505092915050565b60006104cc6104c7846103d3565b6103b8565b905080838252602082019050602084028301858111156104ef576104ee6103ff565b5b835b8181101561053657803567ffffffffffffffff81111561051457610513610342565b5b808601610521898261048b565b855260208501945050506020810190506104f1565b5050509392505050565b600082601f83011261055557610554610342565b5b81356105658482602086016104b9565b91505092915050565b600080600080600060a0868803121561058a57610589610338565b5b600086013567ffffffffffffffff8111156105a8576105a761033d565b5b6105b488828901610540565b955050602086013567ffffffffffffffff8111156105d5576105d461033d565b5b6105e188828901610540565b945050604086013567ffffffffffffffff8111156106025761060161033d565b5b61060e88828901610540565b935050606086013567ffffffffffffffff81111561062f5761062e61033d565b5b61063b88828901610540565b925050608086013567ffffffffffffffff81111561065c5761065b61033d565b5b61066888828901610540565b9150509295509295909350565b600080600080600060a0868803121561069157610690610338565b5b600086013567ffffffffffffffff8111156106af576106ae61033d565b5b6106bb8882890161048b565b955050602086013567ffffffffffffffff8111156106dc576106db61033d565b5b6106e88882890161048b565b945050604086013567ffffffffffffffff8111156107095761070861033d565b5b6107158882890161048b565b935050606086013567ffffffffffffffff8111156107365761073561033d565b5b6107428882890161048b565b925050608086013567ffffffffffffffff8111156107635761076261033d565b5b61076f8882890161048b565b9150509295509295909350565b60008115159050919050565b6107918161077c565b82525050565b60006020820190506107ac6000830184610788565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600081519050919050565b600081905092915050565b60005b838110156108155780820151818401526020810190506107fa565b60008484015250505050565b600061082c826107e1565b61083681856107ec565b93506108468185602086016107f7565b80840191505092915050565b600061085e8287610821565b915061086a8286610821565b91506108768285610821565b91506108828284610821565b915081905095945050505050565b600061089c8284610821565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061ffff82169050919050565b60006108ef826108d6565b915061ffff8203610903576109026108a7565b5b60018201905091905056fea2646970667358221220a7b98c5aa0d41ccb01d357e10e687688d581d1d62ffdd6341069360cb2a7cac764736f6c63430008110033";

const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/polygon_amoy/937419ceb1788de9512dd589b947d40de3a732b4bd2a22dce9a12eb744e08c20');
const privateKey = ''; 

async function deployContract() {
  const wallet = new ethers.Wallet(privateKey, provider);

  const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();

  console.log('Contract deployed to:', contract);
}

deployContract();