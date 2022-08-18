import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {EditorData} from "../models/editor.data.model";
import {require} from "ace-builds";

const beautify = require('js-beautify');


@Injectable({
  providedIn: 'root'
})
export class UtilsService implements OnDestroy {

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
    this.tutorialData = this.createSpeechSynthesesBasicTutorial_1();
    // this.tutorialData = this.createSpeechSynthesesAdvancedTutorial_2();
    // this.tutorialData = this.createSpeechRecognitionBasicTutorial_1();
    // this.tutorialData = this.createSpeechRecognitionAdvancedTutorial_2();
    this.editorDataSubject = new BehaviorSubject<EditorData>(this.tutorialData);
    this.editorDataSubject.subscribe((data) => this.tutorialData = data);
  }

  createTemplate(html: string, js: string) {
    return beautify.html(
      `<html lang="de">
        <head>
          <title>Output</title>
          <link rel="stylesheet" href="./../../assets/iframe.css">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
        </head>
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
      const playButton = document.getElementById('playButton');
      const pauseButton = document.getElementById('pauseButton');
      const textInput = document.getElementById('textInput');
      const speakerStatus = document.getElementById('status');

      // init SpeechSynth API
      const speaker = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();

      // listen if something was typed in the input-field
      textInput.addEventListener('keyup', function () {
        if (textInput.value !== '') {
          playButton.disabled = false;
        }
      });

      // listen if something was copied in the input-field
      textInput.onchange = function() {
        if (textInput.value !== '') {
          playButton.disabled = false;
        }
      }

      // event handlers from the SpeechSynthesisUtterance
      utterance.onstart = function(event) {
        console.log('onstart');
        speakerStatus.innerHTML = 'Speaking Started';
        pauseButton.disabled = false;
      }

      utterance.onend = function(event) {
        console.log('onend');
        speakerStatus.innerHTML = 'Speaking Finished';
        pauseButton.disabled = true;
      }

      utterance.onpause = function(event) {
        console.log('onpause');
        speakerStatus.innerHTML = 'Speaking Paused';
        pauseButton.innerHTML = 'Resume';
      }

      utterance.onresume = function(event) {
        console.log('onresume');
        speakerStatus.innerHTML = 'Speaking Resumed';
        pauseButton.innerHTML = 'Pause';
      }

      utterance.onerror = function(event) {
        console.log('onerror');
        speakerStatus.innerHTML = 'Error';
        pauseButton.disabled = true;
        speaker.cancel();
      }

      // main function, that uses the WebSpeech API
      function speakText() {
        utterance.text = textInput.value;
        // start speaking
        speaker.speak(utterance);
      }

      // listener thats checks if the input contains text
      playButton.addEventListener('click', () => {
        if (textInput.value !== '') {
          speakText(textInput.value);
        }
      });

      // listener to pause the speaking
      pauseButton.addEventListener('click', () => {
        if (speaker.speaking) {
          speaker.pause();
          pauseButtoninnerHTML = 'Resume';
        }
        if (speaker.paused) {
          speaker.resume();
        }
      });`);
  }

  private createHTMLForSpeechSynthesesBasicTutorial_1(): string {
    return beautify.html(
      `<div class="container">
        <h1 class="h1 pt-2 text-center">SpeechSynthesis: Basic</h1>
        <div class="row row-eq-height mt-3 mb-3">
          <div class="col-md-6">
            <div class="card d-flex h-100">
              <div class="card-header">
                  <label for="informationTextarea" class="fw-500 fs-2">Information</label>
                </div>
                <div class="card-body">
                  <textarea readonly class="form-control" rows="11" id="informationTextarea">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</textarea>
                </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card d-flex h-100">
              <div class="card-header">
                <label class="fw-500 fs-2">Output</label>
              </div>
              <div class="card-body">
                <div class="container-fluid">
                  <div class="row">
                    <input class="form-control" id="textInput" type="text" placeholder="Eingabe des Textes">
                  </div>
                  <div class="row mt-4 ">
                    <div class="col ps-0 mx-0 d-grid">
                      <button disabled class="btn btn-lg btn-primary btn-block fw-bold" id="playButton" type="button">Play</button>
                    </div>
                    <div class="col pe-0 mx-0 d-grid">
                      <button disabled class="btn btn-lg btn-primary btn-block fw-bold" id="pauseButton">Pause</button>
                    </div>
                  </div>
                  <div class="row mt-4">
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

  private createSpeechSynthesesBasicTutorial_1() {
    return new EditorData(this.createHTMLForSpeechSynthesesBasicTutorial_1(),
      this.createJSForSpeechSynthesesBasicTutorial_1());
  }

  private createJSForSpeechSynthesesAdvancedTutorial_2() {
    return beautify.js(`
      const textInput = document.getElementById('textInput');
      const rate = document.getElementById('rate');
      const pitch = document.getElementById('pitch');
      const rateBadge = document.getElementById('rateValue');
      const pitchBadge = document.getElementById('pitchValue');
      const languageContainer = document.getElementById('languageContainer');

      const playButton = document.getElementById('playButton');
      const speakerStatus = document.getElementById('status');

      // init SpeechSynth API
      const speaker = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();

      // creates the options elements for the languages
      function createLanguageOptions() {
        const voices = speaker.getVoices();
        for(let i = 0; i < voices.length; i++) {
          voice = voices[i];
          const option = new Option(voice.name, voice.name);
          languageContainer.appendChild(option);
        }
      }

      // helper function that is used to start speaking again, but with the changed values
      function startSpeakingOnChanges(){
        if(speaker.speaking) {
          // cancel the speaking to start again with the changed values
          speaker.cancel();
          speakText();
        }
      }

      // loading the voices on start
      window.addEventListener('load', function() {
        createLanguageOptions();
      });

      // listen if something was typed
      textInput.addEventListener('keyup', function () {
        if (textInput.value !== '') {
          playButton.disabled = false;
        }
      });

      // listen if something was copied in the text-input
      textInput.onchange = function() {
        if (textInput.value !== '') {
          playButton.disabled = false;
        }
      }

      languageContainer.addEventListener('change', function() {
        startSpeakingOnChanges();
      });

      // display the rate in the badge field
      rate.addEventListener('change', function () {
        rateBadge.innerHTML = rate.value;
        startSpeakingOnChanges();
      });

        // display the pitch in the badge field
      pitch.addEventListener('change', function () {
        pitchBadge.innerHTML = pitch.value;
        startSpeakingOnChanges();
      });

      // event handlers from the SpeechSynthesisUtterance
      utterance.onstart = function(event) {
        speakerStatus.innerHTML = 'Speaking Started';
      }

      utterance.onend = function(event) {
        speakerStatus.innerHTML = 'Speaking Finished';
      }

      utterance.onpause = function(event) {
        speakerStatus.innerHTML = 'Speaking Paused';
      }

      utterance.onresume = function(event) {
        speakerStatus.innerHTML = 'Speaking Resumed';
      }

      // main function, that uses the WebSpeech API
      function speakText() {
        // get selected voice
        const selectedVoice = languageContainer.options[languageContainer.selectedIndex];
        let voice = null;
        speaker.getVoices().forEach(v => {
          if (v.name === selectedVoice.value) {
            voice = v;
          }
        });

        // assign values from the inputs
        utterance.voice = voice;
        utterance.text = textInput.value;
        utterance.rate = rate.value;
        utterance.pitch = pitch.value;
        // start speaking
        speaker.speak(utterance);
      }

      playButton.addEventListener('click', () => {
        if (textInput.value !== '') {
          speakText();
        }
      });`
    );
  }

  private createHTMLForSpeechSynthesesAdvancedTutorial_2() {
    return beautify.html(
      `<div class="container">
        <h1 class="h1 pt-2 text-center">SpeechSynthesis: SpeechSynthesisUtterance</h1>
        <div class="row row-eq-height mt-3 mb-3">
          <div class="col-md-6 col-xxl-4">
            <div class="card d-flex h-100">
              <div class="card-header">
                  <label for="informationTextarea" class="fw-500 fs-2">Information</label>
                </div>
                <div class="card-body">
                  <textarea readonly class="form-control" rows="11" id="informationTextarea">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</textarea>
                </div>
            </div>
          </div>
          <div class="col-md-6 col-xxl-4">
            <div class="card d-flex h-100">
              <div class="card-header">
                <label class="form-label fw-500 fs-2">Speech-Manipulation</label>
              </div>
              <div class="card-body">
                <input class="form-control" id="textInput" type="text" placeholder="Eingabe des Textes">
                <div class="mt-3">
                  <label for="rate">Rate</label>
                  <input type="range" id="rate" min="0.5" max="1.5" value="1" step="0.1" class="form-range">
                  <span class="badge bg-primary float-end" id="rateValue">1</span>
                </div>
                <div class="mt-4">
                  <label for="pitch">Pitch</label>
                  <input type="range" id="pitch" min="0.5" max="1.5" value="1" step="0.1" class="form-range">
                  <span class="badge bg-primary float-end" id="pitchValue">1</span>
                </div>
                <div class="mt-3">
                  <label for="language-container" class="form-label">Voices</label>
                  <select name="Language" class="form-select" id="languageContainer"></select>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-xxl-4">
            <div class="card d-flex h-100">
              <div class="card-header">
                <label class="fw-500 fs-2">Output</label>
              </div>
              <div class="card-body">
                <div class="mt-3 mb-3 d-grid">
                  <button disabled class="btn btn-lg btn-primary btn-block fw-bold" id="playButton" type="button">Play</button>
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

  private createSpeechSynthesesAdvancedTutorial_2() {
    return new EditorData(this.createHTMLForSpeechSynthesesAdvancedTutorial_2(),
      this.createJSForSpeechSynthesesAdvancedTutorial_2());
  }

  private createHTMLForSpeechRecognitionBasicTutorial_1() {
    return beautify.html(`
        <div class="container">
            <h1 class="h1 pt-2 text-center">SpeechRecognition: Basic</h1>
            <div class="row mb-4 mt-3">
                <div class="col-lg-6">
                    <div class="card d-flex h-100">
                        <div class="card-header">
                            <label for="informationTextarea" class="fw-500 fs-2">Information</label>
                        </div>
                        <div class="card-body">
                            <textarea readonly class="form-control" rows="11" id="informationTextarea">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</textarea>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
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

    // init SpeechRecognition API
    const recognition = new webkitSpeechRecognition();
    var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
    recognition.grammars = new SpeechGrammarList();

    // tracking of the recognition
    let recognizing;

    // helper function to disable the recognition
    function reset() {
      recognizing = false;
      recognitionButton.innerHTML = 'Start Recognition';
    }

    // loads the languages and the alternatives in a dropdown
    window.addEventListener('load', function () {
      recognition.lang = languageContainer.options[languageContainer.selectedIndex].value;
      recognition.maxAlternatives = parseInt(maxAlternativesContainer.options[maxAlternativesContainer.selectedIndex].value);
    });

    // assign the language that needs to recognized
    languageContainer.onchange = function () {
      recognition.lang = languageContainer.options[languageContainer.selectedIndex].value;
    }

    // assign the language that needs to recognized
    maxAlternativesContainer.onchange = function () {
      recognition.maxAlternatives = parseInt(maxAlternativesContainer.options[maxAlternativesContainer.selectedIndex].value);
    }

    // disables and enables the dropdown of the property maxAlternative Result, based on the checkboxes
    function disableMaxAlternativeContainer() {
      if (continuousCheckbox.checked || interimResultsCheckbox.checked) {
        maxAlternativesContainer.disabled = true;
        recognition.maxAlternatives = 1;
        maxAlternativesContainer.selectedIndex = 0;
      } else {
        maxAlternativesContainer.disabled = false;
      }
    }

    // assign the recognition.continuous value, to continue the recognition after the speaking stoppped
    continuousCheckbox.onchange = function () {
      recognition.continuous = continuousCheckbox.checked;
      disableMaxAlternativeContainer();
    }

    // assign the recognition.interimResults value, to allow interim results
    interimResultsCheckbox.onchange = function () {
      recognition.interimResults = interimResultsCheckbox.checked;
      disableMaxAlternativeContainer();
    }

    // onstart EventHandler for the SpeechRecognition
    recognition.onstart = function () {
      console.log('Recognition started');
    }

    // handle recognition error
    recognition.onerror = function (event) {
      status.innerHTML = event.error;
      status.style = 'color: red;';
    }

    // helper function, that set the speech alternatives
    function setResultAlternatives(alternatives) {
      if (alternatives) {
        for(let i = 0; i < alternatives.length; i++) {
          const item = document.createElement('li');
          item.classList.add('list-group-item');
          item.innerHTML = alternatives[i].transcript;
          alternativesContainer.appendChild(item);
        }
      }
    }

    // helper function, that resets the alternative list
    function removeResultAlternatives() {
      while(alternativesContainer.firstChild) {
        alternativesContainer.removeChild(alternativesContainer.lastChild);
      }
    }

    // onresult EventHandler for the SpeechRecognition
    recognition.onresult = function (event) {
      let interimResult = "";
      let endResult = "";

      // loop over all results
      for(let i = 0; i < event.results.length; ++i) {
        // check if result is end result
        if(event.results[i].isFinal) {
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
      if(continuousCheckbox.checked || interimResultsCheckbox.checked) {
        console.log('should set only one list item');
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        item.innerHTML = 'It doesn\\'t make sense to display alternative results, if one of the checkboxes (interim results or continuous) is checked. You would get a really long list, that contains a lot of repetitions.';
        alternativesContainer.appendChild(item);
        console.log(alternativesContainer);
      }
    }

    // listener for the button, that starts the recognition
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

  private createSpeechRecognitionBasicTutorial_1():EditorData {
    return new EditorData(this.createHTMLForSpeechRecognitionBasicTutorial_1(),
      this.createJSForSpeechRecognitionBasicTutorial_1());
  }

  // private createHTMLForSpeechRecognitionAdvancedTutorial_2() {
  //   return beautify.html(`
  //       <div class="container">
  //           <h1 class="h1 pt-2 text-center">SpeechRecognition: SpeechGrammar</h1>
  //           <div class="row mb-4 mt-3">
  //               <div class="col-lg-6">
  //                   <div class="card d-flex h-100">
  //                       <div class="card-header">
  //                           <label for="informationTextarea" class="fw-500 fs-2">Information</label>
  //                       </div>
  //                       <div class="card-body">
  //                           <textarea readonly class="form-control" rows="11" id="informationTextarea">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</textarea>
  //                       </div>
  //                   </div>
  //               </div>
  //               <div class="col-lg-6">
  //                   <div class="card">
  //                       <div class="card-header">
  //                           <label class="fw-500 fs-2">Recognition of Words</label>
  //                       </div>
  //                       <div class="card-body">
  //                           <div class="container-fluid">
  //                               <div class="row">
  //                                   <div class="col my-auto">
  //                                       <div class="form-check form-switch">
  //                                           <label for="continuousValue" class="form-check-label">Use custom SpeechGrammar</label>
  //                                           <input type="checkbox" class="form-check-input" role="switch" id="customSpeechGrammarCheckbox">
  //                                       </div>
  //                                   </div>
  //                               </div>
  //                               <div class="row">
  //                                   <div class="col">
  //                                       <hr>
  //                                   </div>
  //                               </div>
  //                               <div class="row">
  //                                   <div class="col">
  //                                       <label for="interimResultsTextArea" class="fw-500 fs-4">Custom Color SpeechGrammar with Weight 1</label>
  //                                       <textarea readonly class="form-control" name="InterimResults" id="customColorSpeechGrammarTextArea" rows="4">#JSGF V1.0; grammar colors; public <color> = kushida | Crush | blue | violet | red | green | grey | deepSkyBlue;
  //                                       </textarea>
  //                                       <div class="mt-3">
  //                                         <label for="interimResultsTextArea" class="fw-500 fs-4">Color SpeechGrammar with Weight 0.5</label>
  //                                         <textarea readonly class="form-control" name="InterimResults" id="colorSpeechGrammarTextArea" rows="4">#JSGF V1.0; grammar colors; public <color> = deepSkyBlue | dodgerBlue | darkSlateBlue | lightSkyBlue | lightBlue | lightSteelBlue | mediumVioletRed | blueViolet | darkViolet | indianRed | orangeRed | seaGreen | springGreen | yellowGreen | darkGrey | darkSlateGrey | grimGrey;
  //                                         </textarea>
  //                                       </div>
  //                                   </div>
  //                               </div>
  //                               <div class="row">
  //                                   <div class="col">
  //                                       <hr>
  //                                   </div>
  //                               </div>
  //                               <div class="row">
  //                                   <div class="col">
  //                                       <label class="fw-500 fs-4">Output</label>
  //                                       <div class="container-fluid text-center mt-2 p-5 d-flex justify-content-center align-items-center border border-1 border-dark" id="outputContainer">Choose a color, that doesn't appear in the custom SpeechGrammar Area</div>
  //                                   </div>
  //                               </div>
  //                               <div class="row">
  //                                   <div class="col">
  //                                       <hr>
  //                                   </div>
  //                               </div>
  //                               <div class="row">
  //                                   <div class="col">
  //                                       <div class="d-flex justify-content-between">
  //                                           <span class="fw-500 fs-4">Status (Error Code):</span>
  //                                           <span class="fw-500 fs-4" id="status" style="color: green">No Error</span>
  //                                       </div>
  //                                   </div>
  //                               </div>
  //                               <div class="row">
  //                                   <div class="col">
  //                                       <hr>
  //                                   </div>
  //                               </div>
  //                               <div class="row">
  //                                   <div class="col d-grid">
  //                                       <button class="btn btn-primary fw-bold fs-3" id="recognitionButton">Start Recognition</button>
  //                                   </div>
  //                               </div>
  //                           </div>
  //                       </div>
  //                   </div>
  //               </div>
  //           </div>
  //       </div>
  //   `);
  // }
  //
  // private createJSForSpeechRecognitionAdvancedTutorial_2() {
  //   return beautify.js(`
  //     const customSpeechGrammarCheckbox = document.getElementById('customSpeechGrammarCheckbox');
  //     const customColorSpeechGrammarTextArea = document.getElementById('customColorSpeechGrammarTextArea');
  //     const colorSpeechGrammarTextArea = document.getElementById('colorSpeechGrammarTextArea');
  //     const outputContainer = document.getElementById('outputContainer');
  //     const status = document.getElementById('status');
  //
  //     // init SpeechRecognition API
  //     var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  //     const recognition = new SpeechRecognition();
  //     recognition.lang = 'de_DE';
  //     recognition.maxAlternatives = 1;
  //     recognition.interimResults = false;
  //     recognition.continuous = false;
  //
  //     // init SpeechGrammar
  //     var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
  //     const grammars = new SpeechGrammarList();
  //     // grammars.addFromString(colorSpeechGrammarTextArea.value, 0.5);
  //     // recognition.grammars = grammars;
  //
  //     // tracking of the recognition
  //     let recognizing;
  //
  //     customSpeechGrammarCheckbox.onchange = function () {
  //       if (customSpeechGrammarCheckbox.checked) {
  //         const grammarList = new SpeechGrammarList();
  //         // grammarList.addFromString(colorSpeechGrammarTextArea.value, 0.5);
  //         grammarList.addFromString(customColorSpeechGrammarTextArea.value, 1);
  //         recognition.grammars = grammarList;
  //       }
  //     }
  //
  //     // helper function to disable the recognition
  //     function reset() {
  //       recognizing = false;
  //       recognitionButton.innerHTML = 'Start Recognition';
  //     }
  //
  //     // onstart EventHandler for the SpeechRecognition
  //     recognition.onstart = function () {
  //       console.log('Recognition started');
  //     }
  //
  //     // handle recognition error
  //     recognition.onerror = function (event) {
  //       status.innerHTML = event.error;
  //       status.style = 'color: red;';
  //     }
  //
  //     // onresult EventHandler for the SpeechRecognition
  //     recognition.onresult = function (event) {
  //       let endResult = "";
  //
  //       // loop over all results
  //       for(let i = 0; i < event.results.length; ++i) {
  //         // check if result is end result
  //         if(event.results[i].isFinal) {
  //           console.log(recognition.grammars);
  //           endResult += event.results[i][0].transcript;
  //           endResult += ' with Confidence ' + event.results[i][0].confidence;
  //         }
  //       }
  //       outputContainer.innerHTML = endResult;
  //     }
  //
  //     // onend EventHandler for the SpeechRecognition
  //     recognition.onend = function () {
  //       reset();
  //     }
  //
  //     // listener for the button, that starts the recognition
  //     recognitionButton.addEventListener('click', function () {
  //       if (recognizing) {
  //         recognition.stop();
  //         reset();
  //       } else {
  //         recognition.start();
  //         // reset ui elements
  //         status.innerHTML = 'No Error';
  //         status.style = 'color: green;';
  //         recognizing = true;
  //         recognitionButton.innerHTML = 'Stop Recognition';
  //       }
  //     });`);
  // }
  //
  // private createSpeechRecognitionAdvancedTutorial_2():EditorData {
  //   return new EditorData(this.createHTMLForSpeechRecognitionAdvancedTutorial_2(),
  //     this.createJSForSpeechRecognitionAdvancedTutorial_2());
  // }

  ngOnDestroy(): void {
    this.editorDataSubject?.unsubscribe();
  }
}
