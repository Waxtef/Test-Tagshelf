

// JSON de palabras en español
const palabrasES = {
    palabras: ["a", "ante", "bajo", "con", "de", "desde", "en", "entre", "hacia", "hasta", 
    "mediante", "para", "por", "según", "sin", "sobre", "tras", "durante", "excepto", 
    "aunque", "incluso", "mientras", "antes", "después", "donde", "cuando", "si", 
    "pues", "porque", "como", "también", "además", "entonces", "así", "luego", 
    "alrededor", "dentro", "fuera", "encima", "debajo","junto", 
    "solo", "casi", "mañana", "siempre", "nunca", "de", "un","una","en",
    "unas","unos","ademas", "asimismo", "y", "hasta","no",
    "encima" ,"también","igualmente" ,"aunque" ,"pues","porque",
    "entonces","luego","como","total","particularmente","especificamente",
    "bueno","primeramente","finalmente","actualmente","apenas","cuando",
    "luego","temporalmente","inmediantamente","abajo","arriba","adelante",
    "segun","mientras","siempre","si","realmente","efectivamente",
    "indudablemente","realmente","con","para","que","eso","esa",
    "el","la",
    "yo", "tú", "él", "ella", "usted", "nosotros", "vosotros", "ellos", "ellas", "ustedes",
    "me", "te", "lo", "la", "le", "nos", "os", "los", "las", "les",
    "mi", "tu", "su", "nuestro", "vuestro", "mis", "tus", "sus", "nuestros", "vuestros"]
  };

  // JSON de palabras en ingles
  const palabrasEN = {
    words: ["a", "an", "and", "as", "at", "but", "by", "for", "from", "in",
    "into", "like", "near", "of", "off", "on", "onto", "or", "over", "past",
    "since", "than", "that", "through", "to", "toward", "under", "until", "up",
    "upon", "with", "within", "without", "about", "above", "across", "after", "along", "around",
    "before", "behind", "below", "beneath", "beside", "between", "beyond", "down", "during", "except",
    "the",
    "i", "you", "he", "she", "it", "we", "you", "they",
    "me", "you", "him", "her", "it", "us", "you", "them",
    "my", "your", "his", "her", "its", "our", "your", "their"]
  };

  function detectaridioma() {
    let idioma_det = "";
    const texto = document.getElementById('input-text').value;
    const palabras_SpanishArray = palabrasES.palabras;
    const palabras_EnglishArray = palabrasEN.words;

    const palabras = texto.toLowerCase().split(' ');

    const idioma = palabras.reduce((result, palabra) => {
      if (palabras_EnglishArray.includes(palabra)) {
        result.ingles = true;
      }
      if (palabras_SpanishArray.includes(palabra)) {
        result.espanol = true;
      }
      return result;
    }, { ingles: false, espanol: false });

    if (idioma.ingles && idioma.espanol) {
      console.log('Spanglish.');
      idioma_det = "Spaglish";
    } else if (idioma.ingles) {
      console.log('Ingles');
      idioma_det = "Ingles";
    } else if (idioma.espanol) {
      console.log('Español');
      idioma_det = "Español";
    } else {
      console.log('Idioma no Identificado');
    }

    const result = 'Idioma Detectado: ' + idioma_det;
    document.getElementById('result').innerHTML = result;
  }

  // Ejemplo de uso
  //const texto = 'Hola mujer y hombre';
  //validarGenero(texto);


  //Script de Audio a Texto
  const recordBtn = document.querySelector(".record"),
  result = document.querySelector(".result"),
  inputLanguage = document.querySelector("#language"),
  clearBtn = document.querySelector(".clear");

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition,recognition,recording = false;

function populateLanguages() {
  languages.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.code;
    option.innerHTML = lang.name;
    inputLanguage.appendChild(option);
  });
}

populateLanguages();

function speechToText() {
  try {
    recognition = new SpeechRecognition();
    recognition.lang = inputLanguage.value;
    recognition.interimResults = true;
    recordBtn.classList.add("recording");
    recordBtn.querySelector("p").innerHTML = "Escuchando...";
    recognition.start();
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      if (event.results[0].isFinal) {
        result.innerHTML += " " + speechResult;
        result.querySelector("p").remove();
      } else {
        //Actualiizar el texto
        document.querySelector(".interim").innerHTML = " " + speechResult;
      }
    };
    recognition.onspeechend = () => {
      speechToText();
    };
    recognition.onerror = (event) => {
      stopRecording();
      if (event.error === "no-speech") {
        alert("No speech was detected. Stopping...");
      } else if (event.error === "audio-capture") {
        alert(
          "No microphone was found. Ensure that a microphone is installed."
        );
      } else if (event.error === "not-allowed") {
        alert("Permission to use microphone is blocked.");
      } else if (event.error === "aborted") {
        alert("Listening Stopped.");
      } else {
        alert("Error occurred in recognition: " + event.error);
      }
    };
  } catch (error) {
    recording = false;

    console.log(error);
  }
}

function stopRecording() {
    recognition.stop();
    recordBtn.querySelector("p").innerHTML = "Comenzar a Escuchar";
    recordBtn.classList.remove("recording");
    recording = false;
  }

recordBtn.addEventListener("click", () => {
  if (!recording) {
    speechToText();
    recording = true;
  } else {
    stopRecording();
  }
});




function compareWords() {
    const inputText = document.getElementById('input-text').value;
    
    if (inputText.trim() === '') {
      alert('Por favor, ingrese un texto válido.');
      return;
    }
    
    const jsonWords = {
      "palabras": ["ademas", "asimismo", "de", "y", "hasta",
      "encima" ,"también","igualmente" ,"aunque" ,"pues","porque",
      "entonces","luego","como","total","particularmente","especificamente",
      "bueno","primeramente","finalmente","actualmente","apenas","cuando",
      "luego","temporalmente","inmediantamente","abajo","arriba","adelante",
      "segun","mientras","siempre","si","realmente","efectivamente","en",
      "indudablemente","realmente","con","para","que","eso","esa"]
    };
    
    const wordsToCompare = inputText.split(' ');
    const matchedWords = [];
    
    for (let i = 0; i < wordsToCompare.length; i++) {
      const word = wordsToCompare[i].toLowerCase();
      
      if (jsonWords.palabras.includes(word)) {
        matchedWords.push(word);
      }
    }
    
    const result = 'Palabras coincidentes encontradas: ' + matchedWords.join(', ');
    document.getElementById('result').innerHTML = result;
  }
