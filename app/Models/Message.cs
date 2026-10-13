using System.ComponentModel.DataAnnotations;

namespace Unbreakable.Models;

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

    [Required]
    [StringLength(100)]
    [Display(Name = "Onderwerp")]
    public string Subject { get; set; }

    [Required]
    [StringLength(2000)]
    [Display(Name = "Bericht")]
    public string Body { get; set; }

    [Display(Name = "Verzonden")]
    public DateTime SentAt { get; set; }
}
