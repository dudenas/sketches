var synth = new Tone.MonoSynth({
  "oscillator": {
    "type": "square"
  },
  "envelope": {
    "attack": 0.1
  }
}).toMaster();
// synth.triggerAttackRelease("C4", "12n");
// synth.triggerAttackRelease("C3", "4n");
synth.triggerAttackRelease("C4", "3n");
synth.volume.value = -30