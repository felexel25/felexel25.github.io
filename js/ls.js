// funcion para mostrar el contenido de un directorio
function ls(directory) {
    let output = document.createElement('div');
    output.classList.add('output');
    output.innerHTML = `Directorio de "${directory.name}":\n`;

    // Mostrar la lista de archivos
    let filesDiv = document.createElement('div');
    directory.files.forEach(function(file) {
        let fileDiv = document.createElement('div');
        fileDiv.textContent += file.history;
        output.appendChild(fileDiv);
      });
    output.appendChild(filesDiv);

    // Mostrar la lista de subdirectorios
    directory.subdirectories.forEach(function(subdirectory) {
        let subdirectoryDiv = document.createElement('div');
        subdirectoryDiv.textContent += `${subdirectory.name}/`;
        output.appendChild(subdirectoryDiv);
    });

    return output;
}




