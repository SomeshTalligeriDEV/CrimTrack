// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CriminalChain {
    struct Record {
        string caseId;
        string officerId;
        string description;
        string fileHash;
        string location;
        uint timestamp;
    }

    Record[] public records;

    event RecordAdded(
        string caseId,
        string officerId,
        string fileHash,
        uint timestamp
    );

    function addRecord(
        string memory caseId,
        string memory officerId,
        string memory description,
        string memory fileHash,
        string memory location
    ) public {
        records.push(
            Record(caseId, officerId, description, fileHash, location, block.timestamp)
        );
        emit RecordAdded(caseId, officerId, fileHash, block.timestamp);
    }

    function getAllRecords() public view returns (Record[] memory) {
        return records;
    }
}
