<template>
  <div class="animated fadeIn">
    <Row>
        <Card>
            <p slot="title" style="height:30px">
                <Icon type="compose"></Icon>
                推送消息历史详情
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                会议名称：{{this.$route.query.meeting}}
            </p>
            <Table highlight-row ref="personRowTable" :columns="personColumns" :data="logs_data" style="margin-bottom:5px;"></Table>
            <Page :total="pageTotal" :page-size="pageSize" :current="pageNumber" size="small" class="paging" show-total @on-change="handlePage"></Page>
            <br>
        </Card>
    </Row>
  </div>
</template>

<script>
export default {
    data () {
        return {
            pageSize: 10,
            pageNumber: 1,
            personColumns: [
                {title: '序号', type: 'index', width: 70, align: 'center'}, // 单选
                {title: '操作模块', key: 'log_type', width: 200, align: 'center'},
                {title: '推送信息内容', key: 'log_content', align: 'center'},
                {title: '组名/人名', key: 'groupname', width: 300, align: 'center'},
                {title: '操作时间', key: 'log_time', width: 300, align: 'center'}
            ]
        };
    },
    methods: {
        handlePage (index) {
            this.pageNumber = index;
        },
    },
    computed: {
        guestgroupPath: function () {
            return this.$store.getters.guestgroupPath;
        },
        workgroupPath: function () {
            return this.$store.getters.workgroupPath;
        },
        attendgroupPath: function () {
            return this.$store.getters.attendgroupPath;
        },
        meetingpersonPath: function () {
            return this.$store.getters.meetingpersonPath;
        },
        logsPath: function () {
            return this.$store.getters.logsPath;
        },
        pageTotal: function () {
            let logs = this.logsPath;
            let log_data = [];
            for (let i = 0; i < logs.length; i++) {
                if (logs[i].meetid !== '' && logs[i].meetid !== undefined) {
                    if (logs[i].meetid === this.$route.query.sceneid) {
                        log_data.push(logs[i]);
                    }
                }
            }
            if (log_data.length > 0) {
                return log_data.length;
            }
        },
        logs_data: function () {
            let logs = this.logsPath;
            let meetingperson = this.meetingpersonPath;
            let log_data = [];
            let group = this.guestgroupPath.concat(this.workgroupPath,this.attendgroupPath);
            for (let i = 0; i < logs.length; i++) {
                let b = '';
                if (logs[i].meetid !== '' && logs[i].meetid !== undefined) {
                    if (logs[i].meetid === this.$route.query.sceneid) {
                        if (logs[i].groups !== '') {
                            let groups = logs[i].groups.split(',');
                            for (let j = 0; j < groups.length; j++) {
                                if (logs[i].log_type == "推送具体信息") {
                                    for (let z = 0; z < meetingperson.length; z++) {
                                        if (meetingperson[z].openid === groups[j]) {
                                            b += meetingperson[z].name + ',';
                                        }
                                    }
                                } else {
                                    for (let z = 0; z < group.length; z++) {
                                        if (group[z].id === groups[j]) {
                                            b += group[z].group_name + ',';
                                        }
                                    }
                                }
                            }
                        }
                        b = b.substring(0, b.length - 1);
                        logs[i].groupname = b;
                        log_data.push(logs[i]);
                    }
                }
            }
            if (log_data.length > 0) {
                return log_data.slice((this.pageNumber - 1) * this.pageSize, this.pageNumber * this.pageSize);
            }
        }
    },
    created() {
        var _this = this;
        this.$ajax.post('meetingcolumns/list')
            .then(function (response) {
                _this.$store.commit('logslist', response.data.logslist);
            });
    }
};
</script>

<style lang="less">
  body .ivu-modal .ivu-select-dropdown{
    position: fixed !important;
  }
  .paging{
      float: right;
      margin-bottom: 10px;
  }
</style>
