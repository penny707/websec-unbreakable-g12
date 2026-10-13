// Praat met de API. Alles wat de SPA weet, komt van hier.

const USER_KEY = 'unbreakable_user';

export function currentUser() {
    return localStorage.getItem(USER_KEY);
}

export function setUser(name) {
    localStorage.setItem(USER_KEY, name);
}

async function call(method, path, body) {
    const headers = { 'X-User': currentUser() || '' };
    const options = { method, headers };

    if (body !== undefined) {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    const response = await fetch('/api' + path, options);
    if (!response.ok) {
        throw new Error(`${method} ${path} gaf ${response.status}`);
    }

    const type = response.headers.get('Content-Type') || '';
    return type.includes('application/json') ? response.json() : response.text();
}

export const api = {
    users: () => call('GET', '/users'),
    inbox: (from) => call('GET', '/messages' + (from ? '?from=' + encodeURIComponent(from) : '')),
    search: (q) => call('GET', '/messages/search?q=' + encodeURIComponent(q)),
    message: (id) => call('GET', '/messages/' + id),
    send: (message) => call('POST', '/messages', message),
    remove: (id) => call('DELETE', '/messages/' + id),
    exportJson: () => call('GET', '/messages/export'),
};
