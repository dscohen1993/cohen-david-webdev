(function () {
    angular
        .module('projectApp')
        .controller('websiteListController', websiteListController);

    function websiteListController(currentUser,$routeParams,
                                   websiteService) {
        var model = this;
        model.userRole = currentUser.role;
        model.userId = currentUser._id;

        function init() {
        websiteService
            .findWebsitesByUser(model.userId)
            .then(renderWebsites);

        function renderWebsites(websites) {
            model.websites = websites;
        }
    }
        init();
    }
})();