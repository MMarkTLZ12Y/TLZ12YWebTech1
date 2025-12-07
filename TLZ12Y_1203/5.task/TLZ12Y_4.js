$(function () {
    $("#szamol").on("click", function () {
        var a = parseInt($("#a").val(), 10);
        var b = parseInt($("#b").val(), 10);

        if (isNaN(a) || isNaN(b)) {
            alert("Mindkét mezőbe egész számot írjon!");
            return;
        }

        var muvelet = $("input[name='muvelet']:checked").val();
        if (!muvelet) {
            alert("Válasszon egy műveletet!");
            return;
        }

        var eredmeny;

        switch (muvelet) {
            case "szorzas":
                eredmeny = a * b;
                break;

            case "osztas":
                if (b === 0) {
                    alert("Nullával nem lehet osztani!");
                    return;
                }
                eredmeny = a / b;
                break;

            case "osszeadas":
                eredmeny = a + b;
                break;

            case "kivonas":
                eredmeny = a - b;
                break;
        }

        $("#eredmeny").text(eredmeny);
    });
});
