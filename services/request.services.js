const NewFriendRequest = require('../models/request.model');

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

module.exports.accecptNewFriendRequest = async ({id}, next) => {
  try {
    await NewFriendRequest.updateOne(
      {
        _id: id,
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

module.exports.rejectNewFriendRequest = async ({id}, next) => {
  try {
    await NewFriendRequest.updateOne(
      {
        _id: id,
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

