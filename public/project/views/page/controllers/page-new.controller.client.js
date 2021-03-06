(function () {
    angular
        .module('projectApp')
        .controller('pageNewController', pageNewController);


    function pageNewController(currentUser,$routeParams,
                               $location,
                               pageService) {
        var model = this;

        model.userRole = currentUser.role;
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.createPage = createPage;

        function init() {
            model.pages = pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
            function renderPages(pages) {
                model.pages = pages;
            }
        }
        init();

        function createPage(name, title) {
            var page = {
                name: name,
                description: title
            };
            if (!page || !page.name || typeof page.name === 'undefined' || page.name === null ||page.name ==="") {
                model.error = "Name is required";
                document.getElementById('name').style.backgroundColor = "#FCEDEB";
                model.name = "Error";
                return;
            }
            pageService
                .createPage(model.websiteId, page)
                .then(function () {
                    $location.url('/user/website/' + model.websiteId + '/page');
                });

        }


    }
})();