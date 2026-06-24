using API.ConferenceRoom.Code;
using Glass.Mapper.Sc;
using Sitecore.Mvc.Presentation;
using System;
using System.Web.Security;
using System.Web.Mvc;

namespace API.ConferenceRoom.Controllers
{

    /// <summary>
    /// Classes to save user information in the database.
    /// </summary>
    public class FormsController : Controller
    {
        protected ISitecoreContext contxt = new SitecoreContext();
        // GET: Default
        public ActionResult Index()
        {
            return View();

        }


        /// <summary>
        /// Confirm user exists in database
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public ActionResult ConfirmRegistration(string email)
        {
            bool isRegistered;
            IView pageView = PageContext.Current.PageView;


            isRegistered = RegistrationData.CheckRegistration(email);

            if (isRegistered == true)
            {
                FormsAuthentication.SetAuthCookie(@"extranet\dompaywall", true);

                string domainUser = @"extranet\dompaywall";

                if (Sitecore.Security.Accounts.User.Exists(domainUser))
                {
                    var queryValues = DomUtils.GetToolkitQuery(Request, System.Web.HttpContext.Current);

                    return Redirect("/oil-toolkit/documents" + queryValues);
                }

            }
            else
            {
                ViewBag.isRegistered = false;
            }



            if (pageView == null)
                return new HttpNotFoundResult();
            else
                return (ActionResult)this.View(pageView);

        }

        /// <summary>
        /// Confirm user exists in database
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public ActionResult ConfirmAccessCode()
        {
            bool isAccessCodeRequired = false;
            if (RenderingContext.Current.ContextItem != null && RenderingContext.Current.ContextItem.Fields["IsAccesscodeRequired"] != null)
            {
                string fieldValue = RenderingContext.Current.ContextItem.Fields["IsAccesscodeRequired"].Value;
                if (!string.IsNullOrEmpty(fieldValue))
                {
                    isAccessCodeRequired = fieldValue == "1";
                }
            }

            var queryValues = DomUtils.GetToolkitQuery(Request, System.Web.HttpContext.Current);
            var url = "~/Areas/ConferenceRoom/Views/Custom/ConferenceRoomDescription.cshtml";

            if (isAccessCodeRequired == true)
            {
                url = "~/Areas/ConferenceRoom/Views/Custom/AccessCode.cshtml" + queryValues;
            }

            return View(url);
        }

        [HttpPost]
        public ActionResult CheckAccessCode(String AccessCode, String itemId)
        {
            String pageUrl = null != Request.Url ? Request.Url.ToString() : String.Empty;
            try
            {
                bool isValidAccessCode = SitecoreHelpers.ValidateAccessCode(itemId, AccessCode);
                if (isValidAccessCode)
                {
                    return View("~/Areas/ConferenceRoom/Views/Shared/_Layout.cshtml");
                }
                else
                {
                    ViewBag.Error = "Invalid Access Code !!";
                    return View("~/Areas/ConferenceRoom/Views/Shared/_Layout.cshtml");
                }

            }
            catch (Exception)
            {
                return Redirect(String.Format("{0}{1}return=error", pageUrl, pageUrl.Contains("?") ? "&" : "?"));
            }
        }
    }
}