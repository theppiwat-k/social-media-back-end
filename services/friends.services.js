const Friend = require('../models/friend.model');
const User = require('../models/user.model');

module.exports.newFriendRequest = async (body, next) => {
  try {
    const { requester, recipient } = body;
    const newFriendRequest = new Friend({
      requester: requester,
      recipient: recipient,
      status: 'pending',
    });

    const existRequest = await Friend.findOne({
      requester: requester,
      recipient: recipient,
    });
    if (!existRequest) {
      await newFriendRequest.save().then((response) => {
        return next(null, response);
      });
    } else {
      return next('Request already exist');
    }
  } catch (error) {
    return next(error);
  }
};

module.exports.accecptNewFriendRequest = async (
  { requestId, requesterId, recipientId },
  next
) => {
  console.log(requestId);
  console.log(recipientId);
  try {
    await Friend.updateOne(
      {
        _id: requestId,
      },
      {
        status: 'accepted',
      }
    ).catch((error) => {
      return next(error);
    });
    await User.updateOne(
      { _id: recipientId },
      { $push: { 'friend.id': requesterId } }
    )
      .then((response) => {
        return next(null, response);
      })
      .catch((error) => {
        return next(error);
      });
  } catch (error) {
    return next(error);
  }
};

module.exports.rejectNewFriendRequest = async (
  { requestId, recipientId },
  next
) => {
  try {
    await Friend.updateOne(
      {
        _id: requestId,
      },
      {
        status: 'rejected',
      }
    )
      .then((response) => {
        return next(null, response);
      })
      .catch((error) => {
        return next(error);
      });
  } catch (error) {
    return next(error);
  }
};

module.exports.getNewFriendRequest = async ({ id }, next) => {
  try {
    await Friend.find({ recipient: id, status: 'pending' })
      .populate('requester')
      .exec((err, requester) => {
        if (err) {
          throw new Error(err);
        }
        return next(null, requester);
      });
  } catch (error) {
    return next(error);
  }
};

module.exports.getSuggestFriend = async ({ id }, next) => {
  console.log(id);
  const userId = id;
  const friends = await Friend.find({
    $or: [{ requester: id }, { recipient: id }],
    $and: [{ status: 'accepted' }],
  });
  console.log(friends);
  const friendId = friends.map((friend) => {
    const requester = friend.requester.toString();
    const recipient = friend.recipient.toString();
    if (requester !== userId) {
      return requester;
    }
    if (recipient !== userId) {
      return recipient;
    }
  });
  console.log(friendId);
  await User.find({ _id: { $ne: userId, $nin: friendId } })
    .limit(10)
    .sort({ date: -1 })
    .select({ username: 1, date: 1 })
    .exec((error, response) => {
      if (error) {
        return next(error);
      }
      return next(null, response);
    });
};
