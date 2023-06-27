/*
const data = [
    [0x01, 0x00, 0x01, 0x02, 0x03, 0x02, 0x03, 0x00],
    [0x05, 0x04, 0x05, 0x06, 0x07, 0x06, 0x07, 0x04],
    [0x01, 0x00, 0x01, 0x02, 0x03, 0x02, 0x03, 0x00],
    [0x05, 0x04, 0x05, 0x06, 0x07, 0x06, 0x07, 0x04],
    [0x09, 0x08, 0x09, 0x0A, 0x0B, 0x0A, 0x0B, 0x08],
    [0x0D, 0x0C, 0x0D, 0x0E, 0x0F, 0x0E, 0x0F, 0x0C],
    [0x09, 0x08, 0x09, 0x0A, 0x0B, 0x0A, 0x0B, 0x08],
    [0x0D, 0x0C, 0x0D, 0x0E, 0x0F, 0x0E, 0x0F, 0x0C]
  ];

*/

// Patron numerico de la secuancia de numeros 0,1,0,1,2,3,2,3
  const matrix = [];
  const filas = 1;
  const columnas = 8;
  var n = 0;
  let a = 0;

  for (let f = 0; f < filas; f++){
    for (let c = 0; c < columnas; c++){
            if (c > 3) {
                num = (c % 2) + 2 + n; 
            } else {
                num = (c % 2) + n; 
            }
           matrix[c] = num;    
    }
    n = n + 4 ; 
  }
  console.log(matrix);


  //Mover la Matriz a la izquierda para obtener el patron de la la fila 1x8
  const primerElemento = matrix.shift();
  matrix.push(primerElemento);

  console.log(matrix);


// Patron 8x8 de los valores
let no = 0;
const filasx4 = 4;
const filasx8 = 2;
const matrizs = [];

for (let x = 0; x < filasx8; x++) {
    
   for (let i = 0; i < filasx4; i++) {
     let fila = [];
     if (i % 2 === 0) {
       fila = matrix.map(num => num + no);
     } else {
       fila = matrix.map(num => num + 4 + no);
     }
     matrizs.push(fila);
}
 no = no + 8;
}
console.log(matrizs);

const matrizOriginal = [];

for (let i = 0; i < 16; i++) {
  // Obtener el índice de fila correspondiente en la matriz original
  const filaOriginalIndex = i % 8;
  
  // Copiar la fila correspondiente de la matriz original a la matriz repetida
  matrizOriginal.push([...matrizs[filaOriginalIndex]]);
}

console.log(matrizOriginal);
//-----------------------------------------------------------------------------------------------

//Creacion del 2do patron con la Ultima columa movida 1 Fila
//Primero Debemos Copiar la Matriz
var matriz_2 = [];

// Copiar los elementos de la matriz original en la matriz copia-------------------------
for (var i = 0; i < matrizOriginal.length; i++) {
  var filaOriginal = matrizOriginal[i];
  var filaCopia = [];
  
  for (var j = 0; j < filaOriginal.length; j++) {
    filaCopia.push(filaOriginal[j]); // Copiar cada elemento de la fila
  }
  
  matriz_2.push(filaCopia); // Agregar la fila copiada a la matriz 2
}
//Despues de Copiar la movemos la Ultima columna 1 Fila hacia arriba----------------------------
var ultimaColumna = matriz_2.map(fila => fila[7]);
// Mover el último valor de cada fila a la fila inferior
for (let i = 0; i < matriz_2.length - 1; i++) {
  matriz_2[i][7] = matriz_2[i + 1][7];
}
// Colocar los valores de la última columna en la fila inferior
matriz_2[matriz_2.length - 1][7] = ultimaColumna[0];
console.log(matriz_2);
//Unir las Matrices para Formar el Patron Completo-------------------------------
var matrizNueva = [];

// Combinar las matrices en una matriz de 4x4
for (var i = 0; i < matrizOriginal.length; i++) {
  var filaMatriz1 = matrizOriginal[i];
  var filaMatriz2 = matriz_2[i];
  
  matrizNueva.push(filaMatriz1.concat(filaMatriz2)); // Concatenar las filas de ambas matrices
}

console.log(matrizNueva);
//-----------------------------------------------------------------------------------------------

//Creacion del 2do patron con la Ultima columa movida 2 Fila hacia arriba
//Primero Debemos Copiar la Matriz 2
var matriz_3 = [];
// Copiar los elementos de la matriz 2 en la matriz 3-------------------------
for (var i = 0; i < matriz_2.length; i++) {
  var filaOriginal = matriz_2[i];
  var filaCopia = [];
  
  for (var j = 0; j < filaOriginal.length; j++) {
    filaCopia.push(filaOriginal[j]); // Copiar cada elemento de la fila
  }
  
  matriz_3.push(filaCopia); // Agregar la fila copiada a la matriz copia
}
ultimaColumna = matriz_3.map(fila => fila[7]);
for (let i = 0; i < matriz_3.length - 1; i++) {
  matriz_3[i][7] = matriz_3[i + 1][7];
}
// Colocar los valores de la última columna en la fila inferior
matriz_3[matriz_3.length - 1][7] = ultimaColumna[0];
console.log(matriz_3);

//Unir las Matrices para Formar el Patron Completo-------------------------------
var matrizNueva_2 = [];

// Combinar las matrices en una matriz de 4x4
for (var i = 0; i < matrizNueva.length; i++) {
  var filaMatriz1 = matrizNueva[i];
  var filaMatriz2 = matriz_3[i];
  
  matrizNueva_2.push(filaMatriz1.concat(filaMatriz2)); // Concatenar las filas de ambas matrices
}

console.log(matrizNueva_2);
//-----------------------------------------------------------------------------------------------

// Duplicar la matriz original
var matrizDuplicada = matrizNueva_2.map(function(row) {
  return row.slice(); // Crear una copia de cada fila
});

// Multiplicar por 2 los valores de la matriz duplicada
matrizDuplicada.forEach(function(row) {
  row.forEach(function(value, index) {
    row[index] = value + 16; // Multiplicar por 2 cada valor
  });
});

// Concatenar la matriz duplicada a la matriz original
var matrizResultante = matrizNueva_2.concat(matrizDuplicada);

// La matriz resultante tiene el doble de filas y las mismas columnas, con los valores duplicados multiplicados por 2
console.log(matrizResultante);


//Funcion para sacar coordenadas
function encontrarValor() {
  var fila= document.getElementById("fila").value;
  var columna = document.getElementById("columna").value;
  var valor = matrizResultante[fila][columna]; // Obtener el valor de la celda especificada
  var hexadecimal = valor.toString(16).padStart(2,"0"); // Convertir el valor a hexadecimal

  document.getElementById("output").innerHTML = "0x" + hexadecimal;
}