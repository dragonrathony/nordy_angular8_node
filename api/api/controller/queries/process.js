/*
  * Created By : khalid Hashmi
  * Created Date : 12-03-2020
  * Purpose : Declare user mutation SignUp,
*/

var { database } = require("../../constants"),

    returnResult = require('../../result');
var async = require("async");

var processStatusUpdate = async (req, res, next) => {

    id = req.body.raw.id;
    status = req.body.raw.status;
    database.query('update process set Status=? where id=?', [status, id]).then(result => {
        res.send({ message: "Updated Successfully", error: 0 });
    });
}

var processSave = async (req, res, next) => {

    MachineName = req.body.raw.sections[0].MachineName;
    section = req.body.raw;
    section = JSON.stringify(section);
    //console.log(section);
    database.query('select * from process where MachineName=?', [MachineName]).then(result => {
        //console.log(result.length);
        if (result.length > 0) {
            res.send({ message: "Name already exists", error: 1 });
        } else {
            database.query('INSERT INTO process(MachineName,EXTRAFIELDS) VALUES(?,?)', [MachineName, section]).then(result => {
                res.send({ message: "Added Successfully", error: 0 });
            });
        }

    });
}

var getProcessid = async (req, res, next) => {

    if (req.params.id) {
        database.query('select * from process where id=?', [req.params.id]).then(result => {
            //console.log(result.length);
            if (result.length)
                returnResult(res, 0, result[0]);
            else
                returnResult(res, 1, { "message": "not result found" });
        });
    } else {
        returnResult(res, 1, { "message": "id not found" });
    }
}


var processUpdate = async (req, res, next) => {

    MachineName = req.body.raw.sections[0].MachineName;
    oldId = req.body.raw.sections[0].oldId;
    section = req.body.raw;
    section = JSON.stringify(section);
    //console.log(section);
    database.query('select * from process where MachineName=? and id<>?', [MachineName, oldId]).then(result => {
        //console.log(result.length);
        if (result.length > 0) {
            res.send({ message: "Name already exists", error: 1 });
        } else {
            database.query('update process set MachineName=?,EXTRAFIELDS=? where id=?', [MachineName, section, oldId]).then(result => {
                res.send({ message: "Updated Successfully", error: 0 });
            });

        }

    });
}

var addProcessrecord = async (req, res, next) => {

    BusinessUnity = req.body.raw.BusinessUnity == '' ? 0 : req.body.raw.BusinessUnity;
    Name = req.body.raw.Name;
    MachineCode = req.body.raw.MachineCode;
    ProcessId = req.body.raw.ProcessId;
    Quality = req.body.raw.Quality == '' ? 0 : req.body.raw.Quality;
    Eficiency = req.body.raw.Eficiency == '' ? 0 : req.body.raw.Eficiency;
    Availability = req.body.raw.Availability == '' ? 0 : req.body.raw.Availability;
    SetupTime = req.body.raw.SetupTime == '' ? 0 : req.body.raw.SetupTime;
    SetupTimeUnity = req.body.raw.SetupTimeUnity;
    Cost = req.body.raw.Cost == '' ? 0 : req.body.raw.Cost;
    CostTimeUnity = req.body.raw.CostTimeUnity;
    SetupLoss = req.body.raw.SetupLoss == '' ? 0 : req.body.raw.SetupLoss;
    Speed = req.body.raw.Speed == '' ? 0 : req.body.raw.Speed;
    SpeedUnity = req.body.raw.SpeedUnity;
    SpeedTimeUnity = req.body.raw.SpeedTimeUnity;
    MinBatch = req.body.raw.MinBatch == '' ? 0 : req.body.raw.MinBatch;
    MinBatchUnity = req.body.raw.MinBatchUnity;
    MaxBatch = req.body.raw.MaxBatch == '' ? 0 : req.body.raw.MaxBatch;
    MaxBatchUnity = req.body.raw.MaxBatchUnity;
    GroupSpeed = req.body.raw.GroupSpeed == '' ? 0 : req.body.raw.GroupSpeed;
    GroupSpeedTimeUnity = req.body.raw.GroupSpeedTimeUnity;
    GroupSpeedUnity = req.body.raw.GroupSpeedUnity;
    GroupSpeedUnity = req.body.raw.GroupSpeedUnity;
    GroupName = req.body.raw.GroupName;
    SetupLossUnity = req.body.raw.SetupLossUnity;
    OnOff = req.body.raw.OnOff;
    EXTRAFIELDS = JSON.stringify(req.body.raw.EXTRAFIELDS);


    database.query('INSERT INTO processrecord(BusinessUnity,Name,MachineCode,ProcessId,Quality,Eficiency,Availability,SetupTime,SetupTimeUnity,Cost,CostTimeUnity,SetupLoss,SetupLossUnity,Speed,SpeedUnity,SpeedTimeUnity,MinBatch,MinBatchUnity,MaxBatch,MaxBatchUnity,GroupSpeed,GroupSpeedTimeUnity,GroupSpeedUnity,GroupName,OnOff,EXTRAFIELDS,baseMinima,baseMaxima) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [BusinessUnity, Name, MachineCode, ProcessId, Quality, Eficiency, Availability,
        SetupTime, SetupTimeUnity, Cost, CostTimeUnity, SetupLoss, SetupLossUnity, Speed,
        SpeedUnity, SpeedTimeUnity, MinBatch, MinBatchUnity, MaxBatch, MaxBatchUnity, GroupSpeed, GroupSpeedTimeUnity,
        GroupSpeedUnity, GroupName, OnOff, EXTRAFIELDS]).then(result => {
            res.send({ message: "Added Successfully", error: 0 });
        }, err => {
            //console.log(err)
        });

}

var updateProcessrecord = async (req, res, next) => {

    BusinessUnity = req.body.raw.BusinessUnity == '' ? 0 : req.body.raw.BusinessUnity;
    Name = req.body.raw.Name;
    oldId = req.body.raw.oldId;
    MachineCode = req.body.raw.MachineCode;
    ProcessId = req.body.raw.ProcessId;
    Quality = req.body.raw.Quality == '' ? 0 : req.body.raw.Quality;
    Eficiency = req.body.raw.Eficiency == '' ? 0 : req.body.raw.Eficiency;
    Availability = req.body.raw.Availability == '' ? 0 : req.body.raw.Availability;
    SetupTime = req.body.raw.SetupTime == '' ? 0 : req.body.raw.SetupTime;
    SetupTimeUnity = req.body.raw.SetupTimeUnity;
    Cost = req.body.raw.Cost == '' ? 0 : req.body.raw.Cost;
    CostTimeUnity = req.body.raw.CostTimeUnity;
    SetupLoss = req.body.raw.SetupLoss == '' ? 0 : req.body.raw.SetupLoss;
    Speed = req.body.raw.Speed == '' ? 0 : req.body.raw.Speed;
    SpeedUnity = req.body.raw.SpeedUnity;
    SpeedTimeUnity = req.body.raw.SpeedTimeUnity;
    MinBatch = req.body.raw.MinBatch == '' ? 0 : req.body.raw.MinBatch;
    MinBatchUnity = req.body.raw.MinBatchUnity;
    MaxBatch = req.body.raw.MaxBatch == '' ? 0 : req.body.raw.MaxBatch;
    MaxBatchUnity = req.body.raw.MaxBatchUnity;
    GroupSpeed = req.body.raw.GroupSpeed == '' ? 0 : req.body.raw.GroupSpeed;
    GroupSpeedTimeUnity = req.body.raw.GroupSpeedTimeUnity;
    GroupSpeedUnity = req.body.raw.GroupSpeedUnity;
    GroupSpeedUnity = req.body.raw.GroupSpeedUnity;
    GroupName = req.body.raw.GroupName;
    SetupLossUnity = req.body.raw.SetupLossUnity;
    OnOff = req.body.raw.OnOff;
    EXTRAFIELDS = JSON.stringify(req.body.raw.EXTRAFIELDS);

    database.query('update  processrecord SET BusinessUnity=?,Name=?,MachineCode=?,ProcessId=?,Quality=?,Eficiency=?,Availability=?,SetupTime=?,SetupTimeUnity=?,Cost=?,CostTimeUnity=?,SetupLoss=?,SetupLossUnity=?,Speed=?,SpeedUnity=?,SpeedTimeUnity=?,MinBatch=?,MinBatchUnity=?,MaxBatch=?,MaxBatchUnity=?,GroupSpeed=?,GroupSpeedTimeUnity=?,GroupSpeedUnity=?,GroupName=?,OnOff=?,EXTRAFIELDS=? where id=?', [BusinessUnity, Name, MachineCode, ProcessId, Quality, Eficiency, Availability,
        SetupTime, SetupTimeUnity, Cost, CostTimeUnity, SetupLoss, SetupLossUnity, Speed,
        SpeedUnity, SpeedTimeUnity, MinBatch, MinBatchUnity, MaxBatch, MaxBatchUnity, GroupSpeed, GroupSpeedTimeUnity,
        GroupSpeedUnity, GroupName, OnOff, EXTRAFIELDS, oldId]).then(result => {
            res.send({ message: "Updated Successfully", error: 0 });
        }, err => {
            //console.log(err)
        });

}

var getProcessRecord = async (req, res, next) => {

    database.query('select * from processrecord where ProcessId=? order by Id desc', [req.params.id]).then(result => {
        //console.log(result.length);
        if (result.length)
            returnResult(res, 0, result);
        else
            returnResult(res, 1, { "message": "not result found" });
    });

}

var getProcessMeachne = async (req, res, next) => {

    database.query('select process.*,(select count(*) from processrecord where `ProcessId`=process.Id) as machenecount from process order by Id desc').then(result => {
        //console.log(result.length);
        if (result.length)
            returnResult(res, 0, result);
        else
            returnResult(res, 1, { "message": "not result found" });
    });

}

var getProcessRecordByid = async (req, res, next) => {

    if (req.params.id) {
        database.query('select * from processrecord where id=?', [req.params.id]).then(result => {
            //console.log(result.length);
            if (result.length)
                returnResult(res, 0, result[0]);
            else
                returnResult(res, 1, { "message": "not result found" });
        });
    } else {
        returnResult(res, 1, { "message": "id not found" });
    }
}

const getlarguraMaiorImpressora = async () => {
    return new Promise((resolve, reject) => {
        database.query('select * from processrecord where ProcessId=?', [4]).then(result => {
            //console.log(result)
            let maximumWidth = 0;
            async.forEach(result, function (element, callback) {
                let EXTRAFIELDS = element.EXTRAFIELDS;
                EXTRAFIELDS = JSON.parse(EXTRAFIELDS);
                if (EXTRAFIELDS[0]['Width'] != undefined) {
                    if (EXTRAFIELDS[0]['Width'] != '' && EXTRAFIELDS[0]['Width'] > maximumWidth) {
                        maximumWidth = EXTRAFIELDS[0]['Width'];
                    }
                }
            });
            resolve(maximumWidth);


        });
    })
}

var getQuotations = async (req, res, next) => {
    let code = req.params.code == 'undefined' ? 0 : req.params.code;
    let quentity = req.params.code == 'undefined' ? 0 : req.params.quentity;
    let positions = req.params.positions == 'undefined' ? -1 : req.params.positions;
    //console.log(positions);
    let showall = positions;
    let process = {};
    let minimumcost = 0;
    let meachneDetails = {};
    let MQuality = {};
    returnreslt = {};

    const combos = require('combos');
    let larguraMaiorImpressora = await getlarguraMaiorImpressora();
    //console.log('khalid',larguraMaiorImpressora);
    database.query('select producthead.*,producthead.id as phid,family.* from producthead left join family on producthead.Family=family.FamilyName  where ProductCode=? order by ProcessOrder asc', [code]).then(result => {

        async.forEach(result, function (element, callback) {

            let tempmeachne = []

            let processname = "";

            database.query('SELECT processrecord.*,process.MachineName FROM `processrecord` left join process on process.Id=processrecord.ProcessId WHERE `ProcessId`=?', [element.ProcessId]).then(result2 => {
                async.forEach(result2, function (element2, callback) {
                    //  //console.log(element2);
                    //console.log(element.ProcessId+':-'+element2.Quality);
                    tempmeachne.push(element2.Name)
                    machnname = element2.Name;



                    machnname = machnname.replace(/\s/g, '');
                    meachneDetails[machnname] = element2;
                    processname = element2.MachineName

                });

                process[processname] = tempmeachne;
                let processid = {};
                let newpermulation = [];
                if (result[result.length - 1]['Id'] == element.Id) {
                    const permutations = combos(process);
                    database.query('SELECT productbody.`ProductCharFatherId`,productbody.`ProductCharChildId`,productbody.`ProductCharChildValue`, productchar1.FamilyMember,productchar1.Disabled,productchar1.GridColumns,productchar1.GridSmColumns,productchar1.Label,productchar2.ProductChildDesc  FROM `productbody` left JOIN productchar1 on productbody.`ProductCharFatherId`=productchar1.`ProductCharFatherId` left JOIN productchar2 on productchar2.`ProductChildId`=productbody.`ProductCharChildId` and productchar1.ProductCharFatherId=productchar2.ProductCharFatherId  WHERE `ProductHeaderID`=?', [result[0].phid]).then(product => {
                        var srnumber = 1;
                        async.forEach(permutations, function (permutation, callback) {
                            innerpermulation = {};
                            Totaltime = 0;
                            TotalCost = 0;
                            let timecalcalcualtion = true;
                            let lastProcssvar = [];
                            let tempQuailty = 1;
                            Object.keys(permutation).forEach(function (key) {
                                var meachne = permutation[key];
                                machnname = meachne.replace(/\s/g, '');
                                tempQuailty = tempQuailty * (meachneDetails[machnname].Quality / 100);
                            });


                            Object.keys(permutation).forEach(function (key) {
                                var meachne = permutation[key];
                                //console.log('tempQuailty',key,tempQuailty);
                                machnname = meachne.replace(/\s/g, '');

                                returnresultobj = MachineReturn(key, meachneDetails[machnname], product, quentity, srnumber, tempQuailty, lastProcssvar, result[0].phid, larguraMaiorImpressora);
                                lastProcssvar = returnresultobj;
                                //console.log(returnresultobj);
                                //if(newpermulation.length==1 && key=='Finishing')
                                //console.log(machnname,key,returnresultobj,srnumber);
                                if (returnresultobj.length == 0) {
                                    //console.log(machnname,returnresultobj.length)
                                    timecalcalcualtion = false;
                                }
                                //console.log(lastProcssvar.join(", "))
                                //console.log(JSON.stringify(lastProcssvar))
                                //innerpermulation[key]=meachne+' '+JSON.stringify(lastProcssvar);
                                //console.log('ResultadoMR: ' + key);
                                //console.log(returnresultobj); //Array with variables

                                innerpermulation[key] = { 'name': meachne, 'extraparma': lastProcssvar };
                                //console.log('innerpermulation: ' + key + ' | ' + meachne + ' | ' + srnumber);
                                //console.log(lastProcssvar);
                                //console.log('---');
                                //console.log(innerpermulation[key]);
                                if (lastProcssvar.length == 1) {
                                    timetemp = Totaltime + returnresultobj[0]['UpTime'] + returnresultobj[0]['DownTime'];
                                    Totaltime = parseFloat(timetemp.toFixed(2));
                                    costtemp = TotalCost + returnresultobj[0]['cost'];
                                    TotalCost = parseFloat(costtemp.toFixed(2));
                                }
                                if (TotalCost < minimumcost)
                                    minimumcost = TotalCost;

                            });

                            if (positions >= 0) {
                                if (srnumber - 1 == positions) {
                                    //console.log(Totaltime)

                                    returnreslt.Time = parseFloat(Totaltime.toFixed(2));
                                    returnreslt.Cost = parseFloat(TotalCost.toFixed(2));
                                }
                            } else {
                                let insertpath = false;

                                Object.keys(innerpermulation).forEach(function (key) {

                                    if (innerpermulation[key]['extraparma'].length > 1 && key == 'Extrusion') {
                                        let tempnnuewpath = {};
                                        //console.log(innerpermulation);
                                        let innerlextraKey = 0;
                                        async.forEach(innerpermulation[key]['extraparma'], function (extrapaths, callback) {

                                            //reinitilize variables
                                            var entrapathsnew = "";
                                            var temphtnew = "";
                                            let Printingcost = 0;
                                            let Cuttincost = 0;
                                            let FinishingCost = 0;
                                            tempht = innerpermulation;

                                            // console.log(tempht);
                                            // console.log('Printing',tempht['Printing']['extraparma'].length,'Extrusion',innerpermulation[key]['extraparma'].length,innerpermulation);
                                            if (tempht['Printing']['extraparma'].length > 0) {
                                                // console.log(tempht['Printing']['extraparma'][innerlextraKey]['C1']);
                                                if (tempht['Printing']['extraparma'][innerlextraKey]['C1'] == undefined)
                                                    timecalcalcualtion = false;
                                                Printingcost = tempht['Printing']['extraparma'][innerlextraKey]['cost'];
                                                tempht['Printing']['extraparma'] = tempht['Printing']['extraparma'][innerlextraKey];
                                            } else {

                                                //tempht['Printing']['extraparma']={};
                                            }
                                            if (tempht['Cutting']['extraparma'].length > 0) {
                                                if (tempht['Cutting']['extraparma'][innerlextraKey]['C1'] == undefined)
                                                    timecalcalcualtion = false;
                                                Cuttincost = tempht['Cutting']['extraparma'][innerlextraKey]['cost'];
                                                tempht['Cutting']['extraparma'] = tempht['Cutting']['extraparma'][innerlextraKey];
                                            }
                                            if (tempht['Finishing']['extraparma'].length > 0) {
                                                if (tempht['Finishing']['extraparma'][innerlextraKey]['C1'] == undefined)
                                                    timecalcalcualtion = false;
                                                FinishingCost = tempht['Finishing']['extraparma'][innerlextraKey]['cost'];
                                                tempht['Finishing']['extraparma'] = tempht['Finishing']['extraparma'][innerlextraKey];
                                                //console.log(tempht);
                                            }
                                            //var tempht = innerpermulation;
                                            innerlextraKey = innerlextraKey + 1;
                                            //--------------------------------------------------------------------------------------
                                            // This deep clone the variables, yes we also ty last time to deeplconing but int was not working 

                                            function keepCloning(objectpassed) {
                                                if (objectpassed === null || typeof objectpassed !== 'object') {
                                                    return objectpassed;
                                                }
                                                // give temporary-storage the original obj's constructor
                                                var temporarystorage = objectpassed.constructor();
                                                for (var odakey in objectpassed) {
                                                    temporarystorage[odakey] = keepCloning(objectpassed[odakey]);
                                                }
                                                return temporarystorage;
                                            }
                                            var entrapathsoriginal = extrapaths;
                                            var entrapathsnew = (keepCloning(entrapathsoriginal));

                                            //console.log(employeeDetailsOriginal);
                                            //console.log(employeeDetailsDuplicate);

                                            //--------------------------------------------------------------------------------------

                                            // tempht['Id']=srnumber;
                                            //console.log(extrapaths);
                                            // tempht['ID']=srnumber;
                                            if (timecalcalcualtion == false) {
                                                timetemp = Totaltime + entrapathsnew['UpTime'] + entrapathsnew['DownTime'];
                                                tempht['Time'] = "N/A";
                                                costtemp = TotalCost + entrapathsnew['cost'];
                                                tempht['Cost'] = "N/A";
                                            } else {
                                                timetemp = Totaltime + entrapathsnew['UpTime'] + entrapathsnew['DownTime'];
                                                tempht['Time'] = parseFloat(timetemp.toFixed(2));
                                                costtemp = TotalCost + entrapathsnew['cost'] + Cuttincost + Printingcost + FinishingCost;
                                                tempht['Cost'] = parseFloat(costtemp.toFixed(2));
                                            }

                                            tempht[key]['extraparma'] = entrapathsnew;
                                            //console.log('undefiend',entrapathsnew['C1']);
                                            if (entrapathsnew['C1'] == undefined) {
                                                //console.log('undefiend',entrapathsnew['C1']);
                                                timecalcalcualtion = false;
                                            }
                                            //console.log('extrapaths:');
                                            //console.log(entrapathsnew);
                                            //console.log(' ');
                                            //console.log('TemphtC5: ' + tempht[key]['extraparma'].C5);
                                            //console.log('newpermulationAntes: ' + newpermulation);
                                            var temphtoriginal = tempht;
                                            var temphtnew = (keepCloning(temphtoriginal));
                                            newpermulation.push(temphtnew);

                                            //console.log('newpermulation:');
                                            //console.log(newpermulation);

                                            newpermulation.forEach(print);

                                            function print(item) {
                                                //console.log('Objetoimpresso: ' + item[key]['extraparma']['UpTime'])
                                                //console.log('Objetoimpresso: ' + item[key]['extraparma'].C5)
                                            }

                                            insertpath = true;
                                            srnumber = srnumber + 1;
                                        });
                                    } else {

                                        if (innerpermulation[key]['extraparma'].length == 1) {

                                            if (innerpermulation[key]['extraparma'][0]['C1'] == undefined)
                                                timecalcalcualtion = false;

                                            innerpermulation[key]['extraparma'] = innerpermulation[key]['extraparma'][0];

                                            //console.log('undefiend',innerpermulation[key]['extraparma'][0]['C1']);
                                        } else {
                                            timecalcalcualtion = false;
                                        }



                                        //console.log('Original: ' + innerpermulation[key]['extraparma'][0]);
                                    }
                                });

                                if (insertpath == false) {
                                    // innerpermulation['Id']=srnumber;
                                    if (timecalcalcualtion == false) {
                                        innerpermulation['Time'] = "N/A";
                                        innerpermulation['Cost'] = "N/A";
                                        newpermulation.push(innerpermulation);
                                        srnumber = srnumber + 1;
                                    } else {
                                        innerpermulation['Time'] = Totaltime;
                                        innerpermulation['Cost'] = TotalCost;
                                        newpermulation.push(innerpermulation);
                                        srnumber = srnumber + 1;
                                    }
                                }

                            }


                        });
                        let finalresult = [];
                        let minimumscost = 0;
                        async.forEach(newpermulation, function (temppath, callback) {
                            let Temptoalacost = temppath['Mixture']['extraparma']['cost'] + temppath['Extrusion']['extraparma']['cost'] + temppath['Printing']['extraparma']['cost'] + temppath['Cutting']['extraparma']['cost'] + temppath['Finishing']['extraparma']['cost'];
                            let Temptoalatime = temppath['Mixture']['extraparma']['UpTime'] + temppath['Extrusion']['extraparma']['UpTime'] + temppath['Printing']['extraparma']['UpTime'] + temppath['Cutting']['extraparma']['UpTime'] + temppath['Finishing']['extraparma']['UpTime'];
                            if (temppath['Cost'] != 'N/A') {
                                temppath['Cost'] = parseFloat(Temptoalacost.toFixed(2));
                                temppath['Time'] = parseFloat(Temptoalatime.toFixed(2));
                            }
                            //console.log(positions);
                            if (positions == 'false') {
                                if (minimumscost == 0 && temppath['Cost'] != 'N/A') {

                                    minimumscost = temppath['Cost'];
                                    temppath['Cost'] = parseFloat(Temptoalacost.toFixed(2));
                                    temppath['Time'] = parseFloat(Temptoalatime.toFixed(2));
                                    //console.log(Temptoalacost,temppath)
                                    finalresult = [temppath];
                                }
                                if (Temptoalacost < minimumscost && temppath['Cost'] != 'N/A') {
                                    temppath['Cost'] = parseFloat(Temptoalacost.toFixed(2));
                                    temppath['Time'] = parseFloat(Temptoalatime.toFixed(2));
                                    finalresult = [temppath];
                                    minimumscost = Temptoalacost;
                                }
                            } else {
                                finalresult.push(temppath);
                            }
                        });
                        //console.log(finalresult);
                        returnreslt.result = finalresult;
                        returnreslt.code = code;
                        returnreslt.quentity = quentity;
                        returnreslt.minimumcost = minimumcost;
                        //console.log(newpermulation);
                        returnResult(res, 0, returnreslt);
                    });

                }

            });

        });
        if (result.length == 0) {
            returnResult(res, 0, { result: [] });
        }
    });
    //get data from main table 


}

//calculation time and cost function 
function MachineReturn(process, machine, product, quentity, Sequence, totalQualidade, lastprocess, HeaderID, larguraMaiorImpressora) {
    //console.log('TotalQualidade: ' + totalQualidade); //KHALID: WHERE IS THIS COMING FROM?

    //KHALID: MACHINE ON/OFF -> DON´T PARTICIPATE OF THE QUOTATION

    //process :- return process name
    //machine :- it return machine record related to processrecord
    //product :- it return record from producthead, productchar1 , productchar2 tables
    //this return extrafield in machine record

    //console.log(process,machine.Name,machineExtrafields);
    result = [];

    //console.log(product);


    //machine regular field
    //machineName=machine.Name;   
    Quality = machine.Quality;
    Quality = Quality / 100;
    //console.log(Quality);
    //machine extra fields
    machineExtrafields = JSON.parse(machine['EXTRAFIELDS']);
    machiextrafieldsMap = {};
    async.forEach(machineExtrafields, function (extrafields, callback) {
        for (var i in extrafields) {

            machiextrafieldsMap[i] = extrafields[i];
        }
    });
    machineExtrafields = machiextrafieldsMap;
    //machineExtrafields.Width

    //product fields
    var material = "";
    var Base = "";
    let productfield = {};
    async.forEach(product, function (produc, callback) {
        if (produc.Label == "Material") {
            material = produc.ProductCharChildValue;
        }

        if (produc.Label == "Base") {
            Base = produc.ProductCharChildValue;
        }
        let laelt = produc.Label;
        laelt = laelt.replace(/\s/g, '')
        if (produc.ProductCharChildValue != 0)
            productfield[laelt] = produc.ProductCharChildValue;
        else
            productfield[laelt] = produc.ProductCharChildId;
    });


    //Start

    //PREPARA PRIMEIRO PROCESSO
    if (machine.ProcessId == 1) { //Mixture
        if (lastprocess.length > 0) {
            lastprocess = lastprocess[lastprocess.length - 1];
            //console.log(lastprocess);
        }
        let pesoEspecifico = 0;
        //console.log('Material',productfield['Material']);
        if (productfield['Material'] == 1) {
            pesoEspecifico = 0.92;
        }
        if (productfield['Material'] == 2) {
            pesoEspecifico = 0.921;
        }

        if (productfield['Material'] == 3) {
            if (productfield['CordaEmbalagem'] == 1) //fix
            {
                pesoEspecifico = 0.919;
            }
            else {
                pesoEspecifico = 0.927;
            }
        }
        if (productfield['Material'] == 4) {
            pesoEspecifico = 0.937;
        }
        if (productfield['Material'] == 5) {
            pesoEspecifico = 0.94;
        }
        if (productfield['Material'] == 6) {
            pesoEspecifico = 0.910;
        }
        if (productfield['Material'] == 7) {
            pesoEspecifico = 1;
        }

        //console.log('Processo1: ' + pesoEspecifico);

        //2 paredes = Tubular E Saco

        let paredes = 1;
        //console.log('GrupodeProduto',productfield['GrupodeProduto'])
        if (productfield['GrupodeProduto'] == 1 || productfield['GrupodeProduto'] == 4) {
            paredes = 2;
        }

        //console.log('Paredes: ' + paredes);

        let pesoMistura = 0;
        let peso = (paredes * productfield['Largura(mm)'] * productfield['Altura(mm)'] * productfield['Espessura(mm)'] * pesoEspecifico * quentity) / 1000000;

        if (productfield['TipodeProduto'] != 1) {
            var C10 = (quentity * 1000000) / (paredes * productfield['Largura(mm)'] * productfield['Espessura(mm)'] * pesoEspecifico);
            peso = quentity;
        }


        peso = peso / totalQualidade;
        pesoMistura = parseInt(peso);


        //FIM CALCULO DE PESO DA MISTURA

        let batch = machine.MaxBatch;

        let tempo = parseInt(Math.trunc(peso / batch));

        let resto = parseInt(peso % batch);

        if (resto > 0) {
            tempo++;
        }

        let setupTime = machine.SetupTime;

        let cicle = machine.Speed;

        cicle = 60 / cicle;

        let custo = machine.Cost;

        let time = (cicle + setupTime) * tempo;
        let downTime = (setupTime) * tempo;
        let upTime = time - downTime;

        time = time / 60;
        downTime = downTime / 60;
        upTime = upTime / 60;
        let tempresult = {};

        tempresult.time = time;
        tempresult.DownTime = downTime;
        tempresult.UpTime = upTime;
        tempresult.cost = (time * custo);
        tempresult.C1 = pesoMistura;
        tempresult.Quality = Quality;
        result.push(tempresult)
    }
    //console.log(productfield);

    if (machine.ProcessId == 2) //Extrusion

    {
        if (lastprocess.length > 0) {
            lastprocess = lastprocess[lastprocess.length - 1];
            //console.log(lastprocess);
        }
        let numeroDePistas = 0;

        let larguraDaPista = 0;
        let tempresult = {};
        let custoHora = machine.Cost;

        let produtividade = machine.Speed;

        let produtividadeGrupo = machine.GroupSpeed;

        if (produtividadeGrupo != null) {
            produtividade = produtividadeGrupo;
        }

        // List<MachineReturn> retorno = new List<MachineReturn>();

        let larguraDaMaquina = machineExtrafields.Width; //This comes from machine. Not product

        var camadasBase = 1;

        if (productfield['Base'] != 1) {
            camadasBase = 3;
        }
        // //console.log(machineExtrafields[0]['LabelsMin'],machineExtrafields);
        let baseMaxima = machineExtrafields['LabelsMax'];

        let baseMinima = machineExtrafields['LabelsMin'];

        let matriz = machineExtrafields['Die'];

        let qualidade = machine.Quality;

        qualidade = qualidade / 100;

        let eficiencia = machine.Eficiency;
        //console.log(' ');
        //console.log('--------------------------------------');
        //console.log('Máquina: ' + machine.Name);

        eficiencia = eficiencia / 100;

        let setupTime = machine.SetupTime;

        setupTime = setupTime / 60;
        //console.log(machine);
        let PEBD = machineExtrafields['PEBD'];
        let PEBDL = machineExtrafields['PEBDL'];
        let PEMD = machineExtrafields['PEMD'];
        let PEMDL = machineExtrafields['PEMDL'];

        let razaoMin = 0;

        let razaoMax = 0;

        let maquinaValida = false;

        // CHECAR SE A MAQUINA FAZ ESSE PRODUTO
        //console.log(camadasBase +'>='+ baseMinima +'&&'+ camadasBase +'<='+ baseMaxima);
        if (camadasBase >= baseMinima && camadasBase <= baseMaxima) {
            maquinaValida = true;
        }

        if (maquinaValida == true) {
            if (productfield['Material'] == 1 && PEBD == 'N') {
                maquinaValida = false;
            }

            if (productfield['Material'] == 2 && PEMD == 'N') {
                maquinaValida = false;
            }

            if (productfield['Material'] == 3 && PEBDL == 'N') {
                maquinaValida = false;
            }

            if (productfield['Material'] == 4 && PEMDL == 'N') {
                maquinaValida = false;
            }

            if (productfield['Material'] == 5 && PEMDL == 'N') {
                maquinaValida = false;
            }

            if (productfield['Material'] == 6 && baseMaxima != 3) {
                maquinaValida = false;
            }

            if (productfield['Material'] == 7) {
                maquinaValida = false;
            }

        }

        let minBatch = machine.minBatch;

        // FIM CHECAR SE A MAQUINA FAZ ESSE PRODUTO

        //console.log('Máquina válida: ' + maquinaValida);

        if (maquinaValida) {

            if (productfield['Material'] == 1 || productfield['Material'] == 3) {
                razaoMin = 2.1;
                razaoMax = 3.5;
            }

            if (productfield['Material'] == 2) {
                razaoMin = 2.4;
                razaoMax = 3.8;
            }

            if (productfield['Material'] == 4 || productfield['Material'] == 6) {
                razaoMin = 2.1;
                razaoMax = 3.1;
            }

            if (productfield['Material'] == 5) {
                razaoMin = 2.1;
                razaoMax = 3.1;
            }

            if (productfield['GrupodeProduto'] == 1 && productfield['TipodeSolda'] != 5) {
                larguraDaPista = productfield['Largura(mm)'];
            }
            else {
                larguraDaPista = productfield['Largura(mm)'];
            }


            if (productfield['GrupodeProduto'] == 1 || productfield['GrupodeProduto'] == 4 || productfield['Geometria'] == 3) {
                larguraDaPista = larguraDaPista * 2;
            }

            let refile = 30;

            if (productfield['GrupodeProduto'] == 4) // TUBULAR
            {
                refile = 0;
            }


            let pistas = parseInt(larguraDaMaquina / (larguraDaPista));

            if (((pistas * larguraDaPista) + refile) >= larguraDaMaquina) {
                pistas--;
            }

            let pesoMistura = 0;

            let pesoEspecifico = 0;

            if (productfield['Material'] == 1) {
                pesoEspecifico = 0.92;
            }
            if (productfield['Material'] == 2) {
                pesoEspecifico = 0.921;
            }
            if (productfield['Material'] == 3) {
                if (productfield['CordaEmbalagem'] == 1) {
                    pesoEspecifico = 0.919;
                }
                else {
                    pesoEspecifico = 0.927;
                }
            }
            if (productfield['Material'] == 4) {
                pesoEspecifico = 0.937;
            }
            if (productfield['Material'] == 5) {
                pesoEspecifico = 0.94;
            }
            if (productfield['Material'] == 6) {
                pesoEspecifico = 0.910;
            }
            if (productfield['Material'] == 7) {
                pesoEspecifico = 1;
            }

            var coresFrente = productfield['NúmerodeCoresFrente'];
            var coresVerso = productfield['NúmerodeCoresVerso'];

            if (coresFrente == 9 && coresVerso == 9) {
                larguraMaiorImpressora = 2000; // MAIOR LARGURA DO REFILE.
            }

            let pistasPeloProduto = 0;
            let pistasPelaImpressora = 0;

            let calculoRefile = 2;
            if (productfield['GrupodeProduto'] == 1 || productfield['GrupodeProduto'] == 2) {
                calculoRefile = 1;
            }

            //console.log('Refile: ' + calculoRefile);

            let pistas1 = 0;
            let larg1 = 0;
            let pistas2 = 0;
            let larg2 = 0;

            try //change to JS
            {
                //foreach (var item in listaProcessos2) //change to JS or delete //here we will need to see how we go through the paths
                // i don't understand about this why using this method
                //{

                let sequencia = 1;

                //if (item.RoteiroId == roteiroId && ultimoProc == item.Process) //I don´t think we will need it;but i used here so 
                //it return not defined error

                //{

                //pesoMistura = item.C1;
                pesoMistura = lastprocess.C1;

                let razaoDesopro = 0;

                let teste = 0;

                let acabou = false;

                let larguraDaPistaNova = 0;

                let larguraPelaImpressora = 0;

                for (let i = 1; i <= pistas; i++) {

                    teste = 0;
                    acabou = false;

                    if (pesoMistura < minBatch) {
                        acabou = true;
                    }

                    while (acabou == false) {
                        //console.log('Dentro do Loop');

                        let vaiSair = (i * larguraDaPista) + refile;
                        let tempvarl = {};
                        if (calculoRefile == 2) // DE BOBINAS
                        {
                            if (vaiSair <= larguraMaiorImpressora) {
                                larguraDaPistaNova = larguraDaPista + refile;
                                acabou = true;
                                pistas1 = 1;
                                larg1 = larguraDaPistaNova;
                                pistas2 = 0;
                                larg2 = 0;
                            }
                            else {
                                larguraPelaImpressora = ((i * larguraDaPista) / larguraMaiorImpressora);
                                let larguraPelaImpressora2 = Math.trunc(larguraPelaImpressora);
                                pistas1 = (i / larguraPelaImpressora2);
                                larg1 = larguraPelaImpressora2 * (vaiSair / i);

                                pistas2 = i - pistas1;
                                larg2 = vaiSair - (larg1 * pistas1);

                                larguraDaPistaNova = (pistas1 * larg1) + (pistas2 * larg2) + refile;

                                acabou = true;
                            }
                        }
                        else // DE SACOS
                        {
                            let B4 = larguraMaiorImpressora / larguraDaPista;
                            //console.log('Maior impressora: ' + larguraMaiorImpressora);
                            //console.log('Largura da pista: ' + larguraDaPista);

                            let B5 = Math.trunc(B4);
                            //console.log('Possíveis pistas: ' + B5);

                            let B10 = (i * larguraDaPista) / larguraDaPista;
                            //console.log(' ');
                            //console.log('i: ' + i);
                            //console.log('B10: ' + B10);

                            let C9 = (i * larguraDaPista) / larguraDaPista;
                            //console.log('C9: ' + C9);

                            let F9 = (C9 * larguraDaPista) + refile;
                            //console.log('F9: ' + F9);

                            let H9 = F9 - refile;
                            //console.log('refile: ' + refile);
                            //console.log('H9: ' + H9);

                            let minB5B10 = B5;

                            if (B5 > B10) { minB5B10 = B10 }

                            let J9 = larguraDaPista * minB5B10;
                            //console.log('Mínimo: ' + minB5B10);
                            //console.log('J9: ' + J9);

                            pistas1 = Math.floor(H9 / J9);
                            //console.log('Pistas1: ' + pistas1);

                            larg1 = minB5B10 * larguraDaPista;
                            //console.log('larg1: ' + larg1);
                            larg2 = H9 - (larg1 * pistas1);
                            //console.log('larg2: ' + larg2);
                            pistas2 = Math.ceil(larg2 / (minB5B10 * larguraDaPista));

                            larguraDaPistaNova = (pistas1 * larg1) + (pistas2 * larg2) + refile;
                            //console.log('Pistas1: ' + pistas1);
                            //console.log('Largura1: ' + larg1);
                            //console.log('Pistas2: ' + pistas2);
                            //console.log('Largura2: ' + larg2);
                            //console.log('Refile: ' + refile);

                            acabou = true;
                        }

                        razaoDesopro = ((larguraDaPistaNova * 6.37) / (matriz)) / 10;

                        //console.log('Razão de Sopro: ' + razaoDesopro);
                        //console.log('Razão Mínima: ' + razaoMin);
                        //console.log('Razão Máxima: ' + razaoMax);

                        if (razaoDesopro >= razaoMin && razaoDesopro <= razaoMax) {

                            //console.log('Passou!');
                            //console.log(' ');
                            numeroDePistas = i;
                            let larguraExt = (numeroDePistas * larguraDaPista) + refile;

                            let tempo = (lastprocess.C1 / (produtividade * eficiencia)) + setupTime;

                            let downTime = setupTime;

                            let upTime = tempo - setupTime;

                            tempo = Math.round(tempo, 4);

                            //var maxId = (from j in listRoteiro select j.Id).Max();

                            let custo = Math.round((tempo * custoHora), 2);

                            //MachineReturn dados = new MachineReturn(2, machineId, tempo, custo, sequencia);

                            //console.log('C1Teste: ' + lastprocess.C1);

                            tempvarl.C1 = Math.round(lastprocess.C1 * qualidade, 0);
                            tempvarl.C2 = pistas1;
                            tempvarl.C3 = larg1;
                            tempvarl.C4 = pistas2;
                            tempvarl.C5 = larg2;
                            tempvarl.C6 = larguraDaPista;

                            //console.log('Peso: ' + tempvarl.C1);
                            //console.log('Pistas1: ' + tempvarl.C2);
                            //console.log('Largura1: ' + tempvarl.C3);
                            //console.log('Pistas2: ' + tempvarl.C4);
                            //console.log('Largura2: ' + tempvarl.C5);
                            //console.log('Largura da Pista: ' + tempvarl.C6);

                            //calcula metros refile

                            var metros = (tempvarl.C1 / tempvarl.C6 / productfield['Espessura(mm)'] / pesoEspecifico) * 1000;

                            let metros1p1 = (tempvarl.C2 * tempvarl.C3) / ((tempvarl.C2 * tempvarl.C3) + (tempvarl.C4 * tempvarl.C5));
                            let pistasm1 = (tempvarl.C3 / tempvarl.C6);
                            let metros1p2 = (metros * metros1p1);
                            let metros1 = (metros1p2 / pistasm1);


                            let metros2 = 0;

                            if (tempvarl.C5 > 0) {
                                let metros2p1 = (tempvarl.C4 * tempvarl.C5) / ((tempvarl.C2 * tempvarl.C3) + (tempvarl.C4 * tempvarl.C5));
                                let pistasm2 = (tempvarl.C5 / tempvarl.C6);
                                let metros2p2 = (metros * metros2p1);
                                metros2 = (metros2p2 / pistasm2);
                            }

                            let metrosRefile = 0;

                            metrosRefile = (metros1 + metros2) * qualidade;

                            if ((productfield['GrupodeProduto'] != 3) && (pistas2 == 0)) {
                                metrosRefile = 0;
                            }

                            metros = metros * qualidade;

                            tempvarl.C7 = Math.round(metrosRefile, 0);
                            tempvarl.C8 = Math.round(metros, 0);

                            //fim calculo metros refile

                            tempvarl.DownTime = downTime;
                            //console.log('DT: ' + tempvarl.DownTime);
                            tempvarl.UpTime = upTime;
                            //console.log('UT: ' + tempvarl.UpTime);
                            tempvarl.cost = custo;
                            //console.log('Cost: ' + tempvarl.cost);
                            tempvarl.IdOrigem = Sequence;
                            //retorno.Add(dados);

                            result.push(tempvarl);
                            sequencia++;

                        }
                    }
                }

                //}

            }
            catch
            {

            }
        }

        // if (retorno.Count() == 0 || maquinaValida == false) //KHALID: FIX WHEN THE MACHINE IS NOT ABLE TO PRODUCE
        //{
        //MachineReturn dados = new MachineReturn(2, machineId, -1, -1, 1);
        //  result.Valido = -1;
        // result.IdOrigem = -1;
        //  result.C1=lastprocess.C1;
        //  result.othervar=tempresult;
        //retorno.Add(dados);
        // }


    }

    if (machine.ProcessId == 3) { //Deactivated
    }

    if (machine.ProcessId == 4) { //Printing 

        lastprocessG = lastprocess;
        async.forEach(lastprocessG, function (lastprocess, callback) {
            let tempvarl = {};
            var coresFrente = productfield['NúmerodeCoresFrente'];
            var coresVerso = productfield['NúmerodeCoresVerso'];

            if (coresFrente == 9) {
                coresFrente = 0;
            }

            if (coresVerso == 9) {
                coresVerso = 0;
            }

            let totalCores = (coresFrente + coresVerso);

            let SetupTime = machine.SetupTime;

            SetupTime = (SetupTime * totalCores) / 60;

            var TipoImpressao = productfield['Impressão'];

            //let larguraDaMaquina = machine.SetupTime;
            let larguraDaMaquina = machineExtrafields.Width;
            let corMin = machineExtrafields.MinColor;
            let corMax = machineExtrafields.MaxColor;

            var velocidadeDaMaquina = machine.Speed;

            var eficiencia = machine.Eficiency;

            eficiencia = eficiencia / 100;

            velocidadeDaMaquina = (velocidadeDaMaquina * 60) * eficiencia; //Velocidade em horas

            var custoHora = machine.Cost;

            var qualidade = machine.Quality;

            qualidade = qualidade / 100;

            var tipoDeSolda = productfield['TipodeSolda'];

            var GrupoDoProduto = productfield['GrupodeProduto'];

            var GeometriaDoProduto = productfield['Geometria'];

            let alturaDoProduto = productfield['Altura(mm)'];

            let larguraDoProduto = productfield['Largura(mm)'];

            let espessuraDaParede = productfield['Espessura(mm)'];

            let pesoEspecifico = 0;

            var material = productfield['Material'];

            if (productfield['Material'] == 1) {
                pesoEspecifico = 0.92;
            }
            if (productfield['Material'] == 2) {
                pesoEspecifico = 0.921;
            }
            if (productfield['Material'] == 3) {
                if (productfield['CordaEmbalagem'] == 1) {
                    pesoEspecifico = 0.919;
                }
                else {
                    pesoEspecifico = 0.927;
                }
            }
            if (productfield['Material'] == 4) {
                pesoEspecifico = 0.937;
            }
            if (productfield['Material'] == 5) {
                pesoEspecifico = 0.94;
            }
            if (productfield['Material'] == 6) {
                pesoEspecifico = 0.910;
            }
            if (productfield['Material'] == 7) {
                pesoEspecifico = 1;
            }

            //  let ultimoProc = (from i in listRoteiro where i.RoteiroId == roteiroId select i.Process).Max(); //wrong what will here ?

            let maquinaValida = false;
            //console.log(totalCores +'<='+ corMax);
            if (totalCores <= corMax) {
                maquinaValida = true;
            }

            if (maquinaValida == true) {

                // correct ?
                //No, should have a bunch of results
                //can you run this please?
                // yes this rurn of all path but if we run only 2 path we can add condtion
                //foreach (var item in listRoteiro)
                // {
                let sequencia = 1;

                //if (item.Process == ultimoProc && item.RoteiroId == roteiroId)
                // {
                let tentativaNumeroPistas = parseInt(Math.trunc(larguraDaMaquina / lastprocess.C3));
                // you seeing screen? y
                // this return 0 so it not goes to if condition
                // but it´s returning 0 because this "lastprocess.C3" is wrong
                // no it not wrong it return 1200 , and it dvided by 1180 so parse int method 
                // return zeor understand ?
                // In this case, that´s perfect. should return 0. And lead to a N/A
                // But, I put a console.log here
                // if(Sequence==2)
                // console.log(larguraDaMaquina+'/'+lastprocess.C3);
                if (tentativaNumeroPistas > 0) {
                    //calcula metros refile

                    var metros = (lastprocess.C1 / lastprocess.C6 / productfield['Espessura(mm)'] / pesoEspecifico) * 1000;

                    let metros1p1 = (lastprocess.C2 * lastprocess.C3) / ((lastprocess.C2 * lastprocess.C3) + (lastprocess.C4 * lastprocess.C5));
                    let pistasm1 = (lastprocess.C3 / lastprocess.C6);
                    let metros1p2 = (metros * metros1p1);
                    let metros1 = (metros1p2 / pistasm1);


                    let metros2 = 0;

                    if (lastprocess.C5 > 0) {
                        let metros2p1 = (lastprocess.C4 * lastprocess.C5) / ((lastprocess.C2 * lastprocess.C3) + (lastprocess.C4 * lastprocess.C5));
                        let pistasm2 = (lastprocess.C5 / lastprocess.C6);
                        let metros2p2 = (metros * metros2p1);
                        metros2 = (metros2p2 / pistasm2);
                    }

                    let metrosTotal = (metros1 + metros2);

                    // 100 ou 200 metros SetUp a mais na Mistura!!!!!!!!!!!!!!!!!!!!!!

                    if (lastprocess.C4 > 0) {
                        SetupTime += (SetupTime * 0.5); //Setupinho
                    }

                    let trocaBobina = ((lastprocess.C1 / 100) * (0.05)); // 3 minutos pra troca de bobina a cada 100Kg - TEM QUE MELHORAR ISSO

                    SetupTime += trocaBobina;

                    let tempo = (metrosTotal / velocidadeDaMaquina) + SetupTime;

                    let downtime = SetupTime;
                    let uptime = tempo - downtime;

                    let custo = (tempo * custoHora);

                    let metrosRefile = 0;

                    if ((lastprocess.C3 / lastprocess.C6) > 1) {
                        metrosRefile = metros1 + metros2;
                    }

                    metrosRefile = metrosRefile * qualidade;
                    metros = metros * qualidade;

                    //MachineReturn dados = new MachineReturn(4, machineId, tempo, custo, sequencia);

                    let pesonovo = lastprocess.C1 * qualidade;
                    tempvarl.C1 = parseFloat(pesonovo.toFixed(2));
                    tempvarl.C2 = parseFloat(lastprocess.C2.toFixed(2));
                    tempvarl.C3 = parseFloat(lastprocess.C3.toFixed(2));
                    tempvarl.C4 = parseFloat(lastprocess.C4.toFixed(2));
                    tempvarl.C5 = parseFloat(lastprocess.C5.toFixed(2));
                    tempvarl.C6 = parseFloat(lastprocess.C6.toFixed(2));
                    tempvarl.C7 = parseFloat(metrosRefile.toFixed(2));
                    tempvarl.C8 = parseFloat(metros.toFixed(2));
                    tempvarl.cost = parseFloat(custo.toFixed(4));
                    tempvarl.DownTime = parseFloat(downtime.toFixed(4));
                    tempvarl.UpTime = parseFloat(uptime.toFixed(4));
                    tempvarl.IdOrigem = Sequence;



                    //console.log(result);
                    //retorno.Add(dados);
                    sequencia++;
                }
                //}


                //}
            }
            result.push(tempvarl);
        });
        // if (retorno.Count() == 0 || maquinaValida == false)
        //{
        //MachineReturn dados = new MachineReturn(4, machineId, -1, -1, 1);
        // result.Valido = -1;
        // result.IdOrigem = -1;
        // retorno.Add(dados);
        //}
        //console.log(result.length);

    }

    if (machine.ProcessId == 5) { //Cutting 
        lastprocessG = lastprocess;

        async.forEach(lastprocessG, function (lastprocess, callback) {
            let tempvarl = {};
            let velocidade = machine.Speed;

            let setupTime = machine.SetupTime;

            let larguraDaMaquina = machine.Width;

            let qualidade = machine.Quality;
            qualidade = qualidade / 100;

            let eficiencia = machine.Eficiency;
            eficiencia = eficiencia / 100;

            let custoPorHora = machine.Cost;

            var tipoDeSolda = productfield['TipodeSolda'];

            var GrupoDoProduto = productfield['GrupodeProduto'];

            let alturaDoProduto = productfield['Altura(mm)'];

            let larguraDoProduto = productfield['Largura(mm)'];

            let larguraDaPista = 0;
            let alturaDaPista = 0;

            if (GrupoDoProduto == 1 && tipoDeSolda != 5) {
                larguraDaPista = alturaDoProduto;
                alturaDaPista = larguraDoProduto;

            }
            else {
                larguraDaPista = larguraDoProduto;
                alturaDaPista = alturaDoProduto;
            }

            //let ultimoProc = (from i in listRoteiro where i.RoteiroId == roteiroId select i.Process).Max();

            let tempo = 0;
            let custo = 0;

            //foreach (var item in listRoteiro)
            //{
            let sequencia = 1;

            //if (item.Process == ultimoProc && item.RoteiroId == roteiroId)
            //{
            if (lastprocess.C7 > 0) {

                let trocaBobina = ((lastprocess.C1 / 200) * (0.083)); // 5 minutos pra troca de bobina a cada 200Kg - TEM QUE MELHORAR ISSO

                tempo = (lastprocess.C7 / (velocidade * eficiencia)) + setupTime + trocaBobina;

                tempo = tempo / 60;

                let downTime = setupTime + trocaBobina;
                downTime = downTime / 60;

                let upTime = tempo - downTime;

                tempo = Math.round(tempo, 4);

                custo = tempo * custoPorHora;

                custo = Math.round(custo, 2);

                //MachineReturn dados = new MachineReturn(5, machineId, tempo, custo, sequencia);
                //tempvarl={};
                tempvarl.C1 = Math.round(lastprocess.C1 * qualidade, 0);
                tempvarl.C2 = lastprocess.C2;
                tempvarl.C3 = lastprocess.C3;
                tempvarl.C4 = lastprocess.C4;
                tempvarl.C5 = lastprocess.C5;
                tempvarl.C6 = lastprocess.C6;
                tempvarl.C7 = lastprocess.C7;
                tempvarl.C8 = lastprocess.C8 * qualidade;
                tempvarl.cost = custo;
                tempvarl.DownTime = Math.round(downTime, 4);
                tempvarl.UpTime = Math.round(upTime, 4);
                tempvarl.IdOrigem = Sequence;
                // result.push(tempvarl);
                //retorno.Add(dados);
                //sequencia++;
            }
            else {
                //MachineReturn dados = new MachineReturn(5, machineId, tempo, custo, sequencia);

                tempvarl.C1 = lastprocess.C1;
                tempvarl.C2 = lastprocess.C2;
                tempvarl.C3 = lastprocess.C3;
                tempvarl.C4 = lastprocess.C4;
                tempvarl.C5 = lastprocess.C5;
                tempvarl.C6 = lastprocess.C6;
                tempvarl.C7 = lastprocess.C7;
                tempvarl.C8 = lastprocess.C8;
                tempvarl.cost = 0;
                tempvarl.DownTime = 0;
                tempvarl.UpTime = 0;
                tempvarl.IdOrigem = Sequence;
                //result.push(tempvarl);
                //retorno.Add(dados);
                sequencia++;
            }

            result.push(tempvarl);
        });
        //}

        //}
    }

    if (machine.ProcessId == 6) { //Finishing
        lastprocessG = lastprocess;

        async.forEach(lastprocessG, function (lastprocess, callback) {
            tempvarl = {};
            let maquinaValida = false;

            let qualidade = machine.Quality;
            qualidade = qualidade / 100;

            let eficiencia = machine.Eficiency;
            eficiencia = eficiencia / 100;

            let nomeDoGrupo = machine.GroupName;

            let bainha = machineExtrafields.Bainha;
            let lateralSimples = machineExtrafields.LateralSimples;
            let fundoRedondo = machineExtrafields.FundoRedondo;
            let fundo = machineExtrafields.Fundo;
            let valvulado = machineExtrafields.Valvulado;

            var tipoDeSolda = productfield['TipodeSolda'];

            var GrupoDoProduto = productfield['GrupodeProduto'];

            let alturaDoProduto = productfield['Altura(mm)'];

            let larguraDoProduto = productfield['Largura(mm)'];

            let alturaDaPista = 0;

            if (GrupoDoProduto == 1 && tipoDeSolda != 5) {
                alturaDaPista = larguraDoProduto;
            }
            else {
                alturaDaPista = alturaDoProduto;
            }

            let velocidade = machine.Speed;
            if (machine.GroupSpeed > 0) {
                velocidade = machine.GroupSpeed;
            }

            velocidade = (velocidade * 60 * (alturaDaPista / 1000)) * eficiencia;

            let setupTime = machine.SetupTime;
            setupTime = setupTime / 60;

            let custoHora = machine.Cost;

            if (tipoDeSolda == 2 && bainha == 'Yes') {
                maquinaValida = true;
            }
            if (tipoDeSolda == 3 && lateralSimples == 'Yes') {
                maquinaValida = true;
            }
            if (tipoDeSolda == 4 && fundoRedondo == 'Yes') {
                maquinaValida = true;
            }
            if (tipoDeSolda == 5 && fundo == 'Yes') {
                maquinaValida = true;
            }
            if (tipoDeSolda == 6 && valvulado == 'Yes') {
                maquinaValida = true;
            }

            if (GrupoDoProduto == 2) {
                if (nomeDoGrupo == "7") {
                    maquinaValida = true;
                }
                else {
                    maquinaValida = false;
                }
            }

            //let ultimoProc = (from i in listRoteiro where i.RoteiroId == roteiroId select i.Process).Max(); //check

            if (maquinaValida == true) {

                //foreach (var item in listRoteiro)
                // {
                let sequencia = 1;

                //if (item.Process == ultimoProc && item.RoteiroId == roteiroId)
                // {

                let trocaBobina = ((lastprocess.C1 / 80) * (0.05)); // 3 minutos pra troca de bobina a cada 80Kg - TEM QUE MELHORAR ISSO
                /*
                console.log(' ');
                console.log('----------------------------');
                console.log('Máquina: ' + machine.Name);
                */
                let tempo = (lastprocess.C8 / velocidade) + setupTime + trocaBobina;
                /*
                console.log('lastprocess.C8: ' + lastprocess.C8);
                console.log('Velocidade: ' + velocidade);
                console.log('SetupTime: ' + setupTime);
                console.log('TrocaBobina: ' + trocaBobina);
                console.log('Tempo: ' + tempo);
                */
                let downTime = setupTime + trocaBobina;
                let upTime = tempo - downTime;

                let custo = tempo * custoHora;

                let unitariosTotal = lastprocess.C8 / (alturaDaPista / 1000);

                unitariosTotal = Math.trunc(unitariosTotal * qualidade);

                tempo = Math.round(tempo, 4);

                custo = Math.round(custo, 2);

                //MachineReturn dados = new MachineReturn(6, machineId, tempo, custo, sequencia);
                //tempvarl={};
                tempvarl.C1 = Math.round(lastprocess.C1 * qualidade, 0);
                tempvarl.C2 = lastprocess.C2;
                tempvarl.C3 = lastprocess.C3;
                tempvarl.C4 = lastprocess.C4;
                tempvarl.C5 = lastprocess.C5;
                tempvarl.C6 = lastprocess.C6;
                tempvarl.C7 = lastprocess.C7;
                tempvarl.C8 = lastprocess.C8;
                tempvarl.C9 = unitariosTotal;
                tempvarl.cost = custo;
                //console.log('Custo: ' + custo);
                tempvarl.DownTime = Math.round(downTime, 4);
                tempvarl.UpTime = Math.round(upTime, 4);
                tempvarl.IdOrigem = Sequence;
                result.push(tempvarl);
                //retorno.Add(dados);
                //console.log(result);
                sequencia++;
            }
            // }



            //if (retorno.Count() == 0 || maquinaValida == false)
            // {
            //MachineReturn dados = new MachineReturn(6, machineId, -1, -1, 1);
            //result.Valido = -1;
            //result.IdOrigem = -1;
            //retorno.Add(dados);
            // }
            result.push(tempvarl);
        });
    }

    return result;
}

//RENATO: CHECK IF FAMILY RECORD IS WORKING

//KHALID: LOOSE THE FOOTER

//KHALID: CHANGE NAME AFTER LOGIN

// Get customers by customer Id
var getCustomers = async (req, res) => {
    let query = `select * from customers where Customer=${req.params.customerId}`;
    let finalResult = [];
    database.query(query).then(result => {
        async.forEach(result, function (element, callback) {
            let tempResult = {}
            tempResult['Customer'] = element.Customer.replace(/\s/g, '');
            tempResult['Address'] = element.Address.replace(/\s/g, '');
            tempResult['Neighborhood'] = element.Neighborhood.replace(/\s/g, '');
            tempResult['ZipCode'] = element.ZipCode.replace(/\s/g, '');
            tempResult['City'] = element.City.replace(/\s/g, '');
            tempResult['State'] = element.State.replace(/\s/g, '');
            tempResult['Phone'] = element.Phone.replace(/\s/g, '');
            finalResult.push(tempResult);
        });
        returnResult(res, "Customer data", finalResult);
    });
}

module.exports = { getQuotations, getProcessMeachne, updateProcessrecord, processStatusUpdate, processSave, getProcessid, processUpdate, addProcessrecord, getProcessRecord, getProcessRecordByid, getCustomers };
