using AccessRoad.Models;
using System.Web.Mvc;

public class HomeController : Controller
{
    AccessDB empDB = new AccessDB();
    // GET: Home
    public ActionResult Index()
    {
        return View();
    }
    public JsonResult List()
    {
        return Json(empDB.ListAll(), JsonRequestBehavior.AllowGet);
    }
    public JsonResult Add(Access emp)
    {
        return Json(empDB.Add(emp), JsonRequestBehavior.AllowGet);
    }
    public JsonResult GetbyID(int ID)
    {
        var road = empDB.ListAll().Find(x => x.RoadID.Equals(ID));
        return Json(road, JsonRequestBehavior.AllowGet);
    }
    public JsonResult Update(Access emp)
    {
        return Json(empDB.Update(emp), JsonRequestBehavior.AllowGet);
    }
    public JsonResult Delete(int ID)
    {
        return Json(empDB.Delete(ID), JsonRequestBehavior.AllowGet);
    }
}