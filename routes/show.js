const router = require('express').Router();
const File = require('../models/file');


router.get('/:uuid', async(req, res)=>{
    try {
        const file = await File.findOne({ uuid:req.params.uuid });

        if(!file){
            return res.render('download',{error: 'link has been expired..'});
        }else{
            return res.render('download',{
                uuid: file.uuid,
                fileName: file.filename,
                fileSize: file.size,
                downloadLink: `${process.env.v}/files/download/${file.uuid}`
            });
        }

    } catch (err) {
        return res.render('download',{error: 'something wrong check again..'});
    }
     

});

module.exports = router;