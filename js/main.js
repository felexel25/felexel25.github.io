document.addEventListener('DOMContentLoaded', function() {
    // Obtener la referencia al contenedro de la interfaz
    const interface = document.querySelector('.interface');
    // Obtener la referencia al contenedor de la consola
    const consoleContainer = document.querySelector('.console-container');
    // Obtener la referencia al contenedor de pdf
    const pdfContainer = document.querySelector('.pdf-container');
    // Ontener la refrencia al iframe del pdf
    const pdf = document.querySelector('.pdf');
    // Obtener la referencia al input de la consola
    const input = document.querySelector('.input');
    // Obtener la referencia al prompt de la consola
    const prompt = document.querySelector('.prompt');
    // Variable que contiene el objeto de directorios
    var directoryNow = directory;

    // Muestra el contenedor PDF y oculta el contenedor Consola
    function showPdf() {
        consoleContainer.classList.add('hidden');
        pdfContainer.classList.remove('hidden');
    }
      
    // Muestra el contenedor Consola y oculta el contenedor PDF 
    function showConsole() {
        pdfContainer.classList.add('hidden');
        consoleContainer.classList.remove('hidden');
    }

    // Definir la función para mantener el foco en el input o en la interfaz
    function maintainFocus() {
        // Verificar si el input está visible y habilitado
        if (input.offsetParent !== null && !input.disabled) {
            input.focus();
        }
    }

    // Definir la función para ejecutar los comandos
    function executeCommand(command) {
        if(command === 'clear'){
            // Limpiar el prompt
            prompt.innerHTML = '&gt;';
        } else if (command === 'version') {
           // Agregar el comando al prompt
           const divPrompt = document.createElement('div');
           divPrompt.innerHTML = 'Version 1.0.0';
           divPrompt.classList.add('prompt');
           prompt.appendChild(divPrompt);
        } else if (command === 'ls') {
            // Listar directorios y archivos
            prompt.appendChild(ls(directoryNow));
        } else if (command.startsWith('cd')) {
            // Navegar entre directorios
            directoryNow = cd(command.replace('cd ', ''));
        } else if (command.startsWith('cat')) {
            // Mostrar arvhicos pdf
            let url = cat(directoryNow, command.replace('cat ', ''));
            if(url != null){
                showPdf();
                pdf.src = url;
            } else {
                const divError = document.createElement('div');
                divError.innerHTML = 'No se encontró ningún archivo con ese nombre';
                divError.classList.add('output');
                prompt.appendChild(divError);
            }
        } else {
            // Comando desconocido
            const divError = document.createElement('div');
            divError.innerHTML = 'Comando desconocido';
            divError.classList.add('output');
            prompt.appendChild(divError);
        }
    }
    // Agregar un evento de teclado al documento
    document.addEventListener('keydown', function(e) {
        // Verifica si las teclas 'Ctrl' y 'X' están siendo presionadas al mismo tiempo, o si la tecla 'Esc' está siendo presionada
        if (e.code === 'Escape') {
            // Oculta el div que contiene el PDF
            showConsole();
        }
    });

    // Agregar un evento de teclado al input
    input.addEventListener('keydown', function(e) {
        // Verificar si se ha presionado la tecla Enter
        if (e.key === 'Enter') {
            // Obtener el valor del input y limpiarlo
            const command = e.target.value.trim();
            e.target.value = '';

            // Si es el primer comando borra el '>'
            if (prompt.innerHTML === '&gt;') {
                prompt.innerHTML = '';
            }

            // Agregar el comando al prompt
            const divCommand = document.createElement('div');
            divCommand.innerHTML = '&gt; ' + command;
            divCommand.classList.add('command');
            prompt.appendChild(divCommand);

            // Ejecutar el comando
            executeCommand(command);
        }
    });

    window.onpopstate = function(event) {
        // El elemento .pdf-container está visible
        if (!pdfContainer.classList.contains('hidden')) {
            // Oculta el div que contiene el PDF
            showConsole();
        }
    }

    // Establecer un intervalo para mantener el foco en el input o en la interfaz
    setInterval(maintainFocus, 100);
});


