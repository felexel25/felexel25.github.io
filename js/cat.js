//Retorna el url del archivo buscado
function cat(directory, history) {
    // Busca el archivo con el nombre de historia especificado en la lista de archivos del directorio.
    const file = directory.files.find(file => file.history === history);
  
    // Si se encuentra el archivo, devuelve la URL asociada con ese archivo.
    if (file) {
      return file.url;
    } else {
      // Si el archivo no se encuentra, devuelve un mensaje que indica que no se pudo encontrar.
      return null;
    }
}
  
