angular.module('starter.controllers', [])

.controller('HomesCtrl',['$scope','$resource',"$state",function($scope,$resource, $state){
    $scope.name='首页';

          $scope.gomap = function() {
		
                $state.go('stoermap');			
             };
    
}])


 //ArticleCtrl

    .controller('ArticleCtrl', function($scope,ArticleFactory,ENV) {
        $scope.name='ArticleCtrl';
        $scope.ENV=ENV;

        //获取服务器数据保存

        ArticleFactory.getTopTopics();
        //接收到刚才传过来的通知
        $scope.$on('PortalList.portalsUpdated', function() {
            $scope.portalListData=ArticleFactory.getArticles();
         });
    })



.controller('ThreadCtrl', function($scope,ArticleFactory,ENV) {
        $scope.name='ArticleCtrl';
        $scope.ENV=ENV;

        //获取服务器数据保存

        ArticleFactory.getTopTopics();
        //接收到刚才传过来的通知
        $scope.$on('PortalList.portalsUpdated', function() {
            $scope.portalListData=ArticleFactory.getArticles();
         });
    })


.controller('UserCtrl', function($scope) {
    $scope.name='UserCtrl';
})


.controller('stoermap', ['$scope','$resource',"$state",function($scope,$resource, $state){
 

    resizeableImage($('.resize-image'));

  $scope.godetail = function() {
			
				$state.go('mapdetail');
				
			};
}])

  .controller('mapdetail',function($scope,ArticleFactory,ENV) {
        $scope.name='ArticleCtrl';
        $scope.ENV=ENV;

        //获取服务器数据保存

        ArticleFactory.getTopTopics();
        //接收到刚才传过来的通知
        $scope.$on('PortalList.portalsUpdated', function() {
            $scope.portalListData=ArticleFactory.getArticles();
         });
    })

;


