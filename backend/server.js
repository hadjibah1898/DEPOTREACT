require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

// Schéma et Modèle MongoDB
const FormDataSchema = new mongoose.Schema({
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
});

const FormData = mongoose.model('FormData', FormDataSchema);

// Route POST pour la soumission du formulaire
app.post('/api/form', async (req, res) => {
  try {
    const newFormData = new FormData(req.body);
    await newFormData.save();
    res.status(201).json({ message: 'Données du formulaire enregistrées avec succès !' });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    res.status(400).json({ message: "Erreur lors de l'enregistrement des données.", error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
    try {
        const allFormData = await FormData.find();
        res.status(200).json(allFormData);
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des données.", error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
