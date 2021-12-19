    // SPDX-License-Identifier: MIT
    import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";
    import "@openzeppelin/contracts/utils/math/SafeMath.sol";
    import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

    pragma solidity ^0.8.4;
    pragma abicoder v2;

    contract RandomFans is ERC721, Ownable, ERC721Enumerable {
      using SafeMath for uint256;
      using Strings for uint256;

      uint256 public constant tokenPrice = 0.1 ether;
      uint256 public constant maxTokenPurchase = 5;
      uint256 public constant MAX_TOKENS = 53;

      string public baseURI = "https://ipfs.io/ipfs/QmSL1yVBgKyboJhxYDyHaNPcp2eqbn2PuRXfiF6w8eMd9m/";

      bool public saleIsActive = true;
      bool public isRevealed = true;

      uint256 public devReserve = 2;

      event FansMinted(uint256 tokenId, address owner);

      constructor() ERC721("RandomFans", "RFS") {}

      function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
      }

      function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
      }

      function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{ value: address(this).balance }("");
        require(os);
      }

      function reveal() public onlyOwner {
        isRevealed = true;
      }

      function reserveTokens(address _to, uint256 _reserveAmount)
        external
        onlyOwner
      {
        require(
          _reserveAmount > 0 && _reserveAmount <= devReserve,
          "Not enough reserve left for team"
        );
        for (uint256 i = 0; i < _reserveAmount; i++) {
          uint256 id = totalSupply();
          _safeMint(_to, id);
        }
        devReserve = devReserve.sub(_reserveAmount);
      }

      function toggleSaleState() external onlyOwner {
        saleIsActive = !saleIsActive;
      }

      function tokensOfOwner(address _owner)
        external
        view
        returns (uint256[] memory)
      {
        uint256 tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
          // Return an empty array
          return new uint256[](0);
        } else {
          uint256[] memory result = new uint256[](tokenCount);
          uint256 index;
          for (index = 0; index < tokenCount; index++) {
            result[index] = tokenOfOwnerByIndex(_owner, index);
          }
          return result;
        }
      }

      function mintFans(uint256 numberOfTokens) external payable {
        require(saleIsActive, "Sale must be active to mint Token");
        require(
          numberOfTokens > 0 && numberOfTokens <= maxTokenPurchase,
          "Can only mint one or more tokens at a time"
        );
        require(
          totalSupply().add(numberOfTokens) <= MAX_TOKENS,
          "Purchase would exceed max supply of tokens"
        );
        require(
          msg.value >= tokenPrice.mul(numberOfTokens),
          "Ether value sent is not correct"
        );

        for (uint256 i = 0; i < numberOfTokens; i++) {
          uint256 id = totalSupply().add(1);
          if (totalSupply() < MAX_TOKENS) {
            _safeMint(msg.sender, id);
            emit FansMinted(id, msg.sender);
          }
        }
      }


      function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
      {
        require(
          _exists(tokenId),
          "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();

        if (isRevealed == false) {
          return
            "ipfs://QmYcBoXUakgyU8g4TuEh3J5uaZVb2XYMnPFPgqpfLuMk5r/hidden.json";
        }

        return
          bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), ".json"))
            : "";

      }

      function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
      ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
      }

      function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
      {
        return super.supportsInterface(interfaceId);
      }
    }
