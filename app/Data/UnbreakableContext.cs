using Microsoft.EntityFrameworkCore;
using Unbreakable.Models;

namespace Unbreakable.Data;

public class UnbreakableContext : DbContext
{
    public UnbreakableContext(DbContextOptions<UnbreakableContext> options)
        : base(options)
    {
    }

    public DbSet<Message> Messages { get; set; }
}
