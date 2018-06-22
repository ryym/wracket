#!/usr/bin/env node

/* eslint-env browser */
/* eslint-disable no-console */

// A Node.js script to generate a string for Git tags.
// We use timestamps.

const pad = n => (n < 10 ? `0${n}` : String(n));

const today = new Date();
const year = today.getUTCFullYear();
const month = pad(today.getUTCMonth() + 1);
const date = pad(today.getUTCDate());
const hours = pad(today.getUTCHours());
const minutes = pad(today.getUTCMinutes());

console.log(`v${year}${month}${date}-${hours}${minutes}`);
