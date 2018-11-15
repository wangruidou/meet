const meet = {
    state: {
        // 存放组件之间共享的数据
        meetingData: [],
        meetingColumnsData: [],
        basicpersonColumnsData: [], // 基本人员
        grestpersonColumnsData: [], // 关注人员
        outsidegrouppersonColumnsData: [], // 工作人员
        guestgroupData: [],
        workgroupData: [],
        attendgroupData: [],
        personcontentData: [], //标签集合
        dispatchtaskData: [],
        pushinformationData: [],
        handlingmethodData: [],
        meetingpersonData: [],
        logsData: [], //日志信息
        labelstatusData: [] //标签状态
    },
    mutations: {
        // 显式的更改state里的数据
        meetinglist (state, data) {
            if (data) {
                if (data.length > 0) {
                    state.meetingColumnsData = data;
                    for (let i = 0; i < state.meetingColumnsData.length; i++) {
                        state.meetingColumnsData[i].meet_date = state.meetingColumnsData[i].meet_date_start + ' - ' + state.meetingColumnsData[i].meet_date_end;
                    }
                } else {
                    if (data.type === '1') {
                        state.meetingColumnsData.push(data);
                    } else if (data.type === '2') {
                        for (let i = 0; i < state.meetingColumnsData.length; i++) {
                            if (data.id === state.meetingColumnsData[i].id) {
                                state.meetingColumnsData[i].meet_name = data.meet_name;
                                state.meetingColumnsData[i].meet_date = data.meet_date;
                                state.meetingColumnsData[i].meet_date_start = data.meet_date_start;
                                state.meetingColumnsData[i].meet_date_end = data.meet_date_end;
                                state.meetingColumnsData[i].meet_address = data.meet_address;
                                state.meetingColumnsData[i].meet_sponsor = data.meet_sponsor;
                                state.meetingColumnsData[i].meet_theme = data.meet_theme;
                            }
                        }
                    } else {
                        for (let i = 0; i < state.meetingColumnsData.length; i++) {
                            if (data.id === state.meetingColumnsData[i].id) {
                                state.meetingColumnsData.splice(i, 1);
                            }
                        }
                    }
                }
                state.meetingData = state.meetingColumnsData;
            } else {
                alert(data);
            }
        },
        guestpersonlist (state, data) {
            if (data) {
                if (data.length > 0) {
                    state.grestpersonColumnsData.length = 0;
                    state.outsidegrouppersonColumnsData.length = 0;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].persontype === '1') {
                            if (data[i].type === '' || data[i].type === undefined) {
                                state.grestpersonColumnsData.push(data[i]);
                            }
                        } else if (data[i].persontype === '2') {
                            if (data[i].type === '' || data[i].type === undefined) {
                                state.outsidegrouppersonColumnsData.push(data[i]);
                            }
                        }
                    }
                } else {
                    if (data.persontype === '1') {
                        if (data.type === '1') {
                            state.grestpersonColumnsData.push(data);
                        } else if (data.type === '2') {
                            for (let i = 0; i < state.grestpersonColumnsData.length; i++) {
                                if (data.id === state.grestpersonColumnsData[i].id) {
                                    state.grestpersonColumnsData[i].name = data.name;
                                    state.grestpersonColumnsData[i].phone = data.phone;
                                    state.grestpersonColumnsData[i].unit = data.unit;
                                    state.grestpersonColumnsData[i].position = data.position;
                                }
                            }
                        } else if (data.type === '3') {
                            for (let i = 0; i < state.grestpersonColumnsData.length; i++) {
                                if (data.id === state.grestpersonColumnsData[i].id) {
                                    state.grestpersonColumnsData.splice(i, 1);
                                }
                            }
                        } else if (data.type === '4') {
                            for (let i = 0; i < state.grestpersonColumnsData.length; i++) {
                                if (data.id === state.grestpersonColumnsData[i].id) {
                                    state.grestpersonColumnsData[i].telephone = data.telephone;
                                    state.grestpersonColumnsData[i].fax = data.fax;
                                    state.grestpersonColumnsData[i].email = data.email;
                                    state.grestpersonColumnsData[i].location = data.location;
                                    state.grestpersonColumnsData[i].postcode = data.postcode;
                                    state.grestpersonColumnsData[i].seminar = data.seminar;
                                    state.grestpersonColumnsData[i].unitproperties = data.unitproperties;
                                    state.grestpersonColumnsData[i].unitspecialty = data.unitspecialty;
                                    state.grestpersonColumnsData[i].industryfield = data.industryfield;
                                    state.grestpersonColumnsData[i].internationalproject = data.internationalproject;
                                    state.grestpersonColumnsData[i].midtownrail = data.midtownrail;
                                    state.grestpersonColumnsData[i].relatedstudy = data.relatedstudy;
                                    state.grestpersonColumnsData[i].cooperativeproject = data.cooperativeproject;
                                    state.grestpersonColumnsData[i].ourmeeting = data.ourmeeting;
                                    state.grestpersonColumnsData[i].ourmeeting2 = data.ourmeeting2;
                                    state.grestpersonColumnsData[i].othermeeting = data.othermeeting;
                                    state.grestpersonColumnsData[i].businesssources = data.businesssources;
                                    state.grestpersonColumnsData[i].row1 = data.row1;
                                    state.grestpersonColumnsData[i].year112 = data.year112;
                                    state.grestpersonColumnsData[i].year11 = data.year11;
                                    state.grestpersonColumnsData[i].currentissue = data.currentissue;
                                    state.grestpersonColumnsData[i].countryregion = data.countryregion;
                                    state.grestpersonColumnsData[i].city = data.city;
                                    state.grestpersonColumnsData[i].formerunitposition = data.formerunitposition;
                                    state.grestpersonColumnsData[i].noneed = data.noneed;
                                    state.grestpersonColumnsData[i].updatedatatime = data.updatedatatime;
                                    state.grestpersonColumnsData[i].magazine = data.magazine;
                                    state.grestpersonColumnsData[i].distributionmode = data.distributionmode;
                                    state.grestpersonColumnsData[i].remarks = data.remarks;
                                    state.grestpersonColumnsData[i].salesman = data.salesman;
                                    state.grestpersonColumnsData[i].copies = data.copies;
                                    state.grestpersonColumnsData[i].latestcontact = data.latestcontact;
                                    state.grestpersonColumnsData[i].updatedate = data.updatedate;
                                    state.grestpersonColumnsData[i].verificationproblem = data.verificationproblem;
                                    state.grestpersonColumnsData[i].custom1 = data.custom1;
                                    state.grestpersonColumnsData[i].custom2 = data.custom2;
                                    state.grestpersonColumnsData[i].custom3 = data.custom3;
                                    state.grestpersonColumnsData[i].custom4 = data.custom4;
                                }
                            }
                        }
                    } else if (data.persontype === '2') {
                        if (data.type === '1') {
                            state.outsidegrouppersonColumnsData.push(data);
                        } else if (data.type === '2') {
                            for (let i = 0; i < state.outsidegrouppersonColumnsData.length; i++) {
                                if (data.id === state.outsidegrouppersonColumnsData[i].id) {
                                    state.outsidegrouppersonColumnsData[i].name = data.name;
                                    state.outsidegrouppersonColumnsData[i].phone = data.phone;
                                    state.outsidegrouppersonColumnsData[i].unit = data.unit;
                                    state.outsidegrouppersonColumnsData[i].position = data.position;
                                }
                            }
                        } else if (data.type === '3') {
                            for (let i = 0; i < state.outsidegrouppersonColumnsData.length; i++) {
                                if (data.id === state.outsidegrouppersonColumnsData[i].id) {
                                    state.outsidegrouppersonColumnsData.splice(i, 1);
                                }
                            }
                        } else if (data.type === '4') {
                            for (let i = 0; i < state.outsidegrouppersonColumnsData.length; i++) {
                                if (data.id === state.outsidegrouppersonColumnsData[i].id) {
                                    state.outsidegrouppersonColumnsData[i].telephone = data.telephone;
                                    state.outsidegrouppersonColumnsData[i].fax = data.fax;
                                    state.outsidegrouppersonColumnsData[i].email = data.email;
                                    state.outsidegrouppersonColumnsData[i].location = data.location;
                                    state.outsidegrouppersonColumnsData[i].postcode = data.postcode;
                                    state.outsidegrouppersonColumnsData[i].seminar = data.seminar;
                                    state.outsidegrouppersonColumnsData[i].unitproperties = data.unitproperties;
                                    state.outsidegrouppersonColumnsData[i].unitspecialty = data.unitspecialty;
                                    state.outsidegrouppersonColumnsData[i].industryfield = data.industryfield;
                                    state.outsidegrouppersonColumnsData[i].internationalproject = data.internationalproject;
                                    state.outsidegrouppersonColumnsData[i].midtownrail = data.midtownrail;
                                    state.outsidegrouppersonColumnsData[i].relatedstudy = data.relatedstudy;
                                    state.outsidegrouppersonColumnsData[i].cooperativeproject = data.cooperativeproject;
                                    state.outsidegrouppersonColumnsData[i].ourmeeting = data.ourmeeting;
                                    state.outsidegrouppersonColumnsData[i].ourmeeting2 = data.ourmeeting2;
                                    state.outsidegrouppersonColumnsData[i].othermeeting = data.othermeeting;
                                    state.outsidegrouppersonColumnsData[i].businesssources = data.businesssources;
                                    state.outsidegrouppersonColumnsData[i].row1 = data.row1;
                                    state.outsidegrouppersonColumnsData[i].year112 = data.year112;
                                    state.outsidegrouppersonColumnsData[i].year11 = data.year11;
                                    state.outsidegrouppersonColumnsData[i].currentissue = data.currentissue;
                                    state.outsidegrouppersonColumnsData[i].countryregion = data.countryregion;
                                    state.outsidegrouppersonColumnsData[i].city = data.city;
                                    state.outsidegrouppersonColumnsData[i].formerunitposition = data.formerunitposition;
                                    state.outsidegrouppersonColumnsData[i].noneed = data.noneed;
                                    state.outsidegrouppersonColumnsData[i].updatedatatime = data.updatedatatime;
                                    state.outsidegrouppersonColumnsData[i].magazine = data.magazine;
                                    state.outsidegrouppersonColumnsData[i].distributionmode = data.distributionmode;
                                    state.outsidegrouppersonColumnsData[i].remarks = data.remarks;
                                    state.outsidegrouppersonColumnsData[i].salesman = data.salesman;
                                    state.outsidegrouppersonColumnsData[i].copies = data.copies;
                                    state.outsidegrouppersonColumnsData[i].latestcontact = data.latestcontact;
                                    state.outsidegrouppersonColumnsData[i].updatedate = data.updatedate;
                                    state.outsidegrouppersonColumnsData[i].verificationproblem = data.verificationproblem;
                                    state.outsidegrouppersonColumnsData[i].custom1 = data.custom1;
                                    state.outsidegrouppersonColumnsData[i].custom2 = data.custom2;
                                    state.outsidegrouppersonColumnsData[i].custom3 = data.custom3;
                                    state.outsidegrouppersonColumnsData[i].custom4 = data.custom4;
                                }
                            }
                        }
                    } else {
                        state.grestpersonColumnsData = [];
                        state.outsidegrouppersonColumnsData = [];
                    }
                }
            } else {
                alert(data);
            }
        },
        basicpersonlist (state, data) {
            if (data) {
                if (data.length > 0) {
                    state.basicpersonColumnsData.length = 0;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].type === '' || data[i].type === undefined) {
                            state.basicpersonColumnsData.push(data[i]);
                        }
                    }
                } else {
                    if (data.type === '1') {
                        state.basicpersonColumnsData.push(data);
                    } else if (data.type === '2') {
                        for (let i = 0; i < state.basicpersonColumnsData.length; i++) {
                            if (data.id === state.basicpersonColumnsData[i].id) {
                                state.basicpersonColumnsData[i].name = data.name;
                                state.basicpersonColumnsData[i].phone = data.phone;
                                state.basicpersonColumnsData[i].unit = data.unit;
                                state.basicpersonColumnsData[i].position = data.position;
                            }
                        }
                    } else if (data.type === '3') {
                        for (let i = 0; i < state.basicpersonColumnsData.length; i++) {
                            if (data.id === state.basicpersonColumnsData[i].id) {
                                state.basicpersonColumnsData.splice(i, 1);
                            }
                        }
                    } else if (data.type === '4') {
                        for (let i = 0; i < state.basicpersonColumnsData.length; i++) {
                            if (data.id === state.basicpersonColumnsData[i].id) {
                                state.basicpersonColumnsData[i].telephone = data.telephone;
                                state.basicpersonColumnsData[i].fax = data.fax;
                                state.basicpersonColumnsData[i].email = data.email;
                                state.basicpersonColumnsData[i].location = data.location;
                                state.basicpersonColumnsData[i].postcode = data.postcode;
                                state.basicpersonColumnsData[i].seminar = data.seminar;
                                state.basicpersonColumnsData[i].unitproperties = data.unitproperties;
                                state.basicpersonColumnsData[i].unitspecialty = data.unitspecialty;
                                state.basicpersonColumnsData[i].industryfield = data.industryfield;
                                state.basicpersonColumnsData[i].internationalproject = data.internationalproject;
                                state.basicpersonColumnsData[i].midtownrail = data.midtownrail;
                                state.basicpersonColumnsData[i].relatedstudy = data.relatedstudy;
                                state.basicpersonColumnsData[i].cooperativeproject = data.cooperativeproject;
                                state.basicpersonColumnsData[i].ourmeeting = data.ourmeeting;
                                state.basicpersonColumnsData[i].ourmeeting2 = data.ourmeeting2;
                                state.basicpersonColumnsData[i].othermeeting = data.othermeeting;
                                state.basicpersonColumnsData[i].businesssources = data.businesssources;
                                state.basicpersonColumnsData[i].row1 = data.row1;
                                state.basicpersonColumnsData[i].year112 = data.year112;
                                state.basicpersonColumnsData[i].year11 = data.year11;
                                state.basicpersonColumnsData[i].currentissue = data.currentissue;
                                state.basicpersonColumnsData[i].countryregion = data.countryregion;
                                state.basicpersonColumnsData[i].city = data.city;
                                state.basicpersonColumnsData[i].formerunitposition = data.formerunitposition;
                                state.basicpersonColumnsData[i].noneed = data.noneed;
                                state.basicpersonColumnsData[i].updatedatatime = data.updatedatatime;
                                state.basicpersonColumnsData[i].magazine = data.magazine;
                                state.basicpersonColumnsData[i].distributionmode = data.distributionmode;
                                state.basicpersonColumnsData[i].remarks = data.remarks;
                                state.basicpersonColumnsData[i].salesman = data.salesman;
                                state.basicpersonColumnsData[i].copies = data.copies;
                                state.basicpersonColumnsData[i].latestcontact = data.latestcontact;
                                state.basicpersonColumnsData[i].updatedate = data.updatedate;
                                state.basicpersonColumnsData[i].verificationproblem = data.verificationproblem;
                                state.basicpersonColumnsData[i].custom1 = data.custom1;
                                state.basicpersonColumnsData[i].custom2 = data.custom2;
                                state.basicpersonColumnsData[i].custom3 = data.custom3;
                                state.basicpersonColumnsData[i].custom4 = data.custom4;
                            }
                        }
                    } else {
                        state.basicpersonColumnsData = [];
                    }
                }
            } else {
                alert(data);
            }
        },
        groupslist (state, data) {
            if (data) {
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].status === '1') {
                            if (data[i].type === '' || data[i].type === undefined) {
                                state.attendgroupData.push(data[i]);
                            }
                        } else if (data[i].status === '2') {
                            if (data[i].type === '' || data[i].type === undefined) {
                                state.guestgroupData.push(data[i]);
                            }
                        } else if (data[i].status === '3') {
                            if (data[i].type === '' || data[i].type === undefined) {
                                state.workgroupData.push(data[i]);
                            }
                        }
                    }
                } else {
                    if (data.status === '1') {
                        if (data.type === '1') {
                            state.attendgroupData.push(data);
                        } else if (data.type === '2') {
                            for (let i = 0; i < state.attendgroupData.length; i++) {
                                if (data.id === state.attendgroupData[i].id) {
                                    state.attendgroupData[i].group_name = data.group_name;
                                    state.attendgroupData[i].status = data.status;
                                    state.attendgroupData[i].meetid = data.meetid;
                                    state.attendgroupData[i].persons = data.persons;
                                }
                            }
                        } else if (data.type === '3') {
                            for (let i = 0; i < state.attendgroupData.length; i++) {
                                if (data.id === state.attendgroupData[i].id) {
                                    state.attendgroupData.splice(i, 1);
                                }
                            }
                        }
                    } else if (data.status === '2') {
                        if (data.type === '1') {
                            state.guestgroupData.push(data);
                        } else if (data.type === '2') {
                            for (let i = 0; i < state.guestgroupData.length; i++) {
                                if (data.id === state.guestgroupData[i].id) {
                                    state.guestgroupData[i].group_name = data.group_name;
                                    state.guestgroupData[i].status = data.status;
                                    state.guestgroupData[i].meetid = data.meetid;
                                    state.guestgroupData[i].persons = data.persons;
                                }
                            }
                        } else if (data.type === '3') {
                            for (let i = 0; i < state.guestgroupData.length; i++) {
                                if (data.id === state.guestgroupData[i].id) {
                                    state.guestgroupData.splice(i, 1);
                                }
                            }
                        }
                    } else if (data.status === '3') {
                        if (data.type === '1') {
                            state.workgroupData.push(data);
                        } else if (data.type === '2') {
                            for (let i = 0; i < state.workgroupData.length; i++) {
                                if (data.id === state.workgroupData[i].id) {
                                    state.workgroupData[i].group_name = data.group_name;
                                    state.workgroupData[i].status = data.status;
                                    state.workgroupData[i].meetid = data.meetid;
                                    state.workgroupData[i].persons = data.persons;
                                }
                            }
                        } else if (data.type === '3') {
                            for (let i = 0; i < state.workgroupData.length; i++) {
                                if (data.id === state.workgroupData[i].id) {
                                    state.workgroupData.splice(i, 1);
                                }
                            }
                        }
                    }
                }
            } else {
                alert(data);
            }
        },
        personcontentlist (state, data) {
            if (data) {
                if (data.length > 0) {
                    state.personcontentData = data;
                } else {
                    if (data.kind === '1') {
                        state.personcontentData.push(data);
                    } else if (data.kind === '2') {
                        for (let i = 0; i < state.personcontentData.length; i++) {
                            if (data.id === state.personcontentData[i].id) {
                                state.personcontentData[i].content = data.content;
                            }
                        }
                    } else if (data.kind === '3') {
                        for (let i = 0; i < state.personcontentData.length; i++) {
                            if (data.id === state.personcontentData[i].id) {
                                state.personcontentData.splice(i, 1);
                            }
                        }
                    }
                }
            } else {
                alert(data);
            }
        },
        labelstatuslist (state, data) {
            if (data) {
                if (data.length > 0) {
                    state.labelstatusData = data;
                } else {
                    for (let i = 0; i < state.labelstatusData.length; i++) {
                        if (data.id === state.labelstatusData[i].id) {
                            state.labelstatusData[i].labelname = data.labelname;
                        }
                    }
                }
            } else {
                alert(data);
            }
        },
        dispatchtasklist (state, data) {
            if (data) {
                if (data.length > 0) {
                    state.dispatchtaskData = data;
                } else {
                    if (data.type === '1') {
                        state.dispatchtaskData.push(data);
                    } else if (data.type === '2') {
                        for (let i = 0; i < state.dispatchtaskData.length; i++) {
                            if (data.id === state.dispatchtaskData[i].id) {
                                state.dispatchtaskData[i].taskname = data.taskname;
                                state.dispatchtaskData[i].workingtime = data.workingtime;
                                state.dispatchtaskData[i].jobschedule = data.jobschedule;
                                state.dispatchtaskData[i].principal = data.principal;
                                // state.dispatchtaskData[i].meettask = data.meettask;
                                state.dispatchtaskData[i].groups = data.groups;
                                state.dispatchtaskData[i].groupname = data.groupname;
                            }
                        }
                    } else if (data.type === '3') {
                        for (let i = 0; i < state.dispatchtaskData.length; i++) {
                            if (data.id === state.dispatchtaskData[i].id) {
                                state.dispatchtaskData.splice(i, 1);
                            }
                        }
                    }
                }
            } else {
                alert(data);
            }
        },
        pushinformationlist (state, data) {
            if (data) {
                if (data.length > 0) {
                    state.pushinformationData = data;
                } else {
                    if (data.type === '1') {
                        state.pushinformationData.push(data);
                    } else if (data.type === '2') {
                        for (let i = 0; i < state.pushinformationData.length; i++) {
                            if (data.id === state.pushinformationData[i].id) {
                                state.pushinformationData[i].pushname = data.pushname;
                                state.pushinformationData[i].meetid = data.meetid;
                            }
                        }
                    } else if (data.type === '3') {
                        for (let i = 0; i < state.pushinformationData.length; i++) {
                            if (data.id === state.pushinformationData[i].id) {
                                state.pushinformationData.splice(i, 1);
                            }
                        }
                    }
                }
            } else {
                alert(data);
            }
        },
        handlingmethodlist (state, data) {
            if (data) {
                if (data.length > 0) {
                    state.handlingmethodData = data;
                } else {
                    if (data.type === '1') {
                        state.handlingmethodData.push(data);
                    } else if (data.type === '2') {
                        for (let i = 0; i < state.handlingmethodData.length; i++) {
                            if (data.id === state.handlingmethodData[i].id) {
                                state.handlingmethodData[i].handlingmethod = data.handlingmethod;
                                state.handlingmethodData[i].groupids = data.groupids;
                                state.handlingmethodData[i].groups = data.groups;
                                state.handlingmethodData[i].pushid = data.pushid;
                                state.handlingmethodData[i].groupname = data.groupname;
                            }
                        }
                    } else if (data.type === '3') {
                        for (let i = 0; i < state.handlingmethodData.length; i++) {
                            if (data.id === state.handlingmethodData[i].id) {
                                state.handlingmethodData.splice(i, 1);
                            }
                        }
                    }
                }
            } else {
                alert(data);
            }
        },
        meetingpersonlist (state, data) {
            if (data) {
                if (data.length > 0) {
                    state.meetingpersonData.length = 0;
                    state.meetingpersonData = data;
                } else {
                    if (data.type === '2') {
                        for (let i = 0; i < state.meetingpersonData.length; i++) {
                            if (data.id === state.meetingpersonData[i].id) {
                                state.meetingpersonData[i].speech = data.speech;
                                state.meetingpersonData[i].gift = data.gift;
                                state.meetingpersonData[i].ppt = data.ppt;
                                state.meetingpersonData[i].signin = data.signin;
                                state.meetingpersonData[i].meetid = data.meetid;
                                state.meetingpersonData[i].name = data.name;
                                state.meetingpersonData[i].phone = data.phone;
                            }
                        }
                    } else if (data.type === '3') {
                        for (let i = 0; i < state.meetingpersonData.length; i++) {
                            if (data.id === state.meetingpersonData[i].id) {
                                state.meetingpersonData[i].telephone = data.telephone;
                                state.meetingpersonData[i].fax = data.fax;
                                state.meetingpersonData[i].email = data.email;
                                state.meetingpersonData[i].location = data.location;
                                state.meetingpersonData[i].postcode = data.postcode;
                                state.meetingpersonData[i].seminar = data.seminar;
                                state.meetingpersonData[i].unitproperties = data.unitproperties;
                                state.meetingpersonData[i].unitspecialty = data.unitspecialty;
                                state.meetingpersonData[i].industryfield = data.industryfield;
                                state.meetingpersonData[i].internationalproject = data.internationalproject;
                                state.meetingpersonData[i].midtownrail = data.midtownrail;
                                state.meetingpersonData[i].relatedstudy = data.relatedstudy;
                                state.meetingpersonData[i].cooperativeproject = data.cooperativeproject;
                                state.meetingpersonData[i].ourmeeting = data.ourmeeting;
                                state.meetingpersonData[i].ourmeeting2 = data.ourmeeting2;
                                state.meetingpersonData[i].othermeeting = data.othermeeting;
                                state.meetingpersonData[i].businesssources = data.businesssources;
                                state.meetingpersonData[i].row1 = data.row1;
                                state.meetingpersonData[i].year112 = data.year112;
                                state.meetingpersonData[i].year11 = data.year11;
                                state.meetingpersonData[i].currentissue = data.currentissue;
                                state.meetingpersonData[i].countryregion = data.countryregion;
                                state.meetingpersonData[i].city = data.city;
                                state.meetingpersonData[i].formerunitposition = data.formerunitposition;
                                state.meetingpersonData[i].noneed = data.noneed;
                                state.meetingpersonData[i].updatedatatime = data.updatedatatime;
                                state.meetingpersonData[i].magazine = data.magazine;
                                state.meetingpersonData[i].distributionmode = data.distributionmode;
                                state.meetingpersonData[i].remarks = data.remarks;
                                state.meetingpersonData[i].salesman = data.salesman;
                                state.meetingpersonData[i].copies = data.copies;
                                state.meetingpersonData[i].latestcontact = data.latestcontact;
                                state.meetingpersonData[i].updatedate = data.updatedate;
                                state.meetingpersonData[i].verificationproblem = data.verificationproblem;
                                state.meetingpersonData[i].custom1 = data.custom1;
                                state.meetingpersonData[i].custom2 = data.custom2;
                                state.meetingpersonData[i].custom3 = data.custom3;
                                state.meetingpersonData[i].custom4 = data.custom4;
                            }
                        }
                    } else {
                        state.meetingpersonData = [];
                    }
                }
            } else {
                alert(data);
            }
        },
        logslist (state, data) {
            if (data) {
                state.logsData = data;
            } else {
                alert(data);
            }
        }
    },
    actions: {

    },
    getters: {
        // 获取数据的方法
        meetinglistPath: (state) => { // 会议
            return state.meetingColumnsData;
        },
        basicpersonlistPath: (state) => { // 基本人员
            // return state.basicpersonColumnsData;
            var ret = state.basicpersonColumnsData.slice(0);
            for (let i = 0, len = ret.length; i < len; i++) {
                ret[i].key = ret[i].openid;
            }
            return ret;
        },
        guestpersonlistPath: (state) => { // 关注人员
            var ret = state.grestpersonColumnsData.slice(0);
            for (let i = 0, len = ret.length; i < len; i++) {
                ret[i].key = ret[i].openid;
            }
            return ret;
        },
        outsidegrouppersonlistPath: (state) => { // 工作人员
            var ret = state.outsidegrouppersonColumnsData.slice(0);
            for (let i = 0, len = ret.length; i < len; i++) {
                ret[i].key = ret[i].openid;
            }
            return ret;
        },
        guestgroupPath: (state) => { // 嘉宾人员分组
            var ret = state.guestgroupData.slice(0);
            for (let i = 0, len = ret.length; i < len; i++) {
                ret[i].key = ret[i].id;
            }
            return ret;
        },
        workgroupPath: (state) => { // 工作人员分组
            var ret = state.workgroupData.slice(0);
            for (let i = 0, len = ret.length; i < len; i++) {
                ret[i].key = ret[i].id;
            }
            return ret;
        },
        attendgroupPath: (state) => { // 参会人员分组
            var ret = state.attendgroupData.slice(0);
            for (let i = 0, len = ret.length; i < len; i++) {
                ret[i].key = ret[i].id;
            }
            return ret;
        },
        personcontentPath: (state) => { // 字典表--标签内容集合
            return state.personcontentData;
        },
        dispatchtaskPath: (state) => { // 分派任务
            return state.dispatchtaskData;
        },
        pushinformationPath: (state) => { // 推送事件
            return state.pushinformationData;
        },
        handlingmethodPath: (state) => { // 处理方法
            return state.handlingmethodData;
        },
        meetingpersonPath: (state) => { // 参会人员
            var ret = state.meetingpersonData.slice(0);
            for (let i = 0, len = ret.length; i < len; i++) {
                ret[i].key = ret[i].openid;
            }
            return ret;
        },
        logsPath: (state) => { // 处理方法
            return state.logsData;
        },
        labelstatusPath: (state) => { // 标签状态
            return state.labelstatusData;
        }
    }

};

export default meet;
