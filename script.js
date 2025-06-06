const apiKey = 'YOUR_YOUTUBE_API_KEY'; // 여기에 네 API 키 삽입

async function searchYouTube() {
  const query = document.getElementById('search').value;
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;

  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  for (const item of searchData.items) {
    const videoId = item.id.videoId;
    const title = item.snippet.title;

    const commentsUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=20&order=relevance&key=${apiKey}`;
    const commentsRes = await fetch(commentsUrl);
    const commentsData = await commentsRes.json();

    const videoDiv = document.createElement('div');
    videoDiv.className = 'video';
    videoDiv.innerHTML = `
      <h2>${title}</h2>
      <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
      <h3>인기 댓글:</h3>
    `;

    if (commentsData.items) {
      for (const commentItem of commentsData.items) {
        const commentText = commentItem.snippet.topLevelComment.snippet.textDisplay;
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = commentText;
        videoDiv.appendChild(commentDiv);
      }
    }

    resultsDiv.appendChild(videoDiv);
  }
}
