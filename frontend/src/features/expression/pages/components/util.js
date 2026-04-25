export const captureMood = ( {latestScores, setExpression} ) => {
    const scores = latestScores.current;
    let detectMood = "neutral"

    if (!scores || Object.keys(scores).length === 0) {
      setExpression("No face detected!");
      return;
    }

    // Logic Tree
    if (scores["mouthSmileLeft"] > 0.3 || scores["mouthSmileRight"] > 0.3) {
      detectMood = "happy"
      // setExpression("happy");
    // } else if (scores["eyeBlinkLeft"] > 0.3 && scores["eyeBlinkRight"] > 0.3) {
    //   setExpression("Blinking/Eyes Closed");
    } else if (scores["browInnerUp"] > 0.2 || scores["jawOpen"] > 0.17) {
      detectMood = "surprised"
      // setExpression("surprised");
    } else if (
      (scores["browInnerUp"] > 0.009 &&
        (scores["mouthFrownLeft"] > 0.0019 ||
          scores["mouthFrownRight"] > 0.015)) ||
      scores["mouthPucker"] > 0.027 ||
      scores["browInnerUp"] > 0.2
    ) {
      detectMood = "sad"
      // setExpression("sad");
    } else {
      detectMood = "neutral"
      // setExpression("neutral");
    }

    setExpression(detectMood)

    return detectMood

    

  };