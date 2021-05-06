using HtmlAgilityPack;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using Google.Cloud.Firestore;
using System.Diagnostics;

namespace SuperScraper
{
    [FirestoreData]
    public class Recepi
    {
        private string id;
        [FirestoreProperty]
        public string Id
        {
            set { id = value; }
            get { return id; }
        }
        private string name;
        [FirestoreProperty]
        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        private string pic;
        [FirestoreProperty]
        public string Pic
        {
            get { return pic; }
            set { pic = value; }
        }
        private string diet;
        [FirestoreProperty]
        public string Diet
        {
            get { return diet; }
        }
        private List<string> fingredients;
        [FirestoreProperty]
        public List<string> Fingredients
        {
            get { return fingredients; }
        }
        private List<string> ingredients;
        [FirestoreProperty]
        public List<string> Ingredients
        {
            get { return ingredients; }
        }
        private List<string> directions;
        [FirestoreProperty]
        public List<string> Directions
        {
            get { return directions; }
        }

        public Recepi(string id,string name, string pic, List<string> ingredients, List<string> fingredients, List<string> directions)
        {
            this.id = id;
            this.name = name;
            this.pic = pic;
            this.ingredients = ingredients;
            this.fingredients = fingredients;
            this.directions = directions;

        }
        public Recepi()
        {
            this.id = "";
            this.name = "";
            this.pic = "";
            this.diet = "vegan";
            this.ingredients = new List<string>();
            this.fingredients = new List<string>();
            this.directions = new List<string>();
            
        }

        public void addFingredient(string str)
        {
            this.fingredients.Add(str);
        }
        public void adddirections(string str)
        {
            this.directions.Add(str);
        }
        public void addIngreds(string ingreds) {
            this.ingredients.Add(ingreds);
            if ((diet == "vegan") && (ingreds.Contains("cheese") || ingreds.Contains("milk") || ingreds.Contains("butter")))
            {
                diet = "vegetarian";
            }
            else if ((diet == "vegan" || diet == "vegetarian") && (ingreds.Contains("beef") || ingreds.Contains("pork") || ingreds.Contains("chicken") || ingreds.Contains("fish")))
            {
                diet = "";
            }
        }
        //to be implemented
        public void findDiet() {
            diet = "vegan";
            foreach (var i in ingredients)
            {
                if ((diet == "vegan") && (i.Contains("cheese") || i.Contains("milk") || i.Contains("butter"))) {
                    diet = "vegetarian";
                }
                else if ((diet == "vegan"|| diet == "vegetarian") && (i.Contains("beef") || i.Contains("Pork") || i.Contains("chicken") || i.Contains("fish")))
                {
                    diet = "";
                }
            }
        }
        
        
        //function that serialize to JSON
        public void printserial()
        {
            Console.WriteLine(this.getjson());
        }
        public string getjson()
        {
            return (JsonConvert.SerializeObject(this, Formatting.Indented));
        }

        public Dictionary<string,Object> getDict()
        {
            return (JsonConvert.DeserializeObject<Dictionary<string, Object >>(JsonConvert.SerializeObject(this)));
        }
        



    }
    class Program
    {
        
        static void Main(string[] args)
        {
            
            string path = AppDomain.CurrentDomain.BaseDirectory + @"spaghettio-auth.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", path);

            string projectId = "spaghettio";
            FirestoreDb db = FirestoreDb.Create(projectId);
            CollectionReference collection = db.Collection("recipe");
            List<Recepi> recList = new List<Recepi>();

            string url = "https://www.allrecipes.com/recipe/";
            //Console.WriteLine(gethtml((url + "7097").ToString(),"7097").getjson());
            
            for(int i = 7738; i < 20000; i++)
            {
                
                Console.WriteLine(i);
                Recepi rec = gethtml((url + i + '/').ToString(), i.ToString());
                /*Process process = new Process();
                process.StartInfo.UseShellExecute = true;
                process.StartInfo.FileName = "chrome";
                process.StartInfo.Arguments = rec.Pic.ToString();
                process.Start();
                process.StartInfo.Arguments = (url+i).ToString();
                process.Start();*/
                if (rec != null) 
                {
                    try
                    {
                        var result1 = collection.Document(rec.Id).SetAsync(rec).GetAwaiter().GetResult();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        Console.ReadLine();
                    }
                }
            }
            //File.AppendAllText(@"C:\Users\thabi\OneDrive\Desktop\recepies.json", JsonConvert.SerializeObject(recList, Formatting.Indented));





        }
        public static void saveToFile(Recepi rec)
        {
            File.AppendAllText("recepies.json", rec.getjson());
        }

        public static Recepi gethtml(string url, string id){
            Recepi recepi = new Recepi();
            recepi.Id = id;
            HtmlWeb web = new HtmlWeb();
            HtmlDocument htmldoc = web.Load(url);

            if (htmldoc.DocumentNode.SelectNodes("//section[contains(@ class,'error-page')]") != null) {
                return (null);
            }
            else
            {
                try
                {
                    var name = htmldoc.DocumentNode.SelectNodes("//div[contains(@class, 'intro')]");
                    recepi.Name = name[0].InnerText.Trim();
                }
                catch (Exception)
                {
                    Console.WriteLine("no name");
                    recepi.Name=id;
                }
                try
                {
                    var pic = htmldoc.DocumentNode.SelectNodes("//div[contains(@class, 'image-container')]//div//img");
                    recepi.Pic = pic[0].GetAttributeValue("src", "");
                }
                catch (Exception)
                {
                    Console.WriteLine("no pic");
                    recepi.Pic = "Pic unavailable";
                }

                try
                {
                    var Ingredients = htmldoc.DocumentNode.SelectNodes("//li[contains(@class, 'ingredients-item')]//input").ToList();
                    foreach (var e in Ingredients)
                    {
                        if (e.GetAttributeValue("value", "").Length >= e.GetAttributeValue("data-ingredient", "").Length)
                        {
                            recepi.addIngreds(e.GetAttributeValue("data-ingredient", "").Trim());
                        }
                        if (e.GetAttributeValue("value", "").Length < e.GetAttributeValue("data-ingredient", "").Length)
                        {
                            recepi.addIngreds(e.GetAttributeValue("value", "").Trim());
                        }

                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("no Ingredients");
                }
                try
                {
                    var s = htmldoc.DocumentNode.SelectNodes("//span[contains(@class, 'ingredients-item-name')]").ToList();
                    foreach (var e in s)
                    {
                        recepi.addFingredient(e.InnerText);
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("no Ingredients");
                }
                
                try
                {
                    var discription = htmldoc.DocumentNode.SelectNodes("//div[contains(@class, 'section-body')]//p").ToList();
                    foreach (var e in discription)
                    {
                        recepi.adddirections(e.InnerText.Trim());
                        //Console.WriteLine(e.InnerText);
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("no discription");
                }
                
                //recepi.printserial();
                //saveToFile(recepi);
                //recepi.findDiet();
                return (recepi);

                //Console.WriteLine();
            }
        }
    }
} 
