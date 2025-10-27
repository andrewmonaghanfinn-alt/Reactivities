using System;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;
//primary constructor used below, essentially the same as declaring a constructor that takes an AppDbContext as an argument as assigns it
//to an AppDbContext member variable but more concise
public class ActivitiesController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await context.Activities.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        //find activity record based on primary key id
        var activity = await context.Activities.FindAsync(id);
        
        if (activity == null) return NotFound();

        return activity;
    }
}
