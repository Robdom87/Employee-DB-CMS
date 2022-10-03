import inquirer from 'inquirer';
import pHelper from '../helpers/promise.js'

//async function to wait for user response and procceed with db query afterwards
async function sequentialQueriesAdd(sql, params) {
    try {
        const params = await askDepartment();
        const rows = await pHelper.promise(sql, params);
        //give message for when message it is added 
        return [{ 'department': 'added' }];
    } catch (error) {
        console.log(error);
    }
}

//function to ask user for department name
const askDepartment = async () => {
    const response = await inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ]);
    return response.department;
}

async function sequentialQueriesDeleteDept(sql) {
    try {
        const deptList = await departmentObj.viewDept();
        const params = await deleteDeptQ(deptList);
        const rows = await pHelper.promise(sql, params);
        //give message for when message it is added 
        return [{ 'department': 'deleted' }];
    } catch (error) {
        console.log(error);
    }
}

const deleteDeptQ = async (deptList) => {
    //push all role names to a list to be presented in the questionaire
    let dlist = [];
    for (let i = 0; i < deptList.length; i++) {
        if(deptList[i].department !== null){
            dlist.push(deptList[i].department);
        }
    }
    const response = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'What department should be deleted?',
            choices: dlist
        }

    ]);
    //find role id for the role selected
    //update the response properties accordingly
    for (let i = 0; i < deptList.length; i++) {
        if (deptList[i].department === response.department_id) {
            response.department_id = deptList[i].id;
            break;
        }
    }
    //push all object properties into an array to pass required params syntax
    let respList = [];
    respList.push(response.department_id);
    return respList;
}

const departmentObj = {
    viewDept: function () {
        const sql = `SELECT id, name AS department FROM department`;
        return pHelper.viewSeqQuery(sql);
    },
    addDept: function () {
        const sql = `INSERT INTO department (department.name) VALUES (?)`;
        return sequentialQueriesAdd(sql);
    },
    deleteDept: function () {
        const sql = 'DELETE FROM department WHERE id = ?';
        return sequentialQueriesDeleteDept(sql);
    }
}

export default departmentObj;
