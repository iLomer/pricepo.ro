import { BrevoClient } from "@getbrevo/brevo";

let _brevo: BrevoClient | null = null;

export function getBrevo(): BrevoClient {
  if (!_brevo) {
    if (!process.env.BREVO_API_KEY) {
      throw new Error("Missing BREVO_API_KEY environment variable");
    }
    _brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });
  }
  return _brevo;
}
