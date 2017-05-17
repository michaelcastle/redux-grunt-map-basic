define([
], function () {
    return {

        recordHistory: true,

        /**
         * When the back is invoked then this function will goTo the last extent in the list and remove it from the cache
         */
        goTo: function (view, viewpoint) {
            /*var options;

            if (view.type === '3d') {
                options = {
                    viewpoint: view.viewpoint
                };
            } else {
                options = view.extent;
            }*/
            this.recordHistory = false;
            this.deferredGoTo(view, viewpoint);
        },

        deferredGoTo: function (view, options) {
            if (view.stationary) {
                view.goTo(options);
            } else {
                var unwatch = view.watch('stationary', function () {
                    view.goTo(options);
                    unwatch.remove();
                }.bind(this));

                // if (!this.view.stationary) {
                //     console.error('not stationary!!!');
                // }

                // if (view.type === '2d') {
                //     return;
                // }
                // // setTimeout(function () {
                // //     view.goTo(options);
                // // }.bind(this), 100);
                // view.then(function () {
                //     view.goTo(options);
                // }).otherwise(console.error);
            }
        }
    };
});