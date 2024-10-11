/*
await se utiliza para esperar a que la promesa devuelta por fetch
se resuelva, es decir, esperar a que los datos lleguen del servidor.
*/

const apiClient = (() => {
    const url = "http://localhost:8080/blueprints/";

    const getBlueprintsByAuthor = async (authName, callback) => {
        try {
            const response = await fetch(`${url}${authName}`);
            const data = await response.json();
            callback(data);
        } catch (error) {
            console.error('Error searching for blueprints by author:', error);
        }
    };

    const getBlueprintsByNameAndAuthor = async (authName, bpName, callback) => {
        try {
            const response = await fetch(`${url}${authName}/${bpName}`);
            const data = await response.json();
            callback(data);
        } catch (error) {
            console.error('Error searching for blueprints by author and name:', error);
        }
    };

    return {
        getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor
    };
})();
