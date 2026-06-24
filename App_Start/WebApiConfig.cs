using System;
using System.Collections.Generic;
using System.Linq;

namespace API.ConferenceRoom
{
    public static class WebApiConfig
    {
        public static void Register(object config)
        {
            // config.MapHttpAttributeRoutes();

            /*
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            */
        }
    }
}
