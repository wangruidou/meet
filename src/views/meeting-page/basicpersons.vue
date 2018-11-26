<template>
  <div class="animated fadeIn">
    <div class="ivu-row">
        <Row>
            <Col span="6">
                <AutoComplete v-model="value" :data="searchPersonList" @on-search="searchPerson" placeholder="查询人员"></AutoComplete>                
            </Col>
            <!-- <Col span="4" offset="14">
                <Button type="primary" @click="addPerson('personValidate')">添加人员</Button>
            </Col> -->
            <div style="float:right;margin-right:100px;">
                
                <Button type="primary" @click="q()">详细查询</Button>
                <input style="width:180px;" id="file" name="file" class="filepath" type="file"></input>
                <Button type="primary" @click="import1()">导入</Button>
                <Button type="primary" @click="export1()">导出</Button>
            </div>
        </Row>
    </div>
    <br>
    <Table :height="myHeight" highlight-row ref="personRowTable" :columns="personColumns" :data="person_data"></Table>
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
                <Button type="ghost" @click="resetPerson('personValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <div slot="footer"></div>
    </Modal>

    <Modal v-model="query" title="详细标签查询" width="70%">
        <Form :label-width="110">
            <tr>
                <td>
                    <FormItem>
                        <span style="margin-left:-50px;">{{labelstatusPath.unitspecialty}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="unitspecialty_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==1" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.unitproperties}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="unitproperties_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==2" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span style="margin-left:-50px;">{{labelstatusPath.industryfield}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="industryfield_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==3" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.seminar}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="seminar_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==4" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span style="margin-left:-50px;">{{labelstatusPath.internationalproject}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="internationalproject_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==5" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.cooperativeproject}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="cooperativeproject_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==6" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span style="margin-left:-50px;">{{labelstatusPath.midtownrail}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="midtownrail_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==8" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.relatedstudy}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="relatedstudy_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==9" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span style="margin-left:-50px;">{{labelstatusPath.ourmeeting}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="ourmeeting_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==10" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.othermeeting}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="othermeeting_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==11" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span style="margin-left:-50px;">{{labelstatusPath.businesssources}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="businesssources_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==12" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.countryregion}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="countryregion_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==13" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span style="margin-left:-50px;">{{labelstatusPath.city}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="city_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==14" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.currentissue}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="currentissue_query" multiple @on-change="changecurrent(currentissue)">
                            <Option v-for="item in personcontent" v-if="item.type==15" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span style="margin-left:-50px;">{{labelstatusPath.magazine}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="magazine_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==16" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.distributionmode}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="distributionmode_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==17" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span style="margin-left:-50px;">{{labelstatusPath.salesman}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="salesman_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==18" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.ourmeeting2}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="ourmeeting2_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==19" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span style="margin-left:-50px;">{{labelstatusPath.custom1}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="custom1_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==20" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.custom2}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="custom2_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==21" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span style="margin-left:-50px;">{{labelstatusPath.custom3}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="custom3_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==22" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.custom4}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="custom4_query" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==23" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <FormItem>
                <Button type="primary" @click="savePerson2()" style="margin-left:350px;">查询</Button>
                <Button type="ghost" @click="resetPerson_query()" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <div slot="footer"></div>
    </Modal>
   
   <Modal v-model="detail" title="人员详细信息" width="70%" height="50%">
        <Form ref="personValidate1" :model="personValidate" :label-width="110">
            <tr>
                <td>
                    <FormItem prop="telephone">
                        <span style="margin-left:-50px;">移动电话</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.telephone" placeholder="请输入移动电话..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="fax">
                        <span>传真</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.fax" placeholder="请输入传真..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="email">
                        <span style="margin-left:-50px;">电子邮件</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.email" placeholder="请输入电子邮件..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="location">
                        <span>地址</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.location" placeholder="请输入地址..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="postcode">
                        <span style="margin-left:-50px;">邮政编码</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.postcode" placeholder="请输入邮政编码..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="seminar">
                        <span>{{labelstatusPath.seminar}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="seminar" multiple >
                            <Option v-for="item in personcontent" v-if="item.type==4" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="unitproperties">
                        <span style="margin-left:-50px;">{{labelstatusPath.unitproperties}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="unitproperties" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==2" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="unitspecialty">
                        <span>{{labelstatusPath.unitspecialty}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="unitspecialty" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==1" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="industryfield">
                        <span style="margin-left:-50px;">{{labelstatusPath.industryfield}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="industryfield" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==3" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="internationalproject">
                        <span>{{labelstatusPath.internationalproject}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="internationalproject" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==5" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="midtownrail">
                        <span style="margin-left:-50px;">{{labelstatusPath.midtownrail}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="midtownrail" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==8" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="relatedstudy">
                        <span>{{labelstatusPath.relatedstudy}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="relatedstudy" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==9" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="cooperativeproject">
                        <span style="margin-left:-50px;">{{labelstatusPath.cooperativeproject}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="cooperativeproject" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==6" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="ourmeeting">
                        <span>{{labelstatusPath.ourmeeting}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="ourmeeting" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==10" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="ourmeeting2">
                        <span style="margin-left:-50px;">{{labelstatusPath.ourmeeting2}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="ourmeeting2" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==19" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="othermeeting">
                        <span>{{labelstatusPath.othermeeting}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="othermeeting" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==11" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="businesssources">
                        <span style="margin-left:-50px;">{{labelstatusPath.businesssources}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="businesssources" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==12" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="row1">
                        <span>列1</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.row1" placeholder="请输入列1..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="year112">
                        <span style="margin-left:-50px;">当年发行合计112</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.year112" placeholder="请输入当年发行合计112..." disabled></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="year11">
                        <span>当年发行合计11</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.year11" placeholder="请输入当年发行合计11..." @on-blur="changeyear(personValidate.year11)"></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="currentissue">
                        <span style="margin-left:-50px;">{{labelstatusPath.currentissue}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="currentissue" multiple @on-change="changecurrent(currentissue)">
                            <Option v-for="item in personcontent" v-if="item.type==15" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="countryregion">
                        <span>{{labelstatusPath.countryregion}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="countryregion" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==13" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="city">
                        <span style="margin-left:-50px;">{{labelstatusPath.city}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="city" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==14" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="formerunitposition">
                        <span>以前单位和职务</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.formerunitposition" placeholder="请输入以前单位和职务..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="noneed">
                        <span style="margin-left:-50px;">不用</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.noneed" placeholder="请输入不用..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="updatedatatime">
                        <span>更新数据时间</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.updatedatatime" placeholder="请输入更新数据时间..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="magazine">
                        <span style="margin-left:-50px;">{{labelstatusPath.magazine}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="magazine" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==16" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="distributionmode">
                        <span>{{labelstatusPath.distributionmode}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="distributionmode" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==17" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="remarks">
                        <span style="margin-left:-50px;">备注</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.remarks" placeholder="请输入备注..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="salesman">
                        <span>{{labelstatusPath.salesman}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="salesman" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==18" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="copies">
                        <span style="margin-left:-50px;">份数</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.copies" placeholder="请输入份数..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="latestcontact">
                        <span>最新联系情况</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.latestcontact" placeholder="请输入最新联系情况..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="updatedate">
                        <span style="margin-left:-50px;">更新日期</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.updatedate" placeholder="请输入更新日期..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="verificationproblem">
                        <span>查证的问题</span>
                        <Input style="width:300px;margin-left:10px;float:right;" v-model="personValidate.verificationproblem" placeholder="请输入查证的问题..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="custom1">
                        <span style="margin-left:-50px;">{{labelstatusPath.custom1}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="custom1" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==20" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="custom2">
                        <span>{{labelstatusPath.custom2}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="custom2" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==21" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="custom3">
                        <span style="margin-left:-50px;">{{labelstatusPath.custom3}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="custom3" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==22" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="custom4">
                        <span>{{labelstatusPath.custom4}}</span>
                        <Select style="width:300px;margin-left:10px;float:right;" v-model="custom4" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==23" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <FormItem>
                <Button type="primary" @click="savePerson1('personValidate1')" style="margin-left:350px;">保存</Button>
                <Button type="ghost" @click="resetPerson('personValidate1')" style="margin-left: 8px">重置</Button>
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
            value: '',
            pageSize: 10,
            pageNumber: 1,
            person_index: -1,
            searchPersonList: [],
            personColumns: [
                {title: '序号', type: 'index', width: 70, align: 'center'}, // 单选
                {title: '姓名', key: 'name', width: 150, align: 'center'},
                {title: '单位', key: 'unit', width: 300, align: 'center'},
                {title: '职务', key: 'position', width: 250, align: 'center'},
                {title: '手机号', key: 'phone', width: 150, align: 'center'},
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
            AddpersonValidate: {
                id: '',
                name: '',
                unit: '',
                position: '',
                phone: '',
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
                    {type: 'string', pattern: /^1[3|4|5|8][0-9]\d{4,8}$/, message: '请输入正确的手机号码', trigger: 'blur'}
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
        q () {
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
        },
        addPerson (name) {
            this.person_index = -1;
            this.$refs[name].resetFields();
            this.AddpersonValidate = {
                id: '',
                name: '',
                unit: '',
                position: '',
                phone: '',
                type: '',
                persontype: '',
                meetid: ''
            };
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
            this.custom1= [],
            this.custom2= [],
            this.custom3= [],
            this.custom4= []
            this.person_modal = true;
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
                    } else { // 新增
                        this.$ajax.post('basicperson/add',
                            'name=' + this_.personValidate.name + '&phone=' + this_.personValidate.phone +
                            '&unit=' + this_.personValidate.unit + '&position=' + this_.personValidate.position)
                            .then(function (response) {
                                this_.AddpersonValidate.id = response.data.id;
                                this_.AddpersonValidate.name = this_.personValidate.name;
                                this_.AddpersonValidate.unit = this_.personValidate.unit;
                                this_.AddpersonValidate.phone = this_.personValidate.phone;
                                this_.AddpersonValidate.position = this_.personValidate.position;
                                this_.AddpersonValidate.type = '1';
                                this_.AddpersonValidate.meetid = '';
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('添加成功');
                                    this_.$store.commit('basicpersonlist', this_.AddpersonValidate);
                                } else {
                                    this_.$Message.info('添加失败');
                                }
                            });
                    }
                    this.person_modal = false;
                } else {
                    this.person_modal = true;
                }
            });
        },
        resetPerson (name) {
            this.$refs[name].resetFields();
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
        resetPerson_query () {
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
            this.$refs[name].validate((valid) => {
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
            });
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
