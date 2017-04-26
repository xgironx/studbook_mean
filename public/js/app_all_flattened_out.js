"use strict";

(function() {
    angular
          .module("studbook", [ "ui.router", "ngResource" ] )
          .config(Router                                    )

          .factory("HorseFactory",     HorseFactory         )
          .factory("UserFactory",      UserFactory          )

          .controller("ShowController",   ShowController                        )
          .controller("IndexController",  IndexController                       )
    ;

    Router.$inject = [    "$stateProvider", "$locationProvider", "$urlRouterProvider"    ];
           function Router($stateProvider,   $locationProvider,   $urlRouterProvider     )
                {
                                             $locationProvider.html5Mode(true);
                           $stateProvider
                                         .state("index",    { url: "/",         templateUrl:  "/assets/html/horses-index.html", controller:   "IndexController",  controllerAs: "IndexVM_fnRouterControllerAs" })
                                         .state("show",     { url: "/:name",    templateUrl:  "/assets/html/horses-show.html",  controller:   "ShowController",   controllerAs: "ShowVM_fnRouterControllerAs" });
                                                                  $urlRouterProvider.otherwise("/");
                }

    UserFactory.$inject = ["$resource"];
           function UserFactory(    $resource)  { var UserFactory =     $resource("/user").get();
             return UserFactory;
                                                }

    HorseFactory.$inject = ["$resource"];
           function    HorseFactory($resource)  { var HorseFactory =    $resource("/api/horses/:name", {}, {update: {method: "PUT"} } );
                return HorseFactory;
                                                }

    IndexController.$inject =          ["HorseFactory"];
            function     IndexController(HorseFactory)    {   var vm = this;
                                                                  vm.horses = HorseFactory.query();
                                                }

    ShowController.$inject =           ["HorseFactory", "$stateParams", "$state", "UserFactory"];
            function      ShowController(HorseFactory,   $stateParams,  $state,    UserFactory)
            {
                var vm = this;
                // { var vm = this; vm.horse = HorseFactory.get($stateParams); vm.horse.$promise; };
                    vm.horse = HorseFactory.get($stateParams); vm.horse.$promise.then(function() { UserFactory.$promise.then(function(user) { vm.is_current_user = (vm.horse._id == user._id);});});
                    vm.update = function() {
                                                HorseFactory.update($stateParams, vm.horse, function(response) { if(!response.failure) { $state.go("show", horse); }
                                          });
                                        }
            }
})();
