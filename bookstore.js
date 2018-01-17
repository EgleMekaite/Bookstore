/*eslint-env browser*/
/*eslint "no-console": "off"*/
/*global $*/

var jsonData = {};

$(function () {

    showBooks();

});

function showBooks() {

    $.getJSON("https://api.myjson.com/bins/udbm5", function (data) {
        jsonData = data.books;
        createBookData(jsonData);
        filterSearch();
//        $('.grid').isotope({
//        // options
//        itemSelector: '.grid-item',
//        layoutMode: 'fitRows',
//        percentPosition: true,
//    });
//    $('.grid').imagesLoaded().progress(function () {
//        $('.grid').isotope('layout');
//    });

    $('[data-fancybox]').fancybox({
        buttons: ['close']
    });
    });
}


function createBookData(array) {

    for (var i = 0; i < array.length; i++) {
        var book_data = document.getElementById("bookData");

        var newDivElement = $("<div class='flip-container element-item'></div>").addClass("grid-item");
        $(book_data).append(newDivElement);

        var flipperDiv = $("<div class='flipper'></div>");
        $(newDivElement).append(flipperDiv);

        var fronContentDiv = $("<div class='frontContent'></div>");

        var previewUrl = array[i].portada;
        var previewElement = $("<img class='img-responsive'>").addClass("preview").attr("src", previewUrl);
        $(fronContentDiv).append(previewElement);
        $(flipperDiv).append(fronContentDiv);

        var hiddenContentDiv = $("<div class='backContent'></div>");
        $(flipperDiv).append(hiddenContentDiv);

        var titleElement = $("<h2></h2>").addClass("title").html(array[i].titulo);
        $(hiddenContentDiv).append(titleElement);

        var descriptionElement = $("<p></p>").addClass("descr").html(array[i].descripcion);
        $(hiddenContentDiv).append(descriptionElement);

        var languageElement = $("<p></p>").addClass("language").html("Language: " + array[i].idioma);
        $(hiddenContentDiv).append(languageElement);

        var moreInfoButton = $("<button id='moreInfoButton'>More info</button>");
        $(hiddenContentDiv).append(moreInfoButton);

        var detailsUrl = array[i].detalle;
        var fancyboxElement = $("<a class='fancybox' data-fancybox data-fancybox='images'></a>").attr("href", detailsUrl);
        $(fancyboxElement).append(moreInfoButton);
        $(hiddenContentDiv).append(fancyboxElement);

    }

}

function filterSearch() {
    var input = document.getElementById("book");
    var filter = input.value.toUpperCase();
    var div = document.getElementById("bookData");
    var hiddenDiv = div.getElementsByClassName("backContent");
    var divToHide = div.getElementsByClassName("flip-container");
    var title;
    var description;
    var i;

    for (i = 0; i < hiddenDiv.length; i++) {
        title = hiddenDiv[i].getElementsByClassName("title")[0];
        description = hiddenDiv[i].getElementsByClassName("descr")[0];

        if (title, description) {
            if ((title.innerHTML.toUpperCase().indexOf(filter) > -1) || (description.innerHTML.toUpperCase().indexOf(filter) > -1)) {
                divToHide[i].style.display = "";
            } else {
                divToHide[i].style.display = "none";
            }
        }
    }

}
