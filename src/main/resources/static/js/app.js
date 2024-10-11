const app = (() => {
    let author = "";
    let blueprints = [];
    const api = apiClient;

    const setAuthor = (newAuthor) => {
        author = newAuthor;
        $('#selectedAuthor').text(`${author}'s Blueprints`);
    };

    const getBlueprintsByAuthor = async (author) => {
        $('#blueprintsTable tbody').empty();
        try {
            await api.getBlueprintsByAuthor(author, (authorsBlueprints) => {
                blueprints = authorsBlueprints.map(bp => ({
                    name: bp.name,
                    numberOfPoints: bp.points.length
                }));

                blueprints.forEach(bp => {
                    const markup = `
                        <tr>
                            <td>${bp.name}</td>
                            <td>${bp.numberOfPoints}</td>
                            <td>
                                <button type="button" onclick="app.getBlueprintsByNameAndAuthor('${author}', '${bp.name}')">
                                    Open
                                </button>
                            </td>
                        </tr>
                    `;
                    $("#blueprintsTable tbody").append(markup);
                });

                const totalPoints = blueprints.reduce((acc, bp) => acc + bp.numberOfPoints, 0);
                $('#userPoints').text(totalPoints);
            });

            clearCanvas();
        } catch (error) {
            console.error('Error fetching blueprints by author:', error);
        }
    };

    const getBlueprintsByNameAndAuthor = async (author, name) => {
        try {
            await api.getBlueprintsByNameAndAuthor(author, name, (blueprint) => {
                const c = document.getElementById('myCanvas');
                const ctx = c.getContext('2d');
                
                clearCanvas();

                ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y);
                blueprint.points.forEach(point => ctx.lineTo(point.x, point.y));

                ctx.stroke();
                $('#selectedBlueprint').text(name);
            });
        } catch (error) {
            console.error('Error fetching blueprint by name and author:', error);
        }
    };

    const clearCanvas = () => {
        const c = document.getElementById('myCanvas');
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
    };

    return {
        setAuthor,
        getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor
    };
})();
