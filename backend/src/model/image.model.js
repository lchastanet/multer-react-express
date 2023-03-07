const db = require("./db.js");

const addOne = async (image) => {
  try {
    const { name, file_name } = image;

    const [result] = await db.query(
      "insert into image (name, file_name) values (?, ?)",
      [name, file_name]
    );

    return result.insertId;
  } catch (e) {
    console.log(e);
  }
};

const getAll = async () => {
  try {
    const [result] = await db.query("select * from image");

    return result;
  } catch (e) {
    console.log(e);
  }
};

const deleteOne = async (id) => {
  try {
    const [image] = await db.query("select * from image where id = ?", [id]);
    const [result] = await db.query("delete from image where id = ?", [id]);

    return { image, result };
  } catch (e) {
    console.log(e);
  }
};

module.exports = { addOne, getAll, deleteOne };
