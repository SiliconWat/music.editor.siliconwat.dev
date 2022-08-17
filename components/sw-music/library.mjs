export const ORIGIN = window.location.hostname === '127.0.0.1' ? "http://127.0.0.1:5508" : "https://music.siliconwat.com"

export class MusicLibrary {
    static #getC0(A4) {
        for (let i = 0; i < 12*4 + 9; i++) {
            A4 /= 2**(1/12)
        }
        return A4
    }

    static #frequencyTable(A4) {
        let frequency = MusicLibrary.#getC0(A4);
        const frequencyTable = []
        const notes = ["C", "C♯|D♭", "D", "D♯|E♭", "E", "F", "F♯|G♭", "G", "G♯|A♭", "A", "A♯|B♭", "B"]
        
        for (let i = 0; i < 8; i++) {
            frequencyTable.push({})
            for (let j = 0; j < 12; j++) {
                frequencyTable[i][notes[j]] = frequency
                frequency *= 2**(1/12)
            }
        }
        
        return frequencyTable
    }

    #chromaticTable
    #enharmonicNotes = {
        "C♯": "C♯|D♭",
        "D♭": "C♯|D♭",
        "D♯": "D♯|E♭",
        "E♭": "D♯|E♭",
        "F♯": "F♯|G♭",
        "G♭": "F♯|G♭",
        "G♯": "G♯|A♭",
        "A♭": "G♯|A♭",
        "A♯": "A♯|B♭",
        "B♭": "A♯|B♭"
    }
    #solfege = {
        C: "Do",
        "C♯": "Di",
        "D♭": "Ra",
        D: "Re",
        "D♯": "Ri",
        "E♭": "Ma", //Me
        E: "Mi",
        F: "Fa",
        "F♯": "Fi",
        "G♭": "Se",
        G: "Sol",
        "G♯": "Si",
        "A♭": "Le", //Lo
        A: "La",
        "A♯": "Li",
        "B♭": "Te", //Ta
        B: "Ti"
    }

    constructor(A4) {
        this.#chromaticTable = MusicLibrary.#frequencyTable(A4);
        //console.log(this.#chromaticTable)
    }

    frequency(octave, note) {
        return this.#chromaticTable[octave][this.#enharmonicNotes[note] || note];
    }

    //https://en.wikipedia.org/wiki/Solf%C3%A8ge#:~:text=There%20are%20two%20current%20ways,degree%20of%20the%20major%20scale.
    solfege(octave, note) {
        return this.#solfege[note];
    }

    //https://en.wikipedia.org/wiki/American_Sign_Language#/media/File:Asl_alphabet_gallaudet.svg
    //https://commons.wikimedia.org/wiki/File:Sign_language_Z.svg
    //https://www.musictheorytutor.org/2013/03/25/solfege-hand-signs/
    asl(octave, note) {
        return `${ORIGIN}/components/sw-music/ASL/notes/${note.toLowerCase()}.svg`;
    }

    audio(octave, note) {
        const audio = new Audio(`${ORIGIN}/components/sw-music/keys/${octave}/${this.#enharmonicNotes[note] || note}.mp3`);
        audio.preload = "auto";
        audio.loop = false;

        const context = new AudioContext();
        const source = context.createMediaElementSource(audio);
        const panner = new StereoPannerNode(context, { pan: 0 }); // -1:left 0:both +1:right
        const volume = context.createGain();
        volume.gain.value = 10;
        source.connect(panner).connect(volume).connect(context.destination);

        return audio;
    }

    synth(octave, note) {
        const context = new AudioContext()
        const envelope = context.createGain()
        envelope.gain.value = 5
        envelope.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5)
        
        const oscillator = context.createOscillator()
        oscillator.type = 'triangle'
        oscillator.frequency.value = this.frequency(octave, note);
        //oscillator.frequency.linearRampToValueAtTime(this.frequency(octave, note), context.currentTime)
        //oscillator.frequency.setTargetAtTime(this.frequency(octave, note), context.currentTime, 0.5);
        oscillator.connect(envelope).connect(context.destination)
        
        return {
            play() {
                oscillator.start(0)
                oscillator.stop(context.currentTime + 1)
            }
        }
    }
}