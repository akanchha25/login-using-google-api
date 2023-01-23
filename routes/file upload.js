const express = require('express')
const passport = require('passport')
const {google} = require('googleapis');

const multer = require('multer')

const router = express.Router()
const path = require('path');

router.get('/', function(request, response, next) {
    response.render('fileupload', {title: 'Welcome to Cloud connect!...infinity', message : request.flash('success')})
} );

router.post('/', function(request, response, next) {

    var storage = multer.diskStorage({
        destination: function(request, file, callback)
        {
            callback(null, './upload');
        },
        filename : function(request, file, callback)
        {
            var temp_file_arr = file.originalname.split(".");
            var temp_file_name = temp_file_arr[0];
            var temp_file_extension = temp_file_arr[1];

            console.log(file.path);

            callback(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
        }
    });

    var upload = multer({storage: storage}).single('sample_image');
    upload(request, response, function(error) {
        if(error) {
            return response.end('Error Uploading File');

        }
        else {
            //return response.end('File Uploaded Successfully')
            
            request.flash('success', request.file.filename)
            //console.log(file);
            response.redirect('/fileupload')
        }
    });

})


module.exports = router;