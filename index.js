const express = require("express");
const needle = require("needle");
const cors = require("cors");
const app = express();

// Routes
// app.use('/search', require('./routes/index'))

app.use(
  cors({
    // origin: "frontend_URL",
    // origin: "https://stagedev.staging.mediatechgroup.it",
    origin: "*",
    credentials: false,
  })
);

const SEARCH_API_SDK_BASE_URL =
  "https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/search/sdk/searchbox?";
// const SEARCH_API_BASE_URL = 'https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/search?'
const SEARCH_API_SDK_CHECKBOXES_URL =
  "https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/search/sdk/checkboxes?";
// these ones need to be changed, old method without aws SDK
const FACETS_API_BASE_URL =
  "https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/search/facets?";
const FACETSCLASSIC_API_BASE_URL =
  "https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/search/facetsclassic?";

// dynamo items/cover are OK for now
const DYNAMO_GET_ITEM_API_BASE_URL =
  "https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/dynamodbgetitem?";
const DYNAMO_GET_COVER_API_BASE_URL =
  "https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/dynamodbgetcover?";

// aws endpoint with SDK on lambda
app.get("/apisearchbase", async (req, res) => {
  try {
    const filter = req.query.filter;
    const online = req.query.online;
    const query = encodeURI(req.query.query.replace(/\s/g, "+"));
    const fields = req.query.fields;
    const start = req.query.start;
    const sort = req.query.sort;
    const ord = req.query.ord;
    console.log(filter, online, query, fields, start, sort, ord);
    const apiUrl = `${SEARCH_API_SDK_BASE_URL}online=${online}&filter=${filter}&query=${query}&fields=${fields}&start=${start}&sort=${sort}&ord=${ord}`;
    console.log("URL_49:------>");

    const apiRes = await needle("get", `${apiUrl}`);

    const data = apiRes.body;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// aws endpoint with SDK on lambda
app.get("/apicheckboxesfacets", async (req, res) => {
  try {
    const filter = req.query.filter;
    const online = req.query.online;
    const query = encodeURI(req.query.query.replace(/\s/g, "+"));
    // console.log('[const query]: ', query);
    // const query = req.query.query;
    const fields = req.query.fields;
    const start = req.query.start;
    const sort = req.query.sort;
    const ord = req.query.ord;
    // console.log(filter, online, query, fields, start, sort, ord);
    const apiUrl = `${SEARCH_API_SDK_CHECKBOXES_URL}online=${online}&filter=${filter}&query=${query}&fields=${fields}&start=${start}&sort=${sort}&ord=${ord}`;
    // console.log("URL:", apiUrl);

    const apiRes = await needle("get", `${apiUrl}`);

    const data = apiRes.body;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// app.get('/apisearch', async (req,res) => {
//     try {
//         const filter = req.query.filter;
//         const online = req.query.online;
//         const query = req.query.query;
//         // console.log(filter, online, query);
//         const apiUrl = `${SEARCH_API_BASE_URL}online=${online}&filter=${filter}&query=${query}`;
//         // console.log('URL:',apiUrl);

//     const apiRes = await needle('get', `${apiUrl}`)

//     const data = apiRes.body

//     res.status(200).json(data)

//     } catch (error) {
//         res.status(500).json({error})
//     }
// })

app.get("/apifacets", async (req, res) => {
  try {
    const filter = req.query.filter;
    const online = req.query.online;
    const query = req.query.query;
    console.log("allllllllllll=>", filter, online, query);
    const apiUrl = `${FACETS_API_BASE_URL}online=${online}&filter=${filter}&query=${query}`;
    console.log("URL:", apiUrl);

    const apiRes = await needle("get", `${apiUrl}`);

    const data = apiRes.body;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/apifacetsclassic", async (req, res) => {
  try {
    const online = req.query.online;
    const query = req.query.query;
    // console.log(online, query);
    const apiUrl = `${FACETSCLASSIC_API_BASE_URL}online=${online}&query=${query}`;
    // console.log('URL:',apiUrl);

    const apiRes = await needle("get", `${apiUrl}`);

    const data = apiRes.body;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/getrecord", async (req, res) => {
  try {
    const bibid = req.query.bibid;
    const apiUrl = `${DYNAMO_GET_ITEM_API_BASE_URL}bibid=${bibid}`;
    // console.log('URL:',apiUrl);

    const apiRes = await needle("get", `${apiUrl}`);

    const data = apiRes.body;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/getcover", async (req, res) => {
  try {
    const bibid = req.query.bibid;
    const size = req.query.size;
    const apiUrl = `${DYNAMO_GET_COVER_API_BASE_URL}bibid=${bibid}&size=${size}`;
    // console.log('URL:',apiUrl);

    const apiRes = await needle("get", `${apiUrl}`);

    const data = apiRes.body;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(5000, () => console.log(`Server running on port 5000`));
