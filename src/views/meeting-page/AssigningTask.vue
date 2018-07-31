<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:30px">
                    <Icon type="compose"></Icon>
                    任务详情
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    会议名称：{{this.$route.query.meeting}}
                    <Button style="margin-right:200px;float:right;" type="primary" @click="handleSelect()">发送任务</Button>
                    <Button style="margin-right:50px;float:right;" type="primary" @click="createTask('formItem')">新建任务</Button>
                </p>
                <Table :columns="dispatchtask_col" :data="dispatchtask_data" @on-selection-change="change"></Table>
            </Card>
        </Row>
        <Modal v-model="modal1" title="任务信息" width="600">
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
            <FormItem label="任务名称" prop="taskname">
                <Input v-model="formItem.taskname" placeholder="请输入..." clearable></Input>
            </FormItem>
            <FormItem label="工作时间" prop="workingtime">
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择时间..." @on-change="formatDate" v-model="formItem.workingtime"></DatePicker>
            </FormItem>
            <FormItem label="工作进度" prop="jobschedule">
                <Input v-model="formItem.jobschedule" placeholder="请输入..." clearable></Input>
            </FormItem>
            <FormItem label="主负责人" prop="principal">
                <Input v-model="formItem.principal" placeholder="请输入..." clearable></Input>
            </FormItem>
            <FormItem label="选择组">
                <Transfer
                    :titles="['所有组', '选择组']"
                    :data="workgroupPath"
                    :target-keys="targetKeys"
                    filterable
                    :filter-method="filterMethod"
                    :render-format="rander_group"
                    @on-change="handleChange">
                </Transfer>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formItem')">保存</Button>
                <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <div slot="footer"></div>
    </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            showInfo: false,
            dispatchtask_col: [
                {type: 'selection', width: 60, align: 'center'},
                {title: '序号', type: 'index', width: 60, align: 'center'}, // 单选
                {title: '任务名称', key: 'taskname', width: 150, align: 'center'},
                {title: '工作时间', key: 'workingtime', width: 150, align: 'center'},
                {title: '工作进度', key: 'jobschedule', width: 150, align: 'center'},
                {title: '主负责人', key: 'principal', width: 160, align: 'center'},
                {title: '组名', key: 'groupname', width: 160, align: 'center'},
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
                                        this.edit(params.row);
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
                                        this.delete(params.row.id);
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
            modal1: false,
            INDEX: -1,
            NEW_DATE: '',
            formItem: {
                id: '',
                taskname: '',
                workingtime: '',
                jobschedule: '',
                principal: '',
                meettask: '',
                groups: '',
                groupname: '',
                type: ''
            },
            addDispatchTask: {
                id: '',
                taskname: '',
                workingtime: '',
                jobschedule: '',
                principal: '',
                meettask: '',
                groups: '',
                groupname: '',
                type: ''
            },
            ruleValidate: {
                taskname: [
                    { required: true, message: '任务名称不能为空', trigger: 'blur' }
                ],
                jobschedule: [
                    { required: true, message: '工作进度不能为空', trigger: 'blur' }
                ],
                principal: [
                    { required: true, message: '主负责人不能为空', trigger: 'blur' }
                ]
            },
            targetKeys: [],
            targetEle: '',
            targetEleName: '',
            selection: []
        };
    },
    methods: {
        rander_group (item) {
            return item.group_name;
        },
        edit (row) {
            this.INDEX = row.id;
            this.NEW_DATE = '';
            let result = row.groups.split(',');
            this.targetEle = row.groups;
            this.targetEleName = row.groupname;
            this.targetKeys = this.getTargetKeys(1, result);
            this.formItem = JSON.parse(JSON.stringify(row));
            this.modal1 = true;
        },
        createTask (name) {
            this.INDEX = -1;
            this.$refs[name].resetFields();
            this.addDispatchTask = {
                id: '',
                taskname: '',
                workingtime: '',
                jobschedule: '',
                principal: '',
                meettask: '',
                groups: '',
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
                        if (this_.NEW_DATE !== '') {
                            this_.formItem.workingtime = this_.NEW_DATE;
                        } else {
                            if (this_.formItem.workingtime !== '') {
                                let d = new Date(this_.formItem.workingtime);
                                var a = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()];
                                for (var i = 0, len = a.length; i < len; i++) {
                                    if (a[i] < 10) {
                                        a[i] = '0' + a[i];
                                    }
                                }
                                this_.formItem.workingtime = a[0] + '-' + a[1] + '-' + a[2] + ' ' + a[3] + ':' + a[4];
                            }
                        }
                        this_.formItem.id = _index;
                        this_.formItem.groups = this_.targetEle;
                        this_.formItem.groupname = this_.targetEleName;
                        this_.formItem.type = '2';
                        this.$ajax.post('dispatchtask/edit',
                            'taskname=' + this_.formItem.taskname + '&workingtime=' + this_.formItem.workingtime +
                            '&jobschedule=' + this_.formItem.jobschedule + '&principal=' + this_.formItem.principal +
                            '&groups=' + this_.targetEle + '&id=' + _index)
                            .then(function (response) {
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('修改成功');
                                    this_.$store.commit('dispatchtasklist', this_.formItem);
                                } else {
                                    this_.$Message.info('修改失败');
                                }
                            });
                    } else {
                        this.$ajax.post('dispatchtask/add',
                            'taskname=' + this_.formItem.taskname + '&workingtime=' + this_.NEW_DATE +
                            '&jobschedule=' + this_.formItem.jobschedule + '&principal=' + this_.formItem.principal +
                            '&groups=' + this_.targetEle + '&meettask=' + this_.$route.query.dispatchtask_id)
                            .then(function (response) {
                                this_.addDispatchTask.id = response.data.id;
                                this_.addDispatchTask.taskname = this_.formItem.taskname;
                                this_.addDispatchTask.workingtime = this_.NEW_DATE;
                                this_.addDispatchTask.jobschedule = this_.formItem.jobschedule;
                                this_.addDispatchTask.principal = this_.formItem.principal;
                                this_.addDispatchTask.meettask = this_.$route.query.dispatchtask_id;
                                this_.addDispatchTask.groups = this_.targetEle;
                                this_.addDispatchTask.groupname = this_.targetEleName;
                                this_.addDispatchTask.type = '1';
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('添加成功');
                                    this_.$store.commit('dispatchtasklist', this_.addDispatchTask);
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
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        formatDate (nDate) {
            this.NEW_DATE = nDate;
        },
        getTargetKeys (a, result) {
            if (a === 0) {
                return this.workgroupPath.filter(item => item.key);
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
            for (let i = 0; i < this.workgroupPath.length; i++) {
                // 目标列表数据
                for (var j = 0; j < newTargetKeys.length; j++) {
                    if (this.workgroupPath[i].key === newTargetKeys[j]) {
                        targetEle += this.workgroupPath[i].key + ',';
                        targetEleName += this.workgroupPath[i].group_name + ',';
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
            if (this.selection.length === 0) {
                this.$Message.config({
                    top: 50,
                    duration: 3,
                    width: 200
                });
                this.$Message.info('请您选择发送任务！！');
                return false;
            }
            let this_ = this;
            this.$ajax.post('sendinfo/assigningTask',
                'selection=' + JSON.stringify(this_.selection))
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
        },
        change (selection) {
            this.selection = selection;
        },
        delete (id) {
            let this_ = this;
            this_.formItem.id = id;
            this_.formItem.type = '3';
            this.$ajax.post('dispatchtask/delete',
                'id=' + id)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('删除成功');
                        this_.$store.commit('dispatchtasklist', this_.formItem);
                    } else {
                        this_.$Message.info('删除失败');
                    }
                });
        }
    },
    computed: {
        workgroupPath: function () {
            let group = this.$store.getters.workgroupPath;
            let workgroup = [];
            for (let i = 0; i < group.length; i++) {
                if (group[i].meetid !== '' && group[i].meetid !== undefined) {
                    if (group[i].meetid === this.$route.query.sceneid) {
                        workgroup.push(group[i]);
                    }
                }
            }
            return workgroup;
        },
        dispatchtask_data: function () {
            let dispatchtask = this.$store.getters.dispatchtaskPath;
            let group = this.workgroupPath;
            let b = '';
            let hh = [];
            for (let i = 0; i < dispatchtask.length; i++) {
                if (dispatchtask[i].meettask === this.$route.query.dispatchtask_id) {
                    if (dispatchtask[i].groups !== '') {
                        let groupid = dispatchtask[i].groups.split(',');
                        for (let j = 0; j < groupid.length; j++) {
                            for (let z = 0; z < group.length; z++) {
                                if (group[z].id === groupid[j]) {
                                    b += group[z].group_name + ',';
                                }
                            }
                        }
                    }
                    b = b.substring(0, b.length - 1);
                    dispatchtask[i].groupname = b;
                    b = '';
                    hh.push(dispatchtask[i]);
                }
            }
            return hh;
        }
    }
};
</script>
