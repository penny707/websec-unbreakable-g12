using Unbreakable.Models;

namespace Unbreakable.Data;

public static class SeedData
{
    public static void Initialize(UnbreakableContext context)
    {
        if (context.Messages.Any())
        {
            return;
        }

        var now = DateTime.UtcNow;

        context.Messages.AddRange(
            new Message
            {
                Sender = "Bram",
                Recipient = "Anna",
                Subject = "Welkom bij Unbreakable",
                Body = "Hoi Anna, vanaf nu sturen we alles via Unbreakable. Niemand anders kan meelezen.",
                SentAt = now.AddDays(-3)
            },
            new Message
            {
                Sender = "Anna",
                Recipient = "Bram",
                Subject = "Re: Welkom bij Unbreakable",
                Body = "Top! Is dat echt zo? Wie heeft dat gecontroleerd?",
                SentAt = now.AddDays(-3).AddHours(2)
            },
            new Message
            {
                Sender = "Chris",
                Recipient = "Anna",
                Subject = "Afspraak vrijdag",
                Body = "Zien we elkaar vrijdag om 14 uur aan het station?",
                SentAt = now.AddDays(-1)
            },
            new Message
            {
                Sender = "Bram",
                Recipient = "Chris",
                Subject = "Wachtwoord van de wifi",
                Body = "Het wachtwoord van de wifi op kantoor is ZomerZon2026. Niet doorgeven!",
                SentAt = now.AddHours(-5)
            },
            new Message
            {
                Sender = "Anna",
                Recipient = "Chris",
                Subject = "Vrijdag",
                Body = "Prima, ik neem de documenten mee.",
                SentAt = now.AddHours(-2)
            });

        context.SaveChanges();
    }
}
