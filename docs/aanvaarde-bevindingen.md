# Aanvaarde bevindingen

| Tool | Regel | Bestand | Soort | Reden | Oplossing |
|---|---|---|---|---|---|
| Gitleaks | generic-api-key | app/appsettings.json:15 (commit aa6173d) | Echt probleem | API-sleutel van de starter-app, aanwezig sinds de eerste commit. Hij blijft in de git-geschiedenis staan, ook na verwijderen. We behandelen hem als gelekt. | Sleutel verwijderen uit appsettings.json, geheimen naar GitHub Secrets (opdracht 2) en OpenBao (opdracht 6). |
| Trivy | CVE-2024-21907 (hoog) | app/packages.lock.json: Newtonsoft.Json 12.0.1 | Echt probleem, niet bereikbaar | Denial of service bij het deserialiseren van diep geneste JSON. De app gebruikt Newtonsoft enkel om JSON te maken (export) en leest er nergens JSON mee in. | Bijwerken naar 13.0.1 of Newtonsoft vervangen door System.Text.Json, voor de app in productie gaat. |
