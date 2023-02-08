const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/b88dbc149ab5439a90bc787d739dfcfa'));

// 66e383eda3a7484fb70f8287e210ea0c 
exports.fetchBlock = async (req, res, next) => {
    const blockId = req.params.blockId;
    try {
        let block;
        // Check if blockId is a hash or number
        if (web3.utils.isHex(blockId)) {
            block = await web3.eth.getBlock(blockId, true);
        } else {
            block = await web3.eth.getBlock(parseInt(blockId), true);
        }
        res.status(200).json({ block: block });
    } catch (error) {
        res.status(400).json({ error: 'Invalid block hash or number' });
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.fetchTransaction = async (req, res, next) => {
    const transactionHash = req.params.transactionHash;
    try {
        const transaction = await web3.eth.getTransaction(transactionHash);
        res.status(200).json({ transaction: transaction });
    } catch (error) {
        res.status(400).json({ error: 'Invalid Hash' });
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}