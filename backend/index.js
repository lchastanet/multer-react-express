const app = require("./src/app.js");

app.listen(8000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running on port 8000`);
  }
});
