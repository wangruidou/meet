<template>
  <div class="animated fadeIn">
    <div class="ivu-row">
        <Row>
            <Col span="6">
                <AutoComplete v-model="value" :data="searchlist" @on-search="search" placeholder="查询会议"></AutoComplete>
            </Col>
            <Col span="4" offset="14">
                <Button type="primary" @click="createMeeting('formItem')">新建会议</Button>
            </Col>
        </Row>
    </div>
    <br>
    <Table highlight-row ref="currentRowTable" :columns="columns1" :data="data1"></Table>
    <Modal v-model="modal1" title="会议信息">
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
            <FormItem label="会议名称" prop="meet_name">
                <Input v-model="formItem.meet_name" placeholder="请输入..." clearable></Input>
            </FormItem>
            <FormItem label="会议时间" prop="meet_date">
                <DatePicker type="daterange" placeholder="请选择时间..." @on-change="formatDate" v-model="formItem.meet_date"></DatePicker>
            </FormItem>
            <FormItem label="会议地点" prop="meet_address">
                <Input v-model="formItem.meet_address" placeholder="请输入..." clearable></Input>
            </FormItem>
            <FormItem label="主办方" prop="meet_sponsor">
                <Input v-model="formItem.meet_sponsor" placeholder="请输入..." clearable></Input>
            </FormItem>
            <FormItem label="会议主题" prop="meet_theme">
                <Input v-model="formItem.meet_theme" placeholder="请输入..." clearable></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formItem')">保存</Button>
                <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <div slot="footer"></div>
    </Modal>
    <Modal v-model="img" title="二维码图片">
        <img style="margin-left:40px;margin-right:50px;" id="img" width="400" height="400">
        <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>

export default {
    data () {
        return {
            value: '',
            columns1: [
                { title: '序号', type: 'index', width: 70, align: 'center'}, // 单选
                { title: '会议名称', key: 'meet_name', width: 240, align: 'center'},
                { title: '会议时间', key: 'meet_date', width: 170, align: 'center'},
                { title: '会议地点', key: 'meet_address', width: 170, align: 'center'},
                { title: '主办方', key: 'meet_sponsor', width: 170, align: 'center'},
                { title: '主题', key: 'meet_theme', align: 'center'},
                { title: '操作',
                    key: 'action',
                    width: 230,
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
                            ]),
                            h('Dropdown', {
                                props: {
                                    transfer: true
                                },
                                on: {
                                    'on-click': (type) => {
                                        this.more(type, params.row);
                                    }
                                }
                            }, [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    }
                                }, '更多'),
                                h('DropdownMenu', {
                                    slot: 'list'
                                }, [
                                    h('DropdownItem', {
                                        props: {
                                            name: 'staffmanagement'
                                        }
                                    }, '参会人员管理'),
                                    h('DropdownItem', {
                                        props: {
                                            name: 'groupparticipants'
                                        }
                                    }, '参会人员分组'),
                                    h('DropdownItem', {
                                        props: {
                                            name: 'workgroupmanage'
                                        }
                                    }, '工作人员分组'),
                                    h('DropdownItem', {
                                        props: {
                                            name: 'assigningtask'
                                        }
                                    }, '分派任务'),
                                    h('DropdownItem', {
                                        props: {
                                            name: 'releaseconference'
                                        }
                                    }, '发布会议'),
                                    h('DropdownItem', {
                                        props: {
                                            name: 'pushinformation'
                                        }
                                    }, '推送信息'),
                                    h('DropdownItem', {
                                        props: {
                                            name: 'push'
                                        }
                                    }, '推送具体信息'),
                                    h('DropdownItem', {
                                        props: {
                                            name: 'pushhistory'
                                        }
                                    }, '推送消息历史'),
                                    h('DropdownItem', {
                                        props: {
                                            name: 'qrCode'
                                        }
                                    }, '查看签到二维码')
                                ])
                            ])
                        ]);
                    }
                }
            ],
            searchlist: [],
            modal1: false,
            img: false,
            INDEX: -1,
            NEW_DATE: '',
            meet_date_start: '',
            meet_date_end: '',
            formItem: {
                id: '',
                sceneid: '',
                meet_name: '',
                meet_date: '',
                meet_date_start: '',
                meet_date_end: '',
                meet_address: '',
                meet_sponsor: '',
                meet_theme: '',
                type: ''
            },
            addMeeting: {
                id: '',
                sceneid: '',
                meet_name: '',
                meet_date: '',
                meet_date_start: '',
                meet_date_end: '',
                meet_address: '',
                meet_sponsor: '',
                meet_theme: '',
                type: ''
            },
            ruleValidate: {
                meet_name: [
                    { required: true, message: '会议名称不能为空', trigger: 'blur' }
                ],
                meet_address: [
                    { required: true, message: '会议地点不能为空', trigger: 'blur' }
                ],
                meet_sponsor: [
                    { required: true, message: '主办方不能为空', trigger: 'blur' }
                ],
                meet_theme: [
                    { required: true, message: '主题不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        edit (row) {
            this.INDEX = row.id;
            this.meet_date_start = '';
            this.meet_date_end = '';
            this.formItem = JSON.parse(JSON.stringify(row));
            this.modal1 = true;
        },
        more (type, param) { // 更多
            let id = param.id;
            let sceneid = param.sceneid + '';// 二维码
            let meeting = param.meet_name;
            let query = {meeting: meeting, sceneid: sceneid, param: param};
            if (type === 'assigningtask') { // 分派任务
                this.$router.push({
                    name: 'assigningtask',
                    query: query
                });
            } else if (type === 'releaseconference') { // 发布会议
                this.$router.push({
                    name: 'releaseconference',
                    query: query
                });
            } else if (type === 'pushinformation') { // 推送信息
                this.$router.push({
                    name: 'pushinformation',
                    query: query
                });
            } else if (type === 'push') { // 推送具体信息
                this.$router.push({
                    name: 'push',
                    query: query
                });
            } else if (type === 'groupparticipants') { // 参会人员分组
                this.$router.push({
                    name: 'groupparticipants',
                    query: query
                });
            } else if (type === 'staffmanagement') { // 参会人员管理
                this.$router.push({
                    name: 'staffmanagement',
                    query: query
                });
            } else if (type === 'workgroupmanage') { // 参会工作人员分组
                this.$router.push({
                    name: 'workgroupmanage',
                    query: query
                });
            } else if (type === 'pushhistory') { // 会议推送信消息历史记录
                this.$router.push({
                    name: 'pushhistory',
                    query: query
                });
            } else if (type === 'qrCode') { // 查看签到二维码
                let src = this.url + '/meet/qrcode/getPhoto?photo_name=' + id;
                document.getElementById('img').src = src;
                this.img = true;
            }
        },
        createMeeting (name) {
            this.INDEX = -1;
            this.$refs[name].resetFields();
            this.addMeeting = {
                id: '',
                sceneid: '',
                meet_name: '',
                meet_date: '',
                meet_date_start: '',
                meet_date_end: '',
                meet_address: '',
                meet_sponsor: '',
                meet_theme: '',
                type: ''
            };
            this.modal1 = true;
        },
        handleSubmit (name) {
            let this_ = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.INDEX !== -1) {
                        let _index = this.INDEX;
                        if (this_.meet_date_start !== '' && this_.meet_date_end !== '' && this_.meet_date_start !== undefined && this_.meet_date_end !== undefined) {
                            this_.formItem.meet_date_start = this_.meet_date_start;
                            this_.formItem.meet_date_end = this_.meet_date_end;
                        }
                        this_.formItem.id = _index;
                        this_.formItem.type = '2';
                        this.$ajax.post('meetingcolumns/edit',
                            'meet_name=' + this_.formItem.meet_name + '&meet_date_start=' + this_.formItem.meet_date_start +
                            '&meet_date_end=' + this_.formItem.meet_date_end + '&meet_address=' + this_.formItem.meet_address +
                            '&meet_sponsor=' + this_.formItem.meet_sponsor + '&meet_theme=' + this_.formItem.meet_theme +
                            '&id=' + _index)
                            .then(function (response) {
                                this_.formItem.meet_date = this_.formItem.meet_date_start + ' - ' + this_.formItem.meet_date_end;
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('修改成功');
                                    this_.$store.commit('meetinglist', this_.formItem);
                                } else {
                                    this_.$Message.info('修改失败');
                                }
                            });
                    } else {
                        this_.formItem.meet_date_start = this_.meet_date_start;
                        this_.formItem.meet_date_end = this_.meet_date_end;
                        this.$ajax.post('meetingcolumns/add',
                            'meet_name=' + this_.formItem.meet_name + '&meet_date_start=' + this_.formItem.meet_date_start +
                            '&meet_date_end=' + this_.formItem.meet_date_end + '&meet_address=' + this_.formItem.meet_address +
                            '&meet_sponsor=' + this_.formItem.meet_sponsor + '&meet_theme=' + this_.formItem.meet_theme)
                            .then(function (response) {
                                this_.addMeeting.id = response.data.id;
                                this_.addMeeting.sceneid = response.data.sceneid;
                                this_.addMeeting.meet_name = this_.formItem.meet_name;
                                this_.addMeeting.meet_date = this_.formItem.meet_date_start + ' - ' + this_.formItem.meet_date_end;
                                this_.addMeeting.meet_date_start = this_.formItem.meet_date_start;
                                this_.addMeeting.meet_date_end = this_.formItem.meet_date_end;
                                this_.addMeeting.meet_address = this_.formItem.meet_address;
                                this_.addMeeting.meet_sponsor = this_.formItem.meet_sponsor;
                                this_.addMeeting.meet_theme = this_.formItem.meet_theme;
                                this_.addMeeting.type = '1';
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('添加成功');
                                    this_.$store.commit('meetinglist', this_.addMeeting);
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
        search (value) {
            this.value = value;
        },
        formatDate (nDate) {
            this.NEW_DATE = nDate[0] + ' - ' + nDate[1];
            this.meet_date_start = nDate[0];
            this.meet_date_end = nDate[1];
        },
        delete (id) {
            let this_ = this;
            this_.formItem.id = id;
            this_.formItem.type = '3';
            this.$ajax.post('meetingcolumns/delete',
                'id=' + id)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('删除成功');
                        this_.$store.commit('meetinglist', this_.formItem);
                    } else {
                        this_.$Message.info('删除失败');
                    }
                });
        }
    },
    computed: {
        data1: function () {
            let meetinglistData = this.$store.getters.meetinglistPath;
            let meet = [];
            for (let i = 0; i < meetinglistData.length; i++) {
                if (meetinglistData[i].meet_name.indexOf(this.value) !== -1) {
                    meet.push(meetinglistData[i]);
                }
            }
            if (meet.length > 0) {
                return meet;
            }
        }
    }
};
</script>
