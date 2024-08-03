let lastCommand = 'close';

exports.getStatus = (req, res) => {
    res.json({ command: lastCommand });
};

exports.setStatus = (command) => {
    lastCommand = command;
};