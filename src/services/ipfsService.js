// src/services/ipfsService.js
import { create } from 'ipfs-http-client';

class IPFSService {
  constructor() {
    // You can use Infura, Pinata, or local IPFS node
    this.ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: 'Bearer YOUR_INFURA_PROJECT_SECRET' // Replace with your Infura credentials
      }
    });
  }

  async uploadFile(file) {
    try {
      const added = await this.ipfs.add(file);
      return added.path; // This is the IPFS hash
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  }

  async uploadJSON(jsonData) {
    try {
      const jsonString = JSON.stringify(jsonData);
      const added = await this.ipfs.add(jsonString);
      return added.path;
    } catch (error) {
      console.error('Error uploading JSON to IPFS:', error);
      throw new Error('Failed to upload JSON to IPFS');
    }
  }

  getFileUrl(hash) {
    return `https://ipfs.infura.io/ipfs/${hash}`;
  }

  async getFile(hash) {
    try {
      const chunks = [];
      for await (const chunk of this.ipfs.cat(hash)) {
        chunks.push(chunk);
      }
      return new Uint8Array(chunks.reduce((acc, chunk) => [...acc, ...chunk], []));
    } catch (error) {
      console.error('Error retrieving file from IPFS:', error);
      throw new Error('Failed to retrieve file from IPFS');
    }
  }
}

export default new IPFSService();