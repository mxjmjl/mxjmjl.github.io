var rule = {
    title: 'dydhhy',
    host: 'http://www.dydhhy.com',
    homeUrl: '/',
    url: '/tag/fyclass/page/fypage?',
    filter_url: '{{fl.class}}',
    filter: {},
    searchUrl: '/?s=**',
    searchable: 2,
    quickSearch: 1,
    filterable: 0,
    headers: {
        'User-Agent': 'MOBILE_UA',
        'Cookie': ''
    },
    timeout: 5000,
    class_name: '电视剧&电影&美剧&韩剧&日剧&英剧&2023&2022&2021',
    class_url: 'tv&movie&美剧&韩剧&日剧&英剧&2023&2022&2021',
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
    推荐: 'div.clear:gt(1):has(img);.entry-title&&Text;img&&src;;a&&href',
    一级: 'div.clear:gt(1):has(img);.entry-title&&Text;img&&src;;a&&href',
    二级: {
        title: ".single-excerpt&&Text",
        img: "img&&src",
        desc: ".entry-date&&Text",
        content: "p&&Text",
        tabs: `js: pdfh = jsp.pdfh;
        pdfa = jsp.pdfa;
        pd = jsp.pd;
TABS=[]
let d = pdfa(html, 'fieldset p a');
let listurl = [];
d.forEach(function(it) {
	let burl = pdfh(it, 'a&&href');
	if (burl.startsWith("https://www.aliyundrive.com/s/") || burl.startsWith("https://www.alipan.com/s/")){
		listurl.push(burl);
	}else if (burl.startsWith("https://pan.quark.cn/s/")){
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
lists: `js:`,
}, 搜索: 'div.clear:gt(0):has(img);img&&alt;img&&src;;a&&href',
}