// One-time pad mod 37 en HMAC-SHA256, volledig in de browser.
// Sleutels worden ingevoerd door de gebruiker en gaan nooit naar de server.

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
const N = CHARSET.length; // 37

export function normalize(text) {
    const t = text.toUpperCase().replaceAll(' ', '_');
    if (!/^[A-Z0-9_]+$/.test(t)) {
        throw new Error('Enkel letters (zonder accenten), cijfers en spaties zijn toegelaten.');
    }
    return t;
}

// Accepteert een regel uit het codeboek, ook met het lijnnummer ervoor.
export function cleanKey(input) {
    const k = input.trim().split(/\s+/).pop().toUpperCase();
    if (!/^[A-Z0-9_]+$/.test(k)) {
        throw new Error('Ongeldige sleutelregel.');
    }
    return k;
}

export function encrypt(message, key) {
    if (key.length < message.length) {
        throw new Error('De sleutelregel is korter dan het bericht.');
    }
    let out = '';
    for (let i = 0; i < message.length; i++) {
        out += CHARSET[(CHARSET.indexOf(message[i]) + CHARSET.indexOf(key[i])) % N];
    }
    return out;
}

export function decrypt(cipher, key) {
    if (key.length < cipher.length) {
        throw new Error('De sleutelregel is korter dan het bericht.');
    }
    let out = '';
    for (let i = 0; i < cipher.length; i++) {
        out += CHARSET[(CHARSET.indexOf(cipher[i]) - CHARSET.indexOf(key[i]) + N) % N];
    }
    return out.replaceAll('_', ' ');
}

const importKey = (text) => crypto.subtle.importKey(
    'raw', new TextEncoder().encode(text.trim()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
const macData = (line, cipher) => new TextEncoder().encode(`${line}|${cipher}`);
const toHex = (buf) => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
const fromHex = (hex) => Uint8Array.from(hex.match(/../g), h => parseInt(h, 16));

export async function sign(keyText, line, cipher) {
    return toHex(await crypto.subtle.sign('HMAC', await importKey(keyText), macData(line, cipher)));
}

export async function verifyMac(keyText, line, cipher, hex) {
    return crypto.subtle.verify('HMAC', await importKey(keyText), fromHex(hex), macData(line, cipher));
}
