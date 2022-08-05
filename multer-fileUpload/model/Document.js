const mongoose = require("mongoose");
const { Schema } = mongoose;
const DocumentSchema = new Schema({
    filenmame: {
        type: String, //
        trim: true,
        required: true,
    },
    ext: {
        type: String, //
        trim: true,
        required: true,
    },
    path: {
        type: String, //
        trim: true,
        required: true,
    },
    pages: {
        type: String, //
        trim: true,
        required: true,
    },

})
const DocumentModel = mongoose.model("document", DocumentSchema);

module.exports = DocumentModel;