var compression = require("compression");
var express     = require("express");
var fs          = require("fs");
var serveStatic = require("serve-static");

var VERSION = JSON.parse(fs.readFileSync("package.json", "utf8")).version;

express()
    .use(function (req, res, next) {
        /*
        *   Support push state urls
        */
        var reg = new RegExp("/assets/|/VERSION");
        if (!reg.test(req.url)) {
            req.url = "/";
        }
        next();
    })
    .use(compression())
    .use(serveStatic("builds/" + process.env.BUILD_TARGET, {
        maxAge: 24 * 60 * 60 * 1000
    }))
    .get("/VERSION", function (req, res) {
        res.status(200).send(VERSION);
    })
    .listen(8080, "0.0.0.0", function () {
        console.log("Serving builds/" + process.env.BUILD_TARGET + " at http://0.0.0.0:8080");
    });
