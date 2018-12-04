(function () {

    'use strict';

    var app = angular.module('little_scanner_SPWA', []);

    app.controller('Main', control);

    control.$inject = [];

    function control() {
        var vm = angular.extend(this, {
            // add scanner object to data model
            scanner: new Instascan.Scanner({
                video: document.getElementById('qr-video'),
                continuous: true,
                scanPeriod: 5,
                backgroundScan: false,
                refractoryPeriod: 3000
            })
        });

        vm.scanner.addListener('scan', function (content) {
            alert(content);

            // stop the scanner as it should only scan one barcode each time
            vm.scanner.stop();
        });

        vm.scanBarcode = function () {

            // get a camera, pass it into the start function of the scanner object in the data model (defined above)
            // this will start the camera, show the video feed on the page and start scanning for a barcode
            Instascan.Camera.getCameras().then(function (cameras) {
                if (cameras.length > 0) {
                    vm.scanner.start(cameras[0]);
                    console.log("started scanner");
                } else {
                    console.error('No cameras found.');
                }
            }).catch(function (e) {
                console.error(e);
            });

        };
    }

})();