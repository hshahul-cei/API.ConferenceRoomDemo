using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;


namespace API.ConferenceRoom.Code
{
    public class RegistrationData
    {

        public static bool CheckRegistration(string email)
        {
            bool isRegistered = false;

            try
            {
                using (SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["metadata"].ConnectionString))
                {
                    SqlCommand sqlCmd = new SqlCommand();
                    sqlCmd.CommandText = "uspCheckDOMUser";
                    sqlCmd.Connection = cn;
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    sqlCmd.Parameters.Add("@pEmail", SqlDbType.NVarChar).Value = email;

                    cn.Open();
                    isRegistered = Convert.ToBoolean(sqlCmd.ExecuteScalar());
                }

               
            }
            catch (Exception ex)
            {
                Sitecore.Diagnostics.Log.Error("Diesel Oil Matters - An Error Occured while validating the Paywall User Information", ex, typeof(RegistrationData));
            }

            return isRegistered;
        }
    }
}