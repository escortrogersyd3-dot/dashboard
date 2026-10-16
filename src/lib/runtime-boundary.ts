export type RuntimeBoundary = {
  mode: "mock";
  message: string;
};

/**
 * V7-003 deliberately has no Observer OS transport, credentials, or data.
 * Future adapter work must be admitted by a separate OTP and contract update.
 */
export function getRuntimeBoundary(): RuntimeBoundary {
  return {
    mode: "mock",
    message: "Mock-only scaffold. No authoritative Observer OS data is connected.",
  };
}
