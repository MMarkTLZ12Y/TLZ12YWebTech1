$(function () {

    $("#btnRemove").on("click", function () {
        $("#doboz").remove();
    });

    $("#btnClear").on("click", function () {
        $("#doboz").empty();
    });

});
