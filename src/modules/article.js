const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/news_API", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// function to add time 2 h
Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

// article schema

const article_Schema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    unique: true,
    trim:true
  },
  description: {
    type: String,
    required: true,
    trim:true
  },
  author: {
    type: String,
    trim: true,
    
  },
  date: { type: Date, default: Date.now },
});

article_Schema.pre("save", async function (next) {
  //  add to hours to date before save

  this.date = new Date().addHours(2);

  next();
});

const Article = mongoose.model("article", article_Schema);

module.exports = Article;
