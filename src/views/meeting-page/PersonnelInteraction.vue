<template>
    <div>
        <div style="width:45%;height:100%;float:left;">
            <div style="width:50%;height:30px;margin-left:40%;margin-top:20px;font-size:18px;">
                <span>
                    关注人员数据
                </span>
            </div>
            <div style="margin-top:10px;overflow: auto;" v-bind:style="{height: myHeight}">
                <Table height="500" ref="selection" :columns="guestPersonColumns" :data="guestpersonlistPath" @on-selection-change="guestChange"></Table>
            </div>
        </div>
        <div style="width:10%;height:100%;float:left;">
            
            <div>
                <Button style="margin-left:10px;margin-top:150px;" type="primary" @click="coverBasic">关注覆盖基本</Button>
            </div>
            <div>
                <Button style="margin-left:10px;margin-top:40px;" type="primary" @click="coverGuest">基本覆盖关注</Button>
            </div>
            <div>
                <Button style="margin-left:10px;margin-top:40px;" type="primary" @click="importBasic">关注导入基本</Button>
            </div>
        </div>
        <div style="width:45%;height:100%;float:left;">
            <div style="width:50%;height:30px;margin-left:40%;margin-top:20px;font-size:18px;">
                <span>
                    基本人员数据
                </span>
            </div>
            <div style="margin-top:10px;overflow: auto;" v-bind:style="{height: myHeight}">
                <Table height="500" ref="selection" :columns="basicPersonColumns" :data="basicpersonlistPath" @on-selection-change="basicChange"></Table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            guestPersonColumns:[
                {type: 'selection', width: 35, align: 'center'},
                {title:'昵称*', key:'nickname', width: 100, align: 'center'},
                {title:'姓名', key:'name', width: 100, align: 'center'},
                {title:'单位', key:'unit', width: 120, align: 'center'},
                {title:'职务', key:'position', width: 100, align: 'center'},
                {title:'手机号', key:'phone', align: 'center'}
            ],
            basicPersonColumns:[
                {type: 'selection', width: 35, align: 'center'},
                {title:'姓名', key:'name', width: 100, align: 'center'},
                {title:'单位', key:'unit', width: 160, align: 'center'},
                {title:'职务', key:'position', width: 120, align: 'center'},
                {title:'手机号', key:'phone', align: 'center'}
            ],
            myHeight: (window.innerHeight - 220) + 'px',
            guestSelection: [],
            basicSelection: []
        };
    },
    methods:{
        guestChange(selection) {
            this.guestSelection = selection;
        },
        basicChange(selection) {
            this.basicSelection = selection;
        },
        coverBasic() {
            this.$Message.config({
                top: 50,
                duration: 3,
                width: 200
            });
            if (this.guestSelection.length !== 1) {
                this.$Message.info('请您选择一条关注人员');
                return false;
            }
            if (this.basicSelection.length !== 1) {
                this.$Message.info('请您选择一条基本人员');
                return false;
            }
            let this_ = this;
            this.$ajax.post('basicperson/editbasic',
                'guestSelection=' + JSON.stringify(this_.guestSelection) + 
                '&basicSelection=' + JSON.stringify(this_.basicSelection) +
                '&type=' + "1")
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.info('关注覆盖基本成功');
                        this_.$store.commit('basicpersonlist', response.data.basicpersonlist)
                        this_.$store.commit('guestpersonlist', response.data.guestpersonlist)
                    } else {
                        this_.$Message.info('关注覆盖基本失败');
                    }
                });
        },
        coverGuest() {
            this.$Message.config({
                top: 50,
                duration: 3,
                width: 200
            });
            if (this.guestSelection.length !== 1) {
                this.$Message.info('请您选择一条关注人员');
                return false;
            }
            if (this.basicSelection.length !== 1) {
                this.$Message.info('请您选择一条基本人员');
                return false;
            } 
            let this_ = this;
            this.$ajax.post('basicperson/editbasic',
                'guestSelection=' + JSON.stringify(this_.guestSelection) + 
                '&basicSelection=' + JSON.stringify(this_.basicSelection) +
                '&type=' + "2")
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.info('基本覆盖关注成功');
                        this_.$store.commit('basicpersonlist', response.data.basicpersonlist)
                        this_.$store.commit('guestpersonlist', response.data.guestpersonlist)
                    } else {
                        this_.$Message.info('基本覆盖关注失败');
                    }
                });
        },
        importBasic() {
            this.$Message.config({
                top: 50,
                duration: 3,
                width: 200
            });
            if (this.guestSelection.length === 0) {
                this.$Message.info('请您至少选择一条关注人员');
                return false;
            }
            let this_ = this;
            this.$ajax.post('basicperson/addbasic',
                'guestSelection=' + JSON.stringify(this_.guestSelection))
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.info('导入成功');
                        this_.$store.commit('basicpersonlist', response.data.basicpersonlist)
                    } else {
                        this_.$Message.info('导入失败');
                    }
                });
        },
    },
    computed: {
        guestpersonlistPath:function(){
            return this.$store.getters.guestpersonlistPath;
        },
        basicpersonlistPath: function () {
            return this.$store.getters.basicpersonlistPath;
        },
    }
}
</script>

