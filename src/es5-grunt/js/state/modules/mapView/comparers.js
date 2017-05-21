define([
], function () {

    var zoomComparer = function (stateA, stateB) {
        if (!stateA && !stateB) return true;
        if (!stateA || !stateB) return false;
        if (isNaN(stateA.zoom) && isNaN(stateB.zoom)) return true;
        return stateA.zoom && stateB.zoom && stateA.zoom.toFixed(5) === stateB.zoom.toFixed(5);
    };
    var rotationComparer = function (stateA, stateB) {
        if (!stateA && !stateB) return true;
        if (!stateA || !stateB) return false;
        if (isNaN(stateA.rotation) && isNaN(stateB.rotation)) return true;
        return stateA.rotation && stateB.rotation && stateA.rotation.toFixed(5) === stateB.rotation.toFixed(5);
    };
    var extentComparer = function (stateA, stateB) {
        if (!stateA && !stateB) return true;
        if (!stateA || !stateB) return false;
        if (stateA.type === '2d') {
            return stateA.extent && stateA.extent.equals(stateB.extent);
        } else {
            return stateA.viewpoint && stateB.viewpoint && stateA.viewpoint.camera.equals(stateB.viewpoint.camera);
        }
    };

    var comparer = {
        zoomComparer: function (stateA, stateB) {
            return zoomComparer(stateA, stateB);
        },
        rotationComparer: function (stateA, stateB) {
            return rotationComparer(stateA, stateB);
        },
        extentComparer: function (stateA, stateB) {
            return extentComparer(stateA, stateB);
        },
        viewComparer: function (stateA, stateB) {
            return zoomComparer(stateA, stateB) && rotationComparer(stateA, stateB) && extentComparer(stateA, stateB);
        }
    };

    return comparer;
});