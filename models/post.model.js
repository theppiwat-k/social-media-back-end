const mongoose = require('mongoose');
const { Schema } = mongoose;
const PostSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        date: {
            type: Date,
            default: Date.now(),
        },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                },
                date: {
                    type: Date,
                    default: Date.now(),
                },
            },
        ],
    },
    {
        toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
        toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
    }
);

PostSchema.set('toJSON', {
    virtuals: true,
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    },
});

PostSchema.virtual('commentofpost', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post',
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;
