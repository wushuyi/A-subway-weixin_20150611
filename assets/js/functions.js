function main() {
    'use strict';

    var $el = {};
    var cache = {};
    $el.wrapper = $('.wrapper');
    $el.loadBox = $('#load');
    $el.loadProgress = $('.progress', $el.loadBox);

    $el.imgs = $('.imgs');
    //$el.img_p1_5 = $('.p1-5', $el.imgs);

    var imgPath = './assets/images/';
    var manifest = [
        'p1/img1.png',
        'p1/img2.png',
        'p1/img3.png',
        'p1/img4.png',
        'p1/img5.png',
        'p1/img6.png',
        'p1/img7.png',

        'p2/img1.png',
        'p2/img2.png',
        'p2/img3.png',
        'p2/img4.png',

        'p3/img1.png',
        'p3/img2.png',
        'p3/img3.png',
        'p3/img4.png',

        'p4/img1.png',
        'p4/img2.png',
        'p4/img3.png',
        'p4/img4.png',
        'p4/img5.png',
        'p4/img6.png',
        'p4/img7.png',
        'p4/img8.png',

        'p5/img1.png',
        'p5/img2.png',
        'p5/img3.png',
        'p5/img4.png',

        'p6/img1.png'
    ];
    var preload = new createjs.LoadQueue(false, imgPath);
    preload.on("progress", function (load) {
        //$el.loadProgress.text(parseInt(load.progress * 100));
        $el.loadProgress.width(load.progress * 100 + '%');
    });
    preload.on("complete", function () {
        setTimeout(function () {
            $el.loadBox.remove();
        }, 400);

    });
    preload.on("error", function () {
        console.log(arguments);
    });
    preload.setMaxConnections(5);
    $.each(manifest, function (index, item) {
        preload.loadFile(item);
    });

    var s = skrollr.init({
        edgeStrategy: 'set',
        easing: {
            shake: function (p) {
                p *= 16;
                return Math.sin(p);
            }
        },
    });
    //cache.bgLock = false;
    /*
     s.on('beforerender', function (data) {
     //console.log(data);
     //if(!cache.bgLock && data.curTop >= 4460){
     //    cache.bgLock = true;
     //    $el.wrapper.css('background-image', 'url("./assets/images/p4/img5.png")');
     //}else if(cache.bgLock && data.curTop <= 4460){
     //    cache.bgLock = false;
     //    $el.wrapper.css('background-image', '');
     //}
     })*/

}
$.fn.ready(main);