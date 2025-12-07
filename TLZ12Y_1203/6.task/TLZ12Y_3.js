$(function () {

    $("#btnSzoveg").on("click", function () {
        $("#box").append("<br>Programtervező informatikus");
    });

    $("#btnGomb").on("click", function () {
        $(this).val("PTI Gomb");
    });

    $("#btnUjGomb").on("click", function () {
        if ($("#ujPtiGomb").length === 0) {
            $("<input>", {
                type: "button",
                id: "ujPtiGomb",
                value: "ME GEIK-PTI"
            }).insertAfter("#forras");
        }
    });

    $("#btnFejlec").on("click", function () {
        if ($("#fejlec").length === 0) {
            $("<h1>", {
                id: "fejlec",
                text: "jQuery feladat"
            }).prependTo("body");
        }
    });

    $("#btnAlcim").on("click", function () {
        if ($("#alcim").length === 0) {
            if ($("#fejlec").length) {
                $("<p>", {
                    id: "alcim",
                    text: "HTML - Add elements"
                }).insertAfter("#fejlec");
            } else {
                $("<p>", {
                    id: "alcim",
                    text: "HTML - Add elements"
                }).prependTo("body");
            }
        }
    });

    $("#btnUrlapFejlec").on("click", function () {
        if ($("#urlapfejlec").length === 0) {
            $("<h2>", {
                id: "urlapfejlec",
                text: "ŰRLAP-TLZ12Y"
            }).insertBefore("#jelentkezes");
        }
    });

});
