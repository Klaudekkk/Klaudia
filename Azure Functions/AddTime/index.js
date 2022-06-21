const sql = require('mssql');

module.exports = async function (context, req) {
    try {
        await sql.connect(process.env['dbString']);
        var sqlQuery = "";
        const recievedDate = await req.body.time;
        const result = await sql.query('select top 1 * from BreakTime order by time_start desc');
        if (result.recordset[0].time_end != null || result.recordset.body == "") {
            sqlQuery = "INSERT into BreakTime (time_start) VALUES (convert(datetime, '" + recievedDate + "'))";
            const dataInsert = await sql.query(sqlQuery, function (err, re) {
                if (err) throw err;
            });
            context.res = {
                body: "added new entry"
            }
        }
        else {
            sqlQuery = "UPDATE BreakTime SET time_end = CONVERT(datetime, '" + recievedDate + "') where id = '" + result.recordset[0].id + "'";
            const dataUpdate = await sql.query(sqlQuery, function (err, re) {
                if (err) throw err;
            });
            context.res = {
                body: "updated"
            }
        }
    } catch (e) {
        context.res = {
            status: 400,
            body: e
        };
    }
};