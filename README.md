# Unbreakable

Starter app voor het vak Cyber Security Advanced aan AP Hogeschool.

Unbreakable is een kleine berichtenapp. Je kiest een naam, je stuurt berichten naar anderen en je leest je inbox. De app werkt, maar is nog helemaal niet veilig. Doorheen het semester maken jullie ze beter: een pipeline en een WAF, cryptografie, inloggen, autorisatie en geheimenbeheer.

> **Let op:** deze app bevat bewust zwakke plekken. Gebruik ze enkel in je eigen labomgeving en nooit met echte gegevens.

## Starten

Je hebt enkel Docker nodig, met de compose plugin.

```bash
git clone <jouw repo>
cd <jouw repo>
docker compose up -d --build
```

Surf daarna naar `http://localhost:8080`, of naar poort 8080 van je server. Vul een naam in, bijvoorbeeld **Anna**, **Bram** of **Chris**: die hebben al berichten.

Stoppen doe je met `docker compose down`. Wil je opnieuw beginnen met een lege databank, gebruik dan `docker compose down -v`.

Leeft de app? `curl http://localhost:8080/health` geeft `ok`.

## Opbouw

De app bestaat uit twee delen in één container: een single page app (SPA) die in je browser draait, en een API op de server. De SPA praat met de API in JSON. Open de developer tools van je browser (tabblad Network) om te zien wat er over en weer gaat.

```
docker-compose.yml          de app en een PostgreSQL databank
app/
  Program.cs                de API, en opstarten van de databank
  Models/Message.cs         een bericht
  Data/                     databanktoegang (Entity Framework Core)
  wwwroot/                  de SPA
    index.html
    js/app.js               de schermen
    js/api.js               alle calls naar de API
    lib/                    Bootstrap en jQuery
docs/threat-model.md        basis threat model van de starter app
```

### De API

| Methode | Pad | Doet |
|---|---|---|
| GET | `/health` | leeft de app? |
| GET | `/api/users` | alle gekende namen |
| GET | `/api/messages` | je inbox, optioneel `?from=<naam>` |
| GET | `/api/messages/search?q=<tekst>` | zoeken in je inbox |
| GET | `/api/messages/{id}` | één bericht |
| POST | `/api/messages` | bericht versturen |
| DELETE | `/api/messages/{id}` | bericht verwijderen |
| GET | `/api/messages/export` | je inbox als JSON |

Wie je bent, stuurt de SPA mee in de header `X-User`.

Technologie: ASP.NET Core minimal API op .NET 10, Entity Framework Core met PostgreSQL 17, en vanilla JavaScript met Bootstrap, zonder build stap.

## Herkomst

Gebaseerd op [websec-vulnerable-dotnetcore](https://github.com/Splynter-Security/websec-vulnerable-dotnetcore), omgebouwd tot een berichtenapp met een SPA en een API, en bijgewerkt naar .NET 10.
