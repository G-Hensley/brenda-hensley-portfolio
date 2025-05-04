import express from 'express';
import Cert from '../models/cert.js';

// Create a router to handle cert routes
const router = express.Router();

// Get all certs - Public Route
router.get('/', async (req, res) => {
    // Try to get all certs from the database
    try {
        const certs = await Cert.find();
        res.status(200).json({ message: 'Certs fetched successfully', certs });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching certs', error: error.message });
    }
});

// Create a new cert - Admin Route
router.post('/admin', async (req, res) => {
  // Get the cert data from the request body
    const { certName, certImage, description, dateAcquired } = req.body;

    // Try to create a new cert
    try {
        const newCert = new Cert({ certName, certImage, description, dateAcquired });
        const savedCert = await newCert.save();
        res.status(201).json({ message: 'Cert added successfully', cert: savedCert });
    } catch (error) {
        res.status(500).json({ message: 'Error creating cert', error: error.message });
    }
});

// Update a cert by id - Admin Route
router.put('/admin/:id', async (req, res) => {
  // Get the cert data from the request body
    const { certName, certImage, description, dateAcquired } = req.body;

    // Try to update the cert
    try {
        const updatedCert = await Cert.findByIdAndUpdate(req.params.id, { certName, certImage, description, dateAcquired }, { new: true });
        res.status(200).json(updatedCert);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cert', error: error.message });
    }
});

// Delete a cert by id - Admin Route
router.delete('/admin/:id', async (req, res) => {
  // Get the cert id from the request params
    const { id } = req.params;

    // Try to delete the cert
    try {
        await Cert.findByIdAndDelete(id);
        res.status(200).json({ message: 'Cert deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cert', error: error.message });
    }
});

// Export the router
export default router;
