var rule = {
    title: 'RRDY網',
    host: 'https://www.rrdynb.com',
    homeUrl: '/',
    url: '/fyclass_fypage.html?',
    filter_url: '{{fl.class}}',
    filter: {},
    searchUrl: '/plus/search.php?q=**&pagesize=10&submit=',
    searchable: 2,
    quickSearch: 1,
    filterable: 0,
    headers: {
        'User-Agent': 'PC_UA',
        'Cookie': ''
    },
    timeout: 5000,
    class_name: '影视&電視劇&老電影&動漫',
    class_url: 'movie/list_2&dianshiju/list_6&zongyi/list_10&dongman/list_13',
    play_parse: true,
    play_json: [{
        re: '*',
        json: {
            parse: 0,
            jx: 0
        }
    }],
	lazy:`js:
	input = panPlay(input,playObj.flag)
	`,
    limit: 6,
    推荐: 'div.stui-vodlist__box;a&&title;a&&data-original;;a&&href',
    一级: 'li:has(img);img&&alt;img&&data-original;;a&&href',
    二级: {
        title: "h1&&Text",
        img: "img&&src",
        desc: "",
        content: "span&&Text",
        tabs: `js: pdfh = jsp.pdfh;
        pdfa = jsp.pdfa;
        pd = jsp.pd;
        TABS = []
        let d = pdfa(html, 'span a');
        let listurl = [];
        d.forEach(function(it) {
            let burl = pdfh(it, 'a&&href');
            if (burl.startsWith("https://www.aliyundrive.com/s/") ||
                burl.startsWith("https://www.alipan.com/s/") || 
                burl.startsWith("https://pan.quark.cn/s/") ||
                burl.startsWith("https://pan.xunlei.com/s/") ||
                burl.startsWith("https://pan.baidu.com/s/") ){
               listurl.push(burl);
           }
        });
        if (listurl.length){
            initPan();
            let alistVod = panDetailContent(vod ,listurl);
            TABS = alistVod.tabs
            LISTS = alistVod.lists
            detailError = alistVod.error
        }
        `,
		lists:`js:`,

    },
    搜索: 'li:has(img);h2&&Text;img&&data-original;.tags&&Text;a&&href',
}