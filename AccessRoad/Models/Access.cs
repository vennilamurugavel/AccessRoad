﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AccessRoad.Models
{
    public class Access
    {
        public int RoadID { get; set; }
        public string Name { get; set; }
        public bool isNewlyEnrolled { get; set; }
    }
}