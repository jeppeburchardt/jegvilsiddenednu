const fs = require("fs");
const { WritableStream } = require("htmlparser2/lib/WritableStream");

let node;

const result = [];

function shortenPrecision(l) {
  // https://en.wikipedia.org/wiki/Decimal_degrees
  // 5 decimal places is 1.11m and should be enough
  return Math.round(l * 100000) / 100000;
}

const parserStream = new WritableStream({
  onopentag(name, attributes) {
    if (name === "node") {
      node = attributes;
      node.tags = {};
    }
    if (name === "tag") {
      node.tags[attributes.k] = attributes.v;
    }
  },
  onclosetag(name) {
    if (name === "node") {
      result.push([shortenPrecision(node.lat), shortenPrecision(node.lon)]);
    }
  },
});

const htmlStream = fs.createReadStream("benches.osm");
htmlStream
  .pipe(parserStream)
  .on("finish", () => console.log(JSON.stringify(result)));
