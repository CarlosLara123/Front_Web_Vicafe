/**
 * Created by Kent.Wood on 2016/2/17 11:31.
 */

if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
    define( "jquery", [], function () { return jQuery; } );
}

requirejs.config({
    waitSeconds:9999,
    paths: {
        AllInOnestaticLibs:'//pub-static.haozhaopian.net/static/web/share/js/libs/AllInOnestaticLibs_1527572938405',
        Fotor:[window.BundleEntry]
    },


    shim : {

        Fotor:{
            deps:['AllInOnestaticLibs'],
            exports:'Fotor'
        }
    }
});
