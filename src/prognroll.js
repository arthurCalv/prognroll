/* PrognRoll (modified for Calvium) | https://mburakerman.github.io/prognroll/ | @mburakerman | License: MIT */
(function($) {
    $.fn.prognroll = function(options) {

        var settings = $.extend({
            height: 5, // progress bar height
            color: "#50bcb6", // progress bar background color
        }, options);

        var progressBar = $("<span>", {
            class: "prognroll-bar",
        });

        return this.each(function(i, el) {
            if ($(this).data("prognroll")) {
                return false;
            }
            $(this).data("prognroll", true);

            $("body").prepend(progressBar).end().find(".prognroll-bar").not(":first").remove();

            $(".prognroll-bar").css({
                position: "fixed",
                top: 0,
                left: 0,
                width: 0,
                height: settings.height,
                backgroundColor: settings.color,
                zIndex: 2147483647
            });

            var globals = {
                "windowScrollTop": $(window).scrollTop(),
                "windowOuterHeight": $(window).outerHeight(),
                "bodyHeight": $(document).height()
            }

            var calviumCustomDims = {
                    "contentHeight": $('.content-wrapper').height()
                }
                // Custom dimension calculations for content
            function bindWindowScroll() {
                $(window).scroll(function(e) {
                    e.preventDefault();
                    globals.windowScrollTop = $(window).scrollTop();
                    globals.windowOuterHeight = $(window).outerHeight();
                    globals.bodyHeight = $(document).height();
                    var total = (globals.windowScrollTop / (calviumCustomDims.contentHeight)) * 100;
                    $(".prognroll-bar").css("width", total + "%");
                });
            }

            bindWindowScroll();

            // get scroll position on on page load 
            var total = (globals.windowScrollTop / (globals.bodyHeight - globals.windowOuterHeight)) * 100;
            $(".prognroll-bar").css("width", total + "%");
        });
    };
})(jQuery);