const pool = require("../sql/connection");
const bcrypt = require("bcrypt");

const create = async (req,res) =>{
    const {name, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log({hashedPassword})
    // abstract the variables values
    pool.query(`INSERT iNTO users (id, name, email, password) VALUES(?,?,?,?)`,
    // dependency  array
    [null, name, email, hashedPassword],
    (err, results, fields) => {
        res.json(results)
    }
    );
};

module.exports = {
    create,
}
