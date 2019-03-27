using AccessRoad.Models;
using System.Web.Mvc;

public class HomeController : Controller
{
    AccessDB roadDB = new AccessDB();
    // GET: Home
    public ActionResult Index()
    {
        return View();
    }
    public JsonResult List()
    {
        return Json(roadDB.ListAll(), JsonRequestBehavior.AllowGet);
    }
    public JsonResult Add(Access road)
    {
        return Json(roadDB.Add(road), JsonRequestBehavior.AllowGet);
    }
    public JsonResult GetbyID(int ID)
    {
        var road = roadDB.ListAll().Find(x => x.RoadID.Equals(ID));
        return Json(road, JsonRequestBehavior.AllowGet);
    }
    public JsonResult UpdateID(int ID)
    {
        var road = roadDB.ListAll().Find(x => x.RoadID.Equals(ID));
        return Json(road, JsonRequestBehavior.AllowGet);
    }
    public JsonResult Update(Access road)
    {
        return Json(roadDB.Update(road), JsonRequestBehavior.AllowGet);
    }
    public JsonResult Delete(int ID)
    {
        return Json(roadDB.Delete(ID), JsonRequestBehavior.AllowGet);
    }
}