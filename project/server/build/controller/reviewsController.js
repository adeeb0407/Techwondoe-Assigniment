"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkView = exports.reviewAll = exports.trialUpload = exports.updateReview = exports.deleteReview = exports.createReview = exports.viewReview = exports.getMyReviews = void 0;
const config_1 = __importDefault(require("../config/config"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.getMyReviews = ((req, res) => {
    const { id } = req.params;
    config_1.default.query('SELECT * from reviews WHERE user_id = ?', [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
exports.viewReview = ((req, res) => {
    const { id } = req.params;
    config_1.default.query('SELECT * from reviews WHERE review_id = ?', [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
exports.createReview = ((req, res) => {
    const { user_id, title, rating, streamingApps, reviewDescription, banner } = req.body;
    config_1.default.query(`INSERT INTO reviews (user_id, title, rating, streaming_apps, review_description, banner_image) VALUES(?,?,?,?,?,?)`, [user_id, title, rating, `${streamingApps}`, reviewDescription, ""], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(user_id);
    });
});
exports.deleteReview = ((req, res) => {
    const { id } = req.params;
    config_1.default.query(`DELETE FROM reviews WHERE review_id = ?;`, [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
exports.updateReview = ((req, res) => {
    const { title, rating, streamingApps, reviewDescription, review_id, banner } = req.body;
    config_1.default.query(`UPDATE reviews
             SET title = ?, rating = ?, streaming_apps = ?, review_description = ?, banner_image = ?
             WHERE review_id = ?`, [title, rating, streamingApps, reviewDescription, "", review_id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
const trialUpload = (req, res) => {
    var _a;
    const file = req === null || req === void 0 ? void 0 : req.files;
    const new_file_name = ((_a = file === null || file === void 0 ? void 0 : file.file) === null || _a === void 0 ? void 0 : _a.size) + "_" + Date.now() + "_" + file.file.name;
    if (req.files === null) {
        console.log("no file Added");
    }
    else {
        file === null || file === void 0 ? void 0 : file.file.mv(`../client/src/components/organisms/uploads/${new_file_name}`, (err) => {
            if (err) {
                console.log(err);
            }
            let review_id = null;
            const { user_id } = req.body;
            config_1.default.query(`SELECT review_id
        FROM   reviews
        WHERE  user_id = ?
        ORDER  BY review_id DESC
        LIMIT  1;`, [user_id], (err, result) => {
                var _a;
                if (err) {
                    console.log(err);
                }
                let mainVal = Object.values(JSON.parse(JSON.stringify(result)));
                review_id = (_a = mainVal === null || mainVal === void 0 ? void 0 : mainVal.map((data) => data === null || data === void 0 ? void 0 : data.review_id)) === null || _a === void 0 ? void 0 : _a.toString();
                if (review_id !== null) {
                    config_1.default.query(`UPDATE reviews
                SET banner_image = "${new_file_name}"
                WHERE user_id = ? AND review_id = ?`, [user_id, parseInt(review_id)], (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        res.send(result);
                    });
                }
            });
        });
    }
};
exports.trialUpload = trialUpload;
exports.reviewAll = ((req, res) => {
    config_1.default.query('SELECT reviews.title,reviews.review_id, reviews.user_id, reviews.streaming_apps, reviews.banner_image, reviews.rating,users.username FROM techwondo.reviews INNER JOIN users ON reviews.user_id = users.user_id;', (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    });
});
exports.checkView = ((req, res) => {
    const { id } = req.params;
    config_1.default.query('SELECT reviews.title,reviews.review_id, reviews.user_id, reviews.streaming_apps, reviews.banner_image, reviews.rating,reviews.review_description,users.username FROM techwondo.reviews INNER JOIN users ON reviews.user_id = users.user_id WHERE review_id = ?;', [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    });
});
