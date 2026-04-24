import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { captureMood } from "./util";
import { useSong } from "../../../Home/hooks/useSong";
const FaceExpression = () => {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const latestScores = useRef({}); // Stores real-time data without re-renders
  const [expression, setExpression] = useState("Not Captured Yet");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { handleGetSong} = useSong()
  
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
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
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
      const results = await landmarkerRef.current.detectForVideo(
        videoRef.current,
        startTimeMs
      );

      if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
        const scores = {};
        results.faceBlendshapes[0].categories.forEach((shape) => {
          scores[shape.categoryName] = shape.score;
        });
        latestScores.current = scores;
      }
    }
    requestAnimationFrame(predictWebcam);
  };

  // 3. Logic Triggered by Button Click

  const handleClick = async () =>{
    captureMood( {latestScores ,setExpression,expression})
    await handleGetSong({mood : expression})
    // console.log(expression)
  }
  

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        marginTop: "20px",
        fontFamily: "Arial",
      }}
    >
      <h2>
        Mood: <span style={{ color: "#007bff" }}>{expression}</span>
      </h2>

      <div style={{ position: "relative", display: "inline-block" }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "640px",
            height: "480px",
            borderRadius: "10px",
            background: "#000",
            transform: "scaleX(-1)",
          }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleClick}
          disabled={!isLoaded}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "none",
            color: isHovered && isLoaded ? "black" : "white", // Text turns black on hover if enabled
            transition: "all 0.3s ease", // Makes the color change smooth
            cursor: isLoaded ? "pointer" : "not-allowed",

            backgroundColor: !isLoaded
              ? "#6c757d"
              : isHovered
              ? "#218838"
              : "green",

            transform: isHovered && isLoaded ? "scale(1.05)" : "scale(1)",
          }}
        >
          {isLoaded ? "Detect Face Mood" : "Loading Model..."}
        </button>
      </div>
    </div>
  );
};

export default FaceExpression;
