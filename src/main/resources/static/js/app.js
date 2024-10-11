app = (function () {

    var author = "";
    var blueprints = [];
    var api = apiclient;

    var setAuthor = function (newAuthor) {
        author = newAuthor;
        $('#selectedAuthor').text(author + '´s Blueprints');
      };

    var getBlueprintsByAuthor = function (author){
        $('#blueprintsTable tbody').empty()
        api.getBlueprintsByAuthor(author,
            function(authorsBlueprints){
                blueprints = authorsBlueprints.map(bp => ({name: bp.name, numberOfPoints: bp.points.length}))
                blueprints.map(
                    bp => {
                        var markup = "<tr><td>" + bp.name + "</td><td>" + bp.numberOfPoints + "</td><td><button type='button' onclick=\"app.getBlueprintsByNameAndAuthor('"+author+"', '"+bp.name+"')\">Open</button></td></tr>" ;
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
        var c = document.getElementById('myCanvas');
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
    };

    var getBlueprintsByNameAndAuthor = function(author, name){
        api.getBlueprintsByNameAndAuthor(author, name,
            function(blueprint){
                var c = document.getElementById('myCanvas');
                var ctx = c.getContext("2d");
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.beginPath();
                console.log(blueprint);
                ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y);
                for (var i = 1; i < blueprint.points.length; i++){
                    ctx.lineTo(blueprint.points[i].x, blueprint.points[i].y);
                }
                ctx.stroke();
                $('#selectedBlueprint').text(name);
            }
        );
    };


    return {
        setAuthor: setAuthor,
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor
    };

})();