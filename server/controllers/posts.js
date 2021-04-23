/**  (WIP)
 * Controllers
 * A controller can be defined as the entity that will be responsible for manipulating models
 * and initiating the view render process with the data received from the corresponding models.
 *
 * This is built to handle our post ie Fan Art
 *
 * basically DB --> Model --> controller
 */

import express from "express";
import mongoose from "mongoose";
import aws from 'aws-sdk'
import PostMessage from "../models/postMessage.js";
import User from "../models/users.js"
import Comment from "../models/comments.js"
import asyncHandler from "express-async-handler";

import formidable from "formidable";
const router = express.Router();

// import { upload } from "../utils/upload.js";
// const singleUpload = upload.single("image");

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  try {
    const post = await PostMessage.findById(id);
    const comments = await Comment.find({onPost: id})
    //console.log('comment: ' + comments)
    res.status(200).json({posts: post, comments: comments});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

import { upload } from "../utils/upload.js";
import { generateKeyPairSync } from "crypto";
const singleUpload = upload.single("file");
// const formInput = upload.single("data");
export const createPost = asyncHandler(async (req, res) => {
  await singleUpload(req, res, async function (err) {
    if (err) {
      return res
        .status(422)
        .send({
          errors: [{ title: "Image Upload Error", detail: err.message }],
        });
    }
    const postData = req.body;
    // console.log(postData);
    const newPostMessage = new PostMessage({
      ...postData,
      // creator: req.userID,
      createdAt: new Date().toISOString(),
      filePath: req.file.location,
    });

    try {
      await newPostMessage.save();
      // console.log(newPostMessage);
      res.status(201).json(newPostMessage);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  });
});

const credentials = new aws.SharedIniFileCredentials({ profile: 'default' });
aws.config.credentials = credentials;
aws.config.update({
  // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  // signatureVersion: "v4",
  region: "us-east-2",
});

const s3 = new aws.S3();
var bucketParams = {
  Bucket: 'gartimagebucket2021'
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, filePath, tags, username } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, description, tags, filePath, username, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

const getKeysViaFilePath = (filePath) =>{
  let temp = filePath.split("/")
  // console.log(temp[temp.length - 1])
  return temp[temp.length - 1]
}
//research how to delete from bucket
export const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await PostMessage.findById(id);
  let keys = getKeysViaFilePath(post.filePath)

  // console.log("keys",keys)
  var params = { Bucket: 'gartimagebucket2021', Key: keys};



  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);  // error
    else console.log("Image successfully delete from AWS BUCKET");                 // deleted
  });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);
  // console.log("sudo delete")

  res.json({ message: "Post deleted successfully." });
};


export const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //console.log(req.userID)
  if (!req.userID) {
    // console.log("uhh")
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    // console.log("like2")
    return res.status(404).send(`No post with id: ${id}`);

  }
  const post = await PostMessage.findById(id);
  const liker = await User.findOne({"userID" : req.userID})
  const index = post.likes.findIndex((id) => id === String(req.userID));

  // console.log(liker)
  if (index === -1) {
    post.likes.push(req.userID);
    liker.likes.push(id)
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userID));
    liker.likes = liker.likes.filter((postId) => postId !== String(id));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  const updatedUser = await User.findByIdAndUpdate(liker._id, liker, {
    new: true,
  });
  //console.log(updatedPost)
  res.status(200).json({updatedPost, updatedUser});
})


export const addComment = asyncHandler(async (req, res) => {
  const {id} = req.params
  let data = req.body
  console.log(data)

  if (!data.commentBy) {
    //console.log("Not today")
    return res.json({ message: "Unauthenticated" });
    
  }

  if (!mongoose.Types.ObjectId.isValid(data.onPost)) {
    return res.status(404).send(`No post with id: ${id}`);
  }


  const comment = new Comment ({
    ...data,
  })

  //console.log(comment)
  try {
    await comment.save();
    res.status(200).json({comment});
} catch(err){
    console.log(err);
}
 
})

export default router;
