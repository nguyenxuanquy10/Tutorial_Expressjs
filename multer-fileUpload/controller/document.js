const AdmZip = require("adm-zip");
const convert = require('xml-js');
const fs = require('fs');
const { documentModel, segmnetModel } = require('../model/index');
const path = require('path');
const home = (req, res, next) => {
    res.status(200).render("index");
}
const getFile = async(req, res) => {
    try {
        //Rip file from client 
        const zip = new AdmZip(req.file.path);

        //Path file saved
        const pathFile = path.join(__dirname + "/" + req.file.path);

        zip.extractAllTo( /*target path*/ "./public/unzip", /*overwrite*/ true);
        //Modify style of document
        const readStyle = fs.readFileSync("./public/unzip/docProps/app.xml")
        const readStyleJson = convert.xml2json(readStyle, { compact: true, spaces: 4 });
        const readStyleOB = JSON.parse(readStyleJson)
            //page of document
        const pageWord = readStyleOB["Properties"]["Pages"]["_text"]
            //create object document 
        const fileData = {
            filenmame: req.file.originalname,
            ext: req.file.originalname.split('.')[1],
            path: pathFile,
            pages: pageWord
        }
        const documentNew = await documentModel.create(fileData)
            // console.log(documentNew)
            //Modify document 
        const readSegment = fs.readFileSync("./public/unzip/word/document.xml");
        const segmentJson = convert.xml2json(readSegment, { compact: true, spaces: 4 });
        const segmentObject = JSON.parse(segmentJson);


        // console.log(segmentObject["w:document"]["w:body"]["w:p"])
        segmentObject["w:document"]["w:body"]["w:p"].forEach((row) => {
            console.log(row["w:r"]["w:t"]["_text"])
            if (row["w:r"]["w:t"]) {
                const sentences = row["w:r"]["w:t"]
                    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
                    .split("|");
                console.log(sentences)
                sentences.forEach((sentence) => {
                    const segment = new segmnetModel({
                        document_id: documentNew._id,
                        text: sentence,
                    });
                    segment.bold =
                        row["w:r"]["w:rPr"]["w:b"] //? .length == 0 ? true : false;
                    segment.italic =
                        row["w:r"]["w:rPr"]["w:i"] //? .length == 0 ? true : false;
                    segment.underline =
                        row["w:r"]["w:rPr"]["w:u"] //? .length == 0 ? true : false;
                    segment.strike =
                        row["w:r"]["w:rPr"]["w:strike"] //? .length == 0 ? true : false;
                    console.log(segment);
                    (async() => {
                        const newSegment = await segment.save();
                        // newSegments.push(newSegment);
                    })();

                    // console.log(row["w:r"]["w:rPr"]["w:i"] ? .length == 0);
                });
            }
        });
        // create ọbjects 
        // console.log(segmentObject["w:document"]["w:body"]["w:p"])
        res.status(200).json({
            status: "success",
            message: "File created successfully!!",
            // documentContent: segmentObject["w:document"]["w:body"]["w:p"]
            // data: JSON.parse(result1),
            // document: documentNew
        });

    } catch (error) {
        res.json({
            error,
        });
    }
}
module.exports = {
    home,
    getFile,
}