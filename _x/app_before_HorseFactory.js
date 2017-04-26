"use strict";

(function(){
    angular
          .module("studbook", [ "ui.router", "ngResource" ] )
          .config(Router                                    )

          .factory("Horse",     Horse                       )
          .factory("User",      User                        )

          .controller("Show",   Show                        )
          .controller("Index",  Index                       )
    ;

  Router.$inject = [      "$stateProvider", "$locationProvider",              "$urlRouterProvider"    ];
           function Router($stateProvider,   $locationProvider,                $urlRouterProvider     )
                {                            $locationProvider.html5Mode(true);
                           $stateProvider
                     .state("index", { url: "/",         templateUrl:  "/assets/html/horses-index.html", controller:   "Index",  controllerAs: "IndexVM_fnRouterControllerAs" })
                     .state("show",  { url: "/:name",    templateUrl:  "/assets/html/horses-show.html",  controller:   "Show",   controllerAs: "ShowVM_fnRouterControllerAs"
                                    });
                                                                               $urlRouterProvider.otherwise("/");
                }

   User.$inject = ["$resource"];
           function User(    $resource){ var User =      $resource("/user").get();
             return User;
  }

  Horse.$inject = ["$resource"];
           function    Horse($resource){ var Horse =    $resource("/api/horses/:name", {}, { update: {method: "PUT"} });
                return Horse;
  }

    Index.$inject =         ["Horse"];
           function     Index(Horse){ var vm = this; vm.horses = Horse.query(); }


    Show.$inject =          ["Horse", "$stateParams", "$state", "User"];
           function      Show(Horse,   $stateParams,  $state,    User)
            {
                var vm = this;
                // { var vm = this; vm.horse = Horse.get($stateParams); vm.horse.$promise; };
                    vm.horse = Horse.get($stateParams); vm.horse.$promise.then(function(){ User.$promise.then(function(user){ vm.is_current_user = (vm.horse._id == user._id);});});
                    vm.update = function(){
                                                 Horse.update($stateParams, vm.horse, function(response){
                                                        if(!response.failure){ $state.go("show", horse);
                                            }
                                          });
                                        }
            }
})();
