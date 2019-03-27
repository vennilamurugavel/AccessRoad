using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AccessRoad.Models
{
    public class AccessDB
    {
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        public List<Access> ListAll()
        {
            List<Access> lst = new List<Access>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SelectRoad", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Access
                    {
                        RoadID = Convert.ToInt32(rdr["RoadId"]),
                        Name = rdr["Name"].ToString(),
                        Graphic_Route = rdr["Graphic_Route"].ToString()
                    });
                }
                return lst;
            }
        }
        public int Add(Access action)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateRoad", con)
                {
                    CommandType = CommandType.StoredProcedure
                };
                com.Parameters.AddWithValue("@Id", action.RoadID);
                com.Parameters.AddWithValue("@Name", action.Name);
                com.Parameters.AddWithValue("@Graphic_Route", action.Graphic_Route);
                com.Parameters.AddWithValue("@Action", "Insert");
                i = com.ExecuteNonQuery();
            }
            return i;
        }
        //Method for Updating road record
        public int Update(Access action)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateRoad", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", action.RoadID);
                com.Parameters.AddWithValue("@Name", action.Name);
                com.Parameters.AddWithValue("@Graphic_Route", action.Graphic_Route);
                com.Parameters.AddWithValue("@Action", "Update");
                i = com.ExecuteNonQuery();
            }
            return i;
        }
        //Method for Deleting an road record
        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteRoad", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}
