import React from "react";

const classesData = [
  {
    name: "Actinic Keratosis",
    image: "/images/actinic_keratosis.jpg",
    description: "Lésion précancéreuse causée par le soleil, peut évoluer en cancer.",
  },
  {
    name: "Basal Cell Carcinoma",
    image: "/images/basal_cell_carcinoma.jpg",
    description: "Cancer cutané localisé, très fréquent, à croissance lente.",
  },
  {
    name: "Dermatofibroma",
    image: "/images/dermatofibroma.jpg",
    description: "Nodule bénin sous-cutané, souvent sans gravité.",
  },
  {
    name: "Melanoma",
    image: "/images/melanoma.jpg",
    description: "Le cancer de la peau le plus dangereux, nécessite un diagnostic précoce.",
  },
  {
    name: "Nevus",
    image: "/images/nevus.jpg",
    description: "Grain de beauté bénin, à surveiller si changement.",
  },
  {
    name: "Pigmented Benign Keratosis",
    image: "/images/pigmented_benign_keratosis.jpg",
    description: "Lésion pigmentée non cancéreuse, parfois confondue avec un mélanome.",
  },
  {
    name: "Seborrheic Keratosis",
    image: "/images/seborrheic_keratosis.jpg",
    description: "Lésion bénigne fréquente chez les personnes âgées.",
  },
  {
    name: "Squamous Cell Carcinoma",
    image: "/images/squamous_cell_carcinoma.jpg",
    description: "Cancer de la peau plus agressif, peut se propager.",
  },
  {
    name: "Vascular Lesion",
    image: "/images/vascular_lesion.jpg",
    description: "Lésion des vaisseaux sanguins, souvent bénigne.",
  },
];

const Classes = () => {
  return (
    <div className="max-w-6xl mx-auto mt-4 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">
        Classes de lésions cutanées détectées
      </h2>
      <p className="text-center text-sm text-gray-500 mb-8">
        Le modèle peut commettre des erreurs. Cette application est expérimentale et ne remplace pas un avis médical.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {classesData.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold text-indigo-600 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
