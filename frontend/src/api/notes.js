const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = 'Something went wrong';

    try {
      const data = await response.json();
      message = data.detail || message;
    } catch {
      // Keep the default message if the server did not send JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getNotes() {
  return request('/notes');
}

export function createNote(note) {
  return request('/notes', {
    method: 'POST',
    body: JSON.stringify(note),
  });
}

export function deleteNote(id) {
  return request(`/notes/${id}`, {
    method: 'DELETE',
  });
}