let synth = new Tone.Synth().toMaster();
synth.volume.value = -12;
synth.oscillator.type = 'sine';
let n = "32n";

const notes = [
  'C3', 'D3', 'E3', 'G3', 'A3',
  'C4', 'D4', 'E4', 'G4', 'A4',
  'C5', 'D5', 'E5', 'G5', 'A5'
];

function playSound(note) {
  synth.triggerAttackRelease(note, n);
}

function letsPlaySomeMusic() {
  if (mouseX < width / 2 && mouseY < height) {
    let current = grid[floor(mouseX / scl)][floor(mouseY / scl)];
    let note = floor(map(current, 0, 1, 0, notes.length));
    playSound(notes[note]);
  }
}