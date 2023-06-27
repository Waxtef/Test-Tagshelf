  //RGB
    //Color Rojo
    document.getElementById("red").addEventListener("input", function(){
      document.getElementById("r-value").value = this.value;
  });
  document.getElementById("r-value").addEventListener("input", function(){
      document.getElementById("red").value = this.value;
  });
  //Color Verde
  document.getElementById("green").addEventListener("input", function(){
      document.getElementById("g-value").value = this.value;
  });
  document.getElementById("g-value").addEventListener("input", function(){
      document.getElementById("green").value = this.value;
  });
  //Color Azul
  document.getElementById("blue").addEventListener("input", function(){
      document.getElementById("b-value").value = this.value;
  });
  document.getElementById("b-value").addEventListener("input", function(){
      document.getElementById("blue").value = this.value;
  });
  ////HSV
  //HUE
  document.getElementById("hue").addEventListener("input", function(){
      document.getElementById("h-value").value = this.value;
  });
  document.getElementById("h-value").addEventListener("input", function(){
      document.getElementById("hue").value = this.value;
  });
  //SATURATION
  document.getElementById("sat").addEventListener("input", function(){
      document.getElementById("s-value").value = this.value;
  });
  document.getElementById("s-value").addEventListener("input", function(){
      document.getElementById("sat").value = this.value;
  });
   //VALUE
   document.getElementById("val").addEventListener("input", function(){
      document.getElementById("v-value").value = this.value;
  });
  document.getElementById("v-value").addEventListener("input", function(){
      document.getElementById("val").value = this.value;
  });
  
  
  //Funcion para Cambiar de RGB A hsv
  function rgbToHsv_no_ramas() {
    var r,g,b,val,percentRoundFn;
    var red= document.getElementById("red").value;
    var green = document.getElementById("green").value;
    var blue = document.getElementById("blue").value;

    document.body.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';

    r = red /255;
    g = green /255;
    b = blue /255;

    percentRoundFn = numero => Math.round(numero * 100)/100;
  
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let diff = max - min;
    console.log(max);
    console.log(min);
    console.log(diff);
  
    let sat = max === 0 ? 0 : diff / max;
    let hue =
      max === min
        ? 0 : max === r
        ? ((g - b) / diff + (g < b ? 6 : 0)) / 6 : max === g
        ? ((b - r) / diff + 2) / 6 : ((r - g) / diff + 4) / 6;


    
    
    hue = Math.round(hue*360);
    sat = percentRoundFn(sat * 100);
    val = percentRoundFn(max*100);

    document.getElementById("output").innerHTML =  'rgb(' + red + ',' + green + ',' + blue + ')' ;
    document.getElementById("output-hsv").innerHTML =  'hsv(' + hue + ',' + sat + '%,' + val + '%)' ;

    document.getElementById("hue").value = hue;
    document.getElementById("sat").value = sat;
    document.getElementById("val").value = val;
    document.getElementById("h-value").value = hue;
    document.getElementById("s-value").value = sat;
    document.getElementById("v-value").value = val;
    
    
    
  }
  //Funcion para Cambiar de HSV A RGB
  function hsvToRgb() {
    var hue= document.getElementById("hue").value;
    var sat = document.getElementById("sat").value;
    var val= document.getElementById("val").value;

    h = hue / 360;
    s = sat /100;
    v = val / 100;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
  
    const modulo = i % 6;
    let r = [v, q, p, p, t, v][modulo];
    let g = [t, v, v, q, p, p][modulo];
    let b = [p, p, t, v, v, q][modulo];

    var red = Math.round(r * 255);
    var green = Math.round(g * 255);
    var blue = Math.round(b * 255);

    document.getElementById("output").innerHTML =  'rgb(' + red + ',' + green + ',' + blue + ')' ;
    document.body.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
    document.getElementById("output-hsv").innerHTML =  'hsv(' + hue + ',' + sat + '%,' + val + '%)' ;

    document.getElementById("red").value = red;
    document.getElementById("green").value = green;
    document.getElementById("blue").value = blue;
    document.getElementById("r-value").value = red;
    document.getElementById("g-value").value = green;
    document.getElementById("b-value").value = blue;
  }
  

  //Funcion PARA Copiar los Colores a Una tabla
  function copiar_rgb() {
    var rgb = document.getElementById("output").innerText;
    var hsv = document.getElementById("output-hsv").innerText;
    console.log(rgb);
    console.log(hsv);
    var tabla = document.getElementById("Colores");
    var fila = tabla.insertRow();

    var celda1 = fila.insertCell();
    celda1.innerHTML = rgb;

    var celda2 = fila.insertCell();
    celda2.innerHTML = hsv;
}


