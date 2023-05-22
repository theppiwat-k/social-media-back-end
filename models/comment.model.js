const mongoose = require('mongoose');
const { Schema } = mongoose;
const CommentSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    }
);

CommentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    },
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
