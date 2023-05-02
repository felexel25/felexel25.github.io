// Inicializamos la pila de directorios visitados
const directoryStack = [directory];

// Función para cambiar de directorio
function cd(path) {
    // Si el comando es 'cd', volvemos al directorio raíz
    if (path === 'cd') {
        directoryStack.splice(1);
        return directoryStack[0];
    }

    // Convertimos el path a un array de directorios
    const dirs = path.split('/');

    // Recorremos el array de directorios para cambiar de directorio
    let currentDir = directoryStack[directoryStack.length - 1];
    for (const dir of dirs) {
        if (dir === '..') {
            // Si el directorio es '..', retrocedemos en la pila de directorios visitados
            directoryStack.pop();
            currentDir = directoryStack[directoryStack.length - 1];
        } else {
            // Buscamos el subdirectorio con el nombre indicado
            const subDir = currentDir.subdirectories.find(subdir => subdir.name.toLowerCase() === dir.toLowerCase());

            if (!subDir) {
                // Si el subdirectorio no existe, retornamos el directorio actual
                return currentDir;
            }

            // Agregamos el directorio actual a la pila de directorios visitados
            directoryStack.push(subDir);

            // Actualizamos el directorio actual
            currentDir = subDir;
        }
    }

    // Retornamos el directorio actual
    return currentDir;
}
