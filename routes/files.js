const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File =require('../models/file')
const {v4: uuid4} = require('uuid');
const { diskStorage } = require('multer');


let storage = multer.diskStorage({
    destination:(req, file, cb)=> cb(null, './uploads/'),
    filename:(req, file, cb)=>{
        let uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;

        cb(null, uniqueName);
    }
});

let upload = multer({
    storage: storage,
    limits : {fileSize:250000000} //250MB
}).single('myfile');

router.post('/',(req,res)=>{

    //store files
    upload(req, res, async(err)=>{

        //validate req

        if(!req.file){
        return res.json({
            error:'all fields are required...'
        });
    }
        if(err){
            return res.status(500).send({error:err.message});
        }

         //store into database

         const file = new File({
                filename: req.file.filename,
                uuid: uuid4(), 
                path: req.file.path,
                size: req.file.size
         });

            const response = await file.save();
            return res.json({
                file: `${process.env.APP_BASE_URL}/files/${response.uuid}`
            });

    });


});


module.exports = router;