var frontStoreApp = angular.module("frontStoreApp", ["ngMessages"]);

frontStoreApp.controller("FrontStoreCtrl", [
  "$scope",
  "$http",

  function($scope, $http) {
    $scope.initializeFacebook = function() {
      window.fbAsyncInit = function() {
        FB.init({
          appId: "1795623014075486",
          cookie: true,
          xfbml: true,
          version: "v2.8"
        });
        FB.getLoginStatus(function(response) {
          $scope.statusChangeCallback(response);
        });
        FB.Event.subscribe("auth.statusChange", $scope.statusChangeCallback);
      };

      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    };

    $scope.statusChangeCallback = function(response) {
      if (response.status === "connected") {
        //var scope = angular.element($('body')).scope();
        FB.api("/me", function(response) {
          $scope.$apply(function() {
            $scope.nomeUsuario = response.name;
            $scope.idUsuario = response.id;
          });
        });
      } else {
        // The person is not logged into your app or we are unable to tell.
      }
    };

    $scope.nomeUsuario = "";
    $scope.idUsuario = 0;

    $scope.logout = function() {
      $scope.nomeUsuario = "";
      $scope.idUsuario = 0;
      FB.logout(function(response) {
        // Person is now logged out
      });
    };
    
    $scope.showProducts = 1;
    $scope.display = {};
    $scope.products = [
        {
            id:1,
            name:"Smartphone Samsung",
            img:"https://images-americanas.b2w.io/produtos/01/00/item/128011/6/128011681_1GG.png",
            info:"Poderoso em visual e desempenho. O novo Galaxy J7 apresenta um visual integrado todo em metal, que protege seu aparelho contra arranhões."
        },
        {
            id:2,
            name:"Smart TV LED 43\" Samsung ",
            img:"https://images-americanas.b2w.io/produtos/01/00/item/125628/8/125628846_1GG.jpg",
            info:"A Samsung 43J5200 é uma Smart TV com tela LED de 43 polegadas. Como tem resolução Full HD, as imagens são transmitidas em altíssima definição."
        },
        {
            id:3,
            name:"Notebook Lenovo Ideapad 320",
            img:"https://images-americanas.b2w.io/produtos/01/00/item/132949/0/132949091_1GG.jpg",
            info:"Lenovo ideapad 320: Novo design, com visual mais fino, textura de aço escovado na parte interna, borda da tela mais estreita e acabamento resistente para o seu dia a dia. Para mais conforto visual e imagens nítidas, conte com a tela antirreflexo de 15.6\". Perfeito para seu dia a dia com Dolby Áudio, WiFi AC ultrarrápido e abertura de tela de 180 graus."
        }
    ];

    $scope.showProduct = function(product){
        $scope.showProducts = 0;
        $scope.display = product;
    }

    $scope.closeProduct = function(product){
        $scope.showProducts = 1;
        $scope.display = {};
    }
  }
]);
