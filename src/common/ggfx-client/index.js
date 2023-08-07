//const {getUrl, getUrls, getUrlsByTransform} = require('./client');
//Get single image url
// getUrl({
//     "srcCftle" : "i.dev/properties/5fd0cf1ccea3d530a026bf10/RCS190152_01.jpg", 
//     "format" : "webp", 
//     "transform" : "100x10", 
// }).then(result => console.log('getUrl', result))
//     .catch(error => console.log('getUrl error', error));

//Get more images url under same format and same transform
// getUrls({
//     "images": JSON.stringify([
//         {
//             url: 'https://ggfx-completerpi.s3.eu-west-2.amazonaws.com/i.dev/properties/5fd0cf1ccea3d530a026bf10/RCS190152_01.webp'
//         }
//     ]),
//     "format" : "webp", 
//     "transform" : "100x10", 
// }).then(result => console.log('getUrl', result))
//     .catch(error => console.log('getUrl error', error));

//Get more image url set under same format with multiple transform
// getUrlSet({
//     "srcCftle": "i.dev/properties/5fd0cf1ccea3d530a026bf10/RCS190152_01.jpg",
//     "format" : "webp", 
//     "transform" : JSON.stringify([
//         "100x10"
//     ]), 
// }).then(result => console.log('getUrl', result))
//     .catch(error => console.log('getUrl error', error));

//Get more image urls set under same format with multiple transform
// getUrlsSet({
//     "images": JSON.stringify([
//         {
//             url: 'https://ggfx-completerpi.s3.eu-west-2.amazonaws.com/i.dev/properties/5fd0cf1ccea3d530a026bf10/RCS190152_01.webp'
//         }
//     ]),
//     "format" : "webp", 
//     "transform" : JSON.stringify([
//         "100x10"
//     ]), 
// }).then(result => console.log('getUrl', result))
//     .catch(error => console.log('getUrl error', error));

// *** NOTE:
//1. Format fetched from localStorage so no need to send the format
//2. Install styled-components package by "npm install --save styled-components"
