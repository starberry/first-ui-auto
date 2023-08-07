const {isEmpty} = require('lodash');
const {imageResSizes} = require('../../image-size');

const validateImageTransform = imageParams => { 
    if(isEmpty(imageParams)){
        return 'Empty props received!';
    } else if(isEmpty(imageParams.imagename)) {
        return 'Empty image name received!';
    } else if(isEmpty(imageParams.imagesources)){
        return 'Empty images input received!';
    } else {
        return '';
    }
}

const validateShowProcessedImage = imageParams =>{
    let validateMsg = validateSPIFunc(imageParams);
    if(validateMsg)
        return validateMsg;            
}

const validateShowImage = imageParams => {
    if(isEmpty(imageParams)){
        return '';
    } else if(isEmpty(imageParams.images)){
        return 'Image source empty!'
    }
}

const validateSPIFunc = imageParams => {
    let { renderer, sizes} = imageResSizes[imageParams.imagename]
    if(isEmpty(imageParams.imagename)) {
        return 'Empty image name received!';
    } else if(isEmpty(imageParams.images)){
        return 'Empty images input received!';
    } else if(isEmpty(renderer)){
        return 'Empty renderer received!';
    } else if(isEmpty(sizes)){
        return 'Empty sizes received!';
    } else {
        return '';
    }
}

module.exports = {
    validateImageTransform,
    validateShowProcessedImage,
    validateShowImage
}
