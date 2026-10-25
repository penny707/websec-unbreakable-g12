using System.ComponentModel.DataAnnotations;

namespace Unbreakable.Models;

// De server bewaart enkel versleutelde data: geen bericht, geen onderwerp, geen sleutel.
public class Message
{
    public int Id { get; set; }

    [Required]
    [StringLength(40, MinimumLength = 2)]
    [Display(Name = "Van")]
    public string Sender { get; set; }

    [Required]
    [StringLength(40, MinimumLength = 2)]
    [Display(Name = "Aan")]
    public string Recipient { get; set; }

    // One-time pad mod 37: enkel A-Z, 0-9 en _
    [Required]
    [StringLength(40)]
    public string Ciphertext { get; set; }

    // Nummer van de lijn in het codeboek (geen geheim)
    public int CodebookLine { get; set; }

    // HMAC-SHA256 in hex
    [Required]
    [StringLength(64)]
    public string Hmac { get; set; }

    [Display(Name = "Verzonden")]
    public DateTime SentAt { get; set; }
}
