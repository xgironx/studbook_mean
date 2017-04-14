"use strict";

(function(){
  angular
  .module("whenpresident", [
    "ui.router",
    "ngResource"
  ])
  .config(Router)
  .factory("Candidate", Candidate)
  .factory("User", User)
  .controller("Show", Show)
  .controller("Index", Index);
  
  Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("index", {
      url: "/",
      templateUrl:  "/assets/html/candidates-index.html",
      controller:   "Index",
      controllerAs: "IndexVM"
    })
    .state("show", {
      url: "/:name",
      templateUrl:  "/assets/html/candidates-show.html",
      controller:   "Show",
      controllerAs: "ShowVM"
    });
    $urlRouterProvider.otherwise("/");
  }
  
  User.$inject = ["$resource"];
  function User($resource){
    var User = $resource("/user").get();
    return User;
  }
  
  Candidate.$inject = ["$resource"];
  function Candidate($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    return Candidate;
  }
  
  Index.$inject = ["Candidate"];
  function Index(Candidate){
    var vm = this;
    vm.candidates = Candidate.query();
  }
  
  Show.$inject = ["Candidate", "$stateParams", "$state", "User"];
  function Show(Candidate, $stateParams, $state, User){
    var vm = this;
    vm.candidate = Candidate.get($stateParams);
    vm.candidate.$promise.then(function(){
      User.$promise.then(function(user){
        vm.is_current_user = (vm.candidate._id == user._id);
      });
    });
    vm.update = function(){
      Candidate.update($stateParams, vm.candidate, function(response){
        if(!response.failure){
          $state.go("show", candidate);
        }
      });
    }
  }
})();
