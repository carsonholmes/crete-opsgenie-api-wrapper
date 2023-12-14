var util = require('./api-util.js')
var rootURL = 'https://api.opsgenie.com/v2/'

var teamName = ""
var cbFunc = ""

module.exports = {
    getTeamOnCallNumber(name, cb) {
        teamName = name
        cbFunc = cb
        //get all the schedules where each contains a team name for comparison
        util.getJiraJSON(rootURL + 'schedules', cbGetSchedules)
    }
}

//Supporting Functions
const cbGetSchedules = (error, result) => {
    //console.log("getSchedule")
    //console.log(result.data)
    if (!error) {
        for (let s in result.data)
            if (result.data[s].ownerTeam.name === teamName) {
                //get the on call person for the schedule that matches the team
                util.getJiraJSON(rootURL + 'schedules/' + result.data[s].id + '/on-calls', cbGetOnCall)                
            }
    }
    else console.log("Error: ", error)
}

const cbGetOnCall = (error, result) => {
    //console.log("getOnCal")
    //console.log(result.data)
    if (!error) {
        if (result.data.onCallParticipants.length > 0) {
            //get contact details for the person who is on call
            util.getJiraJSON(rootURL + 'users/' + result.data.onCallParticipants[0].id + '/contacts', cbGetOperator)
        }
        else {
            console.log('No one on call found for team: ' + teamName)
            cbFunc("1-4024759521")  //default to main line
        }
    }
    else console.log("Error: ", error)
}

const cbGetOperator = (error, result) => {
    //console.log("getOperator")
    //console.log(result.data)
    if (!error) {
        let found = false;
        for (let c in result.data) {
            if (result.data[c].method === 'voice') {
                //callback with the voice phone number
                found = true;
                cbFunc(result.data[c].to)
            }
        }
        if (!found) cbFunc("1-4024759521")  //default to main line
    }
    else console.log("Error: ", error)
}
