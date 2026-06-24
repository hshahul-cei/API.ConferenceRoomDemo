using Sitecore.Data.Fields;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.Security;
using Sitecore;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Links;
using Sitecore.Resources.Media;
using Sitecore.Security;
using Sitecore.Security.Accounts;
using Sitecore.Security.Authentication;
using Sitecore.Common;
using Sitecore.Configuration;
using System.Text.RegularExpressions;
using Sitecore.SecurityModel;

namespace API.ConferenceRoom.Code
{
    public static class SitecoreHelpers
    {

        public static bool ValidateAccessCode(string id, string accessCode)
        {
            
            Item currentItem = Context.Database.GetItem(id);
            string originalAccessCode = currentItem.Fields["AccessCode"].ToString();
            string[] accescodes = originalAccessCode.Split(',');
            foreach (string accescodespt in accescodes)
            {
                if (accescodespt.ToLower().Trim() == accessCode.ToLower().Trim())
                {
                    return true;

                }
            }
            
            return false;
        }
    }
}