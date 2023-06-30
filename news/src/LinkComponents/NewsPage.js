import React from "react";
import { useParams } from "react-router-dom";



function NewsPage() {
  const { "*": restOfURL } = useParams();


  const decodedURL = unescape(restOfURL);


  const snippetRegex = /snippet":"([^"]{3,})"/;
  const snippetMatch = decodedURL.match(snippetRegex);

  const headlineRegex = /headline":{"main":"([^"]{3,})"/;
  const headlineMatch = decodedURL.match(headlineRegex);

  const multimediaRegex = /multimedia":\[(.*?)\]/;
  const multimediaMatch = decodedURL.match(multimediaRegex);

  let imageUrl = "";
  if (multimediaMatch) {
    const multimediaData = JSON.parse(`[${multimediaMatch[1]}]`);
    const photo = multimediaData.find((item) => item.subtype === "popup");
    if (photo) {
      imageUrl = decodeURIComponent(photo.url);
    }
  }

  const sourceRegex = /source":"([^"]{3,})"/;
  const sourceMatch = decodedURL.match(sourceRegex);

  const webUrlRegex = /web_url":"([^"]{3,})"/;
  const webUrlMatch = decodedURL.match(webUrlRegex);

  if (snippetMatch && headlineMatch && sourceMatch && webUrlMatch) {
    const snippetText = snippetMatch[1];
    const headlineText = headlineMatch[1];
    const sourceText = sourceMatch[1];
    const webUrlText = webUrlMatch[1];

    return (
      <div className="news">
       <img src="https://i.gifer.com/4lZa.gif" alt="Animated GIF"></img>
        <h2>{headlineText}</h2>
        <p> {snippetText}</p>
        <p>Source: {sourceText}</p>
        <a href={webUrlText}>Original Link</a>
      </div>
    );
  }

  return (
    <div>
      <p>No data found</p>
    </div>
  );
}

export default NewsPage;
