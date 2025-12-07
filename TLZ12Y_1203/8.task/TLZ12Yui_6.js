$(function () {

    $("input[type=button], input[type=submit]").button();


    $("#box").draggable().resizable();

    $("#btnSzoveg").on("click", function () {
        $("#box").append("<br>Programtervező informatikus");
        $("#box").effect("highlight", { color: "#ffff99" }, 1000);
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
            }).insertAfter("#forras").button()
              .effect("bounce", { times: 2 }, 400);
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
            }).insertBefore("#jelentkezes")
              .effect("slide", { direction: "left" }, 400);
        }
    });



    $("#doboz2").draggable().resizable();

    $("#dialog-confirm").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Igen": function () {
                $("#doboz2").fadeOut(300, function () {
                    $(this).remove();
                });
                $(this).dialog("close");
            },
            "Mégse": function () {
                $(this).dialog("close");
            }
        }
    });

    $("#btnRemove").on("click", function () {
        if ($("#doboz2").length) {
            $("#dialog-confirm").dialog("open");
        }
    });

    $("#btnClear").on("click", function () {
        $("#doboz2").empty()
                    .effect("shake", { distance: 10, times: 2 }, 300);
    });

});
