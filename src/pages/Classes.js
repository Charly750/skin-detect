import React, { useEffect, useState } from "react";

const Classes = () => {
  const [classesData, setClassesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        console.log("Chargement des classes...");
        
        const res = await fetch("https://skindetectionapi-1.onrender.com/classes", {
          method: "GET",
       
        }); // ➜ adapte l'URL à ton API
        const data = await res.json();
        console.log("Classes data:", data);
        
        setClassesData(data);
      } catch (error) {
        console.log(error);
        console.error("Erreur lors du chargement des classes :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-4 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">
        Classes de lésions cutanées détectées
      </h2>
      <p className="text-center text-sm text-gray-500 mb-8">
        Le modèle peut commettre des erreurs. Cette application est expérimentale et ne remplace pas un avis médical.
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {classesData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
              <img
                src={item.image} // ➜ ton API doit retourner une URL locale (ex: /images/xxxxx.jpg) ou hébergée
                alt={item.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold text-indigo-600 mb-1">{item.name}</h3>
              <p className="text-sm text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classes;
