// import express from "express";

// const router = express.Router();

// router.get("/posts", (req, res) => {
//     res.send("This is posts");
// });

// module.exports = router;

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("We are on posts");
});

export default router;