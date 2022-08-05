const mongoose = require('mongoose'); //
const { Schema } = mongoose; //
const SegmentSchema = new Schema({
    document_id: {
        type: String, //
        trim: true,
        required: true,
    },

    text: {
        type: String, //
        trim: true,
        required: true,
    },
    strike: {
        type: String, //
        trim: true,
        // required: true,
    },
    underline: {
        type: String, //
        trim: true,
        // required: true,
    },
    bold: {
        type: String, //
        trim: true,
        // required: true,
    },
    italic: {
        type: String, //
        trim: true,
        // required: true,
    }
})

const SegmentModel = mongoose.model('Segment', SegmentSchema);
module.exports = SegmentModel;