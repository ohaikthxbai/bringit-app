(function ($) {
    $(function () {
        // mobile responsive side nav
        $(".button-collapse").sideNav();
        // activate modal popups
        $('.modal').modal();
        //$('.modal-trigger').leanModal();
    });


    $(window).scroll(function() {
        var navbar = $("nav");
        var scroll = $(window).scrollTop();

        if (scroll >= 200) {
            navbar.removeClass('transparent').addClass("bg-color");
        } else {
            navbar.removeClass("bg-color").addClass('transparent');
        }
    });
})(jQuery);