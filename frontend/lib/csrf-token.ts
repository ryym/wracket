// Find CSRF token embedded by Rails.
export function findCSRFToken(): string | null {
  const $token = document.querySelector('meta[name="csrf-token"]');
  if ($token == null) {
    return null;
  }
  return $token.getAttribute('content')!;
}
