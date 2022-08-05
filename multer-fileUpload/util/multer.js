const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    // filename: (req, file, cb) => {
    //     const ext = file.mimetype.split("/")[1];
    //     cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    // },
    originalname: (req, file, cb) => {
        cb(null, `${file.originalname}.zip`);
    },
    filename: function(req, file, cb) {
        //req.body is empty...
        //How could I get the new_file_name property sent from client here?
        cb(null, file.originalname + '-' + Date.now() + ".zip");
    }
});

const multerFilter = (req, file, cb) => {
    // if (file.mimetype.split("/")[1] === "doc") {
    cb(null, true);
    // } else {
    //     cb(new Error("Not a PDF File!!"), false);
    // }
};
//Calling the "multer" Function
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});
module.exports = upload;