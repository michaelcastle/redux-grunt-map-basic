define([
], function () {
    return {

        recordHistory: true,

        /**
         * When the back is invoked then this function will goTo the last extent in the list and remove it from the cache
         */
        goTo: function (view, viewpoint) {
            this.recordHistory = false;
            /*var options;

            if (view.type === '3d') {
                options = {
                    viewpoint: view.viewpoint
                };
            } else {
                options = view.extent;
            }*/
            return view.goTo(viewpoint);
        }
    };
});