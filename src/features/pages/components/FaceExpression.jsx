import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const FaceExpression = () => {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const latestScores = useRef({}); // Stores real-time data without re-renders
  const [expression, setExpression] = useState("Not Captured Yet");
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Initialize MediaPipe Landmarker
  useEffect(() => {
    const initLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      
      const reader = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU",
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 1,
      });
      
      landmarkerRef.current = reader;
      setIsLoaded(true);
      startWebcam();
    };

    const startWebcam = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener("loadeddata", () => {
            requestAnimationFrame(predictWebcam);
          });
        }
      }
    };

    initLandmarker();
  }, []);

  // 2. Continuous Background Prediction (Zero Re-renders)
  const predictWebcam = async () => {
    if (landmarkerRef.current && videoRef.current) {
      let startTimeMs = performance.now();
      const results = await landmarkerRef.current.detectForVideo(videoRef.current, startTimeMs);

      if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
        const scores = {};
        results.faceBlendshapes[0].categories.forEach((shape) => {
          scores[shape.categoryName] = shape.score;
        });
        // Store the newest data in the Ref (no state update here)
        latestScores.current = scores;
      }
    }
    requestAnimationFrame(predictWebcam);
  };

  // 3. Logic Triggered by Button Click
  const captureMood = () => {
    const scores = latestScores.current;

    if (!scores || Object.keys(scores).length === 0) {
      setExpression("No face detected!");
      return;
    }

    // Logic Tree
    if (scores["mouthSmileLeft"] > 0.3 || scores["mouthSmileRight"] > 0.3) {
      setExpression("Smiling! 😊");
    } else if (scores["eyeBlinkLeft"] > 0.3 && scores["eyeBlinkRight"] > 0.3) {
      setExpression("Blinking/Eyes Closed");
    }else if (scores["browInnerUp"] > 0.2 || scores["jawOpen"] > 0.17) {
      setExpression("Surprised! 😲");
    }  else if (
      (scores["browInnerUp"] > 0.025 && (scores["mouthFrownLeft"] > 0.0019 || scores["mouthFrownRight"] > 0.15)) ||
      (scores["mouthPucker"] > 0.027 || scores["browInnerUp"] > 0.2)
    ) {
      setExpression("Sad 😢");
    } else {
      setExpression("Neutral 😐");
    }
  };

  return (
    <div style={{ position: "relative", textAlign: "center", marginTop: "20px", fontFamily: "Arial" }}>
      <h2>Mood: <span style={{ color: "#007bff" }}>{expression}</span></h2>
      
      <div style={{ position: "relative", display: "inline-block" }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "640px", height: "480px", borderRadius: "10px", background: "#000", transform: "scaleX(-1)" }}
        />
      </div>
      
      <div style={{ marginTop: "20px" }}>
        <button 
          onClick={captureMood}
          disabled={!isLoaded}
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            borderRadius: "8px",
            backgroundColor: isLoaded ? "green" : "blue",
            color: "white",
            border: "none",
            cursor: isLoaded ? "pointer" : "not-allowed"
          }}
        >
          {isLoaded ? "Detect Face Mood" : "Loading Model..."}
        </button>
      </div>
    </div>
  );
};

export default FaceExpression;