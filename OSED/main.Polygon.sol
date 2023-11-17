pragma solidity ^0.8.19;

contract Counter {
    uint public count;
    function inc() public {
        count += 1;
    }
    function dec() public {
        // This function will fail if count = 0
        count -= 1;
    }
}
