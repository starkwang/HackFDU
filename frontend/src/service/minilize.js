import 'image-compressor';
var imageCompressor = new window.ImageCompressor();
var compressorSettings = {
    toWidth: 400,
    toHeight: 300,
    mimeType: 'image/png',
    mode: 'strict',
    quality: 0.6
};

export default function(src, cb){
    imageCompressor.run(src, compressorSettings, cb);
} 