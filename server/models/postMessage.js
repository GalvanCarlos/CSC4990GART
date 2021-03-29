/**(WIP)
 * Models are used to structure database 'tables'
 * 
 * Notice how likes and tags are intergrated... more tba
 */

import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    creator: {
        type: String,
        required: true,
    },
    tags: [String],
    filePath: String,
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;