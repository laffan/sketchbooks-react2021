#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const shell = require('shelljs');
const slugify = require('slugify');

const sizes = [
  ["thumb", 260],
  ["home", 1000],
  ["full", 2000]
];

// Create array of paths to process.
shell.find('sketchbooks-fullsize').filter(function (filePath) {
  if (filePath.includes(`.jpg`)) {

    const pathObj = path.parse(filePath);
    const dirName = pathObj.dir.split("/")[1];
    const dates = dirName.split(" -- ")[0];
    const nameSlug = slugify(dirName.split(" -- ")[1], { lower: true });
    const datesSlug = dates.replaceAll(" to ", "-");
    const newDirName = `${datesSlug}--${nameSlug}`;
    const targetPath = `public/sketchbooks/${newDirName}`;

    if (!fs.existsSync(targetPath)) {
      shell.mkdir('-p', targetPath);
    }


    const resize = function (imgSize) {

      let sizeName = imgSize[0];
      let sizeDimension = imgSize[1];

      return sharp(filePath)
        .resize(sizeDimension, sizeDimension, {
          fit: sharp.fit.inside,
          withoutEnlargement: true
        })
        .toFile(`${targetPath}/${pathObj.name}-${sizeName}.jpg`);
    }


    Promise
      .all(sizes.map(resize))
      .then(() => {
        console.log(`${targetPath} Resized`);
      });
  }
});
