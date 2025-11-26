$(document).ready(function () {


    $('#btnBekezdesElrejt').on('click', function () {
        $('.bekezdes').hide();
    });

    $('#btnBekezdesMegjelenit').on('click', function () {
        $('.bekezdes').show();
    });

    $('#btnBekezdesToggle').on('click', function () {
        $('.bekezdes').toggle();
    });



    $('#btnAt01').on('click', function () {
        $('#urlapDoboz').css('opacity', 0.1);
    });

    $('#btnAt05').on('click', function () {
        $('#urlapDoboz').css('opacity', 0.5);
    });

    $('#btnAt08').on('click', function () {
        $('#urlapDoboz').css('opacity', 0.8);
    });



    $('#btnUrlapElrejt').on('click', function () {
        $('#urlapDoboz').hide();
    });

    $('#btnUrlapMegjelenit').on('click', function () {
        $('#urlapDoboz').show();
    });

    $('#btnUrlapToggle').on('click', function () {
        $('#urlapDoboz').toggle();
    });

});
