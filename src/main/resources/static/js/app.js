app = (function () {

    var author = "";
    var blueprints = [];

    var setAuthor = function (newAuthor) {
        author = newAuthor;
        $('#selectedAuthor').text(author + '´s Blueprints');
      };

    var getBlueprintsByAuthor = function (author){
        apimock.getBlueprintsByAuthor(author,
            function(authorsBlueprints){
                blueprints = authorsBlueprints.map(bp => ({name: bp.name, numberOfPoints: bp.points.length}))
                blueprints.map(
                    bp => {
                        var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + bp.name + "</td><td>" + bp.numberOfPoints + "</td></tr>";
                        $("#blueprintsTable").append(markup);
                    }
                )
                var initialValue = 0;
                var sumWithInitial = array1.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  initialValue,
                );
                $('#userPoints').text('Total user points: ');
                }
            );
    };

    return {
        setAuthor: setAuthor,
        getBlueprintsByAuthor: getBlueprintsByAuthor
    };

})();