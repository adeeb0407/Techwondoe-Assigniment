"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authVerify_1 = __importDefault(require("../middleware/authVerify"));
const reviewsController_1 = require("../controller/reviewsController");
const router = express_1.default.Router();
router.get("/reviews/:id", authVerify_1.default, reviewsController_1.getMyReviews);
router.get("/reviewsingle/:id", authVerify_1.default, reviewsController_1.viewReview);
router.post("/createreview", authVerify_1.default, reviewsController_1.createReview);
router.get("/viewcheck/:id", reviewsController_1.checkView);
router.get("/reviewall", reviewsController_1.reviewAll);
router.delete("/deletereview/:id", authVerify_1.default, reviewsController_1.deleteReview);
router.patch("/updateReview", authVerify_1.default, reviewsController_1.updateReview);
router.post("/try", reviewsController_1.trialUpload);
exports.default = router;
