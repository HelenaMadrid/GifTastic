var topics = ["David Bowie", "Prince", "Beatles", "Rolling Stones", "Fleetwood Mac", "Tina Turner", "Guns N' Roses", "Elton John", "George Michael", "Michael Jackson", "Freddie Mercury", "Aretha Franklin", "Jennifer Holliday", "Janis Joplin", "The Who", "Pink Floyd"];

//var artists;
var apiKey = "OxiG8uG70siK3rjeqb0EjVKmV0y5XaAA&";
var display = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var playing = false;

//var queryUrl="https://api.giphy.com/v1/gifs/search?api_key=OxiG8uG70siK3rjeqb0EjVKmV0y5XaAA&q=david-bowie&limit=10&offset=0&rating=R&lang=en";


function renderingButtons() {
    $("#button").empty();

    topics.forEach(function (element) {
        console.log(element);
        var boton = $("<button >");
        boton.addClass("artist btn btn-outline-light m-2");
        boton.attr("data-name", element);
        boton.text(element);
        $("#button").append(boton);
    });
    //}
    $(".artist").off();
    $(".artist").on("click", function () {
        $("#images").empty();
        var artists = $(this).attr("data-name");
        console.log("artists: " + artists);
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "q=" + artists + "&limit=10&offset=0&rating=R&lang=en";
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                console.log(queryUrl);
                console.log(response.data[0].images.original.url);
                for (var x = 0; x < display.length; x++) {
                    var gif = $("<img>");
                    //$(gif).attr("src", response.data[x].images.original.url);
                    $(gif).attr("src", response.data[x].images.original_still.url);
                    $(gif).addClass("m-3 .my_class_2 gif");
                    $(gif).attr("style", "height:350px");
                    $(gif).attr("id", x);
                    $("#images").append(gif);
                    // }
                    gif.off();
                    gif.on("click", function () {
                        if (playing === false) {
                            playing=true;
                            var selectedGif = $(this);
                            var indexArray = selectedGif.attr("id");
                            console.log(indexArray);
                            console.log(this);
                            selectedGif.attr("src", response.data[indexArray].images.original.url);
                        }
                        else {
                            var selectedGif = $(this);
                            var indexArray = selectedGif.attr("id");
                            console.log(indexArray);
                            console.log(this);
                            selectedGif.attr("src", response.data[indexArray].images.original_still.url);
                            playing=false;
                        }
                    });
                }
            });
    });

}
$("#add-artist").off();
$("#add-artist").on("click", function (event) {
    event.preventDefault();
    var artistInput = $("#artists-input").val().trim();
    topics.push(artistInput);
    renderingButtons();
});




renderingButtons();