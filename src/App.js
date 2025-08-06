import React, { useState, useRef } from "react";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useCamera, setUseCamera] = useState(false);

  const videoRef = useRef(null);

  // Démarrer la caméra
  const startCamera = async () => {
    setUseCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Erreur caméra :", error);
      alert("Impossible d'accéder à la caméra");
    }
  };

  // Capturer une photo (directement, sans traitement)
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0);

    canvas.toBlob((blob) => {
      setSelectedImage(new File([blob], "capture.jpg", { type: "image/jpeg" }));
      setUseCamera(false);

      // Arrêter la caméra
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }, "image/jpeg");
  };

  // Upload fichier classique
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setPrediction(null);
    }
  };

  // Envoi vers l'API Flask
  const sendToApi = async () => {
    if (!selectedImage) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];
      setLoading(true);
      try {
        const res = await fetch("https://skindetectionapi-1.onrender.com/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_base64: base64Image }),
        });
        const data = await res.json();
        setPrediction(data);
      } catch (error) {
        console.error("Erreur API:", error);
        alert("Erreur lors de l'appel API !");
      }
      setLoading(false);
    };
    reader.readAsDataURL(selectedImage);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Skin Lesion Detection</h1>

      {!useCamera && (
        <>
          <button onClick={startCamera}>📷 Prendre une photo</button>
          <p>ou</p>
          <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
        </>
      )}

      {useCamera && (
        <div style={{ marginTop: 20 }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            width="300"
            height="225"
            style={{ border: "1px solid #ccc" }}
          />
          <div style={{ marginTop: 10 }}>
            <button onClick={capturePhoto}>Capturer</button>
          </div>
        </div>
      )}

      {selectedImage && !useCamera && (
        <div style={{ marginTop: 20 }}>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            style={{ width: 300, border: "1px solid #ccc" }}
          />
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <button onClick={sendToApi} disabled={loading || !selectedImage}>
          {loading ? "Analyse en cours..." : "Envoyer à l'API"}
        </button>
      </div>

      {prediction && (
        <div style={{ marginTop: 20 }}>
          <h2>Résultat</h2>
          <p>
            <strong>Classe :</strong> {prediction.class_name}
          </p>
          <p>
            <strong>Confiance :</strong> {(prediction.confidence * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
