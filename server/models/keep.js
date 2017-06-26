import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  imgUrl: {type: String},
  created: { type: Number, default: Date.now() },
  creatorId: {type: ObjectId, ref: models.user.name},
  vaultId: { type: String, default: "" },
  keepCount: { type: Number, default: 0},
  shareCount: { type: Number, default: 0},
  viewCount: { type: Number, default: 0},
  author: { type: String, default: ''}
});

module.exports = mongoose.model(models.keep.name, schema);