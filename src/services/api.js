const CONTACTS_KEY = 'contacts';

export function store(contacts) {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

export function restore() {
  try {
    const contacts = JSON.parse(localStorage.getItem(CONTACTS_KEY));
    if (contacts instanceof Array) {
      return contacts;
    }
  } catch {}

  return [];
}
