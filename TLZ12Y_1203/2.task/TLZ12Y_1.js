$(function () {

    $("#betoltes").on("click", function () {

        $.getJSON("TLZ12Y_orarend.json", function (adat) {

            var cim = adat.cim;
            var telefonok = adat.telefonszam;

            var ora = adat.kurzus[0];

            var html = "";

            html += "<h2>MISKOLCI EGYETEM</h2>";

            html += "<p><strong>Cím:</strong> "
                 + cim.iranyitoszam + " "
                 + cim.varos + " "
                 + cim.utca + "</p>";

            html += "<p><strong>Telefonszám:</strong><br>";
            for (var i = 0; i < telefonok.length; i++) {
                html += telefonok[i].tipus + ": "
                     + telefonok[i].szam + "<br>";
            }
            html += "</p>";

            html += "<h3>ProgTerv órarend 2025 ősz</h3>";

            html += "<p><strong>Tárgy:</strong> "
                 + ora.targy + "</p>";

            html += "<p><strong>Időpont:</strong><br>"
                 + "Nap: " + ora.idopont.nap + "<br>"
                 + "Tól: " + ora.idopont.tol + "<br>"
                 + "Ig: " + ora.idopont.ig + "</p>";

            html += "<p><strong>Helyszín:</strong> "
                 + ora.helyszin + "</p>";

            html += "<p><strong>Oktató:</strong> "
                 + ora.oktato + "</p>";

            html += "<p><strong>Szak:</strong> "
                 + ora.szak + "</p>";

            html += "<p><strong>Típus:</strong> "
                 + ora.tipus + "</p>";

            $("#terulet").html(html);

        }).fail(function () {
            $("#terulet").html(
                "<p>Hiba történt a TLZ12Y_orarend.json betöltésekor.</p>"
            );
        });

    });

});
