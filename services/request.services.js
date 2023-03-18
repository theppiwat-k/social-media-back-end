const NewFriendRequest = require('../models/request.model');
const User = require('../models/user.model');

module.exports.newFriendRequest = async (body, next) => {
  try {
    const { requester, recipient } = body;
    const newFriendRequest = new NewFriendRequest({
      requester: requester,
      recipient: recipient,
      status: 'pending',
    });

    const existRequest = await NewFriendRequest.findOne({
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

module.exports.accecptNewFriendRequest = async ({ requestId }, next) => {
  console.log(requestId)
  try {
    await NewFriendRequest.updateOne(
      {
        _id: requestId,
      },
      {
        status: 'accepted',
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

module.exports.rejectNewFriendRequest = async ({ requestId }, next) => {
  try {
    await NewFriendRequest.updateOne(
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
    await NewFriendRequest.find({ recipient: id })
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
