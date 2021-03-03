let mongoose = require("mongoose");

class Database {

    constructor(settings) {
        let { url, options } = settings;
        mongoose.connect(url, options);
    }

}

module.exports = { Database };
