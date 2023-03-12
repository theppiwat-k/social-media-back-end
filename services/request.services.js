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
      console.log(1);
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
