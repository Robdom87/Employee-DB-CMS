import db from './dbConnect.js';

const promiseObj = {
    //function to make promises out of query request
    promise: (sql, params) => {
        return new Promise((resolve, reject) => {
            db.query(sql, params, (error, result) => {
                if (error) {
                    console.log('ERROR: Not able to find the requested information.');
                    return reject(error);
                }
                return resolve(result);
            });
        });
    },
    //function to await the finalization of the respective promise
    viewSeqQuery: async (sql)=>{
        try {
            const rows = await promiseObj.promise(sql);  
            return rows;
        } catch (error) {
            console.log(error);
        }
    }
};

export default promiseObj;