using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AccessRoad.Models
{
    public class Access
    {
        public int RoadID { get; set; }
        public string Name { get; set; }
        public string Graphic_Route { get; set; }
    }
}