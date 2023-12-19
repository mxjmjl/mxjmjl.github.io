var rule = {
    title: '玩偶哥哥',
    host: 'http://home.jundie.top:9520',
    homeUrl: '/spider/csp_Wogg?ac=detail',
    searchUrl: '/spider/csp_Wogg?ac=detail&wd=**&pg=fypage',
    detailUrl: '/spider/csp_Wogg?ac=detail&ids=fyid', //非必填,二级详情拼接链接
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    play_parse: false,
    lazy: '',
    multi: 1,
    timeout: 5000,
    limit: 6,
    url: '/spider/csp_Wogg?ac=detail&t=fyclass&pg=fypage&f=',
    class_name: '电影&剧集&动漫&综艺&音乐',
    class_url: '1&2&3&4&5',
    play_parse:true,
    lazy:`js:
    input = alistPlay(input,playObj.flag)
    `,
    推荐: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    一级: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    二级访问前: `js:
        url = rule.detailUrl.replaceAll('fyid', detailUrl).replaceAll('fyclass', fyclass);
        MY_URL = urljoin(rule.homeUrl, url);
    `,
    二级: `js:
        let html = request(input);
        let list = JSON.parse(html).list;
        if(list.length===1){
           var vod = list[0];
           var shareUrl = vod.vod_content;
           let parts = shareUrl.split("\\n");
           if (parts.length > 1) {
            shareUrl = parts[1].trim();
            shareUrl = shareUrl.replace("www.alipan.com","www.aliyundrive.com")
            vod.vod_remarks = shareUrl;
            vod.vod_actor = ""
            vod.vod_pic = ""
            initAlistShare();
            let alistVod = alistDetailContent(vod ,[shareUrl]);
            TABS = alistVod.tabs
            LISTS = alistVod.lists
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
           }
            VOD = vod;
        }
    `,
    搜索: 'json:list;vod_name;vod_pic;vod_remarks;vod_id'
}