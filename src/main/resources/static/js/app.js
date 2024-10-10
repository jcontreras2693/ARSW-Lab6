app = (function () {

    var author = "";
    var blueprints = [];

    var setAuthor = function (newAuthor) {
        author = newAuthor;
        $('#selectedAuthor').text(author + '´s Blueprints');
      };

    var getBlueprintsByAuthor = function (author){
    $('#blueprintsTable tbody').empty()
        apimock.getBlueprintsByAuthor(author,
            function(authorsBlueprints){
                blueprints = authorsBlueprints.map(bp => ({name: bp.name, numberOfPoints: bp.points.length}))
                blueprints.map(
                    bp => {
                        var markup = "<tr><td>" + bp.name + "</td><td>" + bp.numberOfPoints + "</td><td><button type='button'>Open</button></td></tr>" ;
                        $("#blueprintsTable tbody").append(markup);
                    }
                )
                var initialValue = 0;
                var sumWithInitial = blueprints.reduce(
                  (accumulator, bp) => accumulator + bp.numberOfPoints,
                  initialValue,
                );
                $('#userPoints').text(sumWithInitial);
                }
            );
    };

    return {
        setAuthor: setAuthor,
        getBlueprintsByAuthor: getBlueprintsByAuthor
    };

})();