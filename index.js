const createEmployeeRecord = (employee) => {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (employees) => {
    console.log(employees)
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(timeDate) {
    let [date, hour] = timeDate.split(" ")
    let timeObj = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }
    this.timeInEvents.push(timeObj)
    return this
}

function createTimeOutEvent (timeDate) {
    let [date, hour] = timeDate.split(" ")
    let timeObj = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }
    this.timeOutEvents.push(timeObj)
    return this
}

function hoursWorkedOnDate (date) {
    const timeIn = this.timeInEvents.find(event => event.date === date)
    const timeOut = this.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour)/100
}    

function wagesEarnedOnDate (date) {
    return (hoursWorkedOnDate.call(this, date))* this.payPerHour
    
}

function findEmployeeByFirstName(employees, name) {
    for (const employee of employees) {
        if (employee.firstName === name) {
            return employee
        } else{
            console.log('NOPE!!!')
        }
    }
}


function calculatePayroll (employeeRecords) {
    console.log("OVER HERE", employeeRecords)
    let sumArr = []
    for (const employee of employeeRecords) {
        sumArr.push(allWagesFor.call(employee))
    }    
    const totalSum = sumArr.reduce((accum, value) => accum + value, 0)
    return totalSum
}


// * **Argument(s)**
//   * `Array` of employee records
// * **Returns**
//   * Sum of pay owed for **all** employees for all dates, as a number
// * **Behavior**
//   * Using `allWagesFor` for each of the employees, accumulate the value of
//     all dates worked by the employee in the record used as context. Amount
//     should be returned as a number.


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

