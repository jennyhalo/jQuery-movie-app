//Suoritetaan seuraava funtio kun html dokumentti on ladannut valmiiksi
$(document).ready(function() {
//suoritetaan jQueryllä ajax metodi, jolla haetaan xml tiedosto ulkopuoliselta serveriltä
$.ajax({
    url: 'https://www.finnkino.fi/xml/TheatreAreas/',
    dataType: 'xml',
    success: function(data) {
//Tarkistetaan konsolista, että haettu data näkyy siellä
        console.log(data);
//Haetaan xml tiedostosta "TheatreArea"nimiset tagit ja suoritetaan funktio jokaista löytynyttä tagia kohden
        $(data).find("TheatreArea").each(function() {
//Määritellään muuttuja "area" ja haetaan "TheatreArea" tagin sisältä "ID" ja "Name", joista luodaan optiot selectiin 
            var area = '<option>' + $(this).find("ID").text() + ' ' + $(this).find("Name").text() + '</option>';
//Appendataan areat eli kaikki optiot select valikkoon html sivulle
            $("select").append(area);
        });
    }
    });
});
//määritellään funktio, joka aktivoituu aina kun valikosta valitaan uusi optio
$("#valikko").change(function() {
//Aina kun "change" funktio suoritetaan, poistetaan kaikki edelliset "li" elementit listasta
    $("#myUl").children().remove();
//Aina kun valitaan uusi optio, tyhjennetään hakukenttä
    $('#searchMovie').val('');
//Haetaan valikon option arvo ja vähennetään siitä ensimmäiset 4 merkkiä josta saadaan areaId
    var $arvo = $('#valikko').val();
    var areaId = $arvo.substr(0,4);
//tarkistetaan konsolista, että siellä näkyy areaId kun valitsee eri vaihtoehtoja valikosta
    console.log(areaId);
//Määritellään, että funtio aktivoituu kun dokumentti on valmiiksi ladannut
$(document).ready(function() {
//Haetaan areaId'n perusteella valikosta valittavan teatterin elokuvatietoja xml tiedostosta
$.ajax({
    url: 'https://www.finnkino.fi/xml/Events/?area=' + areaId,
    dataType: 'xml',
    success: function(data) {
//Tarkistetaan konsolista, että siellä näkyy haettu data
        console.log(data);
//Haetaan xml tiedostosta kaikki "Event" nimiset arvot ja suoritetaan jokaista kohden seuraava funktio
        $(data).find("Event").each(function() {
            let leffakuva = $(this).find("EventLargeImagePortrait").text();
            let leffanimi = $(this).find("OriginalTitle").text();
            let leffavuosi = $(this).find("ProductionYear").text();
            let ikarajasuositus = $(this).find("RatingImageUrl").text();
            let leffagenre = $(this).find("Genres").text();
            let leffakuvaus = $(this).find("ShortSynopsis").text();
//Lisätään järjestämättömään listaan haetut tiedot ja luodaan niistä "li" elementit. Tässä annettaan tiedoille omat classit ja hieman css'ssää
            $("#myUl").append('<li class=\"grid-container\" id=\"elokuvanmuotoilu\"><img class=\"item1\" width=\"200px\" height=\"296px\" class=\"movieImg\" src=\"' + leffakuva
             + '\"><div class=\"item2 movieNameDiv\">' + leffanimi + '<div class=\"movieYearDiv\">' + leffavuosi
              + '</div><img class=\"movieAgeLimitDiv\" src=\"' + ikarajasuositus + '\"><div class=\"movieGenreDiv\">' 
              + leffagenre + '<div class=\"movieDescriptionDiv\">' + leffakuvaus + '</div></div></div></li>');
//Suoritetaan tarkistus, jonka perusteella poimitaan vaan tietyt kuvat näkyviin html sivulle ehtojen täyttyessä
            $(".movieAgeLimitDiv").each(function(){
                let $kuva = $(this);
                let $kuvaatt = $kuva.attr('src');
                console.log($kuvaatt);
                let ikasuosituksentarkistus = /rating_large_S\.png|rating_large_18\.png|rating_large_7\.png|rating_large_12\.png|rating_large_16\.png/.test($kuvaatt);
                if (ikasuosituksentarkistus == false){
                    $(this).hide();
                }
            });
        });
    }
});
});
});
//Määritellään, että funtio aktivoituu kun dokumentti on valmiiksi ladannut
$(document).ready(function() {
//Luodaan funktio, joka aktivoituu kun sivua scrollaa
    $(window).scroll(function() {
        if($(this).scrollTop() > 100) {
//Kun sivua scrollaa alaspäin, ilmestyy nappi sulavasti esiin
          $('#backToTopBtn').fadeIn();
       } else {
//Kun nappia painaa, haihtuu se pois näkyvistä
          $('#backToTopBtn').fadeOut();
         }
       });
//Nappia painaessa, tapahtuu puolen sekunnin viive, jonka jälkeen sivu palaa alkuun
$("#backToTopBtn").click(function(){
    $('html ,body').animate({scrollTop : 0},500);
});
});
//Määritellään, että funtio aktivoituu kun dokumentti on valmiiksi ladannut
$(document).ready(function() {
//Määritellään funktio, joka aktivoituu hakukenttään kirjoittaessa
    $("#searchMovie").keyup(function() {
//määritellään muuttuja "arvo" ja muunnetaan se pieniksi kirjaimiksi
      var arvo = $(this).val().toLowerCase();
//Käytetään filter funktiota kaikkiin sivun "li"-elementteihin
      $("li").filter(function() {
//Piilotetaan ne "li"-elementit jotka eivät vastaa hakukentän arvoa
        $(this).toggle($(this).text().toLowerCase().indexOf(arvo) > -1)
      });
    });


  });
/*
lähteet:

28.11.2022. https://www.youtube.com/watch?v=Dj3MP5w0dpc

28.11.2022. https://www.juniordevelopercentral.com/jquery-substring/

28.11.2022. https://www.youtube.com/watch?v=TjZw8VXCuOg

29.11.2022 https://www.youtube.com/watch?v=1Lz0hLJTZLs

*/