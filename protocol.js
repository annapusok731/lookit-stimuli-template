function get_stim_names(cond) {
  const female_faces = ["Emma_Lili", "Sophie_Ava", "Olivia_Chloe", "Mia_Grace"];
  const male_faces = ["Harry_John", "Liam_Noah", "Ethan_Jack", "Mike_Jason"];

  let left_right_stim = [];

  if (cond === "same_align") {
    female_faces.forEach((pair) => {
      left_right_stim.push(["aligned/" + pair + ".png", "aligned/" + pair + ".png"]);
    });
    male_faces.forEach((pair) => {
      left_right_stim.push(["aligned/" + pair + ".png", "aligned/" + pair + ".png"]);
    });
  } else if (cond === "same_misalign") {
    female_faces.forEach((pair) => {
      left_right_stim.push(["misaligned/" + pair + ".png", "misaligned/" + pair + ".png"]);
    });
    male_faces.forEach((pair) => {
      left_right_stim.push(["misaligned/" + pair + ".png", "misaligned/" + pair + ".png"]);
    });
  } else if (cond === "diff_align") {
    female_faces.forEach((pair) => {
      left_right_stim.push([
        "aligned/" + pair + "_1.png",
        "aligned/" + pair + "_2.png"
      ]);
    });
    male_faces.forEach((pair) => {
      left_right_stim.push([
        "aligned/" + pair + "_1.png",
        "aligned/" + pair + "_2.png"
      ]);
    });
  } else if (cond === "diff_misalign") {
    female_faces.forEach((pair) => {
      left_right_stim.push([
        "misaligned/" + pair + "_1.png",
        "misaligned/" + pair + "_2.png"
      ]);
    });
    male_faces.forEach((pair) => {
      left_right_stim.push([
        "misaligned/" + pair + "_1.png",
        "misaligned/" + pair + "_2.png"
      ]);
    });
  }

  return left_right_stim;
}

function generateStudy() {
  let frames = {};
  let sequence = [];

  const conditions = ["same_align", "same_misalign", "diff_align", "diff_misalign"];
  let trialCounter = 1;

  const audioBaseURL =
    "https://raw.githubusercontent.com/annapusok731/lookit-stimuli-template/master/Lookit_audio/";
  const imgBaseURL =
    "https://raw.githubusercontent.com/annapusok731/lookit-stimuli-template/master/img/";

  for (const cond of conditions) {
    const left_right_stim = get_stim_names(cond);

    for (let iTrial = 0; iTrial < left_right_stim.length; iTrial++) {
      const trialName = "trial_" + cond + "_" + trialCounter;

      frames[trialName] = {
        kind: "exp-lookit-preferential-looking",
        id: trialName,
        baseDir: imgBaseURL,
        audio: [
          {
            type: "audio/mp4",
            src: audioBaseURL + "arethesesamediff.m4a"
          }
        ],
        leftImage: imgBaseURL + left_right_stim[iTrial][0],
        rightImage: imgBaseURL + left_right_stim[iTrial][1],
        imagePosition: "center",
        trialDuration: 8000,
        video: false,
        doRecording: true,
        recordVideo: true
      };

      sequence.push(trialName);
      trialCounter++;
    }
  }

  // Add calibration or intro frames here if needed
  return { frames, sequence };
}

function generateProtocol(child, pastSessions) {
  return generateStudy();
}
