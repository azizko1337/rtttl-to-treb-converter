function rtttlToTreb(rttl) {
  let [name, settings, notes] = rttl.split(":");

  settings = settings.split(",");
  let defaultDuration = +settings[0].split("=")[1].trim();
  const defaultOctave = +settings[1].split("=")[1].trim();
  let bpm = settings[2].split("=")[1].trim();
  while (bpm.length < 3) bpm = "0" + bpm;

  let treb = bpm + "\n";
  notes = notes.split(",");
  notes.forEach((note) => {
    let duration = defaultDuration;
    let noteTreb;
    let octave = defaultOctave;
    let half = false;

    note = note.trim();
    note = note.split("");

    //duration handle
    if (note[0] >= "0" && note[0] <= "9" && note[1] >= "0" && note[1] <= "9") {
      duration = +(note[0] + note[1]);

      note.shift();
      note.shift();
    }
    if (note[0] >= "0" && note[0] <= "9") {
      duration = +note[0];

      note.shift();
    }

    switch (duration) {
      case 1:
        duration = 0;
        break;
      case 2:
        duration = 1;
        break;
      case 4:
        duration = 2;
        break;
      case 8:
        duration = 3;
        break;
      case 16:
        duration = 4;
        break;
      case 32:
        duration = 5;
        break;
    }

    //node handle
    if (note[0].toUpperCase() == "P") {
      treb += `&,${duration}\n`;
      return;
    } else {
      noteTreb = note[0].toUpperCase();
      if (noteTreb == "B") noteTreb = "H";

      note.shift();
      if (note[0] == "#") {
        half = true;
        note.shift();
      }
    }

    //octave handle
    if (note[0] >= "0" && note[0] <= "9") {
      octave = +note[0];
      note.shift();
    }

    //treb write
    if (half) {
      treb += `${noteTreb}IS,${octave},${duration}\n`;
    } else {
      treb += `${noteTreb},${octave},${duration}\n`;
    }

    if (note[0] == ".") {
      if (half) {
        treb += `${noteTreb}IS,${octave},${duration + 1}\n`;
      } else {
        treb += `${noteTreb},${octave},${duration + 1}\n`;
      }
    }
  });

  treb += "#";
  return {
    name,
    treb,
  };
}

export default rtttlToTreb;
