const mongoose = require('mongoose');
const { Schema } = mongoose;

const FriendRequestSchema = new Schema(
    {
        requester: {
            // User who sent the friend request
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        recipient: {
            // User who received the friend request
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        status: {
            // Status of the friend request
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
    },
    { timestamps: true },
);

const Friend = mongoose.model('friend', FriendRequestSchema);
module.exports = Friend;
