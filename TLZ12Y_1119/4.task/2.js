$(document).ready(function () {

    function elrejtiElsoKettoListat() {
        $('#lista1 li:lt(2)').hide();
    }

    function elrejtiLinket() {
        $('#jqLink').hide();
    }

    $('#k1').on('click', function () {
        elrejtiElsoKettoListat();
        elrejtiLinket();
    });

    $('#k2').on('click', function () {
        elrejtiElsoKettoListat();
        elrejtiLinket();
        $('#k2').hide();
    });

    $('#k3').on('click', function () {
        $('#fejlec').hide();
        elrejtiElsoKettoListat();
        elrejtiLinket();
    });

    $('#k4').on('click', function () {
        elrejtiElsoKettoListat();
        $('#jqLink')
            .text('')
            .removeAttr('href');
    });

    $('#k5').on('click', function () {
        elrejtiElsoKettoListat();
        elrejtiLinket();

        $('#aaaa tr:odd').hide();
    });

});
