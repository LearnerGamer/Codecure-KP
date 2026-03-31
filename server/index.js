import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let patients = [
  {
    id: 1,
    name: "John Doe",
    gender: "Male",
    medicalHistory: "None",
    symptoms: "Chest pain",
    allergies: "None",
    temperature: "99.1",
    consciousness: "Alert",
    predictedDisease: "Acute Myocardial Infarction (Heart Attack)",
    urgencyScore: "CRITICAL",
    status: "waiting",
    heartRate: 110,
    bloodPressureSystolic: 140,
    bloodPressureDiastolic: 90,
    oxygenSaturation: 89,
    respiratoryRate: 20
  }
];

let doctors = [
  {
    id: 1,
    name: "Dr. Smith",
    department: "Cardiology",
    available: true,
    schedule: []
  }
];

let nextPatientId = 2;
let nextDoctorId = 2;

// Patients Endpoints
app.get('/api/patients', (req, res) => {
  res.json(patients);
});

app.post('/api/patients', (req, res) => {
  const patient = { id: nextPatientId++, ...req.body };
  patients.push(patient);
  res.status(201).json(patient);
});

app.put('/api/patients/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Patient not found' });
  }
  const updatedPatient = { ...patients[index], ...req.body, id };
  patients[index] = updatedPatient;
  res.json(updatedPatient);
});

app.delete('/api/patients/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  patients = patients.filter((p) => p.id !== id);
  res.status(204).send();
});

// Doctors Endpoints
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

app.post('/api/doctors', (req, res) => {
  const doctor = { id: nextDoctorId++, ...req.body };
  doctors.push(doctor);
  res.status(201).json(doctor);
});

// AI Predict Endpoint
app.post('/api/ai/predict', (req, res) => {
  // Can just echo back since frontend currently uses local predict
  res.json({ message: "Prediction complete", result: req.body });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
