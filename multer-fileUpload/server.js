const express = require('express'); //co
const app = express();
const mongoose = require("mongoose");
const upload = require('./util/multer');
const PORT = 3000;
const router = require('./router/index');

app.set("view engine", "ejs");
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

//Connect mongoodb
const DB = "mongodb://localhost:27017/Multer";

mongoose.mongoose.connect(DB, {
        useNewUrlParser: true,
        retryWrites: false,
    })
    .then(() => {
        console.log("DB connected successfully");
    });



// app.post("/api/uploadFile", upload.single("myFile"), async(req, res) => {
//     try {
//         const zip = new AdmZip(req.file.path);
//         zip.extractAllTo( /*target path*/ "./public/unzip", /*overwrite*/ true);
//         const pathFile = req.file.path;
//         console.log(pathFile);
//         const data = fs.readFileSync("./public/unzip/word/document.xml");
//         // console.log(data)
//         const result1 = convert.xml2json(data, { compact: true, spaces: 4 });
//         console.log(JSON.parse(result1)["_declaration"]);

//         res.status(200).json({
//             status: "success",
//             message: "File created successfully!!",
//             data: JSON.parse(result1)
//         });

//     } catch (error) {
//         res.json({
//             error,
//         });
//     }
// });
app.use(router);
app.get("/api/getFiles", async(req, res) => {
    fs.createReadStream('Test.docx-1659257871392.zip')
        .pipe(unzipper.Parse())
        .on('entry', function(entry) {
            const fileName = entry.path;
            const type = entry.type; // 'Directory' or 'File'
            const size = entry.vars.uncompressedSize; // There is also compressedSize;
            if (fileName === "this IS the file I'm looking for") {
                entry.pipe(fs.createWriteStream('output/path'));
            } else {
                entry.autodrain();
            }
        });
});
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
    console.log(err.message, err.name);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log("Server is up listening on PORT:" + PORT);
});

// fs.readFile('test.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });