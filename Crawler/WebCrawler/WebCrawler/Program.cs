using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using HtmlAgilityPack;
using System.Text.RegularExpressions;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;
using Nest;
using Newtonsoft.Json;

namespace WebCrawler
{
    class Program
    {
        static int crowledCount = 0;
        static int addedCount = 0;
        static List<Movie> movieList = new List<Movie>();
        const string urlBaseForSearch = @"http://www.imdb.com/search/title";
        const string urlBase = @"http://www.imdb.com/";
        const string actionMoviesUrl = @"http://www.imdb.com/search/title?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=b9121fa8-b7bb-4a3e-8887-aab822e0b5a7&pf_rd_r=BG9JRE0QS66XQFSG43WV&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=moviemeter&genres=action&explore=title_type,genres&title_type=movie&page=1&ref_=adv_nxt";
        static string[] movieUrls = {
            @"https://www.imdb.com/search/title?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=b9121fa8-b7bb-4a3e-8887-aab822e0b5a7&pf_rd_r=3KXAPF4CJZXYPJ6NFHPP&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=moviemeter&genres=action&explore=title_type,genres&title_type=tvSeries&ref_=adv_explore_rhs",
            @"https://www.imdb.com/search/title?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=b9121fa8-b7bb-4a3e-8887-aab822e0b5a7&pf_rd_r=3KXAPF4CJZXYPJ6NFHPP&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=moviemeter&genres=action&explore=title_type,genres&title_type=movie&ref_=adv_explore_rhs",
            @"https://www.imdb.com/search/title?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=b9121fa8-b7bb-4a3e-8887-aab822e0b5a7&pf_rd_r=3KXAPF4CJZXYPJ6NFHPP&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=moviemeter&genres=history&explore=title_type,genres&title_type=movie&ref_=adv_explore_rhs",
            @"https://www.imdb.com/search/title?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=b9121fa8-b7bb-4a3e-8887-aab822e0b5a7&pf_rd_r=3KXAPF4CJZXYPJ6NFHPP&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=moviemeter&genres=history&explore=title_type,genres&title_type=tvSeries&ref_=adv_explore_rhs",
            @"https://www.imdb.com/search/title?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=b9121fa8-b7bb-4a3e-8887-aab822e0b5a7&pf_rd_r=3KXAPF4CJZXYPJ6NFHPP&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=moviemeter&genres=drama&explore=title_type,genres&title_type=movie&ref_=adv_explore_rhs",
            @"https://www.imdb.com/search/title?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=b9121fa8-b7bb-4a3e-8887-aab822e0b5a7&pf_rd_r=3KXAPF4CJZXYPJ6NFHPP&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=moviemeter&genres=comedy&explore=title_type,genres&title_type=movie&ref_=adv_explore_rhs"
        };
         
        public static Uri EsNode;
        public static ConnectionSettings EsConfig;
        public static ElasticClient EsClient;
        public static Dictionary<string, string> dict = new Dictionary<string, string>();

        static void Main(string[] args)
        {

            //foreach (var url in movieUrls)
            //{
            //    CrawlTheWeb(url);
            //}
            //WriteDataToJson();
            ElasticDataLoad();

        }

        private static void ElasticDataLoad()
        {
            EsNode = new Uri("http://localhost:9200/");
            EsConfig = new ConnectionSettings(EsNode);
            EsClient = new ElasticClient(EsConfig);

            var settings = new IndexSettings { NumberOfReplicas = 0, NumberOfShards = 1 };

            var indexConfig = new IndexState
            {
                Settings = settings
            };

            if (!EsClient.IndexExists("action_movies").Exists)
            {
                EsClient.CreateIndex("action_movies", c => c
                .InitializeUsing(indexConfig)
                .Mappings(m => m.Map<Movie>(mp => mp.AutoMap())));
            }

            InsertDocument();
        }

        public static void InsertDocument()
        {
            var lst = LoadJson();
            int idx = 0;
            foreach (var obj in lst)
            {
                Console.WriteLine(idx++);
                EsClient.Index(obj, i => i
                    .Index("action_movies")
                    .Refresh(Elasticsearch.Net.Refresh.False)
                    );
            }

        }

        public static List<Movie> LoadJson()
        {
            using (StreamReader r = new StreamReader("data.json"))
            {
                string json = r.ReadToEnd();
                var movie = new Movie();
                var j = JsonConvert.SerializeObject(movie);
                List<Movie> items = JsonConvert.DeserializeObject<List<Movie>>(json);
                return items;
            }
        }

        static void CrawlTheWeb(string urlToCrawl)
        {

            for (int i = 0; i < 100; i++) {
                HtmlWeb web = new HtmlWeb();
                var htmlDoc = web.Load(urlToCrawl);
                var nextUrlNode = htmlDoc.DocumentNode.Descendants("div").Where(x => x.GetAttributeValue("class", "")
                    .Equals("desc")).FirstOrDefault().Descendants("a").Where(x => x.InnerText.Contains("Next"))
                    .FirstOrDefault();
                if (nextUrlNode == null)
                {
                    return;
                }
                var nextUrl = nextUrlNode.GetAttributeValue("href", "");
                Console.WriteLine(i);
                var listOfElements = htmlDoc.DocumentNode.Descendants("h3").Where(x => x.GetAttributeValue("class", "")
                    .Equals("lister-item-header")).ToList();
                foreach (var e in listOfElements)
                {
                    var url = e.Descendants("a").FirstOrDefault().GetAttributeValue("href", "");
                    addedCount++;
                    crowledCount++;
                    CrawlMoviePage(urlBase + url);
                }

                urlToCrawl = urlBaseForSearch + nextUrl;
            }
        }

        static void CrawlMoviePage(string movieUrl)
        {
            try
            {
                Movie movie = new Movie();
                HtmlWeb web = new HtmlWeb();
                var htmlDoc = web.Load(movieUrl);
                var titleWrapperNode = htmlDoc.DocumentNode.Descendants("div").Where(x => x.GetAttributeValue("class", "").Equals("title_bar_wrapper")).FirstOrDefault();
                movie.Title = ExtractTitle(titleWrapperNode);
                if (HasAlreadyBeenCrawled(movie.Title)) {
                    return;
                }
                movie.Rating = ExtractRating(titleWrapperNode);
                movie.RatingCount = ExtractRatingCount(titleWrapperNode);
                movie.PosterUrl = ExtractPosterUrl(htmlDoc);

                var plotSummaryNode = htmlDoc.DocumentNode.Descendants("div").Where(x => x.GetAttributeValue("class", "").Equals("plot_summary_wrapper")).FirstOrDefault();
                movie.Directors = ExtractDirectors(plotSummaryNode);
                movie.Writers = ExtractWriters(plotSummaryNode);
                movie.Actors = ExtractActors(htmlDoc);
                movie.Genres = ExtractGenres(htmlDoc);
                movie.Plot = ExtractPlot(plotSummaryNode);

                var detailsNode = htmlDoc.DocumentNode.Descendants("div").Where(x => x.GetAttributeValue("id", "").Equals("titleDetails")).FirstOrDefault();
                movie.Languages = ExtractLanguages(detailsNode);
                movie.Countries = ExtractCountries(detailsNode);
                movie.Budget = ExtractBudget(detailsNode);
                movie.Gross = ExtractGross(detailsNode);
                movie.RunTimeInMinutes = ExtractRunTime(detailsNode);
                movie.ReleaseDate = ExtractReleaseDate(detailsNode);

                WriteSingleJson(movie);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                addedCount--;
            }


        }

        private static string ExtractPosterUrl(HtmlDocument htmlDoc)
        {
            var posterNode = htmlDoc.DocumentNode.Descendants("div").Where(x => x.GetAttributeValue("class", "").Equals("poster")).FirstOrDefault();
            if (posterNode != null)
            {
                var imgUrl = posterNode.Descendants("img").FirstOrDefault();
                if (imgUrl != null)
                {
                    string s = imgUrl.GetAttributeValue("src", "");
                    s = s.Replace(@"\",string.Empty);
                    return s;
                }
            }
            return null;
        }

        private static bool HasAlreadyBeenCrawled(string title)
        {
            if (dict.ContainsKey(title)) {
                return true;
            }
            dict.Add(title, "");
            return false;
        }

        private static string ExtractReleaseDate(HtmlNode node)
        {
            var hasReleaseDate = node.Descendants("h4").Any(x => x.InnerText.Contains("Release Date"));
            if (hasReleaseDate)
            {
                var releaseDateNode = node.Descendants("div").Where(x => x.GetAttributeValue("class", "").Equals("txt-block"))
                    .Where(x => x.Descendants("h4").FirstOrDefault().InnerText.Contains("Release Date")).FirstOrDefault();
                var split = releaseDateNode.ChildNodes[2].InnerText.Trim().Split(' ');
                var releaseDate = split[0] + " " + split[1] + " " + split[2];
                return releaseDate;
            }
            return null;
        }

        private static int? ExtractRunTime(HtmlNode node)
        {
            var hasRunTime = node.Descendants("h4").Any(x => x.InnerText.Contains("Runtime:"));
            if (hasRunTime)
            {
                var runTime = node.Descendants("time").Last().InnerText;
                runTime = Regex.Match(runTime, @"\d+").Value;
                return Int32.Parse(runTime);
            }
            return null;
        }

        private static int? ExtractGross(HtmlNode node)
        {
            var hasGross = node.Descendants("h4").Any(x => x.InnerText.Contains("Gross"));
            if (hasGross)
            {
                var gross = node.Descendants("div").Where(x => x.GetAttributeValue("class", "")
                    .Equals("txt-block")).Where(x => x.Descendants("h4").FirstOrDefault().InnerText.Contains("Gross")).FirstOrDefault().ChildNodes[2].InnerText;
                gross = FormatNumber(gross);
                var resultString = Regex.Match(gross, @"\d+").Value;
                return Int32.Parse(resultString);
            }
            return null;
        }

        private static int? ExtractBudget(HtmlNode node)
        {
            var hasBudget = node.Descendants("h4").Any(x => x.InnerText.Contains("Budget"));
            if (hasBudget)
            {
                var budget = node.Descendants("div").Where(x => x.GetAttributeValue("class", "")
                    .Equals("txt-block")).Where(x => x.Descendants("h4").FirstOrDefault().InnerText.Contains("Budget"))
                    .FirstOrDefault().ChildNodes[2].InnerText;
                budget = FormatNumber(budget);
                var resultString = Regex.Match(budget, @"\d+").Value;
                return Int32.Parse(resultString);
            }
            return null;
        }

        private static List<string> ExtractCountries(HtmlNode node)
        {
            var hasCountry = node.Descendants("h4").Any(x => x.InnerText.Contains("Country"));
            List<string> contriesList = new List<string>();

            if (hasCountry)
            {
                var countries = node.Descendants("div").Where(x => x.GetAttributeValue("class", "")
                    .Equals("txt-block")).Where(x => x.Descendants("h4").FirstOrDefault().InnerText.Contains("Country"))
                    .FirstOrDefault().Descendants("a");
                foreach (var c in countries)
                {
                    contriesList.Add(c.InnerText);
                }
                return contriesList;
            }
            return null;
        }

        private static List<string> ExtractLanguages(HtmlNode node)
        {
            var hasLanguages = node.Descendants("h4").Any(x => x.InnerText.Contains("Language"));
            List<string> languagesList = new List<string>();

            if (hasLanguages)
            {
                var languages = node.Descendants("div").Where(x => x.GetAttributeValue("class", "")
                    .Equals("txt-block")).Where(x => x.Descendants("h4").FirstOrDefault().InnerText.Contains("Language"))
                    .FirstOrDefault().Descendants("a");
                foreach (var l in languages)
                {
                    languagesList.Add(l.InnerText);
                }
                return languagesList;
            }
            return null;
        }

        private static List<string> ExtractGenres(HtmlDocument htmlDoc)
        {
            var genres = htmlDoc.DocumentNode.Descendants("div").Where(x => x.GetAttributeValue("class", "")
                .Equals("see-more inline canwrap")).Where(x => x.Descendants("h4").FirstOrDefault().InnerText
                .Contains("Genres")).FirstOrDefault().Descendants("a");
            List<string> genresList = new List<string>();

            if (genres != null)
            {
                foreach (var g in genres)
                {
                    var genre = g.InnerText;
                    genre = Regex.Replace(genre, " ", string.Empty);
                    genresList.Add(genre);
                }
                return genresList;
            }
            return null;
        }

        private static void WriteDataToJson()
        {
            using (StreamReader txtReader = new StreamReader("data.txt")) {
                string line;
                int i = 0;
                while ((line = txtReader.ReadLine()) != null)
                {
                    var m = JsonConvert.DeserializeObject<Movie>(line);
                    try
                    {
                        if (m.ReleaseDate != null)
                            m.ReleaseDate = DateTime.Parse(m.ReleaseDate).ToString("dd-MM-yyyy");
                    }
                    catch {
                    }
                    
                    movieList.Add(m);
                }
            }

            DataContractJsonSerializer js = new DataContractJsonSerializer(typeof(List<Movie>));
            MemoryStream msObj = new MemoryStream();
            js.WriteObject(msObj, movieList);
            msObj.Position = 0;
            StreamReader sr = new StreamReader(msObj);

            string json = sr.ReadToEnd();
            dynamic parsedJson = JsonConvert.DeserializeObject(json);
            json = JsonConvert.SerializeObject(parsedJson, Formatting.Indented);

            sr.Close();
            msObj.Close();

            using (StreamWriter sw = new StreamWriter("data.json", true))
            {
                sw.WriteLine(json);
            }
        }

        private static void WriteSingleJson(Movie movie) {
            DataContractJsonSerializer js = new DataContractJsonSerializer(typeof(Movie));
            MemoryStream msObj = new MemoryStream();
            js.WriteObject(msObj, movie);
            msObj.Position = 0;
            StreamReader sr = new StreamReader(msObj);
            string json = sr.ReadToEnd();
            sr.Close();
            msObj.Close();

            using (StreamWriter sw = new StreamWriter("data.txt", true))
            {
                sw.WriteLine(json);
            }

        }

        private static List<string> ExtractDirectors(HtmlNode node)
        {

            var hasDirector = node.Descendants("h4").Any(x => x.InnerText.Contains("Director"));
            List<string> directorsList = new List<string>();

            if (hasDirector)
            {
                var directors = node.Descendants("div").Where(x => x.GetAttributeValue("class", "")
                        .Equals("credit_summary_item")).Where(x => x.Descendants("h4").FirstOrDefault().InnerText
                        .Contains("Director")).FirstOrDefault().Descendants("a");
                foreach (var dir in directors)
                {
                    var director = dir.InnerText;
                    if (director.Contains("credit"))
                    {
                        break;
                    }
                    directorsList.Add(director);
                }
                return directorsList;
            }
            
            return null;
        }

        private static List<Actor> ExtractActors(HtmlDocument doc)
        {
            var tableOfCast = doc.DocumentNode.Descendants("table").Where(x => x.GetAttributeValue("class", "").Equals("cast_list")).FirstOrDefault();
            List<Actor> actors = new List<Actor>();
            if (tableOfCast != null)
            {
                var listOfCast = tableOfCast.Descendants("tr").Where(x => x.GetAttributeValue("class", "").Equals("odd") || x.GetAttributeValue("class", "").Equals("even"));
                foreach (var actorNode in listOfCast)
                {
                    if (actorNode.Descendants("td").Any(x => x.GetAttributeValue("style", "").Contains("display:none;"))) {
                        continue;
                    }
                    var listOfTds = actorNode.Descendants("td").ToList();
                    var name = listOfTds[1].Descendants("a").FirstOrDefault().InnerText.Trim();
                    List<string> characters = new List<string>();
                    var chars = listOfTds[3].Descendants("a").ToList();
                    foreach (var ch in chars)
                    {
                        if (ch.GetAttributeValue("class","").Equals("toggle-episodes")) {
                            break;
                        }
                        characters.Add(ch.InnerText);
                    }
                    var actor = new Actor();
                    actor.Name = name;
                    actor.Characters = characters;
                    actors.Add(actor);
                }
                return actors;
            }
            return null;
        }



        private static List<string> ExtractWriters(HtmlNode node)
        {
            var hasWriters = node.Descendants("h4").Any(x => x.InnerText.Contains("Writers"));
            List<string> writersList = new List<string>();
            if (hasWriters)
            {
                var writers = node.Descendants("div").Where(x => x.GetAttributeValue("class", "")
                        .Equals("credit_summary_item")).Where(x => x.Descendants("h4").FirstOrDefault().InnerText
                        .Contains("Writers")).FirstOrDefault().Descendants("a");
                foreach (var writ in writers)
                {
                    var writer = writ.InnerText;
                    if (writer.Contains("credit"))
                    {
                        break;
                    }
                    writersList.Add(writer);
                }
                return writersList;
            }
            return null;
        }

        private static double? ExtractRating(HtmlNode node)
        {
            var rating = node.Descendants("span").Where(x => x.GetAttributeValue("itemprop", "").Equals("ratingValue")).FirstOrDefault();
            if (rating != null)
            {
                return double.Parse(rating.InnerText);
            }
            return null;
        }

        private static int? ExtractRatingCount(HtmlNode node)
        {
            var ratingCount = node.Descendants("span").Where(x => x.GetAttributeValue("itemprop", "").Equals("ratingCount")).FirstOrDefault();
            if (ratingCount != null)
            {
                var str = Regex.Replace(ratingCount.InnerText, "&nbsp;", string.Empty);
                str = FormatNumber(str);
                return int.Parse(str);
            }
            return null;
        }



        private static string ExtractTitle(HtmlNode node)
        {

            var originalTitle = node.Descendants("div").Where(x => x.GetAttributeValue("class", "")
                .Equals("originalTitle")).FirstOrDefault();
            string title = "";
            if (originalTitle != null)
            {
                title = originalTitle.ChildNodes[0].InnerText;
            }
            else
            {
                title = node.Descendants("h1").FirstOrDefault().InnerText;
                var regex = new Regex("&nbsp;");
                var s = regex.Split(title);
                title = s[0];
            }
            Console.WriteLine("********************** Count of valid pages: " + addedCount + "\t Total count: " + crowledCount);
            Console.WriteLine(title);
            return title;
        }

        private static string ExtractPlot(HtmlNode node)
        {
            var plot = node.Descendants("div").Where(x => x.GetAttributeValue("class", "").Equals("summary_text")).FirstOrDefault();

            if (plot != null)
            {
                if (plot.Descendants("a").FirstOrDefault() != null)
                {
                    var fullPlotUrl = plot.Descendants("a").FirstOrDefault().GetAttributeValue("href", "");
                    HtmlWeb fullPlotWeb = new HtmlWeb();
                    HtmlDocument fullPlotDoc = fullPlotWeb.Load(urlBase + fullPlotUrl);
                    var fullPlot = fullPlotDoc.DocumentNode.Descendants("ul").Where(x => x.GetAttributeValue("id", "").Equals("plot-summaries-content"))
                        .FirstOrDefault().Descendants("p").FirstOrDefault().InnerText.Trim();

                    return fullPlot;
                }
                return plot.InnerText.Trim();
            }
            return "Unknown";
        }

        static string FormatNumber(string input)
        {
            return input.Replace(" ", string.Empty).Replace(",", string.Empty).Replace("$", string.Empty).Replace("\n", string.Empty);
        }
    }

    [ElasticsearchType]
    [DataContract]
    class Movie
    {
        [DataMember(EmitDefaultValue = false)]
        public string Title { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public List<string> Countries { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public List<string> Languages { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public int? Budget { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public int? Gross { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public int? RunTimeInMinutes { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public List<string> Genres { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public double? Rating { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public int? RatingCount { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public List<string> Directors { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public List<string> Writers { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public string Plot { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public string ReleaseDate { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public List<Actor> Actors { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public string PosterUrl { get; set; }
    }

    public class Actor
    {
        public string Name { get; set; }
        public List<string> Characters { get; set; }
    }

    

    
}
