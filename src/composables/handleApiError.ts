export function handleApiError(status: number | undefined) {
  if (status && status === 404) {
    throw new Error('Not found.');
  } else {
    throw new Error('Something went wrong. Please try again.');
  }
}
