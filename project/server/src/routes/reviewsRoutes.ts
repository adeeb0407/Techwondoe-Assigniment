import express from 'express';
import authVerify from '../middleware/authVerify'
import imageUpload from '../middleware/imageUpload'
import {
    getMyReviews,
    createReview,
    deleteReview,
    updateReview,
    viewReview,
    trialUpload,
    reviewAll,
    checkView
} from '../controller/reviewsController';

const router = express.Router();

router.get("/reviews/:id", authVerify, getMyReviews);
router.get("/reviewsingle/:id", viewReview);
router.post("/createreview", authVerify, createReview);
router.get("/viewcheck/:id", checkView);
router.get("/reviewall",  reviewAll);
router.delete("/deletereview/:id", authVerify,deleteReview);
router.patch("/updateReview", authVerify,updateReview);
router.post("/try", trialUpload);

export default router;