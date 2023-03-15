/**
 * Extract error message.
 * @param errorArray Error array.
 */
export function extractErrorMessage(
  errorArray?: string[],
): string | undefined {
  // TODO (template preparation): Add current API-specific way to extract validation data.

  if (errorArray == null || errorArray.length === 0) {
    return undefined;
  }

  return errorArray.join('\n');
}
