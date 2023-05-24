// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library ERC1155Storage {
    // Bypass for a `--via-ir` bug (https://github.com/chiru-labs/ERC721A/pull/364).
    struct TokenApprovalRef {
        address value;
    }

    struct Layout {
        // =============================================================
        //                            STORAGE
        // =============================================================

        // Mapping from token ID to account balances
        mapping(uint256 => mapping(address => uint256)) _balances;
        // Mapping from account to operator approvals
        mapping(address => mapping(address => bool)) _operatorApprovals;
        mapping(uint256 => uint256) _totalSupply;
        bool _paused;
        // Used as the URI for all token types by relying on ID substitution, e.g. https://token-cdn-domain/{id}.json
        string _uri;
        // Optional base URI
        string _baseURI;
        // Optional mapping for token URIs
        mapping(uint256 => string) _tokenURIs;
    }

    bytes32 internal constant STORAGE_SLOT = keccak256("ERC1155.contracts.storage.ERC1155");

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
