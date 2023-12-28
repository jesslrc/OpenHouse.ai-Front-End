const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors());
const port = 4000;

app.get("/api/communities", async (req, res) => {
  const response = await axios.get(
    "https://storage.googleapis.com/openhouse-ai-fe-coding-test/communities.json",
  );
  res.json(response.data);
});

app.get("/api/houses", async (req, res) => {
  const response = await axios.get(
    "https://storage.googleapis.com/openhouse-ai-fe-coding-test/homes.json",
  );
  res.json(response.data);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
