#!/usr/bin/env node

var path = require("path");
const fs = require("fs");
// command line options
var argv = require("minimist")(process.argv.slice(2), {
    alias: {
        h: 'hash',
    },
    boolean: ['hash']
});
const hash = require("./lib/tlsh.js");
const cwd = process.cwd();
const fileToHash = (file) => hash(fs.readFileSync(path.join(cwd, file), "utf-8"));
const DigestHashBuilder = require("./lib/digests/digest-hash-builder.js");
const hashDifference = (hash0, hash1) => new DigestHashBuilder().withHash(hash0).build().calculateDifference(new DigestHashBuilder().withHash(hash1).build(), true);
if (argv._ && argv._.length) {
    if (argv._.length === 1) {
        console.log(fileToHash(argv._[0]));
    } else {
        let [hash0, hash1] = argv._;

        if (!argv.hash) {
            hash0 = fileToHash(hash0);
            hash1 = fileToHash(hash1);
        }

        console.log(hashDifference(hash0, hash1));
    }
} else {
    console.error("No parameters specified");
}
