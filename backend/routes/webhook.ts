// backend/routes/webhook.ts
import express from 'express';

const router = express.Router();

const VERIFY_TOKEN = 'xsender_verify_token'; // энэ чинь Facebook дээрх Verify Token-той ижил байна

// Messenger webhook verification
router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verified by Facebook');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Placeholder for POST events
router.post('/', (req, res) => {
  console.log('📨 Received POST:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

export default router;
