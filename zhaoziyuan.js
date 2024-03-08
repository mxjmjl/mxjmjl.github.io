var rule={
    title:'找资源',
    模板:'AlistShare',
    host:'https://zhaoziyuan1.cc/',
    url:'/index.php/vod/show/id/fyclass/page/fypage.html',
    filterable:0,//是否启用分类筛选,
    filter_url:'',
    filter: {},
    searchUrl:'/so?filename=**',
    searchable:2,
    // 图片来源:'https://inews.gtimg.com/newsapp_bt/0/13263837859/1000',
    class_parse: 'ul.nav-menu-items&&li.nav-menu-item;a.nav-link&&Text;a.nav-link&&href;/(\\d+).html',
    推荐:';;*;*;*;*',
    double:true,
    一级:'*;*;*;*;*',
    二级:`js:
       let id=input;
       let title="";
       let pic="";
       let typeName="";
       let dec="";
       let remark="";
       let vod={vod_id:id,vod_name:title,vod_pic:pic,type_name:typeName,vod_remarks:remark,vod_content:dec};
       let html = getHtml(MY_URL);
       let patternAli = new RegExp('(https:\\/\\/www\.alipan\.com\\/s\\/[^"]+)|(https:\\/\\/www\.aliyundrive\.com\\/s\\/[^"]+)', 'g');
       let matches = html.match(patternAli);

       initAlistShare();
       let alistVod = alistDetailContent(vod ,matches);
       TABS = alistVod.tabs
       LISTS = alistVod.lists
       detailError = alistVod.error
       vod["vod_play_from"]=alistVod.tabs.join("$$$");

       for (var i in LISTS) {
           if (LISTS.hasOwnProperty(i)) {
             // print(i);
             try {
               LISTS[i] = LISTS[i].map(function (it) {
                 return it.split('$').slice(0, 2).join('$');
               });
             } catch (e) {
               print('格式化LISTS发生错误:' + e.message);
             }
           }
       }
       vod_play_url = LISTS.map(function (it) {
           return it.join('#');
       }).join("$$$");
       vod["vod_play_url"]=vod_play_url;
       VOD=vod;
    `,
    搜索:'div.li_con .news_text a;h3&&Text;;p&&Text;a&&href',
}