import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const App = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [landmarker, setLandmarker] = useState(null);
  const [expression, setExpression] = useState("Neutral");

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
      
      setLandmarker(reader);
    };

    initLandmarker();
  }, []);

  // 2. Start Webcam
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictWebcam);
      });
    }
  }, [landmarker]);

  // 3. Prediction Logic
  const predictWebcam = async () => {
    if (landmarker && videoRef.current) {
      let startTimeMs = performance.now();
      const results = await landmarker.detectForVideo(videoRef.current, startTimeMs);

      if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
        processExpressions(results.faceBlendshapes[0].categories);
      }
    }
    requestAnimationFrame(predictWebcam);
  };

  // 4. Map Blendshapes to Human Emotions
  const processExpressions = (blendshapes) => {
    const scores = {};
    blendshapes.forEach((shape) => {
      scores[shape.categoryName] = shape.score;
    });

    // Simple Logic for detection
    if (scores["mouthSmileLeft"] > 0.5 || scores["mouthSmileRight"] > 0.5) {
      setExpression("Smiling! 😊");
    } else if (scores["browInnerUp"] > 0.3) {
      setExpression("Surprised! 😲");
    } else if (scores["eyeBlinkLeft"] > 0.4 && scores["eyeBlinkRight"] > 0.5) {
      setExpression("Blinking/Eyes Closed");
    } else if ((scores["browInnerUp"] > 0.2 && (scores["mouthFrownLeft"] > 0.1 || scores["mouthFrownRight"] > 0.02)) 
                || scores["mouthPucker"] > 0.009){

       setExpression("Sad");
      
    }  else {
      setExpression("Neutral 😐");
    }
  };

  return (
    <div style={{ position: "relative", textAlign: "center", marginTop: "20px" }}>
      <h2>Current Expression: {expression}</h2>
      
      <div style={{ position: "relative", display: "inline-block" }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "640px", height: "480px", borderRadius: "10px", background: "#000" }}
        />
        {/* Overlay Canvas if you want to draw the mesh later */}
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
        />
      </div>
    </div>
  );
};

export default App;