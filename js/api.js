// API 說明文件：https://hackmd.io/wA0Zeuk8QI-i7jeEXVssIA?view

// 串接

const apiPath = 'https://2023-engineer-camp.zeabur.app';

let worksData = [];
let pagesData = {};

const data = { type: '', sort: 0, page: 1, search: '' }

function getData({ type, sort, page, search }){

  // 中括號包參數：代表在目標物件中提取 type, sort, page, search 四種屬性用來撰寫完整的 api 路徑（如下所示）
  // 因此應該是用來告訴提供 api 的伺服器 “我們需要哪些資料” 吧！

  const apiUrl = `${apiPath}/api/v1/works?sort=${sort}&page=${page}&${type ? `type=${type}&` : ''}${search ? `search=${search}` : ''}`
  // 如果 type 存在，則生成字串 `type=${type}&` ( & 用來連結後面的search ) 若不存在則生成空字串
  axios.get(apiUrl)
    .then(function(response){
      worksData = response.data.ai_works.data;
      pagesData = response.data.ai_works.page;
      renderWorks();
      renderPages();
    })

}

getData(data); // 代入物件 data 後執行函式

// 渲染 - worksData（函式名稱及基本架構參考穎旻老師的範本）

function renderWorks(){

  let works = '';
  worksData.forEach(function(item){
    works += /*html*/ `
    <div class="col-lg-4 col-md-6">
        <div class="ai-card">
            <div class="overflow-hidden">
                <img class="w-100" src="${item.imageUrl}" alt="${item.title}">
            </div>
            <h5 class="card-title px-6 pt-4">${item.title}</h5>
            <div class="card-info px-6 pb-4 flex-grow-1 d-flex flex-column justify-content-between">
                <p>作者：${item.discordId}</p>
                <p>${item.description}</p>
            </div>
            <div class="card-section">
                <p class="fw-bold">AI 模型</p>
                <p>${item.model}</p>
            </div>
            <div class="card-section">
                <a href="#" alt=""># ${item.type}</a>
                <a target="_blank" href="${item.link}" title="${item.title}"><span class="material-icons">share</span></a>
            </div>
        </div>
    </div>`;
  });
  document.querySelector('.ai-cards-list').innerHTML = works;

}

// 切換分頁

function changePages() {

  document.querySelector('.pagination').addEventListener('click', function(e){
    
    e.preventDefault();

    if (e.target.nodeName == 'UL' ) { return };
    
    let pageId = '';
    pageId = e.target.dataset.page;
    data.page = Number(pageId);
    
    // 字串轉數字
    
    if (!pageId) { data.page = Number(pagesData.current_page) + 1; }
    // 如果點擊的元素不存在 pageId 則讓代表現在頁面的值加一
    
    getData(data);

  }, false)

};

// 渲染分頁

function renderPages() {

  let pageStr = ''

  // 根據總頁數，製作分頁鈕

  for (i=1;i<=pagesData.total_pages;i++) {
    
    pageStr += /*html*/ `
    <li><a class="page ${pagesData.current_page == i ? 'active' : ''}" data-page=${i} href="#">${i}</a></li>
    `

  };

  // 製作 "下一頁" 按鈕（如果沒有下一頁，該按鈕不會出現）

  if (pagesData.has_next == true) {

    pageStr += /*html*/ `
    <li><a class="page" href="#"><span class="material-icons">chevron_right</span></a></li>
    `

  };

  document.querySelector('.pagination').innerHTML = pageStr;

  // 呼叫切換分頁的函式

  changePages(pagesData);
  
}

// 切換作品排序

document.querySelector('.new-to-old').addEventListener('click',function(e){
  data.sort = 0;
  getData(data);
},false)

document.querySelector('.old-to-new').addEventListener('click',function(e){
  data.sort = 1;
  getData(data);
},false)