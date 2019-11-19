var queryURL = "https://www.goodreads.com/search/index.xml?key=ntj35uAln93Ca74x0mChdA&q=Madeline";

fetch(queryURL)
    .then(response => response.text())
    .then(data => {

        // data = the raw xml data
        console.log(data);
        var compactJson = xmlConvert.xml2json(data, {
            compact: true,
            spaces: 4
        });
        var fullJson = convert.xml2json(xml, {
            compact: false,
            spaces: 4
        });
        console.log(compactJson, '\n', fullJson);
        //this parses the XML data
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "application/xml");
        console.log(xml);

        // this takes the parsed XML data and assigns the array of titles to the variable titles
        let titles = xml.getElementsByTagName("title");
        //then takes the text from the first title in the array
        let title = titles[0].firstChild.nodeValue;
        console.log(title);
        document.getElementById("title").textContent = title;


        // this takes the parsed XML data and assigns the array of names to the variable authors
        let authors = xml.getElementsByTagName("name");
        //then takes the text from the first authir in the array
        let author = authors[0].firstChild.nodeValue;
        console.log(author);
        document.getElementById("author").textContent = author;


        // this takes the parsed XML data and assigns the array of average_ratings to the variable ratings
        let ratings = xml.getElementsByTagName("average_rating");
        //then takes the text from the first title in the array
        let rating = ratings[0].firstChild.nodeValue;
        console.log(rating);
        document.getElementById("rating").textContent = rating;

        // this takes the parsed XML data and assigns the array of image_urls to the variable covers
        let covers = xml.getElementsByTagName("image_url");
        //then takes the text from the first cover in the array
        let cover = covers[0].firstChild.nodeValue;
        console.log(cover);
        document.getElementById("cover").textContent = cover;


    });