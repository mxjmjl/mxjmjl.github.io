var rule = {
	title:'校长影视[云盘]',
	host:'https://xzys.fun',
        homeUrl: '/',
	url: '/fyclass.html?page=fypage',
	filter_url:'{{fl.class}}',
	filter:{
	},
	searchUrl: '/search.html?keyword=**',
	searchable:2,
	quickSearch:0,
	filterable:0,
	headers:{
		'User-Agent': 'PC_UA',
         	'Cookie':''
	},
	timeout:5000,
	class_name: '电视剧&电影&动漫&纪录片&综艺',
	class_url: 'dsj&dy&dm&jlp&zy',
	play_parse:true,
	play_json:[{
		re:'*',
		json:{
			parse:0,
			jx:0
		}
	}],
	lazy:`js:
	input = panPlay(input,playObj.flag)
	`,
	limit:6,
	推荐:'div.container div.row a:has(>img);img&&alt;img&&src;img&&alt;a&&href',
	一级:'div.container div.row div.list-boxes;img&&alt;img&&src;div.list-actions&&Text;a&&href',
	二级:{
		title:"div.container div.row h1&&Text",
		img:"div.container div.row img&&src",
		desc:'div.container div.row div.article-infobox&&Text', //remark
		content:'div.container div.row div#info&&Text',
		tabs:`js:
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
TABS=[]
let d = pdfa(html, 'div.tc-box a');
let listurl = [];
d.forEach(function(it) {
	let burl = pdfh(it, 'a&&href') || '';

	if (burl.startsWith("https://www.aliyundrive.com/s/") ||
	 burl.startsWith("https://www.alipan.com/s/") || 
	 burl.startsWith("https://pan.quark.cn/s/") ||
	 burl.startsWith("https://pan.xunlei.com/s/") ||
	 burl.startsWith("https://pan.baidu.com/s/") ){
		listurl.push(burl);
	}else if (burl.startsWith("magnet")){
		listurl.push(burl);
	}else if (burl.startsWith("ed2k")){
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
	搜索:`js:
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
if (rule_fetch_params.headers.Cookie.startsWith("http")){
	rule_fetch_params.headers.Cookie=fetch(rule_fetch_params.headers.Cookie);
	let cookie = rule_fetch_params.headers.Cookie;
	setItem(RULE_CK, cookie);
};
log('xzys seach cookie>>>>>>>>>>>>>' + rule_fetch_params.headers.Cookie);
let _fetch_params = JSON.parse(JSON.stringify(rule_fetch_params));
log("xzys search params>>>>>>>>>>>>>>>" + JSON.stringify(_fetch_params));
let search_html = request( HOST + '/search.html?keyword=' + encodeURIComponent(KEY), _fetch_params)
//log("xzys search result>>>>>>>>>>>>>>>" + search_html);
let d=[];
let dlist = pdfa(search_html, 'div.container div.row div.list-boxes');
dlist.forEach(function(it){
	let title = pdfh(it, 'h2 a img&&alt');
	if (searchObj.quick === true){
		if (title.includes(KEY)){
			title = KEY;
		}
	}
	let img = pd(it, 'h2 a img&&src', HOST);
	let content = pdfh(it, 'p.text_p&&Text');
	let desc = pdfh(it, 'div.list-actions&&Text'); //remark
	let url = pd(it, 'h2 a&&href', HOST);
	d.push({
		title:title,
		img:img,
		content:content,
		desc:desc,
		url:url
		})
});
setResult(d);
`,
}