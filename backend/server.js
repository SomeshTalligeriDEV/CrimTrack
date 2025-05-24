require("dotenv").config();
const express = require("express");
const Web3 = require("web3");
const multer = require("multer");
const fs = require("fs");
const { create } = require("ipfs-http-client");

const app = express();
const upload = multer({ dest: "uploads/" });

// Web3 setup
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
const contractABI = require("./abi.json");
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

// IPFS setup
const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

app.post("/upload", upload.single("file"), async (req, res) => {
  const { caseId, officerId, description, location } = req.body;
  const file = fs.readFileSync(req.file.path);

  const ipfsResult = await ipfs.add(file);
  const fileHash = ipfsResult.path;

  const fromAddress = process.env.WALLET_ADDRESS;

  await contract.methods
    .addRecord(caseId, officerId, description, fileHash, location)
    .send({ from: fromAddress });

  res.json({ message: "Record added to blockchain", fileHash });
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
