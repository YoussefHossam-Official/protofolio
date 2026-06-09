const express = require('express');
const https = require('https');
const router = express.Router();

// POST /api/github/refresh — 3ashan yrg3 y3ml deploy lel site
// bst5dm Vercel Deploy Hook law mawgod fel env
router.post('/refresh', (req, res) => {
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK;
  if (!hookUrl) return res.json({ success: false, message: 'm4 m3yyn VERCEL_DEPLOY_HOOK fe el env' });
  https.get(hookUrl, () => {
    res.json({ success: true, message: 'triggered redeploy' });
  }).on('error', (e) => {
    res.status(500).json({ error: e.message });
  });
});

// POST /api/github/webhook — byst2bl webhook mn GitHub
router.post('/webhook', (req, res) => {
  // law fe deploy hook, nsh3ro
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK;
  if (hookUrl) {
    https.get(hookUrl).on('error', () => {});
  }
  res.json({ success: true });
});

module.exports = router;
