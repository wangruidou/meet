<template>
  <div v-bind:style="{height: myHeight}" class="animated fadeIn">
      <Row>
        <Card>
            <tr>
                <textarea v-model="content" style="width:600px;height:100px;margin-top:5px;" placeholder="请输入推送内容..."></textarea>
            </tr>
            <tr>
                <td>
                    <Transfer
                        :titles="['所有人员', '选择人员']"
                        :data="outsidegrouppersonlistPath"
                        :target-keys="targetKeys"
                        filterable
                        :filter-method="filterMethod"
                        :render-format="rander"
                        @on-change="handleChange" style="margin-top:10px;" >
                    </Transfer>
                </td>
            </tr>
            <tr>
                <Button style="float:right;margin-top:15px;" type="primary" @click="push()">推送信息</Button>
            </tr>
        </Card>
    </Row>
  </div>
</template>

<script>
export default {
    data () {
        return {
            targetKeys: [],
            content:'',
            myHeight: (window.innerHeight - 260) + 'px',
        };
    },
    methods: {
        rander (item) {
            if (item.name !== '' && item.name !== undefined) {
                return item.name;
            } else {
                return item.nickname;
            }
        },
        handleChange (newTargetKeys) {
            let targetEle = '';
            for (let i = 0; i < this.outsidegrouppersonlistPath.length; i++) {
                // 目标列表数据
                for (var j = 0; j < newTargetKeys.length; j++) {
                    if (this.outsidegrouppersonlistPath[i].key === newTargetKeys[j]) {
                        targetEle += this.outsidegrouppersonlistPath[i].key + ',';
                    }
                }
            }
            this.targetEle = targetEle.substring(0, targetEle.length - 1);
            this.targetKeys = newTargetKeys;
        },
        filterMethod (data, query) {
            if (data.name !== '' && data.name !== undefined) {
                return data.name.indexOf(query) > -1;
            } else {
                return data.nickname.indexOf(query) > -1;
            }
        },
        push () {
            let content = this.content;
            this.$Message.config({
                top: 50,
                duration: 3,
                width: 200
            });
            if (content === '') {
                this.$Message.info('请输入发送信息！！');
                return false;
            };
            if (this.targetEle === '' || this.targetEle === undefined || this.targetEle ==='undefined') {
                this.$Message.info('请您至少选择一个人！！');
                return false;
            };
            let this_ = this;
            this.$ajax.post('sendinfo/pushWorker',
                'content=' + content + '&persons=' + this_.targetEle + '&meetid=' + this_.$route.query.sceneid)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('发送成功');
                    } else {
                        this_.$Message.info('发送失败');
                    }
                });
        }
    },
    computed: {
        outsidegrouppersonlistPath: function () {
            return this.$store.getters.outsidegrouppersonlistPath;
        }
    }
};
</script>

<style lang="less">
    // 隐藏Modal的footer
    .ivu-modal-footer{
        display: none
    }
</style>
