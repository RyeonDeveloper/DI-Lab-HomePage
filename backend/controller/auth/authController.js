import dao from '../../model/mysql/loginDAO';
import {asyncWrapper} from '../../lib/helper'
const getUserAuth = asyncWrapper(async (req, res) => {
    dao.params.user_id = req.query.user_id;
    dao.params.password = req.query.password;
    console.log(req.query)
    const result = await dao.getUserInfo();
    console.log(result)
    if(result.length !== 0) {
        const password = result[0].password;
        if(password === dao.params.password)
            res.json(1)
        else
            res.json(0)
    }
    else
        res.json(-1)
})

module.exports = {
    getUserAuth:getUserAuth
}
