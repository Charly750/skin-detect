import React, { useState, useRef } from "react";

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useCamera, setUseCamera] = useState(false);

  const videoRef = useRef(null);

  const startCamera = async () => {
    setUseCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      alert("Impossible d'accéder à la caméra");
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 128, 128);
    canvas.toBlob((blob) => {
      setSelectedImage(new File([blob], "capture.jpg", { type: "image/jpeg" }));
      setUseCamera(false);
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }, "image/jpeg");
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setSelectedImage(e.target.files[0]);
      setPrediction(null);
    }
  };

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
        alert("Erreur lors de l'appel API !");
      }
      setLoading(false);
    };
    reader.readAsDataURL(selectedImage);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-8">
      <h1 className="text-2xl font-bold text-center mb-2 text-indigo-600">
        Détection de lésions cutanées
      </h1>
      <p className="text-center text-sm text-gray-600 mb-6">
        Cette application expérimentale utilise un modèle d'intelligence artificielle pour détecter
        différentes classes de lésions cutanées à partir d’une photo. Elle peut commettre des erreurs et ne remplace pas une consultation médicale.
      </p>

      {!useCamera && (
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={startCamera}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            📷 Prendre une photo
          </button>
          <p className="text-gray-500 text-sm">ou</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm"
          />
        </div>
      )}

      {useCamera && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            width="300"
            height="225"
            className="border rounded"
          />
          <button
            onClick={capturePhoto}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Capturer
          </button>
        </div>
      )}

      {selectedImage && !useCamera && (
        <div className="mt-6 flex justify-center">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="w-64 h-auto border rounded"
          />
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={sendToApi}
          disabled={loading || !selectedImage}
          className={`px-6 py-2 rounded text-white ${
            loading || !selectedImage
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Analyse en cours..." : "Envoyer à l'API"}
        </button>
      </div>

      {prediction && (
        <div className="mt-8 text-center bg-gray-50 p-4 rounded">
          <h2 className="text-lg font-semibold text-gray-700">Résultat</h2>
          <p className="mt-2 text-gray-800">
            <strong>Classe :</strong> {prediction.class_name}
          </p>
          <p className="text-gray-800">
            <strong>Confiance :</strong> {(prediction.confidence * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
