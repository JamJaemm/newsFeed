let loginUserNickname = null;
let writeNickname = null;
let loginUserId = null;
let isLiked = false;

function getNews() {
  $.ajax({
    type: "GET",
    url: "/getnews",
    success: function (res) {
      const news = res.news;
      news.map((item) => {
        newsId = item.newsId;
        userId = item.UserId;
        img = item.img;
        title = item.title;
        createdAt = item.createdAt.substring(0, 10);
        user = item.User.nickname;

        const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" /></a>
                                <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p><a href="modify.html/user/?userId=${userId}">${user}</a></p>
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
    success: function (res) {
      window.location.reload();
    },
    error: function (error) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    },
  });
}

// 로그아웃 버튼
function log_out() {
  $.ajax({
    type: "POST",
    url: "/logout",
    success: function () {
      location.reload();
    },
  });
}

// 로그인 체크
function login_check() {
  if (document.cookie) {
    $.ajax({
      type: "GET",
      url: "/logincheck",
      success: function (res) {
        const userInfo = res.userInfo;

        const userId = userInfo.userId;
        const id = userInfo.id;

        const template = `<div class="login-user">
                            <p class="login-id">접속중인 id : <a href="/modify.html/user/?userId=${userId}">${id}</p>
                          </div>`;

        $(".user-form").html(template);
        $(".logout-btn").removeClass("blind");

        loginUserNickname = userInfo.nickname;
        loginUserId = userId;
        console.log(loginUserId);
      },
    });
  }
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
        userId = item.UserId;
        img = item.img;
        title = item.title;
        createdAt = item.createdAt.substring(0, 10);
        user = item.User.nickname;

        const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" /></a>
                                <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p><a href="modify.html/user/?userId=${userId}">${user}</a></p>
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
        userId = item.UserId;
        img = item.img;
        title = item.title;
        createdAt = item.createdAt.substring(0, 10);
        user = item.User.nickname;

        const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" /></a>
                                <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p><a href="modify.html/user/?userId=${userId}">${user}</a></p>
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
            userId = item.UserId;
            img = item.img;
            title = item.title;
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                                <li class="news-list">
                                  <div class="news-card">
                                    <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" /></a>
                                    <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                    <p>${createdAt}</p>
                                    <p><a href="modify.html/user/?userId=${userId}">${user}</a></p>
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
            userId = item.UserId;
            img = item.img;
            title = item.title;
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                                <li class="news-list">
                                  <div class="news-card">
                                    <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" /></a>
                                    <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                    <p>${createdAt}</p>
                                    <p><a href="modify.html/user/?userId=${userId}">${user}</a></p>
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
            userId = item.UserId;
            img = item.img;
            title = item.title;
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                                <li class="news-list">
                                  <div class="news-card">
                                    <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" /></a>
                                    <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                    <p>${createdAt}</p>
                                    <p><a href="modify.html/user/?userId=${userId}">${user}</a></p>
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
            userId = item.UserId;
            img = item.img;
            title = item.title;
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                                <li class="news-list">
                                  <div class="news-card">
                                   <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" /></a>
                                    <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                    <p>${createdAt}</p>
                                    <p><a href="modify.html/user/?userId=${userId}">${user}</a></p>
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
            userId = item.UserId;
            img = item.img;
            title = item.title;
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                                <li class="news-list">
                                  <div class="news-card">
                                  <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" /></a>
                                    <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                    <p>${createdAt}</p>
                                    <p><a href="modify.html/user/?userId=${userId}">${user}</a></p>
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

function getNewsDetail(goodsId, callback) {
    $.ajax({
        type: "GET",
        url: `/api/news/${newsId}`,
        error: function (xhr, status, error) {
            if (status == 401) {
                alert("로그인이 필요합니다.");
            } else {
                alert("알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.");
            }
        },
        success: function (response) {
          const [news] = response.news;
          writeNickname = news.nickname;
            callback(response.news);
        },
    });
}

function getNewsDetailLiked(newsId, callback) {
  $.ajax({
      type: "GET",
      url: `/api/like/${newsId}`,
      error: function (xhr, status, error) {
        console.log(error);
        alert("알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.");
      },
      success: function (response) {
        callback(response.likedCount.count);
      },
  });
}

function getUserlikedcheck(newsId) {
  $.ajax({
    type: "GET",
    url: `/api/like/${newsId}/${loginUserId}`,
    error: function (xhr, status, error) {
        alert("알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.");
    },
    success: function (response) {
      console.log(response);
      if(response.isLiked) isLiked = true;
      else isLiked = false;
    },
  });
}

function clickLikedBtn(newsId) {
  if(!isLiked) {
    console.log("UP");
    $.ajax({
      type: "POST",
      url: `/api/like/${newsId}`,
      error: function (xhr, status, error) {
          alert(xhr.responseJSON.errorMessage);
      },
      success: function () {
        window.location.reload();
      },
    });
  } else {
    console.log("Down");
    $.ajax({
      type: "DELETE",
      url: `/api/like/${newsId}`,
      error: function (xhr, status, error) {
        alert(xhr.responseJSON.errorMessage);
      },
      success: function () {
        window.location.reload();
      },
    });
  }
}

function btnReady(){
  if(loginUserNickname === writeNickname){
    const template = `
      <button onclick=clickUpdateBtn(newsId)>수정</button>
      <button onclick=clickDeleteBtn(newsId)>삭제</button>
    `;

    $("#updateBtnDiv").append(template);
  }
}

function clickUpdateBtn(newsId){
  console.log('수정');
}

function clickDeleteBtn(newsId){
  console.log('삭제');
}
