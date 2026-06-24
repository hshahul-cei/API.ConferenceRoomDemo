using System;
using System.Web.Mvc;
using API.ConferenceRoom.Models;
using API.ConferenceRoom.Code;
using Sitecore.Mvc.Presentation;
using Sitecore.Data.Items;
using Sitecore;

namespace API.ConferenceRoom.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult Login()
        {
            var model = new LoginViewModel();
            
            // Link target can be configured via Rendering Parameters or Datasource
            var dataSourceId = RenderingContext.Current.Rendering.DataSource;
            if (!string.IsNullOrEmpty(dataSourceId))
            {
                Item dataSource = Context.Database.GetItem(dataSourceId);
                if (dataSource != null)
                {
                    model.CreateAccountUrl = Sitecore.Links.LinkManager.GetItemUrl(dataSource);
                }
            }
            
            if (string.IsNullOrEmpty(model.CreateAccountUrl))
            {
                model.CreateAccountUrl = "#"; // Default placeholder
            }

            return View("~/Areas/ConferenceRoom/Views/Account/Login.cshtml", model);
        }

        [HttpPost]
        public ActionResult HandleLogin(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                string itemId = RenderingContext.Current.ContextItem.ID.ToString();
                bool isValid = SitecoreHelpers.ValidateAccessCode(itemId, model.AccessCode);
                
                if (isValid)
                {
                    // Success logic - usually redirect or show success layout
                    return View("~/Areas/ConferenceRoom/Views/Shared/_Layout.cshtml");
                }
                else
                {
                    ViewBag.Error = "Invalid Access Code !!";
                }
            }
            return Login();
        }
    }
}