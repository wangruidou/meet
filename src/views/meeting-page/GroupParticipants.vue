<template>
  <div class="animated fadeIn">
      <Row>
        <Card>
            <div class="ivu-row">
                <Row>
                    <Col span="6">
                        <Input placeholder="查询分组" @input="search" list="group" clearable></Input>
                        <datalist id='group'>
                            <option v-for="item in data1" :value="item"></option>
                        </datalist>
                    </Col>
                    <Col span="4" offset="14">
                        <Button type="primary" @click="createGroup('formItem')">新建分组</Button>
                    </Col>
                </Row>
            </div>
            <br>
            <Table :height="myHeight" highlight-row ref="currentRowTable" :columns="columns1" :data="data1"></Table>
            <Modal v-model="modal1" title="分组信息" width="600">
                <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
                    <FormItem label="分组名称" prop="group_name">
                        <Input v-model="formItem.group_name" placeholder="请输入..." clearable></Input>
                    </FormItem>
                    <FormItem label="选择人员">
                        <Transfer
                            :titles="['所有人员', '选择人员']"
                            :data="intragrouppersonlistPath"
                            :target-keys="targetKeys2"
                            filterable
                            :filter-method="filterMethod"
                            :render-format="rander_intra"
                            @on-change="handleChange2">
                        </Transfer>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formItem')">保存</Button>
                        <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
                    </FormItem>
                </Form>
            </Modal>
        </Card>
    </Row>
  </div>
</template>

<script>
export default {
    data () {
        return {
            columns1: [
                {title: '序号', type: 'index', width: 100, align: 'center'}, // 单选
                {title: '分组名称', key: 'group_name', align: 'center'},
                { title: '操作',
                    key: 'action',
                    align: 'center',
                    width: 400,
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
                                        this.more(type, params.index);
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            modal1: false,
            value: '',
            INDEX: -1,
            NEW_DATE: '',
            formItem: {
                id: '',
                group_name: '',
                status: '',
                meetid: '',
                persons: '',
                type: ''
            },
            addPerson: {
                id: '',
                group_name: '',
                status: '',
                meetid: '',
                persons: '',
                type: ''
            },
            targetEle: '',
            ruleValidate: {
                group_name: [
                    { required: true, message: '分组名称不能为空', trigger: 'blur' }
                ]
            },
            targetKeys2: [],
            myHeight: (window.innerHeight-350),
        };
    },
    methods: {
        rander_intra (item) {
            if (item.name !== '' && item.name !== undefined) {
                return item.name;
            } else {
                return item.nickname;
            }
        },
        edit (row) {
            this.INDEX = row.id;
            if (row.persons !== '' && row.persons !== undefined) {
                this.targetEle = row.persons;
                this.targetKeys2 = row.persons.split(',');
            } else {
                this.targetEle = '';
                this.targetKeys2 = [];
            }
            this.formItem = JSON.parse(JSON.stringify(row));
            this.modal1 = true;
        },
        createGroup (name) {
            this.INDEX = -1;
            this.$refs[name].resetFields();
            this.addPerson = {
                id: '',
                group_name: '',
                status: '',
                meetid: '',
                persons: '',
                type: ''
            };
            this.modal1 = true;
            this.targetKeys2 = this.getTargetKeys(0, '');
            this.targetEle = '';
        },
        handleSubmit (name) {
            let this_ = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this_.INDEX !== -1) {
                        this_.formItem.id = this_.INDEX;
                        this_.formItem.status = '1';
                        this_.formItem.meetid = this_.$route.query.sceneid;
                        this_.formItem.persons = this_.targetEle;
                        this_.formItem.type = '2';
                        this.$ajax.post('group/edit',
                            'group_name=' + this_.formItem.group_name + '&persons=' + this_.targetEle +
                            '&status=' + '1' + '&meetid=' + this_.$route.query.sceneid + '&id=' + this_.INDEX)
                            .then(function (response) {
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('修改成功');
                                    this_.$store.commit('groupslist', this_.formItem);
                                } else {
                                    this_.$Message.info('修改失败');
                                }
                            });
                    } else {
                        this.$ajax.post('group/add',
                            'group_name=' + this_.formItem.group_name + '&persons=' + this_.targetEle +
                            '&status=' + '1' + '&meetid=' + this_.$route.query.sceneid)
                            .then(function (response) {
                                this_.addPerson.id = response.data.id;
                                this_.addPerson.group_name = this_.formItem.group_name;
                                this_.addPerson.status = '1';
                                this_.addPerson.meetid = this_.$route.query.sceneid;
                                this_.addPerson.persons = this_.targetEle;
                                this_.addPerson.type = '1';
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('添加成功');
                                    this_.$store.commit('groupslist', this_.addPerson);
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
        getTargetKeys (a, result) {
            if (a === 0) {
                return this.intragrouppersonlistPath.filter(item => item.key);
            } else if (a === 1) {
                let ary = [];
                for (let i = 0; i < result.length; i++) {
                    ary.push(parseInt(result[i]));
                }
                return ary;
            }
        },
        handleChange2 (newTargetKeys) {
            let targetEle = '';
            for (let i = 0; i < this.intragrouppersonlistPath.length; i++) {
                // 目标列表数据
                for (var j = 0; j < newTargetKeys.length; j++) {
                    if (this.intragrouppersonlistPath[i].key === newTargetKeys[j]) {
                        targetEle += this.intragrouppersonlistPath[i].key + ',';
                    }
                }
            }
            this.targetEle = targetEle.substring(0, targetEle.length - 1);
            this.targetKeys2 = newTargetKeys;
        },
        filterMethod (data, query) {
            if (data.name !== '' && data.name !== undefined) {
                return data.name.indexOf(query) > -1;
            } else {
                return data.nickname.indexOf(query) > -1;
            }
        },
        delete (id) {
            let this_ = this;
            this_.formItem.id = id;
            this_.formItem.type = '3';
            this_.formItem.status = '1';
            this.$ajax.post('group/delete',
                'id=' + id)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('删除成功');
                        this_.$store.commit('groupslist', this_.formItem);
                    } else {
                        this_.$Message.info('删除失败');
                    }
                });
        }
    },
    computed: {
        intragrouppersonlistPath: function () {
            let person = [];
            let meetingperson = this.$store.getters.meetingpersonPath;
            for (let i = 0; i < meetingperson.length; i++) {
                if (meetingperson[i].meetid === this.$route.query.sceneid) {
                    person.push(meetingperson[i]);
                }
            }
            return person;
        },
        attendgroupPath: function () {
            return this.$store.getters.attendgroupPath;
        },
        data1: function () {
            let group = this.attendgroupPath;
            let group1 = [];
            let groups = [];
            for (let i = 0; i < group.length; i++) {
                if (group[i].meetid !== '' && group[i].meetid !== undefined) {
                    if (group[i].meetid === this.$route.query.sceneid) {
                        group1.push(group[i]);
                    }
                }
            }
            for (let i = 0; i < group1.length; i++) {
                if (group1[i].group_name.indexOf(this.value) !== -1) {
                    groups.push(group1[i]);
                }
            }
            if (groups.length > 0) {
                return groups;
            }
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
