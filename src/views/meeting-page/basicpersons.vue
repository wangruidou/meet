<template>
  <div class="animated fadeIn">
    <div class="ivu-row">
        <Row>
            <Col span="6">
                <AutoComplete v-model="value" @on-search="searchPerson" placeholder="查询人员"></AutoComplete>                
            </Col>
            <div style="float:right;margin-right:100px;">
                <Button type="primary" @click="search()">详细查询</Button>
                <input style="width:180px;" id="file" name="file" class="filepath" type="file"></input>
                <Button type="primary" @click="import1()">导入</Button>
                <Button type="primary" @click="export1()">导出</Button>
            </div>
        </Row>
    </div>
    <br>
    <Table :height="myHeight" highlight-row ref="personRowTable" :columns="personColumns" :data="person_data"></Table>
    <!-- 添加表头列排序 -->
    <!-- <Table :height="myHeight" highlight-row ref="personRowTable" :columns="personColumns" :data="person_data" @on-sort-change='changeSort'></Table> -->
    <br>
    <Page :total="pageTotal" :page-size="pageSize" :current="pageNumber" size="small" class="paging" show-total @on-change="handlePage"></Page>
    <Modal v-model="person_modal" title="人员信息">
        <Form ref="personValidate" :model="personValidate" :rules="personRuleValidate" :label-width="80">
            <FormItem label="姓名" prop="name"><Input v-model="personValidate.name" placeholder="请输入姓名..."></Input></FormItem>
            <FormItem label="手机号" prop="phone"><Input v-model="personValidate.phone" placeholder="请输入手机号..."></Input></FormItem>
            <FormItem label="单位" prop="unit"><Input v-model="personValidate.unit" placeholder="请输入单位..."></Input></FormItem>
            <FormItem label="职务" prop="position"><Input v-model="personValidate.position" placeholder="请输入职务..."></Input></FormItem>
            <FormItem>
                <Button type="primary" @click="savePerson('personValidate')">保存</Button>
                <Button type="ghost" @click="resetPerson2('personValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <div slot="footer"></div>
    </Modal>

    <searchLabel :isShow="query" :labelstatusPath="labelstatusPath" :personcontent="personcontent" 
    @resetPerson1="resetPerson1" @savePerson2="savePerson2" @cancel="query = false"
    :unitspecialty="unitspecialty_query" :unitproperties="unitproperties_query" 
    :industryfield="industryfield_query" :seminar="seminar_query" :internationalproject="internationalproject_query"
    :cooperativeproject="cooperativeproject_query" :midtownrail="midtownrail_query" :relatedstudy="relatedstudy_query"
    :ourmeeting="ourmeeting_query" :othermeeting="othermeeting_query" :businesssources="businesssources_query"
    :countryregion="countryregion_query" :city="city_query" :currentissue="currentissue_query" :magazine="magazine_query" 
    :distributionmode="distributionmode_query" :salesman="salesman_query" :ourmeeting2="ourmeeting2_query"
    :custom1="custom1_query" :custom2="custom2_query" :custom3="custom3_query" :custom4="custom4_query"></searchLabel>
    
    <editPersonDetail :isShow="detail" :labelstatusPath="labelstatusPath" :personcontent="personcontent" 
    :personValidate="personValidate" @resetPerson="resetPerson" @savePerson1="savePerson1" @cancel="detail = false" 
    @changeyear="changeyear" @changecurrent="changecurrent"
    :unitspecialty="unitspecialty" :unitproperties="unitproperties" :industryfield="industryfield" :seminar="seminar" 
    :internationalproject="internationalproject" :cooperativeproject="cooperativeproject" :midtownrail="midtownrail" 
    :relatedstudy="relatedstudy" :ourmeeting="ourmeeting" :othermeeting="othermeeting" :businesssources="businesssources" 
    :countryregion="countryregion" :city="city" :currentissue="currentissue" :magazine="magazine" 
    :distributionmode="distributionmode" :salesman="salesman" :ourmeeting2="ourmeeting2" :custom1="custom1" 
    :custom2="custom2" :custom3="custom3" :custom4="custom4"></editPersonDetail>

  </div>
</template>

<script>
import searchLabel from './components/SearchLabel.vue'
import editPersonDetail from './components/EditPersonDetail.vue'
export default {
    components: {
        searchLabel,
        editPersonDetail
    },
    data () {
        return {
            value: '',
            pageSize: 10,
            pageNumber: 1,
            person_index: -1,
            personColumns: [
                {title: '序号', type: 'index', width: 70, align: 'center'}, // 单选
                {title: '姓名', key: 'name', width: 150, align: 'center'},
                // 排序
                // {title: '姓名', key: 'name', width: 150, align: 'center',sortable: true,
                //     sortMethod:function(a,b,type){
                // }},
                {title: '单位', key: 'unit', align: 'center'},
                {title: '职务', key: 'position', width: 300, align: 'center'},
                {title: '手机号', key: 'phone', width: 150, align: 'center'},
                {title: '操作',
                    key: 'action',
                    align: 'center',
                    width: 250,
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
                                        this.detailPerson(params.row);
                                    }
                                }
                            }, '详细'),
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
            detail: false,
            person_modal: false,
            personValidate: {
                id: '',
                name: '',
                phone: '',
                unit: '',
                position: '',
                telephone: '',
                fax: '',
                email: '',
                location: '',
                postcode: '',
                seminar: '',
                unitproperties: '',
                unitspecialty: '',
                industryfield: '',
                internationalproject: '',
                midtownrail: '',
                relatedstudy: '',
                cooperativeproject: '',
                ourmeeting: '',
                ourmeeting2: '',
                othermeeting: '',
                businesssources: '',
                row1: '',
                year112: '',
                year11: '',
                currentissue: '',
                countryregion: '',
                city: '',
                formerunitposition: '',
                noneed: '',
                updatedatatime: '',
                magazine: '',
                distributionmode: '',
                remarks: '',
                salesman: '',
                copies: '',
                latestcontact: '',
                updatedate: '',
                verificationproblem: '',
                custom1:'',
                custom2:'',
                custom3:'',
                custom4:'',
                type: '',
                persontype: '',
                meetid: ''
            },
            personRuleValidate: {
                name: [
                    {required: true, message: '名字不能为空', trigger: 'blur'}
                ],
                phone: [
                    {required: true, message: '手机号不能为空', trigger: 'blur'},
                    {type: 'string', pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur'}
                ]
            },
            seminar: [],
            unitproperties: [],
            unitspecialty: [],
            industryfield: [],
            internationalproject: [],
            midtownrail: [],
            relatedstudy: [],
            cooperativeproject: [],
            ourmeeting: [],
            ourmeeting2: [],
            othermeeting: [],
            businesssources: [],
            currentissue: [],
            countryregion: [],
            city: [],
            magazine: [],
            distributionmode: [],
            salesman: [],
            custom1:[],
            custom2:[],
            custom3:[],
            custom4:[],

            query: false, // 标签查询页面打开状态
            seminar_query: [],
            unitproperties_query: [],
            unitspecialty_query: [],
            industryfield_query: [],
            internationalproject_query: [],
            midtownrail_query: [],
            relatedstudy_query: [],
            cooperativeproject_query: [],
            ourmeeting_query: [],
            ourmeeting2_query: [],
            othermeeting_query: [],
            businesssources_query: [],
            currentissue_query: [],
            countryregion_query: [],
            city_query: [],
            magazine_query: [],
            distributionmode_query: [],
            salesman_query: [],
            custom1_query:[],
            custom2_query:[],
            custom3_query:[],
            custom4_query:[],
            query_status:'',

            labelNmae: {
                seminar: '',
                unitproperties: '',
                unitspecialty: '',
                industryfield: '',
                internationalproject: '',
                midtownrail: '',
                relatedstudy: '',
                cooperativeproject: '',
                ourmeeting: '',
                ourmeeting2: '',
                othermeeting: '',
                businesssources: '',
                row1: '',
                year112: '',
                year11: '',
                currentissue: '',
                countryregion: '',
                city: '',
                formerunitposition: '',
                noneed: '',
                updatedatatime: '',
                magazine: '',
                distributionmode: '',
                remarks: '',
                salesman: '',
                copies: '',
                latestcontact: '',
                updatedate: '',
                verificationproblem: '',
                custom1:'',
                custom2:'',
                custom3:'',
                custom4:'',
                type: '',
                persontype: '',
                meetid: ''
            },
            myHeight:(window.innerHeight-215),
        };
    },
    methods: {
        // 排序
        changeSort(object){
            let this_ = this;
            let sort = object.order;
            this.$ajax.post('basicperson/getSortList', 'sort=' + sort)
                .then(function (response) {
                    this_.$store.commit('basicpersonlist', response.data.basicpersonlist);
                })
        },
        import1() {
            var formData = new FormData();
            let files = document.getElementById('file');
            formData.append('file', files.files[0]);
            if (files.files.length === 0) {
                this.$Message.info('请选择文件！！');
            } else {
                let this_ = this;
                this.$ajax.post('basicperson/uploadFile', formData)
                    .then(function (response) {
                        if (response.data.errorCode === 0) {
                            this_.$Message.info('导入成功');
                            this_.$ajax.post('meetingcolumns/list')
                            .then(function (response) {
                                this_.$store.commit('basicpersonlist', response.data.basicpersonlist);
                            });
                        } else {
                            this_.$Message.info('导入失败');
                        }
                    });
            }
        },
        export1() {
            let this_ = this;
            this.$ajax.post('basicperson/exportFile', 'personData=' + JSON.stringify(this.personData))
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.info('导出成功');
                        window.open(this_.url + '/meet/exportperson/' + response.data.fileName);
                    } else {
                        this_.$Message.info('导出失败');
                    }
                });
        },
        search () {
            this.person_index = -1;
            if(this.query_status !== "1") {
                this.seminar_query= [],
                this.unitproperties_query= [],
                this.unitspecialty_query= [],
                this.industryfield_query= [],
                this.internationalproject_query= [],
                this.midtownrail_query= [],
                this.relatedstudy_query= [],
                this.cooperativeproject_query= [],
                this.ourmeeting_query= [],
                this.ourmeeting2_query= [],
                this.othermeeting_query= [],
                this.businesssources_query= [],
                this.currentissue_query= [],
                this.countryregion_query= [],
                this.city_query= [],
                this.magazine_query= [],
                this.distributionmode_query= [],
                this.salesman_query= [],
                this.custom1_query= [],
                this.custom2_query= [],
                this.custom3_query= [],
                this.custom4_query= []
            }
            this.query = true;
        },
        searchPerson (value) {
            this.value = value;
            this.pageNumber = 1;
        },
        handlePage (index) {
            this.pageNumber = index;
        },
        editPerson (row) {
            this.person_index = row.id;
            this.personValidate = JSON.parse(JSON.stringify(row));
            this.person_modal = true;
        },
        // 单位，职务修改保存
        savePerson (name) {
            let this_ = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this_.person_index !== -1) {
                        this_.personValidate.id = this_.person_index;
                        this_.personValidate.type = '2';
                        this_.personValidate.meetid = '';
                        if (this_.personValidate.unit === null || this_.personValidate.unit === undefined) {
                            this_.personValidate.unit = '';
                        }
                        if (this_.personValidate.position === null || this_.personValidate.position === undefined) {
                            this_.personValidate.position = '';
                        }
                        this.$ajax.post('basicperson/edit',
                            'name=' + this_.personValidate.name + '&phone=' + this_.personValidate.phone +
                            '&unit=' + this_.personValidate.unit + '&position=' + this_.personValidate.position +
                            '&id=' + this_.person_index)
                            .then(function (response) {
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('修改成功');
                                    this_.$store.commit('basicpersonlist', this_.personValidate);
                                } else {
                                    this_.$Message.info('修改失败');
                                }
                            });
                    } 
                    this.person_modal = false;
                } else {
                    this.person_modal = true;
                }
            });
        },
        // 重置单位，职务
        resetPerson2 (name) {
            this.personValidate.name = "";
            this.personValidate.phone = "";
            this.personValidate.unit = "";
            this.personValidate.position = "";
        },
        // 重置人员详细内容
        resetPerson (name) {
            this.personValidate.telephone = "";
            this.personValidate.fax = "";
            this.personValidate.email = "";
            this.personValidate.location = "";
            this.personValidate.postcode = "";
            this.personValidate.row1 = "";
            this.personValidate.year112 = "";
            this.personValidate.year11 = "";
            this.personValidate.formerunitposition = "";
            this.personValidate.noneed = "";
            this.personValidate.updatedatatime = "";
            this.personValidate.remarks = "";
            this.personValidate.copies = "";
            this.personValidate.latestcontact = "";
            this.personValidate.updatedate = "";
            this.personValidate.verificationproblem = "";

            this.seminar = [];
            this.unitproperties = [];
            this.unitspecialty = [];
            this.industryfield = [];
            this.internationalproject = [];
            this.midtownrail = [];
            this.relatedstudy = [];
            this.cooperativeproject = [];
            this.ourmeeting = [];
            this.ourmeeting2 = [];
            this.othermeeting = [];
            this.businesssources = [];
            this.currentissue = [];
            this.countryregion = [];
            this.city = [];
            this.magazine = [];
            this.distributionmode = [];
            this.salesman = [];
            this.custom1= [];
            this.custom2= [];
            this.custom3= [];
            this.custom4= [];
        },
        // 重置查询的标签
        resetPerson1 () {
            this.seminar_query = [];
            this.unitproperties_query = [];
            this.unitspecialty_query = [];
            this.industryfield_query = [];
            this.internationalproject_query = [];
            this.midtownrail_query = [];
            this.relatedstudy_query = [];
            this.cooperativeproject_query = [];
            this.ourmeeting_query = [];
            this.ourmeeting2_query = [];
            this.othermeeting_query = [];
            this.businesssources_query = [];
            this.currentissue_query = [];
            this.countryregion_query = [];
            this.city_query = [];
            this.magazine_query = [];
            this.distributionmode_query = [];
            this.salesman_query = [];
            this.custom1_query= [];
            this.custom2_query= [];
            this.custom3_query= [];
            this.custom4_query= [];
        },
        detailPerson (row) {
            this.seminar = [];
            this.unitproperties = [];
            this.unitspecialty = [];
            this.industryfield = [];
            this.internationalproject = [];
            this.midtownrail = [];
            this.relatedstudy = [];
            this.cooperativeproject = [];
            this.ourmeeting = [];
            this.ourmeeting2 = [];
            this.othermeeting = [];
            this.businesssources = [];
            this.currentissue = [];
            this.countryregion = [];
            this.city = [];
            this.magazine = [];
            this.distributionmode = [];
            this.salesman = [];
            this.custom1 = [];
            this.custom2 = [];
            this.custom3 = [];
            this.custom4 = [];

            this.person_index = row.id;
            this.detail = true;
            let this_ = this;
            this_.personValidate = JSON.parse(JSON.stringify(row));
            if (row.telephone === null || row.telephone === undefined) {
                this_.personValidate.telephone = '';
            }
            if (row.fax === null || row.fax === undefined) {
                this_.personValidate.fax = '';
            }
            if (row.email === null || row.email === undefined) {
                this_.personValidate.email = '';
            }
            if (row.location === null || row.location === undefined) {
                this_.personValidate.location = '';
            }
            if (row.postcode === null || row.postcode === undefined) {
                this_.personValidate.postcode = '';
            }
            if (row.row1 === null || row.row1 === undefined) {
                this_.personValidate.row1 = '';
            }
            if (row.year112 === null && row.year112 === undefined) {
                this_.personValidate.year112 = '';
            }
            if (row.year11 === null || row.year11 === undefined) {
                this_.personValidate.year11 = '';
            }
            if (row.formerunitposition === null || row.formerunitposition === undefined) {
                this_.personValidate.formerunitposition = '';
            }
            if (row.noneed === null || row.noneed === undefined) {
                this_.personValidate.noneed = '';
            }
            if (row.updatedatatime === null || row.updatedatatime === undefined) {
                this_.personValidate.updatedatatime = '';
            }
            if (row.remarks === null || row.remarks === undefined) {
                this_.personValidate.remarks = '';
            }
            if (row.copies === null || row.copies === undefined) {
                this_.personValidate.copies = '';
            }
            if (row.latestcontact === null || row.latestcontact === undefined) {
                this_.personValidate.latestcontact = '';
            }
            if (row.updatedate === null || row.updatedate === undefined) {
                this_.personValidate.updatedate = '';
            }
            if (row.verificationproblem === null || row.verificationproblem === undefined) {
                this_.personValidate.verificationproblem = '';
            }
            if (row.seminar !== null && row.seminar !== undefined) {
                let seminar = [];
                row.seminar.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        seminar.push(+data + '');
                    }
                });
                this_.seminar = seminar;
            }
            if (row.unitproperties !== null && row.unitproperties !== undefined) {
                let unitproperties = [];
                row.unitproperties.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        unitproperties.push(+data + '');
                    }
                });
                this_.unitproperties = unitproperties;
            }
            if (row.unitspecialty !== null && row.unitspecialty !== undefined) {
                let unitspecialty = [];
                row.unitspecialty.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        unitspecialty.push(+data + '');
                    }
                });
                this_.unitspecialty = unitspecialty;
            }
            if (row.industryfield !== null && row.industryfield !== undefined) {
                let industryfield = [];
                row.industryfield.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        industryfield.push(+data + '');
                    }
                });
                this_.industryfield = industryfield;
            }
            if (row.internationalproject !== null && row.internationalproject !== undefined) {
                let internationalproject = [];
                row.internationalproject.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        internationalproject.push(+data + '');
                    }
                });
                this_.internationalproject = internationalproject;
            }
            if (row.midtownrail !== null && row.midtownrail !== undefined) {
                let midtownrail = [];
                row.midtownrail.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        midtownrail.push(+data + '');
                    }
                });
                this_.midtownrail = midtownrail;
            }
            if (row.relatedstudy !== null && row.relatedstudy !== undefined) {
                let relatedstudy = [];
                row.relatedstudy.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        relatedstudy.push(+data + '');
                    }
                });
                this_.relatedstudy = relatedstudy;
            }
            if (row.cooperativeproject !== null && row.cooperativeproject !== undefined) {
                let cooperativeproject = [];
                row.cooperativeproject.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        cooperativeproject.push(+data + '');
                    }
                });
                this_.cooperativeproject = cooperativeproject;
            }
            if (row.ourmeeting !== null && row.ourmeeting !== undefined) {
                let ourmeeting = [];
                row.ourmeeting.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        ourmeeting.push(+data + '');
                    }
                });
                this_.ourmeeting = ourmeeting;
            }
            if (row.ourmeeting2 !== null && row.ourmeeting2 !== undefined) {
                let ourmeeting2 = [];
                row.ourmeeting2.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        ourmeeting2.push(+data + '');
                    }
                });
                this_.ourmeeting2 = ourmeeting2;
            }
            if (row.othermeeting !== null && row.othermeeting !== undefined) {
                let othermeeting = [];
                row.othermeeting.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        othermeeting.push(+data + '');
                    }
                });
                this_.othermeeting = othermeeting;
            }
            if (row.businesssources !== null && row.businesssources !== undefined) {
                let businesssources = [];
                row.businesssources.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        businesssources.push(+data + '');
                    }
                });
                this_.businesssources = businesssources;
            }
            if (row.currentissue !== null && row.currentissue !== undefined) {
                let currentissue = [];
                row.currentissue.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        currentissue.push(+data + '');
                    }
                });
                this_.currentissue = currentissue;
            }
            if (row.countryregion !== null && row.countryregion !== undefined) {
                let countryregion = [];
                row.countryregion.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        countryregion.push(+data + '');
                    }
                });
                this_.countryregion = countryregion;
            }
            if (row.city !== null && row.city !== undefined) {
                let city = [];
                row.city.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        city.push(+data + '');
                    }
                });
                this_.city = city;
            }
            if (row.magazine !== null && row.magazine !== undefined) {
                let magazine = [];
                row.magazine.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        magazine.push(+data + '');
                    }
                });
                this_.magazine = magazine;
            }
            if (row.distributionmode !== null && row.distributionmode !== undefined) {
                let distributionmode = [];
                row.distributionmode.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        distributionmode.push(+data + '');
                    }
                });
                this_.distributionmode = distributionmode;
            }
            if (row.salesman !== null && row.salesman !== undefined) {
                let salesman = [];
                row.salesman.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        salesman.push(+data + '');
                    }
                });
                this_.salesman = salesman;
            }
            if (row.custom1 !== null && row.custom1 !== undefined) {
                let custom1 = [];
                row.custom1.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        custom1.push(+data + '');
                    }
                });
                this_.custom1 = custom1;
            }
            if (row.custom2 !== null && row.custom2 !== undefined) {
                let custom2 = [];
                row.custom2.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        custom2.push(+data + '');
                    }
                });
                this_.custom2 = custom2;
            }
            if (row.custom3 !== null && row.custom3 !== undefined) {
                let custom3 = [];
                row.custom3.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        custom3.push(+data + '');
                    }
                });
                this_.custom3 = custom3;
            }
            if (row.custom4 !== null && row.custom4 !== undefined) {
                let custom4 = [];
                row.custom4.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        custom4.push(+data + '');
                    }
                });
                this_.custom4 = custom4;
            }
        },
        savePerson1 (name) {
            let this_ = this;
            // this.$refs[name].validate((valid) => {
                this_.personValidate.id = this_.person_index;
                this_.personValidate.type = '4';
                this_.personValidate.seminar = this_.seminar + '';
                this_.personValidate.unitproperties = this_.unitproperties + '';
                this_.personValidate.unitspecialty = this_.unitspecialty + '';
                this_.personValidate.industryfield = this_.industryfield + '';
                this_.personValidate.internationalproject = this_.internationalproject + '';
                this_.personValidate.midtownrail = this_.midtownrail + '';
                this_.personValidate.relatedstudy = this_.relatedstudy + '';
                this_.personValidate.cooperativeproject = this_.cooperativeproject + '';
                this_.personValidate.ourmeeting = this_.ourmeeting + '';
                this_.personValidate.ourmeeting2 = this_.ourmeeting2 + '';
                this_.personValidate.othermeeting = this_.othermeeting + '';
                this_.personValidate.businesssources = this_.businesssources + '';
                this_.personValidate.currentissue = this_.currentissue + '';
                this_.personValidate.countryregion = this_.countryregion + '';
                this_.personValidate.city = this_.city + '';
                this_.personValidate.magazine = this_.magazine + '';
                this_.personValidate.distributionmode = this_.distributionmode + '';
                this_.personValidate.salesman = this_.salesman + '';
                this_.personValidate.custom1 = this_.custom1 + '';
                this_.personValidate.custom2 = this_.custom2 + '';
                this_.personValidate.custom3 = this_.custom3 + '';
                this_.personValidate.custom4 = this_.custom4 + '';
                this_.personValidate.persontype = '';
                this_.personValidate.meetid = '';
                this.$ajax.post('basicperson/editmx',
                    'telephone=' + this_.personValidate.telephone + '&fax=' + this_.personValidate.fax +
                    '&email=' + this_.personValidate.email + '&location=' + this_.personValidate.location +
                    '&postcode=' + this_.personValidate.postcode + '&seminar=' + this_.seminar + '' +
                    '&unitproperties=' + this_.unitproperties + '' + '&unitspecialty=' + this_.unitspecialty + '' +
                    '&industryfield=' + this_.industryfield + '' + '&internationalproject=' + this_.internationalproject + '' +
                    '&midtownrail=' + this_.midtownrail + '' + '&relatedstudy=' + this_.relatedstudy + '' +
                    '&cooperativeproject=' + this_.cooperativeproject + '' + '&ourmeeting=' + this_.ourmeeting + '' +
                    '&ourmeeting2=' + this_.ourmeeting2 + '' + '&othermeeting=' + this_.othermeeting + '' +
                    '&businesssources=' + this_.businesssources + '' + '&row1=' + this_.personValidate.row1 +
                    '&year112=' + this_.personValidate.year112 + '&year11=' + this_.personValidate.year11 +
                    '&currentissue=' + this_.currentissue + '' + '&countryregion=' + this_.countryregion + '' +
                    '&city=' + this_.city + '' + '&formerunitposition=' + this_.personValidate.formerunitposition +
                    '&noneed=' + this_.personValidate.noneed + '' + '&updatedatatime=' + this_.personValidate.updatedatatime +
                    '&magazine=' + this_.magazine + '' + '&distributionmode=' + this_.distributionmode + '' +
                    '&remarks=' + this_.personValidate.remarks + '' + '&salesman=' + this_.salesman + '' +
                    '&copies=' + this_.personValidate.copies + '' + '&latestcontact=' + this_.personValidate.latestcontact +
                    '&updatedate=' + this_.personValidate.updatedate + '' + '&verificationproblem=' + this_.personValidate.verificationproblem +
                    '&id=' + this_.person_index + '&custom1=' + this_.custom1 + '' + '&custom2=' + this_.custom2 + ''+
                    '&custom3=' + this_.custom3 + '' + '&custom4=' + this_.custom4 + '')
                    .then(function (response) {
                        if (response.data.errorCode === 0) {
                            this_.$Message.config({
                                top: 50,
                                duration: 3,
                                width: 200
                            });
                            this_.$Message.info('修改成功');
                            this_.$store.commit('basicpersonlist', this_.personValidate);
                        } else {
                            this_.$Message.info('修改失败');
                        }
                    });
                this_.detail = false;
            // });
        },
        savePerson2 () {
            let this_ = this;
            this.query_status = "1";
            this.$ajax.post('basicperson/query',
                '&seminar_query=' + this_.seminar_query + '' + '&unitproperties_query=' + this_.unitproperties_query + '' + 
                '&unitspecialty_query=' + this_.unitspecialty_query + '' + '&industryfield_query=' + this_.industryfield_query + '' + 
                '&internationalproject_query=' + this_.internationalproject_query + '' + '&midtownrail_query=' + this_.midtownrail_query + '' + 
                '&relatedstudy_query=' + this_.relatedstudy_query + '' + '&cooperativeproject_query=' + this_.cooperativeproject_query + '' + 
                '&ourmeeting_query=' + this_.ourmeeting_query + '' + '&othermeeting_query=' + this_.othermeeting_query + '' +
                '&businesssources_query=' + this_.businesssources_query + '' +  '&currentissue_query=' + this_.currentissue_query + '' + 
                '&countryregion_query=' + this_.countryregion_query + '' + '&city_query=' + this_.city_query + '' + 
                '&magazine_query=' + this_.magazine_query + '' + '&distributionmode_query=' + this_.distributionmode_query + '' +
                '&salesman_query=' + this_.salesman_query + '' + '&persontype=' + "1" + '&ourmeeting2_query=' + this_.ourmeeting2_query + '' +
                '&custom1_query=' + this_.custom1_query + '' + '&custom2_query=' + this_.custom2_query + '' + 
                '&custom3_query=' + this_.custom3_query + '' + '&custom4_query=' + this_.custom4_query + '')
                .then(function (response) {
                    this_.$store.commit('basicpersonlist', response.data.basicpersonlist);
                    this_.pageNumber = 1;
                });
            this.query = false;
        },
        changeyear (value) {
            let year = '';
            let current = this.currentissue;
            let person = [];
            let this_ = this;
            if (current.length > 0) {
                person = this.personcontent;
                for (let i = 0; i < person.length; i++) {
                    for (let j = 0; j < person.length; j++) {
                        if (person[j].id === current[i]) {
                            year += person[j].content;
                        }
                    }
                }
                this_.personValidate.year112 = value + year;
            } else {
                this.personValidate.year112 = value;
            }
        },
        changecurrent (value) {
            let year = '';
            let person = [];
            let this_ = this;
            person = this.personcontent;
            for (let i = 0; i < value.length; i++) {
                for (let j = 0; j < person.length; j++) {
                    if (person[j].id === value[i]) {
                        year += person[j].content;
                    }
                }
            }
            this_.personValidate.year112 = this_.personValidate.year11 + '' + year;
        },
        delete (id) {
            let this_ = this;
            this_.personValidate.id = id;
            this_.personValidate.type = '3';
            this_.personValidate.persontype = '1';
            this_.personValidate.meetid = '';
            this.$ajax.post('basicperson/delete',
                'id=' + id)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('删除成功');
                        this_.$store.commit('basicpersonlist', this_.personValidate);
                        if(this_.person_data.length == 0) {
                            this_.pageNumber = this_.pageNumber - 1;
                        }
                    } else {
                        this_.$Message.info('删除失败');
                    }
                });
        }
    },
    computed: {
        basicpersonlistPath: function () {
            return this.$store.getters.basicpersonlistPath;
        },
        labelstatusPath: function () {
            let labelstatus = this.$store.getters.labelstatusPath;
            for (let i = 0; i < labelstatus.length; i++) {
                if(labelstatus[i].type == "1") {
                    this.labelNmae.unitspecialty = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "2") {
                    this.labelNmae.unitproperties = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "3") {
                    this.labelNmae.industryfield = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "4") {
                    this.labelNmae.seminar = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "5") {
                    this.labelNmae.internationalproject = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "6") {
                    this.labelNmae.cooperativeproject = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "8") {
                    this.labelNmae.midtownrail = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "9") {
                    this.labelNmae.relatedstudy = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "10") {
                    this.labelNmae.ourmeeting = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "11") {
                    this.labelNmae.othermeeting = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "12") {
                    this.labelNmae.businesssources = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "13") {
                    this.labelNmae.countryregion = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "14") {
                    this.labelNmae.city = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "15") {
                    this.labelNmae.currentissue = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "16") {
                    this.labelNmae.magazine = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "17") {
                    this.labelNmae.distributionmode = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "18") {
                    this.labelNmae.salesman = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "19") {
                    this.labelNmae.ourmeeting2 = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "20") {
                    this.labelNmae.custom1 = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "21") {
                    this.labelNmae.custom2 = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "22") {
                    this.labelNmae.custom3 = labelstatus[i].labelname;
                } else if(labelstatus[i].type == "23") {
                    this.labelNmae.custom4 = labelstatus[i].labelname;
                }
            }
            return this.labelNmae;
        },
        personcontent: function () {
            return this.$store.getters.personcontentPath;
        },
        pageTotal: function () {
            let person = this.basicpersonlistPath;
            let persons = [];
            for (let i = 0; i < person.length; i++) {
                if (person[i].name.indexOf(this.value) !== -1) {
                    persons.push(person[i]);
                }
            }
            if (persons.length > 0) {
                return persons.length;
            }
        },
        person_data: function () {
            let person = this.basicpersonlistPath;
            let persons = [];
            for (let i = 0; i < person.length; i++) {
                if (person[i].name.indexOf(this.value) !== -1) {
                    persons.push(person[i]);
                }
            }
            if (persons.length > 0) {
                return persons.slice((this.pageNumber - 1) * this.pageSize, this.pageNumber * this.pageSize);
            }
        },
        personData: function () {
            let person = this.basicpersonlistPath;
            let persons = [];
            for (let i = 0; i < person.length; i++) {
                if (person[i].name.indexOf(this.value) !== -1) {
                    persons.push(person[i]);
                }
            }
            return persons;
        }
    },
    created() {
        var _this = this;
        this.$ajax.post('meetingcolumns/list')
            .then(function (response) {
                _this.$store.commit('basicpersonlist', response.data.basicpersonlist);
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
  .textLeft{
    margin-left:50px;
  }
  .select{
      width:300px;
      margin-left:10px;
  }
  .textRight{
      margin-left:30px;
  }
</style>
