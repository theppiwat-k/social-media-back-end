const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewFriendRequestSchema = new Schema(
  {
    requester: {
      // User who sent the friend request
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    recipient: {
      // User who received the friend request
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      // Status of the friend request
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);


const NewFriendRequest = mongoose.model('request',NewFriendRequestSchema);
module.exports = NewFriendRequest