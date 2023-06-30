function getNews() {
  $.ajax({
    type: "GET",
    url: "/getnews",
    success: function (res) {
      const news = res.news;
      news.map((item) => {
        newsId = item.newsId;
        img = item.img;
        title = item.title;
        createdAt = item.createdAt.substring(0, 10);
        user = item.User.nickname;

        const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/localhost:3018/news/${newsId}"><img src="http://placehold.it/360x300" alt="#" /></a>
                                <h3><a href="/localhost:3018/news/${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p>${user}</p>
                              </div>
                            </li>
                          </ul>`;

        $(".news-category").html("축구소식");
        $(".news-box").append(template);
      });
    },
  });
}

// 로그인 버튼
function sign_in() {
  let id = $("#id").val();
  let password = $("#password").val();
  console.log(id, password);
  $.ajax({
    type: "POST",
    url: "/login",
    data: {
      id: id,
      password: password,
    },
    success: function (response) {
      console.log("로그인 성공");
    },
    error: function (error) {
      console.log("로그인 실패");
    },
  });
}

// 로그아웃 버튼
function log_out() {
  $.ajax({
    type: "POST",
    url: "/logout",
  });
}

// 국내축구 카테고리
function k_football() {
  $(".news-box").empty();
  $.ajax({
    type: "GET",
    url: "/getnews",
    success: function (res) {
      const news = res.news;
      const newsList = news.filter((a) => {
        return a["category"] === "국내";
      });
      newsList.filter((item) => {
        newsId = item.newsId;
        img = item.img;
        title = item.title;
        createdAt = item.createdAt.substring(0, 10);
        user = item.User.nickname;

        const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/localhost:3018/news/${newsId}"><img src="${img}" alt="#" /> 사진</a>
                                <h3><a href="/localhost:3018/news/${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p>${user}</p>
                              </div>
                            </li>
                          </ul>`;

        $(".news-category").html(`${item.category}축구`);
        $(".news-box").append(template);
      });
    },
  });
}

// 해외축구 카테고리
function w_football() {
  $(".news-box").empty();
  $.ajax({
    type: "GET",
    url: "/getnews",
    success: function (res) {
      const news = res.news;
      const newsList = news.filter((a) => {
        return a["category"] === "해외";
      });
      newsList.map((item) => {
        newsId = item.newsId;
        img = item.img;
        title = item.title;
        createdAt = item.createdAt.substring(0, 10);
        user = item.User.nickname;

        const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/localhost:3018/news/${newsId}"><img src="${img}" alt="#" /> 사진</a>
                                <h3><a href="/localhost:3018/news/${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p>${user}</p>
                              </div>
                            </li>
                          </ul>`;

        $(".news-category").html(`${item.category}축구`);
        $(".news-box").append(template);
      });
    },
  });
}

// 최신, 과거순 정렬 함수
function dateSort() {
  $(".news-box").empty();

  // 정렬 버튼 텍스트
  let sortBtnText = $(".date-sort-btn").html();
  // 카테고리 텍스트
  let category = $(".news-category").html();

  // 과거순으로
  if (sortBtnText === "최신순") {
    if (category === "국내축구") {
      $.ajax({
        type: "GET",
        url: "/getoldnews",
        success: function (res) {
          const news = res.news;
          const newsList = news.filter((a) => {
            return a["category"] === "국내";
          });
          newsList.map((item) => {
            newsId = item.newsId;
            img = item.img;
            title = item.title;
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                                <li class="news-list">
                                  <div class="news-card">
                                    <a href="/localhost:3018/news/${newsId}"><img src="${img}" alt="#" /> 사진</a>
                                    <h3><a href="/localhost:3018/news/${newsId}">${title}</a></h3>
                                    <p>${createdAt}</p>
                                    <p>${user}</p>
                                  </div>
                                </li>
                              </ul>`;

            $(".news-category").html(`${item.category}축구`);
            $(".news-box").append(template);
          });
          $(".date-sort-btn").html("과거순");
        },
      });
    } else if (category === "해외축구") {
      $.ajax({
        type: "GET",
        url: "/getoldnews",
        success: function (res) {
          const news = res.news;
          const newsList = news.filter((a) => {
            return a["category"] === "해외";
          });
          newsList.map((item) => {
            newsId = item.newsId;
            img = item.img;
            title = item.title;
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                                <li class="news-list">
                                  <div class="news-card">
                                    <a href="/localhost:3018/news/${newsId}"><img src="${img}" alt="#" /> 사진</a>
                                    <h3><a href="/localhost:3018/news/${newsId}">${title}</a></h3>
                                    <p>${createdAt}</p>
                                    <p>${user}</p>
                                  </div>
                                </li>
                              </ul>`;

            $(".news-category").html(`${item.category}축구`);
            $(".news-box").append(template);
          });
          $(".date-sort-btn").html("과거순");
        },
      });
    } else {
      $.ajax({
        type: "GET",
        url: "/getoldnews",
        success: function (res) {
          const news = res.news;
          news.map((item) => {
            newsId = item.newsId;
            img = item.img;
            title = item.title;
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                                <li class="news-list">
                                  <div class="news-card">
                                    <a href="/localhost:3018/news/${newsId}"><img src="${img}" alt="#" /> 사진</a>
                                    <h3><a href="/localhost:3018/news/${newsId}">${title}</a></h3>
                                    <p>${createdAt}</p>
                                    <p>${user}</p>
                                  </div>
                                </li>
                              </ul>`;

            $(".news-category").html(`축구소식`);
            $(".news-box").append(template);
          });
          $(".date-sort-btn").html("과거순");
        },
      });
    }
  }
  // 최신순으로
  else if (sortBtnText === "과거순") {
    if (category === "국내축구") {
      $.ajax({
        type: "GET",
        url: "/getnews",
        success: function (res) {
          const news = res.news;
          const newsList = news.filter((a) => {
            return a["category"] === "국내";
          });
          newsList.map((item) => {
            newsId = item.newsId;
            img = item.img;
            title = item.title;
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                                <li class="news-list">
                                  <div class="news-card">
                                    <a href="/localhost:3018/news/${newsId}"><img src="${img}" alt="#" /> 사진</a>
                                    <h3><a href="/localhost:3018/news/${newsId}">${title}</a></h3>
                                    <p>${createdAt}</p>
                                    <p>${user}</p>
                                  </div>
                                </li>
                              </ul>`;

            $(".news-category").html(`${item.category}축구`);
            $(".news-box").append(template);
          });
          $(".date-sort-btn").html("최신순");
        },
      });
    } else if (category === "해외축구") {
      $.ajax({
        type: "GET",
        url: "/getnews",
        success: function (res) {
          const news = res.news;
          const newsList = news.filter((a) => {
            return a["category"] === "해외";
          });
          newsList.map((item) => {
            newsId = item.newsId;
            img = item.img;
            title = item.title;
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                                <li class="news-list">
                                  <div class="news-card">
                                    <a href="/localhost:3018/news/${newsId}"><img src="${img}" alt="#" /> 사진</a>
                                    <h3><a href="/localhost:3018/news/${newsId}">${title}</a></h3>
                                    <p>${createdAt}</p>
                                    <p>${user}</p>
                                  </div>
                                </li>
                              </ul>`;

            $(".news-category").html(`${item.category}축구`);
            $(".news-box").append(template);
          });
          $(".date-sort-btn").html("최신순");
        },
      });
    } else {
      getNews();
      $(".date-sort-btn").html("최신순");
    }
  }
}
