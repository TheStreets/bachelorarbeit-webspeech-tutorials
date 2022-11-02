import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {EditorData} from "../models/editor.data.model";
import {require} from "ace-builds";

const beautify = require('js-beautify');


@Injectable({
  providedIn: 'root'
})
export class UtilService implements OnDestroy {

  editorDataSubject?: BehaviorSubject<EditorData>;
  tutorialData!: EditorData;

  beautifierOptions = {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '5',
    preserve_newlines: true,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: '80',
    indent_inner_html: true,
    comma_first: false,
    e4x: false
  };

  constructor() {
  }

  displayTutorial(tutorialNumber: number) {
    switch (tutorialNumber) {
      case 1:
        this.tutorialData = this.createSpeechSynthesesTutorial_1();
        break;
      case 2:
        this.tutorialData = this.createSpeechSynthesesTutorial_2();
        break;
      case 3:
        this.tutorialData = this.createSpeechRecognitionTutorial_1();
        break;
      case 4:
        this.tutorialData = this.createSpeechRecognitionAdvancedTutorial_2();
        break;
    }
    this.editorDataSubject = new BehaviorSubject<EditorData>(this.tutorialData);
    this.editorDataSubject.subscribe((data) => this.tutorialData = data);
  }

  createTemplate(html: string, js: string) {
    return beautify.html(
      `<html lang="de">
        <head>
          <title>Output</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
        </head>
        <style>
            min-width: 100vw !important;
            min-height: 100vh !important;

        </style>
        <body>
            ${html}
        </body>
        <script>
            ${js}
        </script>
    </html>`, this.beautifierOptions);
  }

  private createJSForSpeechSynthesesBasicTutorial_1(): string {
    return beautify.js(
      `
       const textInput = document.getElementById('textInput');
    const messageField = document.getElementById('message');
    const speakButton = document.getElementById('speakButton');

    // init SpeechSynth API
    const speaker = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();

    if ('speechSynthesis' in window) {
      messageField.innerHTML = 'Die SpeechSynthesis API wird von diesem Web-Browser <strong>unterstützt</strong>.';
      messageField.className = 'text-success';
    } else {
      messageField.innerHTML = 'Die SpeechSynthesis API wird von diesem Web-Browser <strong>nicht unterstützt</strong>.';
      messageField.className = 'text-danger';
    }

    textInput.addEventListener('keyup', function () {
      if (textInput.value !== '') {
        speakButton.disabled = false;
      } else {
        speakButton.disabled = true;
      }
    });

    function speak() {
      utterance.text = textInput.value;
      utterance.lang = 'de-DE';
      speaker.speak(utterance);
    }
    `);
  }

  private createHTMLForSpeechSynthesesBasicTutorial_1(): string {
    return beautify.html(
      `<div class="container">
    <div class="row mb-3">
      <div class="col">
        <h1 class="text-center">Tutorial: SpeechSynthesis API</h1>
      </div>
    </div>
    <div class="row">
      <div class="col ">
        <input type="text" class="form-control mb-3" id="textInput" placeholder="Text eingeben" />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col d-grid">
        <button onclick="speak()" class="btn btn-primary btn-block" id="speakButton" disabled>Sprechen starten</button>
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <div class="status">
          <span id="message"></span>
          <span id="statusMessage"></span>
        </div>
      </div>
    </div>
  </div>`);
  }

  private createSpeechSynthesesTutorial_1() {
    return new EditorData(this.createHTMLForSpeechSynthesesBasicTutorial_1(),
      this.createJSForSpeechSynthesesBasicTutorial_1());
  }

  private createJSForSpeechSynthesesAdvancedTutorial_2() {
    return beautify.js(`
      const textInput = document.getElementById('textInput');
    const rate = document.getElementById('rate');
    const pitch = document.getElementById('pitch');
    const volume = document.getElementById('volume');
    const rateBadge = document.getElementById('rateValue');
    const pitchBadge = document.getElementById('pitchValue');
    const volumeBadge = document.getElementById('volumeValue');
    const languageContainer = document.getElementById('languageContainer');

    const speakButton = document.getElementById('speakButton');
    const pauseButton = document.getElementById('pauseButton');
    const speakerStatus = document.getElementById('status');

    const speaker = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();

    window.addEventListener('load', function () {
      createLanguageOptions();
    });

    function createLanguageOptions() {
      const voices = speaker.getVoices();
      for (let i = 0; i < voices.length; i++) {
        voice = voices[i];
        const option = new Option(voice.name, voice.name);
        languageContainer.appendChild(option);
      }
    }

    languageContainer.addEventListener('change', function () {
      startSpeakingOnChanges();
    });

    textInput.addEventListener('keyup', function () {
      if (textInput.value !== '') {
        speakButton.disabled = false;
      } else {
        speakButton.disabled = true;
      }
    });

    function speakText() {
      const selectedVoice = languageContainer.options[languageContainer.selectedIndex];
      let voice = null;
      speaker.getVoices().forEach(v => {
        if (v.name === selectedVoice.value) {
          voice = v;
          utterance.lang = voice.lang;
          console.log('Found the voice: ', voice)
        }
      });
      utterance.rate = rate.value;
      utterance.pitch = pitch.value;
      utterance.volume = volume.value;
      utterance.text = textInput.value;
      speaker.speak(utterance);
    }

    function speak() {
      if (speaker.paused) {
        speaker.resume();
      } else {
        speakText();
      }
    }

    function pauseSpeaking() {
      speaker.pause();
    }

    function startSpeakingOnChanges() {
      if (speaker.speaking) {
        speaker.cancel();
        speakText();
      }
    }

    rate.addEventListener('change', function () {
      rateBadge.innerHTML = rate.value;
      startSpeakingOnChanges();
    });

    pitch.addEventListener('change', function () {
      pitchBadge.innerHTML = pitch.value;
      startSpeakingOnChanges();
    });

    volume.addEventListener('change', function () {
      volumeBadge.innerHTML = volume.value;
      startSpeakingOnChanges();
    });

    utterance.onstart = function (event) {
      speakerStatus.innerHTML = 'Speaking Started';
      pauseButton.disabled = false;
    }

    utterance.onend = function (event) {
      speakerStatus.innerHTML = 'Speaking Finished';
      pauseButton.disabled = true;
    }

    utterance.onpause = function (event) {
      speakerStatus.innerHTML = 'Speaking Paused';
      pauseButton.disabled = true;
    }

    utterance.onresume = function (event) {
      speakerStatus.innerHTML = 'Speaking Resumed';
      pauseButton.disabled = false;
    }`
    );
  }

  private createHTMLForSpeechSynthesesAdvancedTutorial_2() {
    return beautify.html(
      `<div class="container">
    <h1 class="h1 pt-2 text-center">Tutorial: SpeechSynthesis API</h1>
    <div class="row row-eq-height mt-3 mb-3">
      <div class="col">
        <div class="card d-flex h-100">
          <div class="card-header">
            <label class="form-label fw-500 fs-2">Speech-Manipulation</label>
          </div>
          <div class="card-body">
            <input class="form-control" id="textInput" type="text" placeholder="Eingabe des Textes">
            <div class="mt-3">
              <label for="rate">Geschwindigkeit</label>
              <input type="range" id="rate" min="0.5" max="1.5" value="1" step="0.1" class="form-range">
              <span class="badge bg-primary float-end" id="rateValue">1</span>
            </div>
            <div class="mt-4">
              <label for="pitch">Tonlage</label>
              <input type="range" id="pitch" min="0.5" max="1.5" value="1" step="0.1" class="form-range">
              <span class="badge bg-primary float-end" id="pitchValue">1</span>
            </div>
            <div class="mt-4">
              <label for="pitch">Lautstärke</label>
              <input type="range" id="volume" min="0" max="1" value="1" step="0.1" class="form-range">
              <span class="badge bg-primary float-end" id="volumeValue">1</span>
            </div>
            <div class="mt-3">
              <label for="language-container" class="form-label">Stimmen</label>
              <select name="Language" class="form-select" id="languageContainer"></select>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card d-flex h-100">
          <div class="card-header">
            <label class="fw-500 fs-2">Output</label>
          </div>
          <div class="card-body">
            <div class="mt-3 mb-3 d-grid">
              <button disabled class="btn btn-lg btn-primary btn-block fw-bold" id="speakButton" type="button"
                onclick="speak()">Play</button>
            </div>
            <div class="mt-3 mb-3 d-grid">
              <button disabled class="btn btn-lg btn-primary btn-block fw-bold" id="pauseButton" type="button"
                onclick="pauseSpeaking()">Pause</button>
            </div>
            <div class="container-fluid">
              <div class="row">
                <div class="col px-0 mx-0">
                  <label class="fw-500">Status:</label>
                </div>
                <div class="col px-0 mx-0">
                  <span class="fw-500" id="status">Not Speaking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`);
  }

  private createSpeechSynthesesTutorial_2() {
    return new EditorData(this.createHTMLForSpeechSynthesesAdvancedTutorial_2(),
      this.createJSForSpeechSynthesesAdvancedTutorial_2());
  }

  private createHTMLForSpeechRecognitionBasicTutorial_1() {
    return beautify.html(`
        <div class="container">
    <h1 class="h1 pt-2 text-center">SpeechRecognition: Basic</h1>
    <div class="row mb-4 mt-3">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <label class="fw-500 fs-2">Recognition of Words</label>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col">
                  <label class="form-label" for="languageContainer">Language to be recognized</label>
                  <select class="form-select" name="languages" id="languageContainer">
                    <option value="de-DE">German</option>
                    <option value="en-US">English</option>
                  </select>
                </div>
                <div class="col my-auto">
                  <div class="form-check form-switch">
                    <label for="continuousValue" class="form-check-label">Continue the Recognition</label>
                    <input type="checkbox" class="form-check-input" role="switch" id="continuous">
                  </div>
                  <div class="form-check form-switch">
                    <label for="interimResultsValue" class="form-check-label">Return Interim Results</label>
                    <input type="checkbox" class="form-check-input" role="switch" id="interimResults">
                  </div>
                </div>
                <div class="col">
                  <label class="form-label" for="maxAlternativesContainer">Max Alternative Results</label>
                  <select class="form-select" name="languages" id="maxAlternativesContainer">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <hr>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="alternativesContainer" class="fw-500 fs-4">SpeechRecognitionAlternative</label>
                  <ol class="list-group list-group-numbered" id="alternativesContainer">
                  </ol>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <hr>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="interimResultsTextArea" class="fw-500 fs-4">Interim Results</label>
                  <textarea class="form-control" name="InterimResults" id="interimResultsTextArea" rows="4"></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <hr>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="endResultsTextArea" class="fw-500 fs-4">End Results</label>
                  <textarea class="form-control" name="InterimResults" id="endResultsTextArea" rows="4"></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <hr>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="d-flex justify-content-between">
                    <span class="fw-500 fs-4">Status (Error Code):</span>
                    <span class="fw-500 fs-4" id="status" style="color: green">No Error</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <hr>
                </div>
              </div>
              <div class="row">
                <div class="col d-grid">
                  <button class="btn btn-primary fw-bold fs-3" id="recognitionButton">Start Recognition</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `);
  }

  private createJSForSpeechRecognitionBasicTutorial_1() {
    return beautify.js(`
    const languageContainer = document.getElementById('languageContainer');
    const continuousCheckbox = document.getElementById('continuous');
    const interimResultsCheckbox = document.getElementById('interimResults');
    const maxAlternativesContainer = document.getElementById('maxAlternativesContainer');
    const recognitionButton = document.getElementById('recognitionButton');

    const alternativesContainer = document.getElementById('alternativesContainer');
    const interimResultsTextArea = document.getElementById('interimResultsTextArea');
    const endResultsTextArea = document.getElementById('endResultsTextArea');
    const status = document.getElementById('status');

    var SpeechRecognitionService = webkitSpeechRecognition;
    const recognition = new SpeechRecognitionService();

    let recognizing;

    window.addEventListener('load', function () {
      const indexL = languageContainer.selectedIndex;
      recognition.lang = languageContainer.options[indexL].value;

      const indexA = maxAlternativesContainer.selectedIndex;
      const maxAlternative = maxAlternativesContainer.options[indexA].value;
      recognition.maxAlternatives = parseInt(maxAlternative);
    });

    languageContainer.onchange = function () {
      const index = languageContainer.selectedIndex;
      recognition.lang = languageContainer.options[index].value;
    }

    maxAlternativesContainer.onchange = function () {
      const index = maxAlternativesContainer.selectedIndex;
      const maxAlternative = maxAlternativesContainer.options[index].value;
      recognition.maxAlternatives = parseInt(maxAlternative);
    }

    function disableMaxAlternativeContainer() {
      if (continuousCheckbox.checked || interimResultsCheckbox.checked) {
        maxAlternativesContainer.disabled = true;
        recognition.maxAlternatives = 1;
        maxAlternativesContainer.selectedIndex = 0;
      } else {
        maxAlternativesContainer.disabled = false;
      }
    }

    continuousCheckbox.onchange = function () {
      recognition.continuous = continuousCheckbox.checked;
      disableMaxAlternativeContainer();
    }

    interimResultsCheckbox.onchange = function () {
      recognition.interimResults = interimResultsCheckbox.checked;
      disableMaxAlternativeContainer();
    }

    function reset() {
      recognizing = false;
      recognitionButton.innerHTML = 'Start Recognition';
    }

    function setResultAlternatives(alternatives) {
      if (!continuousCheckbox.checked && !interimResultsCheckbox.checked) {
        if (alternatives) {
          for (let i = 0; i < alternatives.length; i++) {
            const item = document.createElement('li');
            item.classList.add('list-group-item');
            item.innerHTML = alternatives[i].transcript;
            alternativesContainer.appendChild(item);
          }
        }
      } else {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        item.innerHTML = 'Es ist nicht sinnvoll, alternative Ergebnisse anzuzeigen, wenn eines der Kontrollkästchen (Zwischenergebnisse oder kontinuierlich) aktiviert ist. Sie würden eine lange Liste erhalten, die viele Wiederholungen enthält.';
        alternativesContainer.innerHTML = '';
        alternativesContainer.appendChild(item);
        console.log(alternativesContainer);
      }
    }

    function removeResultAlternatives() {
      while (alternativesContainer.firstChild) {
        alternativesContainer.removeChild(alternativesContainer.lastChild);
      }
    }

    recognition.onstart = function () {
      console.log('Recognition started');
    }

    recognition.onerror = function (event) {
      status.innerHTML = event.error;
      status.style = 'color: red;';
    }

    recognition.onresult = function (event) {
      let interimResult = "";
      let endResult = "";

      // loop over all results
      for (let i = 0; i < event.results.length; ++i) {
        // check if result is end result
        if (event.results[i].isFinal) {
          endResult += event.results[i][0].transcript;
        } else {
          // it is an interim result
          interimResult += event.results[i][0].transcript;
        }
      }
      // show result alternatives in a list
      setResultAlternatives(event.results[0]);

      // assign the results to the text areas
      interimResultsTextArea.value = interimResult;
      endResultsTextArea.value = endResult;
    }

    // onend EventHandler for the SpeechRecognition
    recognition.onend = function () {
      reset();
    }

    recognitionButton.addEventListener('click', function () {
      if (recognizing) {
        recognition.stop();
        reset();
      } else {
        recognition.start();
        // reset ui elements
        removeResultAlternatives();
        status.innerHTML = 'No Error';
        status.style = 'color: green;';
        recognizing = true;
        recognitionButton.innerHTML = 'Stop Recognition';
        interimResultsTextArea.value = "";
        endResultsTextArea.value = "";
      }
    });`);
  }

  private createSpeechRecognitionTutorial_1(): EditorData {
    return new EditorData(this.createHTMLForSpeechRecognitionBasicTutorial_1(),
      this.createJSForSpeechRecognitionBasicTutorial_1());
  }

  private createHTMLForSpeechRecognitionAdvancedTutorial_2() {
    return beautify.html(`
        <nav class="navbar navbar-expand navbar-light bg-light">
            <div class="container-fluid">
                <span class="navbar-brand">Navbar</span>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                      </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Preis</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Kontakt</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container">
          <div class="row mb-4 mt-3">
            <div class="col">
              <h1 class="h1 pt-2 text-center" id="titleText">Home Page</h1>
            </div>
          </div>
        </div>
    `);
  }

  private createJSForSpeechRecognitionAdvancedTutorial_2() {
    return beautify.js(`
     const titleText = document.getElementById('titleText');
    const aTags = Array.from(document.getElementsByTagName('a'));

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.continuous = true;
    let recognitionResult = "";

    const commands = [
      {
        command: "Öffne Link Home".toLocaleLowerCase()
      },
      {
        command: "Öffne Link Preis".toLocaleLowerCase()
      },
      {
        command: "Öffne Link Kontakt".toLocaleLowerCase()
      },
    ]

    window.addEventListener('load', () => {
      setOnClickListeners();
      recognition.start();
    });

    recognition.onend = function (event) {
      recognitionResult = "";
      recognition.start();
    }

    recognition.onresult = function (event) {
      // loop over all results
      for (let i = 0; i < event.results.length; ++i) {
        // check if result is end result
        if (event.results[i].isFinal) {
          recognitionResult += event.results[i][0].transcript;
          checkCommand(recognitionResult.toLocaleLowerCase());
        } else {
          recognitionResult = "";
        }
      }
    }

    function checkCommand(result) {
      for (let i = 0; i < commands.length; i++) {
        const element = commands[i];
        if (result.includes(element.command)) {
          let link;
          if (result.includes("Home".toLocaleLowerCase())) {
            link = aTags.filter(element => element.innerText === "Home")[0];
          } else if (result.includes("Kontakt".toLocaleLowerCase())) {
            link = aTags.filter(element => element.innerText === "Kontakt")[0];
          } else if (result.includes("Preis".toLocaleLowerCase())) {
            link = aTags.filter(element => element.innerText === "Preis")[0];
          }

          if (link) {
            link.click();
          }
          recognitionResult = "";
        }
      }
    }

    function setOnClickListeners() {
      aTags.map(element => {
        element.addEventListener("click", (e) => {
          if (element.innerText === "Home") {
            titleText.innerText = "Home Page";
          } else if (element.innerText === "Preis") {
            titleText.innerText = "Pricing Page";
          } else if (element.innerText === "Kontakt") {
            titleText.innerText = "Contact Page";
          }
          e.preventDefault();
        });
      });
    }
      `);
  }

  private createSpeechRecognitionAdvancedTutorial_2():EditorData {
    return new EditorData(this.createHTMLForSpeechRecognitionAdvancedTutorial_2(),
      this.createJSForSpeechRecognitionAdvancedTutorial_2());
  }

  ngOnDestroy(): void {
    this.editorDataSubject?.unsubscribe();
  }
}
