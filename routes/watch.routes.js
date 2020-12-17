module.exports = app => {
    const watches = require("../controller/watch.controller");

    app.post("/v1/watch", watches.create);

    app.get("/v1/watch", watches.get);
};