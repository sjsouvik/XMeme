const Meme = require("../models/meme");

//Add controller
exports.addMeme = async (req, res) => {
  const { url, caption } = req.body;
  let isDuplicate = false;
  const meme = new Meme(req.body);

  //this is to check whether the same meme with same URL or caption exists or not
  Meme.findOne({ url }, (err, meme) => {
    if (meme) {
      isDuplicate = true;
    }
  });

  Meme.findOne({ caption }, (err, meme) => {
    if (meme) {
      isDuplicate = true;
    }
  });

  await meme.save((error, meme) => {
    if (isDuplicate) {
      return res.status(409).json({ error: "409 : Conflict" });
    }

    if (error) {
      return res.status(400).json({ error: "400 : Bad Request" });
    }

    res.json({ id: meme._id });
  });
};

//Get controller
exports.getAllMemes = (req, res) => {
  const memes = Meme.find()
    .limit(100)
    .sort([["createdAt", "desc"]])
    .exec((err, memes) => {
      if (err) {
        return res.status(500).json({ error: "500 : Server error" });
      }

      res.json(memes);
    });
};

//Get by id controller
exports.getMemeById = (req, res) => {
  const meme = Meme.findById(req.params.memeId).exec((err, meme) => {
    if (!meme) {
      return res.status(404).json({ error: "404 : NOT Found" });
    }

    res.json(meme);
  });
};

//Update controller
exports.updateMemeById = (req, res) => {
  const updatedMeme = Meme.updateOne(
    { _id: req.params.memeId },
    { $set: req.body }
  ).exec((err, updatedMeme) => {
    if (err) {
      return res.status(404).json({ error: "404 : NOT Found" });
    }

    return res.status(200).json({ message: "200 : Updated successfully" });
  });
};

//Delete controller
exports.deleteMeme = (req, res) => {
  const removedMeme = Meme.deleteOne({ _id: req.params.memeId }).exec(
    (err, removedMeme) => {
      if (err) {
        return res.status(404).json({ error: "404 : NOT Found" });
      }

      return res.status(200).json({ message: "200 : Deleted Successfully" });
    }
  );
};
