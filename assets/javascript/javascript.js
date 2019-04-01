var topics = ["Aretha Franklin", "Beatles", "David Bowie", "Elton John", "Fleetwood Mac", "Freddie Mercury", "George Michael", "Guns N' Roses", "Janis Joplin", "Jennifer Holliday", "Michael Jackson", "Pink Floyd", "Prince", "Rolling Stones", "The Who", "Tina Turner"];

//var artists;
var apiKey = "OxiG8uG70siK3rjeqb0EjVKmV0y5XaAA&";
var playing = false;

//var queryUrl="https://api.giphy.com/v1/gifs/search?api_key=OxiG8uG70siK3rjeqb0EjVKmV0y5XaAA&q=david-bowie&limit=10&offset=0&rating=R&lang=en";

function animateGif(gif, response){
    gif.off();
                    gif.on("click", function () {
                        if (playing === false) {
                            playing = true;
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
                            playing = false;
                        }
                    });
}

function renderingButtons() {
    $("#button").empty();

    topics.forEach(function (element) {
        console.log(element);
        var boton = $("<button >");
        boton.addClass("artist btn btn-outline-light col-5 col-sm-3 col-md-3 col-lg-2 col-xl-2 m-xl-2 m-2 mx-sm-2 my-sm-1 my-md-2 text-monospace");
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
                $("#loadMore").attr("style", "display:visible");
                console.log(response);
                console.log(queryUrl);
                console.log(response.data[0].images.original.url);
                for (var x = 0; x < 10; x++) {
                    var newDiv = $("<div>");
                    var gif = $("<img>");
                    var title = $("<p>");
                    var rating = $("<p>");
                    var download = $("<a download>");
                    newDiv.addClass("float-left m-2");
                    gif.attr("src", response.data[x].images.original_still.url);
                    gif.addClass("gif m-3 border border-light");
                    gif.attr("style", "height:200px");
                    gif.attr("id", x);
                    download.attr("href", response.data[x].images.original_still.url);
                    download.text("Download");
                    download.addClass("text-white");
                    title.addClass("text-white m-3 text-center text-monospace");
                    title.text("Title: " + response.data[x].title);
                    rating.addClass("text-white m-3 text-center text-monospace");
                    rating.text("Rating: " + response.data[x].rating);
                    $("#images").append(newDiv);
                    newDiv.append(gif);
                    newDiv.append(title);
                    newDiv.append(rating);
                    newDiv.append(download);

                    $("#loadMore").off();
                    $("#loadMore").on("click", function () {
                        queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "q=" + artists + "&limit=25&offset=0&rating=R&lang=en";
                        $.ajax({
                            url: queryUrl,
                            method: "GET"
                        })
                            .then(function (response) {
                                for (var x = 10; x < 20; x++) {
                                    var newDiv = $("<div>");
                                    var gif = $("<img>");
                                    var title = $("<p>");
                                    var rating = $("<p>");
                                    newDiv.addClass("float-left m-2");
                                    gif.attr("src", response.data[x].images.original_still.url);
                                    gif.addClass("gif m-3 border border-light");
                                    gif.attr("style", "height:200px");
                                    gif.attr("id", x);
                                    title.addClass("text-white m-3 text-center text-monospace");
                                    title.text("Title: " + response.data[x].title);
                                    rating.addClass("text-white m-3 text-center text-monospace");
                                    rating.text("Rating: " + response.data[x].rating);
                                    $("#images").append(newDiv);
                                    newDiv.append(gif);
                                    newDiv.append(title);
                                    newDiv.append(rating);

                                    animateGif(gif, response);
                                    
                                }

                            });
                    });

                    animateGif(gif, response);
                    
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