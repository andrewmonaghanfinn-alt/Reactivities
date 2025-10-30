using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;

        //the ??= operator checks if what is on the left side is null, and if so assigns it the value on the right side
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
        ?? throw new InvalidOperationException("IMediator service is unavailable");
    }
}
