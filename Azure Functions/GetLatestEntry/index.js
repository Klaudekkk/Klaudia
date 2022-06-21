const sql = require('mssql');

module.exports = async function (context, req) {
    try {
        await sql.connect(process.env['dbString']);
        const result = await sql.query('select top 1 time_end from BreakTime order by time_start desc');
        if (result.recordset[0].time_end != null) {
            context.res.json({
                state: 'Toaleta jest wolna, powodzenia!'
            });
        }
        else {
            context.res.json({
                state: 'Toaleta jest zajęta, wytrzymaj jeszcze!'
            });
        }
    } catch (e) {
        context.res = {
            status: 400,
            body: e
        };
    }
};