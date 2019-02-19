<template>
    <div class="animated fadeIn">
        <Row>
            <Card>
                <p slot="title" style="height:20px">
                    <Icon type="compose"></Icon>
                    会议名称：{{this.$route.query.meeting}}
                </p>
                <Tabs type="card" value="0" :animated="false" @on-click="tabPane">
                    <TabPane name="0" label="参会人员管理" >
                        <StaffManagement></StaffManagement>
                    </TabPane>
                    <TabPane name="1" label="参会人员分组" >
                        <GroupParticipants></GroupParticipants>
                    </TabPane>
                    <TabPane name="2" label="工作人员分组" >
                        <WorkGroupManage></WorkGroupManage>
                    </TabPane>
                    <TabPane name="3" label="分派任务" >
                        <AssigningTask></AssigningTask>
                    </TabPane>
                    <TabPane name="4" label="发布会议" >
                        <ReleaseConference></ReleaseConference>
                    </TabPane>
                    <TabPane name="5" label="推送信息" >
                        <PushInformation></PushInformation>
                    </TabPane>
                    <TabPane name="6" label="推送信息(参会人)" >
                        <Push></Push>
                    </TabPane>
                    <TabPane name="7" label="推送信息(工作人)" >
                        <PushWorker></PushWorker>
                    </TabPane>
                    <TabPane name="8" label="推送消息历史" >
                        <PushHistory></PushHistory>
                    </TabPane>
                    <TabPane name="9" label="查看签到二维码" >
                        <img style="margin-left:300px;margin-right:50px;" :src="img" width="400" height="400">
                    </TabPane>
                </Tabs>
            </Card>
        </Row>
    </div>
</template>
<script>
import StaffManagement from './StaffManagement.vue'
import GroupParticipants from './GroupParticipants.vue'
import WorkGroupManage from './WorkGroupManage.vue'
import AssigningTask from './AssigningTask.vue'
import ReleaseConference from './ReleaseConference.vue'
import PushInformation from './PushInformation.vue'
import Push from './Push.vue'
import PushWorker from './PushWorker.vue'
import PushHistory from './PushHistory.vue'
export default {
    data () {
        return {
            img : this.url+"/meet/qrcode/getPhoto?photo_name="+this.$route.query.id,
        };
    },
    components:{
        StaffManagement,
        GroupParticipants,
        WorkGroupManage,
        AssigningTask,
        ReleaseConference,
        PushInformation,
        Push,
        PushWorker,
        PushHistory
    },
    methods:{
        tabPane(data) {
            if(data == 0) {
                var _this = this;
                this.$ajax.post('meetingcolumns/list')
                    .then(function (response) {
                        _this.$store.commit('meetingpersonlist', response.data.meetingpersonlist);
                    });
            } else if (data == 8) {
                var _this = this;
                this.$ajax.post('meetingcolumns/list')
                    .then(function (response) {
                        _this.$store.commit('logslist', response.data.logslist);
                    });
            }
        }
    }
}
</script>
