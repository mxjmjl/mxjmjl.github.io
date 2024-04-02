var rule = {
	title:'美剧迷[磁]',
	host:'https://www.meijumi.net',
	//homeUrl:'/',
	//url: '/fyclass/page/fypage/?',
	homeUrl:'https://www.meijumi.net/',
	url: 'https://www.meijumi.net/fyclass/page/fypage/?',
	filter_url:'{{fl.class}}',
	filter:{
	},
	searchUrl: 'https://www.meijumi.net/?s=**',
	searchable:2,
	quickSearch:0,
	filterable:0,
	headers:{
		'User-Agent': 'PC_UA',
		'Accept': '*/*',
		'Referer': 'https://www.meijumi.net/'
	},
	timeout:5000,
	class_name:'最近更新&美剧&灵异/惊悚&魔幻/科幻&罪案/动作谍战&剧情/历史&喜剧&律政/医务&动漫/动画&纪录片&综艺/真人秀&英剧&韩剧',
	class_url:'news&usa&usa/xuanyi&usa/mohuan&usa/zuian&usa/qinggan&usa/xiju&usa/yiwu&usa/katong&usa/jilu&usa/zongyi&en&hanju',
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
	推荐:'',
	推荐:`js:
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
let d = [];
let html = request(input);
let items;
items = pdfa(html, 'main#main div.hd ul li:has(>a>img)');
items.forEach(it => {
	let burl = rule.homeUrl.replace("https://www.meijumi.net/","") + pd(it, 'a&&href').replace(rule.host, "https://www.meijumi.net");
	d.push({
		title: pdfh(it, 'li p&&Text'),
		desc: '',
		pic_url: pd(it, 'img&&src', HOST),
		url: burl
	});
});
items = pdfa(html, 'main#main div.hd div.huandeng span:has(>a>img)');
if (typeof items !== "undefined") {
	items.forEach(it => {
		let burl = rule.homeUrl.replace("https://www.meijumi.net/","") + pd(it, 'a&&href').replace(rule.host, "https://www.meijumi.net");
		d.push({
			title: pdfh(it, 'span p&&Text'),
			desc: '',
			pic_url: pd(it, 'img&&src', HOST),
			url: burl
		});
	});
}
items = pdfa(html, 'main#main div#pingbi_gg div:has(>div>a>img)');
if (typeof items !== "undefined") {
	items.forEach(it => {
		let burl = rule.homeUrl.replace("https://www.meijumi.net/","") + pd(it, 'a&&href').replace(rule.host, "https://www.meijumi.net");
		d.push({
			title: pdfh(it, 'a&&title'),
			desc: pdfh(it, 'div&&span b&&Text'),
			pic_url: pd(it, 'img&&src', HOST),
			url: burl
		});
	});
}
items = pdfa(html, 'main#main div#pingbi_gg div:has(>header>div>a)');
if (typeof items !== "undefined") {
	items.forEach(it => {
		let burl = rule.homeUrl.replace("https://www.meijumi.net/","") + pd(it, 'header a&&href').replace(rule.host, "https://www.meijumi.net");
		d.push({
			title: pdfh(it, 'header a&&Text'),
			desc: pdfh(it, 'header&&div span&&Text'),
			pic_url: pd(it, 'figure img&&src', HOST),
			url: burl
		});
	});
}
setResult(d);
`,
	一级:'',
	一级:`js:
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
let d = [];
if (MY_CATE !== "news" ){
	let html = request(input);
	let list = pdfa(html, 'div#post_list_box article');
	list.forEach(it => {
		let burl = rule.homeUrl.replace("https://www.meijumi.net/","") + pd(it, 'header a&&href').replace(rule.host, "https://www.meijumi.net");
		d.push({
			title: pdfh(it, 'header a&&Text'),
			desc: pdfh(it, 'div.entry-content span:eq(1)&&Text'),
			pic_url: pd(it, 'figure img&&src', HOST),
			url: burl
		});
	})
}else{
	input = rule.homeUrl + MY_CATE + '/';
	let html = request(input);
	let list = pdfa(html, 'article ol&&li');
	list.forEach(it => {
		let burl = rule.homeUrl.replace("https://www.meijumi.net/","") + pd(it, 'a&&href').replace(rule.host, "https://www.meijumi.net");
		d.push({
			title: pdfh(it, 'a&&Text'),
			desc: pdfh(it, 'li&&span:eq(3)&&Text') + ' / 更新' + pdfh(it, 'li&&span:eq(1)&&Text'),
			pic_url: '',
			url: burl
		});
	})
}
setResult(d);
	`,
	二级:{
		title:"article&&header&&h1&&Text",
		img:"article div.single-content img&&src",
		desc:"article div.single-content blockquote&&Text",
		content:"article div.single-content table&&Text",
		tabs:`js:`,
		lists:`js:
log(TABS);
pdfh=jsp.pdfh;pdfa=jsp.pdfa;pd=jsp.pd;
let listurl = [];
let d = pdfa(html, 'article div.single-content&&p:has(>a)');
d.forEach(function(it) {
	let playUrls = pdfa(it, 'a');
	let title="";
	playUrls.forEach(function(playUrl) {
		let purl = pdfh(playUrl, 'a&&href');
		if (true || title === ""){
			title = pdfh(playUrl, 'a&&Text');
		}
		if (purl.startsWith("magnet")){
			let magfn = title;
			try {
				magfn = purl.match(/(^|&)dn=([^&]*)(&|$)/)[2];
			}catch(e){
				magfn = title;
			}
			let resolution = "unknown";
			try {
				resolution = magfn.match(/(1080|720|2160|4k|4K)/)[1];
			}catch(e){
				resolution = "unknown";
			}
			magfn = resolution + "." + magfn;
			log("tabs magnet filename>>>>>>>>>>>" + magfn);
		}else if (purl.startsWith("https://www.aliyundrive.com/s/") || purl.startsWith("https://www.alipan.com/s/")){
			listurl.push(purl);
		}else if (purl.startsWith("https://pan.quark.cn/s/")){
			listurl.push(purl);
		}
	});
});
if (listurl.length){
	initPan();
	let alistVod = panDetailContent(vod ,listurl);
	TABS = alistVod.tabs
	LISTS = alistVod.lists
	detailError = alistVod.error
}
`,

	},
	搜索:'ul.search-page article;h2&&Text;a img&&src;div.entry-content span:eq(1)&&Text;a&&href;div.entry-content div.archive-content&&Text',
}