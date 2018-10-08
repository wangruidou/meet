import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import Axios from 'axios';

Axios.defaults.baseURL = 'http://47.92.2.135/meet/';

Vue.prototype.$ajax = Axios;

Vue.prototype.url = 'http://47.92.2.135';

Vue.use(VueI18n);
Vue.use(iView);

new Vue({
    el: '#app',
    router: router,
    store: store,

    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        // util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
        
        var _this = this;
        this.$ajax.post('meetingcolumns/list')
            .then(function (response) {
                _this.$store.commit('meetinglist', response.data.meetinglist); //会议信息
                _this.$store.commit('guestpersonlist', response.data.guestpersonlist); //关注人员信息
                _this.$store.commit('basicpersonlist', response.data.basicpersonlist); //基本人员信息（导入部分）
                _this.$store.commit('personcontentlist', response.data.personcontentlist); //人员信息字典表---标签集合
                _this.$store.commit('groupslist', response.data.groupslist); //所有组
                _this.$store.commit('dispatchtasklist', response.data.dispatchtasklist); //分派任务集合
                _this.$store.commit('pushinformationlist', response.data.pushinformationlist); //推送信息集合
                _this.$store.commit('handlingmethodlist', response.data.handlingmethodlist); //推送信息处理方法
                _this.$store.commit('meetingpersonlist', response.data.meetingpersonlist); //参会人员
                _this.$store.commit('logslist', response.data.logslist); //日志信息
                _this.$store.commit('labelstatuslist', response.data.labelstatuslist); //标签状态
            });
    }
});
