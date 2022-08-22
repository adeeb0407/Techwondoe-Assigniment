import mysql from 'mysql';
import express, {Request, Response} from 'express';
import db from '../config/config';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from 'multer'

dotenv.config()
export const getMyReviews = ((req: Request, res: Response) => {

    const {id} = req.params
    
        db.query('SELECT * from reviews WHERE user_id = ? ORDER  BY review_id DESC',[id], (err: any, result: any) =>{
            if(err){
                console.log(err);
            }
            res.send(result);
        });
    
});

export const viewReview = ((req: Request, res: Response) => {

    const {id} = req.params
    
        db.query('SELECT * from reviews WHERE review_id = ?',[id], (err: any, result: any) =>{
            if(err){
                console.log(err);
            }
            res.send(result);
        });
    
});

export const createReview = ((req: any, res: Response) => {

    const {user_id,title, rating, streamingApps, reviewDescription, banner} = req.body
    
            db.query(`INSERT INTO reviews (user_id, title, rating, streaming_apps, review_description, banner_image) VALUES(?,?,?,?,?,?)`, [user_id, title, rating, `${streamingApps}`, reviewDescription, ""], (err: any, result: any) =>{
            if(err){
                console.log(err);
            }
            res.json(user_id);
        });
    
});
export const deleteReview = ((req: Request, res: Response) => {

    const {id} = req.params
    
            db.query(`DELETE FROM reviews WHERE review_id = ?;`, [id], (err: any, result: any) =>{
            if(err){
                console.log(err);
            }
            res.send(result);
        });
    
});
export const updateReview = ((req: Request, res: Response) => {

    const {title, rating, streamingApps, reviewDescription, review_id} = req.body

            db.query(`UPDATE reviews
             SET title = ?, rating = ?, streaming_apps = ?, review_description = ?
             WHERE review_id = ?`,
             [title, rating, `${streamingApps}`, reviewDescription, review_id], (err: any, result: any) =>{
            if(err){
                console.log(err);
            }
            res.send(result);
        });
        
    });

export const trialUpload = (req: any, res: any) => {
        const file = req?.files;
        const new_file_name = file?.file?.size + "_" + Date.now() + "_" + file.file.name
        if(req.files === null){
            console.log("no file Added")
        }else{
        file?.file.mv(`../client/src/components/organisms/uploads/${new_file_name}`, (err: any): any =>{
        if(err){
            console.log(err)
        }
        
        let review_id = null;
        const {user_id} = req.body
        db.query(`SELECT review_id
        FROM   reviews
        WHERE  user_id = ?
        ORDER  BY review_id DESC
        LIMIT  1;`, [user_id], (err: any, result: any) =>{
            if(err){
                console.log(err);
            }

           let mainVal = Object.values(JSON.parse(JSON.stringify(result)))

            review_id = mainVal?.map((data: any) => data?.review_id)?.toString()

            if(review_id !== null){
                db.query(`UPDATE reviews
                SET banner_image = "${new_file_name}"
                WHERE user_id = ? AND review_id = ?`, [user_id, parseInt(review_id)], (err: any, result: any) =>{
            if(err){
                console.log(err);
            }
            
            res.send(result);
            });
            }
        });
    })
}
}

export const reviewAll = ((req: Request, res: Response) => {

        db.query('SELECT reviews.title,reviews.review_id, reviews.user_id, reviews.streaming_apps, reviews.banner_image, reviews.rating,users.username FROM techwondo.reviews INNER JOIN users ON reviews.user_id = users.user_id ORDER  BY review_id DESC;', (err: any, result: any) =>{
            if(err){
                console.log(err);
            }
            res.json(result);
        });
    
});

export const checkView = ((req: Request, res: Response) => {

        const {id} = req.params

        db.query('SELECT reviews.title,reviews.review_id, reviews.user_id, reviews.streaming_apps, reviews.banner_image, reviews.rating,reviews.review_description,users.username FROM techwondo.reviews INNER JOIN users ON reviews.user_id = users.user_id WHERE review_id = ?;',[id], (err: any, result: any) =>{
            if(err){
                console.log(err);
            }
            res.json(result);
        });
    
});
