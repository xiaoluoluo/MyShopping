angular.module('starter.controllers', [])

    .controller('HomesCtrl', ['$scope', '$resource', "$state", function ($scope, $resource, $state) {
        $scope.name = '首页';
        $('#carousel').carousel({ curDisplay: 0, autoPlay: true, interval: 3000 });
        $scope.gomap = function () {

            $state.go('floorselect');
        };

    }])


    //ArticleCtrl

    .controller('ArticleCtrl', function ($scope, ArticleFactory, ENV) {
        $scope.name = 'ArticleCtrl';
        $scope.ENV = ENV;

        //获取服务器数据保存

        ArticleFactory.getTopTopics();
        //接收到刚才传过来的通知
        $scope.$on('PortalList.portalsUpdated', function () {
            $scope.portalListData = ArticleFactory.getArticles();
        });


        //下拉更新
        $scope.doRefresh = function () {
            ArticleFactory.getTopTopics();
            //更新完成后广播一下
            $scope.$broadcast('scroll.refreshComplete');
        }

        //上拉更新
        $scope.loadMore = function () {

            console.log('加载更多数据');
            ArticleFactory.getMoreTopics();
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }


        $scope.hasNextPage = function () {
            //console.log(PortalsFactory.hasNextPage());
            return ArticleFactory.hasNextPage();
        };

    })



    .controller('ThreadCtrl', function ($scope, ArticleFactory, ENV) {
        $scope.name = 'ArticleCtrl';
        $scope.ENV = ENV;

        //获取服务器数据保存

        ArticleFactory.getTopTopics();
        //接收到刚才传过来的通知
        $scope.$on('PortalList.portalsUpdated', function () {
            $scope.portalListData = ArticleFactory.getArticles();
        });
    })


    .controller('UserCtrl', function ($scope) {
        $scope.name = 'UserCtrl';
    })

    .controller('floorselect', ['$scope', '$resource', "$state", function ($scope, $resource, $state) {


        $scope.gotomap = function () {

            $state.go('stoermap');
        };

        var sliderContainers = $('.cd-slider-wrapper');

        if (sliderContainers.length > 0) initBlockSlider(sliderContainers);

        function initBlockSlider(sliderContainers) {
            sliderContainers.each(function () {
                var sliderContainer = $(this),
                    slides = sliderContainer.children('.cd-slider').children('li'),
                    sliderPagination = createSliderPagination(sliderContainer);

                sliderPagination.on('click', function (event) {
                    event.preventDefault();
                    var selected = $(this),
                        index = selected.index();
                    updateSlider(index, sliderPagination, slides);
                });

                sliderContainer.on('swipeleft', function () {
                    var bool = enableSwipe(sliderContainer),
                        visibleSlide = sliderContainer.find('.is-visible').last(),
                        visibleSlideIndex = visibleSlide.index();
                    if (!visibleSlide.is(':last-child') && bool) { updateSlider(visibleSlideIndex + 1, sliderPagination, slides); }
                });

                sliderContainer.on('swiperight', function () {
                    var bool = enableSwipe(sliderContainer),
                        visibleSlide = sliderContainer.find('.is-visible').last(),
                        visibleSlideIndex = visibleSlide.index();
                    if (!visibleSlide.is(':first-child') && bool) { updateSlider(visibleSlideIndex - 1, sliderPagination, slides); }
                });
            });
        }

        function createSliderPagination(container) {
            var wrapper = $('<ol class="cd-slider-navigation"></ol>');
            container.children('.cd-slider').find('li').each(function (index) {
                var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
                    dot = $('<a href="#0"></a>').appendTo(dotWrapper);
                dotWrapper.appendTo(wrapper);
                var dotText = (index + 1 < 10) ? '0' + (index + 1) : index + 1;
                dot.text(dotText);
            });
            wrapper.appendTo(container);
            return wrapper.children('li');
        }

        function updateSlider(n, navigation, slides) {
            navigation.removeClass('selected').eq(n).addClass('selected');
            slides.eq(n).addClass('is-visible').removeClass('covered').prevAll('li').addClass('is-visible covered').end().nextAll('li').removeClass('is-visible covered');

            //fixes a bug on Firefox with ul.cd-slider-navigation z-index
            navigation.parent('ul').addClass('slider-animating').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                $(this).removeClass('slider-animating');
            });
        }

        function enableSwipe(container) {
            return (container.parents('.touch').length > 0);
        }
    }])


    .controller('stoermap', ['$scope', '$resource', "$state", function ($scope, $resource, $state) {


        $scope.show = 0;
        var $targetObj = $('#targetObj');
        //初始化设置
        cat.touchjs.init($targetObj, function (left, top, scale, rotate) {
            // $('#left').text(left);
            // $('#top').text(top);

            // $('#rotate').text(rotate);
            $targetObj.css({
                left: left,
                top: top,
                'transform': 'scale(' + scale + ') rotate(' + rotate + 'deg)',
                '-webkit-transform': 'scale(' + scale + ') rotate(' + rotate + 'deg)'
            });
        });
        cat.touchjs.drag($targetObj, function (left, top) {
            // $('#left').text(left);
            // $('#top').text(top);
        });
        //初始化缩放手势（不需要就注释掉）
        cat.touchjs.scale($targetObj, function (scale) {
            // $('#scale').text(scale);
        });


        $scope.demo1 = function (event) {
            x = event.clientX;
            y = event.clientY;
            var elem = document.getElementById("#floatdi");
            $scope.div2Bg = '#ffffff';
            $scope.le = x;
            $scope.to = y;
            $scope.show = 1;

        }

        $scope.closejo = function () {
            $scope.show = 0;
        }
        $scope.joinmap = function () {

            $state.go('mapdetail');

        };
    }])

    .controller('mapdetail', function ($scope, ArticleFactory, ENV) {
        $scope.name = 'ArticleCtrl';
        $scope.ENV = ENV;

        //获取服务器数据保存

        ArticleFactory.getTopTopics();
        //接收到刚才传过来的通知
        $scope.$on('PortalList.portalsUpdated', function () {
            $scope.portalListData = ArticleFactory.getArticles();
        });
    })

    ;


