(function () {

    'use strict';

    var app = angular.module('little_scanner_SPWA', []);

    app.controller('Main', control);

    control.$inject = [];

    function control() {
        var vm = angular.extend(this, {
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
            vm.scanner.stop();
        });

        vm.scanBarcode = function () {

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

        return vm;
    }

})();