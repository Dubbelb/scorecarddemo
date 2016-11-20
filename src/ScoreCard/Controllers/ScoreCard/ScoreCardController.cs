using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ScoreCard.Controllers
{
    public class ScoreCardController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
        [Route("data")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public ActionResult ScoreCardData()
        {
            string allText = System.IO.File.ReadAllText(@"C:\Users\Alex\documents\visual studio 2015\Projects\ScoreCard\src\ScoreCard\wwwroot\images\data.json");

            object jsonObject = JsonConvert.DeserializeObject(allText);
            return Json(jsonObject);
        }
    }
}
