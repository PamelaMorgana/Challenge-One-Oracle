function usuarioEncripta() {
    let textoUsuario = document.getElementById("textarea").value;
    textoUsuario = validarTexto(textoUsuario);
    if (textoUsuario !== undefined) {
        const textoEncriptado = encriptarTexto(textoUsuario);
        mostrarTextoEncriptado(textoEncriptado);
        limpiarCaja();
    }
}

function encriptarTexto(texto) {
    const reglas = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    }

    let textoEncriptado = '';
    for (let char of texto) {
        textoEncriptado += reglas[char] || char;
    }

    return textoEncriptado;
}

function mostrarTextoEncriptado(texto) {
    const divEncriptado = document.getElementById("encriptado");
    divEncriptado.innerHTML = `
    <p class="texto__estilizado" id="textoEncriptado">${texto}</p>
    <button class="copiar__boton" onclick="copiarTexto()">Copiar texto</button>
    `;
}

function usuarioDesencripta() {
    let textoUsuario = document.getElementById("textarea").value;
    textoUsuario = validarTexto(textoUsuario);
    if (textoUsuario !== undefined) {
        const textoDesencriptado = desencriptarTexto(textoUsuario);
        mostrarTextoDesencriptado(textoDesencriptado);
        limpiarCaja();
    }
}

function desencriptarTexto(texto) {
    const reglas = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    }

    let textoDesencriptado = texto;

    for (let [encriptado, desencriptado] of Object.entries(reglas)) {
        textoDesencriptado = textoDesencriptado.split(encriptado).join(desencriptado);
    }

    return textoDesencriptado;
}

function mostrarTextoDesencriptado(texto) {
    const divEncriptado = document.getElementById("encriptado");
    divEncriptado.innerHTML = `
    <p class="texto__estilizado" id="textoDesencriptado">${texto}</p>
    <button id="copiar" class="copiar__boton" onclick="copiarTexto()">Copiar texto</button>
    `;
}

function limpiarCaja() {
    document.querySelector("#textarea").value = ""; // Limpia el textarea
}

function copiarTexto() {
    const texto = document.querySelector("#encriptado p").textContent;
    navigator.clipboard.writeText(texto).then(() => {
        alert("Texto copiado al portapapeles");
        limpiarDesencriptado();
    }).catch(err => {
        alert("Error al copiar el texto: " + err);
    });
}

function limpiarDesencriptado() {
    document.getElementById("encriptado").innerHTML = `
            <img class="desencriptador__imagen" src="arrays/Muñeco.png" alt="Muñeco">
            <h2 class="desencriptador__subtitulo">Ningun mensaje fue encontrado</h2>
            <p class="desencriptador__texto">Ingresa el texto que deseas encriptar o desencriptar.</p>   
    `;
}

function validarTexto(texto) {
    if (/[^a-z\s]/.test(texto)) {
        alert("El texto solo debe contener letras minúsculas y sin acentos.");
        limpiarCaja();
        return undefined;
    }
    return texto;
}