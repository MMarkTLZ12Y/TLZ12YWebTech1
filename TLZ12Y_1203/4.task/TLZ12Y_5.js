$(function () {

    var $doboz = $("#doboz");

    var seb = 800;

    var startAllapot = {
        left: "300px",
        top: "0px",
        width: "300px",
        height: "100px",
        fontSize: "12pt",
        opacity: 1
    };

    $doboz.css(startAllapot);

    $("#btnAnimacio").on("click", function () {

        $doboz.stop(true, true).css(startAllapot);

        $doboz.animate({
            left: "600px",
            width: "450px",
            fontSize: "30pt"
        }, seb)

        .animate({
            top: "150px",
            width: "250px",
            height: "110px"
        }, seb)

        .animate({
            left: "0px",
            opacity: 0.4
        }, seb)

        .animate(startAllapot, seb, function () {
            alert("VÉGE");
        });
    });

    $("#btnBekezdesElrejt").on("click", function () {
        $("#szoveg p").slideUp(seb, function () {
        });
        alert("Bekezdések elrejtése");
    });

    $("#btnOsszecsuk").on("click", function () {
        if ($doboz.is(":visible")) {
            $doboz.stop(true, true).slideUp(seb);
        } else {
            $doboz
                .stop(true, true)
                .css(startAllapot)
                .slideDown(seb, function () {
                    var bal = parseInt(startAllapot.left, 10);
                    $doboz.animate({
                        left: (bal + 100) + "px"
                    }, seb);
                });
        }
    });

});
