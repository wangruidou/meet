<template>
  <div class="animated fadeIn">
    <Row>
        <Card>
            <p slot="title" style="height:30px">
                <Icon type="compose"></Icon>
                参会人员详情
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                会议名称：{{this.$route.query.meeting}}
            </p>
            <div class="ivu-row">
                <Row>
                    <Col span="6">
                        <AutoComplete v-model="value" :data="searchPersonList" @on-search="searchPerson" placeholder="查询人员"></AutoComplete>                
                    </Col>
                </Row>
            </div>
            <br>
            <Table highlight-row ref="personRowTable" :columns="personColumns" :data="person_data" style="margin-bottom:5px;"></Table>
            <Page :total="pageTotal" :page-size="pageSize" :current="pageNumber" size="small" class="paging" show-total @on-change="handlePage"></Page>
            <br>
            <Modal v-model="person_modal" title="人员信息">
                <Form ref="personValidate" :model="personValidate" :rules="personRuleValidate" :label-width="80">
                    <FormItem label="姓名" prop="name"><Input v-model="personValidate.name" placeholder="请输入姓名..."></Input></FormItem>
                    <FormItem label="手机号" prop="phone"><Input v-model="personValidate.phone" placeholder="请输入手机号..."></Input></FormItem>
                    <FormItem label="演讲" prop="speech"><Input v-model="personValidate.speech" placeholder="请输入演讲..."></Input></FormItem>
                    <FormItem label="礼物" prop="gift"><Input v-model="personValidate.gift" placeholder="请输入礼物..."></Input></FormItem>
                    <FormItem label="ppt" prop="ppt"><Input v-model="personValidate.ppt" placeholder="请输入ppt..."></Input></FormItem>
                    <FormItem>
                        <Button type="primary" @click="savePerson('personValidate')">保存</Button>
                        <Button type="ghost" @click="resetPerson('personValidate')" style="margin-left: 8px">重置</Button>
                    </FormItem>
                </Form>
                <div slot="footer"></div>
            </Modal>
        </Card>
    </Row>
  </div>
</template>

<script>
export default {
    data () {
        return {
            value: '',
            pageSize: 10,
            pageNumber: 1,
            person_index: -1,
            searchPersonList: [],
            personColumns: [
                {title: '序号', type: 'index', width: 70, align: 'center'}, // 单选
                {title: '姓名', key: 'name', width: 150, align: 'center'},
                {title: '电话', key: 'phone', width: 150, align: 'center'},
                {title: '演讲', key: 'speech', width: 150, align: 'center'},
                {title: '礼物', key: 'gift', width: 150, align: 'center'},
                {title: 'ppt', key: 'ppt', width: 150, align: 'center'},
                { title: '操作',
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
                                        this.editPerson(params.row);
                                    }
                                }
                            }, '修改')
                        ]);
                    }
                }
            ],
            person_modal: false,
            personValidate: {
                id: '',
                name: '',
                phone: '',
                speech: '',
                gift: '',
                ppt: '',
                meetid: ''
            },
            AddpersonValidate: {
                id: '',
                name: '',
                phone: '',
                speech: '',
                gift: '',
                ppt: '',
                meetid: ''
            },
            personRuleValidate: {
                name: [
                    { required: true, message: '名字不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                    {type: 'string', pattern: /^1[3|4|5|8][0-9]\d{4,8}$/, message: '请输入正确的手机号码', trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        searchPerson (value) {
            this.value = value;
        },
        addPerson (name) {
            this.person_index = -1;
            this.$refs[name].resetFields();
            this.AddpersonValidate = {
                id: '',
                name: '',
                phone: '',
                speech: '',
                gift: '',
                ppt: '',
                meetid: ''
            };
        },
        handlePage (index) {
            this.pageNumber = index;
        },
        editPerson (row) {
            this.person_index = row.id;
            this.personValidate = JSON.parse(JSON.stringify(row));
            this.person_modal = true;
        },
        savePerson (name) {
            let this_ = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this_.person_index !== -1) {
                        this_.personValidate.id = this_.person_index;
                        this_.personValidate.type = '2';
                        this_.personValidate.meetid = this_.$route.query.sceneid;
                        this.$ajax.post('guestperson/editmeetingperson',
                            'name=' + this_.personValidate.name + '&phone=' + this_.personValidate.phone +
                            '&id=' + this_.person_index + '&speech=' + this_.personValidate.speech +
                            '&gift=' + this_.personValidate.gift + '&ppt=' + this_.personValidate.ppt)
                            .then(function (response) {
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('修改成功');
                                    this_.$store.commit('meetingpersonlist', this_.personValidate);
                                } else {
                                    this_.$Message.info('修改失败');
                                }
                            });
                    } else { // 新增

                    }
                    this.person_modal = false;
                } else {
                    this.person_modal = true;
                }
            });
        },
        resetPerson (name) {
            this.$refs[name].resetFields();
        }
    },
    computed: {
        meetingpersonPath: function () {
            return this.$store.getters.meetingpersonPath;
        },
        pageTotal: function () {
            let person = this.meetingpersonPath;
            let person1 = [];
            let persons = [];
            for (let i = 0; i < person.length; i++) {
                if (person[i].meetid !== '' && person[i].meetid !== undefined) {
                    if (person[i].meetid === this.$route.query.sceneid) {
                        person1.push(person[i]);
                    }
                }
            }
            for (let i = 0; i < person1.length; i++) {
                if (person1[i].name.indexOf(this.value) !== -1) {
                    persons.push(person1[i]);
                }
            }
            if (persons.length > 0) {
                return persons.length;
            }
        },
        person_data: function () {
            let person = this.meetingpersonPath;
            let person1 = [];
            let persons = [];
            for (let i = 0; i < person.length; i++) {
                if (person[i].meetid !== '' && person[i].meetid !== undefined) {
                    if (person[i].meetid === this.$route.query.sceneid) {
                        person1.push(person[i]);
                    }
                }
            }
            for (let i = 0; i < person1.length; i++) {
                if (person1[i].name.indexOf(this.value) !== -1) {
                    persons.push(person1[i]);
                }
            }
            if (persons.length > 0) {
                return persons.slice((this.pageNumber - 1) * this.pageSize, this.pageNumber * this.pageSize);
            }
        }
    }
};
</script>

<style lang="less">
  .paging{
      float: right;
      margin-bottom: 10px;
  }
</style>
