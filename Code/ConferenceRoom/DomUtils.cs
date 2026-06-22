using System;
using Sitecore.Data.Items;

using System.Linq;
using System.Web;
using Sitecore.Links;
using System.Text;
using Glass.Mapper.Sc;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.ConferenceRoom.Code
{
    public class DomUtils
    {
        protected static ISitecoreContext contxt = new SitecoreContext();
        
        public static string GetToolkitQuery(HttpRequestBase request, HttpContext context)
        {

            var allkeys = request.QueryString.AllKeys;
            var refUrl = context.Request.Url.ToString();

            // Get query parameter values
            Uri bUri = new Uri(refUrl);
            var queryValues = bUri.Query;

            // Build up query parameter key value pairs
            foreach (string i in allkeys)
            {
                queryValues = queryValues.Replace(i + "=", "type=");
            }

            return queryValues;
        }

        public static bool isValidImageFile(byte[] byteFile, string contentType)
        {
            byte[] chkByteJpg = { 255, 216, 255, 224 };
            byte[] chkBytePng = { 137, 80, 78, 71 };

            if (contentType.Contains("jpeg"))
            {
                if (byteFile.Length >= 4)
                {

                    for (Int32 i = 0; i <= 3; i++)
                    {
                        if (byteFile[i] != chkByteJpg[i])
                        {

                            if (byteFile[i].ToString() != "224" && byteFile[i].ToString() != "225")
                            {
                                return false;
                            }
                        }
                    }
                }
            }

            if (contentType.Contains("png"))
            {
                if (byteFile.Length >= 4)
                {

                    for (Int32 i = 0; i <= 3; i++)
                    {
                        if (byteFile[i] != chkBytePng[i])
                        {

                            return false;
                        }
                    }
                }
            }


            return true;

        }
    }

  
    public enum ToolkitTypes { Fleets, OwnerOperators, Mechanics, OtherResources }
}