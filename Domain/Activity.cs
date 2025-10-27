using System;

namespace Domain;

public class Activity
{
    //unique key for the database
    //using a "?" can make the prop nullable
    //using [key] can tell the db that a prop is the primary key if "Id" isn't used
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public DateTime Date { get; set; }

    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }

    //geolocational props
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}

