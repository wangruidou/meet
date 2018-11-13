<template>
  <div class="animated fadeIn">
    <div class="ivu-row">
        <Row>
            <Col span="6">
                <Input placeholder="查询标签种类" @input="search" clearable></Input>
                <datalist>
                    <option v-for="item in labelList" :value="item"></option>
                </datalist>
            </Col>
            <Col span="4" offset="14">
                <!-- <Button type="primary" @click="createLabel('formItem')">新建标签</Button> -->
            </Col>
        </Row>
    </div>
    <br>
    <Table highlight-row ref="currentRowTable" :columns="columns" :data="labelList"></Table>

    <Modal v-model="detailsModal" title="标签信息" width="70%">
        <div class="ivu-row" style="margin-bottom:10px">
            <Col span="6">
                <Input placeholder="查询标签内容" @input="searchDetails" clearable></Input>
                <datalist>
                    <option v-for="item in labelDetailsList" :value="item"></option>
                </datalist>
            </Col>
            <Col span="4" offset="14">
                <Button type="primary" @click="create('formItem')">新建标签</Button>
            </Col>
        </div>
        <Table highlight-row ref="currentRowTable1" :columns="columnsDetails" :data="labelDetailsList"></Table>
    </Modal>

    <Modal v-model="labelModal" title="标签内容" width="600">
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
            <FormItem label="标签内容" prop="content">
                <Input v-model="formItem.content" placeholder="请输入..." clearable></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formItem')">保存</Button>
                <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Modal>

    <Modal v-model="labelStatusModal" title="标签" width="600">
        <Form ref="formItemLabel" :model="formItemLabel" :rules="ruleValidateLabel" :label-width="100">
            <FormItem label="标签" prop="labelname">
                <Input v-model="formItemLabel.labelname" placeholder="请输入..." clearable></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmitLabel('formItemLabel')">保存</Button>
                <Button type="ghost" @click="handleResetLabel('formItemLabel')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
export default {
    data () {
        return {
            columns: [
                {title: '序号', type: 'index', width: 100, align: 'center'}, // 单选
                {title: '标签名称', key: 'labelname', align: 'center'},
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
                                        this.editLabelStatus(params.row);
                                    }
                                }
                            }, '修改'),
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
                                        this.details(params.row);
                                    }
                                }
                            }, '详情')
                        ]);
                    }
                }
            ],
            columnsDetails:[
                {title: '序号', type: 'index', width: 100, align: 'center'}, // 单选
                {title: '标签内容', key: 'content', align: 'center'},
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
            labelModal: false,
            labelStatusModal: false,
            value:'',
            INDEX: -1,
            LabelINDEX: -1,
            formItem: {
                id: '',
                content: '',
                type:'',
                kind:''
            },
            addLabel: {
                id: '',
                content: '',
                type:'',
                kind:''
            },
            formItemLabel: {
                id: '',
                labelname: '',
                type:''
            },
            ruleValidate: {
                content: [
                    { required: true, message: '标签内容不能为空', trigger: 'blur' }
                ]
            },
            ruleValidateLabel: {
                labelname: [
                    { required: true, message: '标签不能为空', trigger: 'blur' }
                ]
            },
            detailsModal:false, // 详情页面打开状态
            status:'', // 标签状态
            valueDetails:'', 
        };
    },
    methods: {
        details (row) {
            this.detailsModal = true;
            this.status = row.type;
        },
        edit (row) {
            this.INDEX = row.id;
            this.formItem = JSON.parse(JSON.stringify(row));
            this.labelModal = true;
        },
        editLabelStatus(row) {
            this.LabelINDEX = row.id;
            this.formItemLabel = JSON.parse(JSON.stringify(row));
            this.labelStatusModal = true;
        },
        create (name) {
            this.INDEX = -1;
            this.$refs[name].resetFields();
            this.addLabel = {
                id: '',
                content: '',
                type:'',
                kind:''
            };
            this.labelModal = true;
        },
        handleSubmit (name) {
            let this_ = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this_.INDEX !== -1) {
                        this_.formItem.id = this_.INDEX;
                        this_.formItem.kind = '2';
                        this.$ajax.post('personcontent/edit',
                            'content=' + this_.formItem.content + '&id=' + this_.INDEX)
                            .then(function (response) {
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('修改成功');
                                    this_.$store.commit('personcontentlist', this_.formItem);
                                } else {
                                    this_.$Message.info('修改失败');
                                }
                            });
                    } else {
                        this.$ajax.post('personcontent/add',
                            'content=' + this_.formItem.content + '&type=' + this_.status)
                            .then(function (response) {
                                this_.addLabel.id = response.data.id;
                                this_.addLabel.content = this_.formItem.content;
                                this_.addLabel.type = this_.status;
                                this_.addLabel.kind = '1';
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('添加成功');
                                    this_.$store.commit('personcontentlist', this_.addLabel);
                                } else {
                                    this_.$Message.info('添加失败');
                                }
                            });
                    }
                    this.labelModal = false;
                } else {
                    this.labelModal = true;
                }
            });
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        handleSubmitLabel (name) {
            let this_ = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this_.LabelINDEX !== -1) {
                        this_.formItemLabel.id = this_.LabelINDEX;
                        this.$ajax.post('labelstatus/edit',
                            'labelname=' + this_.formItemLabel.labelname + '&id=' + this_.LabelINDEX)
                            .then(function (response) {
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('修改成功');
                                    this_.$store.commit('labelstatuslist', this_.formItemLabel);
                                } else {
                                    this_.$Message.info('修改失败');
                                }
                            });
                    }
                    this.labelStatusModal = false;
                } else {
                    this.labelStatusModal = true;
                }
            });
        },
        handleResetLabel (name) {
            this.$refs[name].resetFields();
        },
        search (value) {
            this.value = value;
        },
        searchDetails (value) {
            this.valueDetails = value;
        },
        delete (id) {
            let this_ = this;
            this_.formItem.id = id;
            this_.formItem.kind = '3';
            let person = this.person;
            let a = false;
            for (let i = 0; i < person.length; i++) {
               if(this.status == '1') {
                   if (person[i].unitspecialty != null && person[i].unitspecialty != '' && person[i].unitspecialty != undefined) {
                       let unitspecialty = person[i].unitspecialty.split(",")
                       for(let j = 0; j < unitspecialty.length; j++) {
                           if(unitspecialty[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '2') {
                   if (person[i].unitproperties != null && person[i].unitproperties != '' && person[i].unitproperties != undefined) {
                       let unitproperties = person[i].unitproperties.split(",")
                       for(let j = 0; j < unitproperties.length; j++) {
                           if(unitproperties[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '3') {
                   if (person[i].industryfield != null && person[i].industryfield != '' && person[i].industryfield != undefined) {
                       let industryfield = person[i].industryfield.split(",")
                       for(let j = 0; j < industryfield.length; j++) {
                           if(industryfield[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '4') {
                   if (person[i].seminar != null && person[i].seminar != '' && person[i].seminar != undefined) {
                       let seminar = person[i].seminar.split(",")
                       for(let j = 0; j < seminar.length; j++) {
                           if(seminar[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '5') {
                   if (person[i].internationalproject != null && person[i].internationalproject != '' && person[i].internationalproject != undefined) {
                       let internationalproject = person[i].internationalproject.split(",")
                       for(let j = 0; j < internationalproject.length; j++) {
                           if(internationalproject[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '6') {
                   if (person[i].cooperativeproject != null && person[i].cooperativeproject != '' && person[i].cooperativeproject != undefined) {
                       let cooperativeproject = person[i].cooperativeproject.split(",")
                       for(let j = 0; j < cooperativeproject.length; j++) {
                           if(cooperativeproject[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '8') {
                   if (person[i].midtownrail != null && person[i].midtownrail != '' && person[i].midtownrail != undefined) {
                       let midtownrail = person[i].midtownrail.split(",")
                       for(let j = 0; j < midtownrail.length; j++) {
                           if(midtownrail[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '9') {
                   if (person[i].relatedstudy != null && person[i].relatedstudy != '' && person[i].relatedstudy != undefined) {
                       let relatedstudy = person[i].relatedstudy.split(",")
                       for(let j = 0; j < relatedstudy.length; j++) {
                           if(relatedstudy[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '10') {
                   if (person[i].ourmeeting != null && person[i].ourmeeting != '' && person[i].ourmeeting != undefined) {
                       let ourmeeting = person[i].ourmeeting.split(",")
                       for(let j = 0; j < ourmeeting.length; j++) {
                           if(ourmeeting[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '11') {
                   if (person[i].othermeeting != null && person[i].othermeeting != '' && person[i].othermeeting != undefined) {
                       let othermeeting = person[i].othermeeting.split(",")
                       for(let j = 0; j < othermeeting.length; j++) {
                           if(othermeeting[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '12') {
                   if (person[i].businesssources != null && person[i].businesssources != '' && person[i].businesssources != undefined) {
                       let businesssources = person[i].businesssources.split(",")
                       for(let j = 0; j < businesssources.length; j++) {
                           if(businesssources[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '13') {
                   if (person[i].countryregion != null && person[i].countryregion != '' && person[i].countryregion != undefined) {
                       let countryregion = person[i].countryregion.split(",")
                       for(let j = 0; j < countryregion.length; j++) {
                           if(countryregion[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '14') {
                   if (person[i].city != null && person[i].city != '' && person[i].city != undefined) {
                       let city = person[i].city.split(",")
                       for(let j = 0; j < city.length; j++) {
                           if(city[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '15') {
                   if (person[i].currentissue != null && person[i].currentissue != '' && person[i].currentissue != undefined) {
                       let currentissue = person[i].currentissue.split(",")
                       for(let j = 0; j < currentissue.length; j++) {
                           if(currentissue[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '16') {
                   if (person[i].magazine != null && person[i].magazine != '' && person[i].magazine != undefined) {
                       let magazine = person[i].magazine.split(",")
                       for(let j = 0; j < magazine.length; j++) {
                           if(magazine[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '17') {
                   if (person[i].distributionmode != null && person[i].distributionmode != '' && person[i].distributionmode != undefined) {
                       let distributionmode = person[i].distributionmode.split(",")
                       for(let j = 0; j < distributionmode.length; j++) {
                           if(distributionmode[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '18') {
                   if (person[i].salesman != null && person[i].salesman != '' && person[i].salesman != undefined) {
                       let salesman = person[i].salesman.split(",")
                       for(let j = 0; j < salesman.length; j++) {
                           if(salesman[j] == id) {
                               a = true;
                           }
                       }
                   } 
               } else if (this.status == '19') {
                   if (person[i].ourmeeting2 != null && person[i].ourmeeting2 != '' && person[i].ourmeeting2 != undefined) {
                       let ourmeeting2 = person[i].ourmeeting2.split(",")
                       for(let j = 0; j < ourmeeting2.length; j++) {
                           if(ourmeeting2[j] == id) {
                               a = true;
                           }
                       }
                   } 
               }
            }

            if (a) {
                this_.$Message.config({
                    top: 50,
                    duration: 3,
                    width: 200
                });
                this_.$Message.info('有数据选中这个标签，不能删除');
                return;
            }
            this.$ajax.post('personcontent/delete',
                'id=' + id)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('删除成功');
                        this_.$store.commit('personcontentlist', this_.formItem);
                    } else {
                        this_.$Message.info('删除失败');
                    }
                });
        }
    },
    computed: {
        person: function () {
           let guestperson = this.$store.getters.guestpersonlistPath;
           let outsidegroupperson = this.$store.getters.outsidegrouppersonlistPath;
           let person = guestperson.concat(outsidegroupperson);
           return person;
        },
        labelDetailsList: function () {
            let labelDetails = this.$store.getters.personcontentPath;
            let l = [];
            for (let i = 0; i < labelDetails.length; i++) {
                if (labelDetails[i].type == this.status) {
                    if (labelDetails[i].content.indexOf(this.valueDetails) !== -1) {
                        l.push(labelDetails[i]);
                    } 
                } 
            }
            if (l.length > 0) {
                return l;
            }
        },
        labelstatusPath: function () {
            return this.$store.getters.labelstatusPath;
        },
        labelList: function () {
            let label = this.labelstatusPath;
            let labels = [];
            for (let i = 0; i < label.length; i++) {
                if (label[i].labelname.indexOf(this.value) !== -1) {
                    labels.push(label[i]);
                }
            }
            if (labels.length > 0) {
                return labels;
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
