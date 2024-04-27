const { Schema, model } = require('mongoose');
const CryptoJS = require('crypto-js');

const messageSchema = new Schema({
    sender: {type: String, required: true},
    content: {type: String, required: true},
    timestamp: {type: Date, default: Date.now}
});

messageSchema.pre('save', function(next) {
    const message = this;
    const encryptedContent = CryptoJS.AES.encrypt(message.content, 'your_secret_key').toString();
    message.content = encryptedContent;
    next();
});

const MessageDetail = model('message_details', messageSchema);

module.exports = MessageDetail;

