const baseUrl = '/api'; // change to your backend origin as needed

// Keep your other endpoints here...

import { VEHICLES } from "./mockData";

/**
 * Mock: verify a plate.
 * Returns:
 *  - { status: 'existing', plate }
 *  - { status: 'new' }
 */
export async function verifyPlate(plateRaw){
  const plate = String(plateRaw || "").toUpperCase().replace(/\s+/g, "");
  await sleep(450);
  const hit = VEHICLES.find(v => v.plate === plate);
  if (hit) {
    return { status: "existing", plate: hit.plate };
  }
  return { status: "new", plate };
}

/**
 * Mock: confirm ownership by last 4 NRIC digits.
 * Returns:
 *  - { ok: true, personal, car }
 *  - { ok: false, message }
 */
export async function confirmOwnership(plateRaw, last4){
  const plate = String(plateRaw || "").toUpperCase().replace(/\s+/g, "");
  await sleep(350);
  const hit = VEHICLES.find(v => v.plate === plate);
  if (!hit) return { ok: false, message: "Record not found." };
  if (String(last4) === hit.ownerLast4) {
    return { ok: true, personal: hit.personal, car: hit.car };
  }
  return { ok: false, message: "Last 4 digits do not match." };
}

export async function submitOnboarding(payload){
  await sleep(500);
  return { ok: true, message: "Submitted (mock)." };
}

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

