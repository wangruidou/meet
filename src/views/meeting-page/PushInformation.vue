<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:33px">
                    <Icon type="compose"></Icon>
                    推送信息
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    会议名称：{{this.$route.query.meeting}}
                    <Button style="margin-right:100px;float:right;" type="primary" @click="handleSelect()">发送</Button>
                </p>
                <div class="tab-con">
                    <Col span="10">
                        <Button style="margin-left:300px;margin:10px;" type="primary" @click="createPushInformation('formItem')">新建事件</Button>
                        <Table ref="selection" :columns="pushinformation_col" :data="pushinformation"  @on-row-click="dj" @on-selection-change="changeSelect"></Table>
                    </Col>
                    <Col span="9" class="tab-incon">
                        <Row type="flex" align="middle">                        
                            <Button style="margin-left:300px;margin:10px;" type="primary" @click="createHandLingmethod('formItem1')">新建处理方法</Button>                        
                            <div style="width: 100%">
                                <DragableTable v-model="handlingmethod" :columns-list="handlingmethod_col"></DragableTable>
                            </div>
                        </Row>
                    </Col>
                </div>
            </Card>
        </Row>
        <Modal v-model="modal" title="事件信息">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
                <FormItem label="事件名称" prop="pushname">
                    <Input v-model="formItem.pushname" placeholder="请输入..." clearable></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formItem')">保存</Button>
                    <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
        
        <Modal v-model="modal1" title="处理方法信息" width="600">
            <Form ref="formItem1" :model="formItem1" :rules="ruleValidate1" :label-width="100">
                <FormItem label="处理方法名称" prop="handlingmethod">
                    <Input v-model="formItem1.handlingmethod" placeholder="请输入..." clearable></Input>
                </FormItem>
                <FormItem label="选择组">
                    <Transfer
                        :titles="['所有组', '选择组']"
                        :data="attendgroupPath"
                        :target-keys="targetKeys"
                        filterable
                        :filter-method="filterMethod"
                        :render-format="rander_attendgroup"
                        @on-change="handleChange">
                    </Transfer>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit1('formItem1')">保存</Button>
                    <Button type="ghost" @click="handleReset1('formItem1')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import DragableTable from '../tables/components/dragableTable';

export default {
    name: 'dragable-table',
    components: {
        DragableTable
    },
    data () {
        return {
            showInfo: false,
            pushinformation_col: [
                {type: 'selection', width: 60, align: 'center'},
                {title: '序号', type: 'index', width: 60, align: 'center'}, // 单选
                {title: '事件名称', key: 'pushname', width: 150, align: 'center'},
                {title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.editPush(params.row);
                                    }
                                }
                            }, '修改'),
                            h('Poptip', {
                                props: {
                                    confirm: true,
                                    title: '您确定要删除这条数据吗?',
                                    transfer: true
                                },
                                on: {
                                    'on-ok': () => {
                                        this.deletePush(params.row.id);
                                    }
                                }
                            }, [
                                h('Button', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        placement: 'top'
                                    }
                                }, '删除')
                            ])
                        ]);
                    }
                }
            ],
            handlingmethod_col: [
                {title: '处理方法', key: 'handlingmethod', width: 200, align: 'center'},
                {title: '组名', key: 'groupname', width: 300, align: 'center'},
                {title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.editHandling(params.row);
                                    }
                                }
                            }, '修改'),
                            h('Poptip', {
                                props: {
                                    confirm: true,
                                    title: '您确定要删除这条数据吗?',
                                    transfer: true
                                },
                                on: {
                                    'on-ok': () => {
                                        this.deleteHandlingMethod(params.row.id);
                                    }
                                }
                            }, [
                                h('Button', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        placement: 'top'
                                    }
                                }, '删除')
                            ])
                        ]);
                    }
                }
            ],
            modal: false,
            modal1: false,
            INDEX: -1,
            formItem: {
                id: '',
                pushname: '',
                meetid: '',
                type: ''
            },
            addPush: {
                id: '',
                pushname: '',
                meetid: '',
                type: ''
            },
            formItem1: {
                id: '',
                handlingmethod: '',
                groupids: '',
                groups: '',
                pushid: '',
                groupname: '',
                type: ''
            },
            addHandling: {
                id: '',
                handlingmethod: '',
                groupids: '',
                groups: '',
                pushid: '',
                groupname: '',
                type: ''
            },
            ruleValidate: {
                pushname: [
                    { required: true, message: '事件名称不能为空', trigger: 'blur' }
                ]
            },
            ruleValidate1: {
                handlingmethod: [
                    { required: true, message: '处理方法不能为空', trigger: 'blur' }
                ]
            },
            argetEle: '',
            targetKeys: [],
            targetEle: '',
            targetEleName: '',
            status: '',
            pushid: '',
            selection: [],
            row: ''
        };
    },
    methods: {
        rander_attendgroup (item) {
            return item.group_name;
        },
        editPush (row) {
            this.INDEX = row.id;
            this.formItem = JSON.parse(JSON.stringify(row));
            this.modal = true;
        },
        editHandling (row) {
            this.INDEX = row.id;
            let result = row.groupids.split(',');
            this.targetEle = row.groupids;
            this.targetEleName = row.groupname;
            this.targetKeys = this.getTargetKeys(1, result);
            this.formItem1 = JSON.parse(JSON.stringify(row));
            this.modal1 = true;
        },
        createPushInformation (name) {
            this.INDEX = -1;
            this.$refs[name].resetFields();
            this.addPush = {
                id: '',
                pushname: '',
                meetid: '',
                type: ''
            };
            this.modal = true;
        },
        createHandLingmethod (name) {
            if (this.pushid === '') {
                this.$Message.config({
                    top: 50,
                    duration: 3,
                    width: 200
                });
                this.$Message.info('请您选择事件！！');
                return false;
            }
            this.INDEX = -1;
            this.$refs[name].resetFields();
            this.addHandling = {
                id: '',
                handlingmethod: '',
                groupids: '',
                groups: '',
                pushid: '',
                groupname: '',
                type: ''
            };
            this.modal1 = true;
            this.targetKeys = this.getTargetKeys(0, '');
            this.targetEle = '';
            this.targetEleName = '';
        },
        handleSubmit (name) {
            let this_ = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.INDEX !== -1) {
                        let _index = this_.INDEX;
                        this_.formItem.id = _index;
                        this_.formItem.meetid = this_.$route.query.sceneid;
                        this_.formItem.type = '2';
                        this.$ajax.post('pushinformation/edit',
                            'pushname=' + this_.formItem.pushname + '&id=' + _index)
                            .then(function (response) {
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('修改成功');
                                    this_.$store.commit('pushinformationlist', this_.formItem);
                                } else {
                                    this_.$Message.info('修改失败');
                                }
                            });
                    } else {
                        this.$ajax.post('pushinformation/add',
                            'pushname=' + this_.formItem.pushname + '&meetid=' + this_.$route.query.sceneid)
                            .then(function (response) {
                                this_.addPush.id = response.data.id;
                                this_.addPush.pushname = this_.formItem.pushname;
                                this_.addPush.meetid = this_.$route.query.sceneid;
                                this_.addPush.type = '1';
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('添加成功');
                                    this_.$store.commit('pushinformationlist', this_.addPush);
                                } else {
                                    this_.$Message.info('添加失败');
                                }
                            });
                    }
                    this.modal = false;
                } else {
                    this.modal = true;
                }
            });
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        handleSubmit1 (name) {
            let this_ = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.INDEX !== -1) {
                        let _index = this_.INDEX;
                        this_.formItem1.id = _index;
                        this_.formItem1.groupids = this_.targetEle;
                        this_.formItem1.groups = this_.status;
                        this_.formItem1.pushid = this_.pushid;
                        this_.formItem1.groupname = this_.targetEleName;
                        this_.formItem1.type = '2';
                        this.$ajax.post('handlingmethod/edit',
                            'handlingmethod=' + this_.formItem1.handlingmethod + '&pushid=' + this_.pushid +
                            '&groups=' + this_.status + '&groupids=' + this_.targetEle + '&id=' + _index)
                            .then(function (response) {
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('修改成功');
                                    this_.$store.commit('handlingmethodlist', this_.formItem1);
                                } else {
                                    this_.$Message.info('修改失败');
                                }
                            });
                    } else {
                        this.$ajax.post('handlingmethod/add',
                            'handlingmethod=' + this_.formItem1.handlingmethod + '&groupids=' + this_.targetEle +
                            '&groups=' + this_.status + '&pushid=' + this_.pushid)
                            .then(function (response) {
                                this_.addHandling.id = response.data.id;
                                this_.addHandling.handlingmethod = this_.formItem1.handlingmethod;
                                this_.addHandling.groupids = this_.targetEle;
                                this_.addHandling.groups = this_.status;
                                this_.addHandling.pushid = this_.pushid;
                                this_.addHandling.groupname = this_.targetEleName;
                                this_.addHandling.type = '1';
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('添加成功');
                                    this_.$store.commit('handlingmethodlist', this_.addHandling);
                                } else {
                                    this_.$Message.info('添加失败');
                                }
                            });
                    }
                    this.modal1 = false;
                } else {
                    this.modal1 = true;
                }
            });
        },
        handleReset1 (name) {
            this.$refs[name].resetFields();
        },
        dj (a) {
            this.pushid = a.id;
        },
        getTargetKeys (a, result) {
            if (a === 0) {
                return this.attendgroupPath.filter(item => item.key);
            } else if (a === 1) {
                let ary = [];
                for (let i = 0; i < result.length; i++) {
                    ary.push(result[i]);
                }
                return ary;
            }
        },
        handleChange (newTargetKeys) {
            let targetEle = '';
            let targetEleName = '';
            for (let i = 0; i < this.attendgroupPath.length; i++) {
                // 目标列表数据
                for (var j = 0; j < newTargetKeys.length; j++) {
                    if (this.attendgroupPath[i].key === newTargetKeys[j]) {
                        targetEle += this.attendgroupPath[i].key + ',';
                        targetEleName += this.attendgroupPath[i].label + ',';
                    }
                }
            }
            this.targetEle = targetEle.substring(0, targetEle.length - 1);
            this.targetEleName = targetEleName.substring(0, targetEleName.length - 1);
            this.targetKeys = newTargetKeys;
        },
        filterMethod (data, query) {
            return data.group_name.indexOf(query) > -1;
        },
        handleSelect () {
            this.$Message.config({
                top: 50,
                duration: 3,
                width: 200
            });
            if (this.selection.length === 0) {
                this.$Message.info('请您选择发送事件！！');
                return false;
            }
            if (this.handlingmethod.length === 0) {
                this.$Message.info('请您创建处理方法！！');
                return false;
            }
            let this_ = this;
            this.$ajax.post('sendinfo/pushInfo',
                'selection=' + JSON.stringify(this_.selection) + '&data=' + JSON.stringify(this_.handlingmethod) +
                '&pushid=' + this_.pushid + '&meetid=' + this_.$route.query.sceneid)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('推送成功');
                    } else {
                        this_.$Message.info('推送失败');
                    }
                });
        },
        changeSelect (selection) {
            this.selection = selection;
        },
        deletePush (id) {
            if (this.handlingmethod.length > 0) {
                this.$Message.config({
                    top: 50,
                    duration: 3,
                    width: 200
                });
                this.$Message.info('请先删除处理方式！');
                return false;
            }

            let this_ = this;
            this_.formItem.id = id;
            this_.formItem.type = '3';
            this.$ajax.post('pushinformation/delete',
                'id=' + id)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('删除成功');
                        this_.$store.commit('pushinformationlist', this_.formItem);
                    } else {
                        this_.$Message.info('删除失败');
                    }
                });
        },
        deleteHandlingMethod (id) {
            let this_ = this;
            this_.formItem1.id = id;
            this_.formItem1.type = '3';
            this.$ajax.post('handlingmethod/delete',
                'id=' + id)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('删除成功');
                        this_.$store.commit('handlingmethodlist', this_.formItem1);
                    } else {
                        this_.$Message.info('删除失败');
                    }
                });
        }
    },
    computed: {
        pushinformationPath: function () {
            return this.$store.getters.pushinformationPath;
        },
        handlingmethodPath: function () {
            return this.$store.getters.handlingmethodPath;
        },
        attendgroupPath: function () {
            let attendgroup = this.$store.getters.attendgroupPath;
            let attend = [];
            for (let i = 0; i < attendgroup.length; i++) {
                if (attendgroup[i].meetid === this.$route.query.sceneid) {
                    attend.push(attendgroup[i]);
                }
            }
            return attend;
        },
        pushinformation: function () {
            let p = this.pushinformationPath;
            let pp = [];
            for (let i = 0; i < p.length; i++) {
                if (p[i].meetid === this.$route.query.sceneid) {
                    pp.push(p[i]);
                }
            }
            return pp;
        },
        handlingmethod: function () {
            let a = '';
            if (this.pushid === '') {
                if (this.pushinformation.length > 0) {
                    a = this.pushinformation[0].id;
                }
                this.pushid = a;
            } else {
                a = this.pushid;
            }

            let h = this.handlingmethodPath;
            let attendgroup = this.attendgroupPath;

            let hl = [];
            let b = '';
            for (let i = 0; i < h.length; i++) {
                if (h[i].groupids !== '') {
                    let groupid = h[i].groupids.split(',');
                    for (let j = 0; j < groupid.length; j++) {
                        for (let z = 0; z < attendgroup.length; z++) {
                            if (attendgroup[z].id === groupid[j]) {
                                b += attendgroup[z].group_name + ',';
                            }
                        }
                    }
                }
                b = b.substring(0, b.length - 1);
                h[i].groupname = b;
                b = '';
                if (h[i].pushid === a) {
                    hl.push(h[i]);
                }
            }
            return hl;
        }
    }
};
</script>

<style>
.tab-con{
    height: 440px;
}
.tab-incon{
    width: 50%;
    height: 100%;
}
</style>
