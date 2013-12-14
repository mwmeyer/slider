var app = angular.module('app', []);

app.directive('slider', function ($document) {
    return {
        restrict: 'A',
        template: '<div class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">\
                        <button class="ui-slider-handle ui-state-default ui-corner-all" style="left: {{ sliderVal }}%"></button>\
                   </div>',
        link: function (scope, element, attrs) {
            var $element = $(element),
                $slider  = $('.ui-slider', $element),
                $knob_control = $('button', $element),
                width = $slider.width(),
                offset = $slider.offset().left;

            scope.sliderVal = 0;

            var mouseDown = false;
            $slider.bind('mousedown', function (evt) {
                mouseDown = true;
                $document.trigger('mousemove', evt);
            });

            $document.bind('mouseup', function (evt, partentEvt) {
                mouseDown = false;
            });

            $document.bind('mousemove', function (evt, parentEvt) {
                if (!mouseDown) {
                    return;
                }

                var diff;
                if (evt.pageX) {
                    diff = evt.pageX - offset;
                }
                else if (parentEvt.pageX) {
                    diff = parentEvt.pageX - offset;
                }

                var percent = diff / width;

                scope.sliderVal = Math.round( Math.max(0, Math.min(percent * 100, 100) ) );

                scope.$apply();
            });

            scope.$watch('sliderVal', function (sliderVal) {
                $knob_control.stop();
                $knob_control.animate({left: sliderVal + '%'} , 32);
            });
        }
    };
});