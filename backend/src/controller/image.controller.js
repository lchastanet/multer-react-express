const { addOne, getAll, deleteOne } = require("../model/image.model.js");
const fs = require("fs");
const path = require("path");

const createOne = async (req, res) => {
  try {
    const result = await addOne({
      name: req.body.name,
      file_name: req.file.filename,
    });

    if (result) res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const browse = async (req, res) => {
  try {
    const result = await getAll();

    const formatedData = result.map((img) => ({
      ...img,
      file_name: `${req.protocol}://${req.get("host")}/uploads/${
        img.file_name
      }`,
    }));

    if (result) res.json(formatedData);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const removeOne = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const removed = await deleteOne(id);

    const { image } = removed;

    await fs.promises.unlink(
      path.join(__dirname, `../../public/uploads/${image[0].file_name}`)
    );

    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports = { createOne, browse, removeOne };
