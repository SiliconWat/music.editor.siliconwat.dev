import { SwNav } from "/components/sw-nav/element.mjs";
customElements.define("sw-nav", SwNav);

import { SwMenubar } from "/components/sw-menubar/element.mjs";
customElements.define("sw-menubar", SwMenubar);

import { SwPlayer } from "/components/sw-player/element.mjs";
customElements.define("sw-player", SwPlayer);

import { SwInstrument } from "/components/sw-instrument/element.mjs";
customElements.define("sw-instrument", SwInstrument);

import { SwEditor } from "/components/sw-editor/element.mjs";
customElements.define("sw-editor", SwEditor);

import { SwPiano } from "/components/sw-piano/element.mjs";
customElements.define("sw-piano", SwPiano);

const SWPianoElement = document.querySelector('sw-piano');
window.addEventListener('sw-instrument', event => {
    SWPianoElement.instrument = event.detail.instrument;
});

const SWEditorElement = document.querySelector('sw-editor');
window.addEventListener('sw-key', event => SWEditorElement.updateNote(event.detail.note));

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-KBM8RKHJKC');