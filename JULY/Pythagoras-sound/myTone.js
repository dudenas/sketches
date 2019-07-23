const synth = new Tone.Synth({
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: 0.005,
    decay: 0.2,
    sustain: 0.5,
    release: 1
  }
})

gain = new Tone.Gain(0.2),
  notesName = 'A B C D E F G'.split(' ')
notesNumber = '3 4 5 6'.split(' ')
let noteNameIdx = 0,
  noteNumberIdx = 0,
  speed = '24n'

let note, notea, noteb

function updateNote(x, y) {
  noteNameIdx = floor(map(x, -81, 101, 0, notesName.length))
  noteNumberIdx = floor(map(y, -181, 145, 0, notesNumber.length))
  note = `${notesName[noteNameIdx]}${notesNumber[noteNumberIdx]}`
}

gain.toMaster()
synth.connect(gain)
synth.portamento = 0.05
Tone.Transport.scheduleRepeat(playNote, speed)
Tone.Transport.start()
Tone.Transport.bpm.value = 90

function playNote(time) {
  synth.triggerAttackRelease(note, speed, time);
}