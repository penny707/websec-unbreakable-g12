# Aanvaarde bevindingen

| Tool | Regel | Bestand | Soort | Reden | Oplossing |
|---|---|---|---|---|---|
| Gitleaks | generic-api-key | app/appsettings.json:15 (commit aa6173d) | Echt probleem | API-sleutel van de starter-app, aanwezig sinds de eerste commit. Hij blijft in de git-geschiedenis staan, ook na verwijderen. We behandelen hem als gelekt. | Sleutel verwijderen uit appsettings.json, geheimen naar GitHub Secrets (opdracht 2) en OpenBao (opdracht 6). |
