import 'image-compressor';
var imageCompressor = new ImageCompressor;

var compressorSettings = {
    toWidth: 500,
    toHeight: 500,
    mimeType: 'image/png',
    mode: 'strict',
    quality: 0.6
};

export default function(src, cb){
    imageCompressor.run(src, compressorSettings, cb);
} 