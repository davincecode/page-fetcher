const times = process.argv.slice(2);

const fs = require("fs");
const request = require("request");

const site = times[0];
const localPath = times[1];

request(site, (error, response, body) => {
  let siteResponse = body;

  if (siteResponse === undefined)
    return console.log(`URL is invalid. ${error}`);

  fs.writeFile(localPath, siteResponse, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.stat(localPath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Downloaded and saved ${stats.size} bytes to ${localPath}`);
    });
  });
});