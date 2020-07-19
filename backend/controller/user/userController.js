import dao from '../../model/mysql/userDAO';
import {asyncWrapper} from '../../lib/helper'
const getUserInfo = asyncWrapper(async (req, res) => {
    dao.params.name = req.query.user_name;
    dao.params.user_id = req.query.user_id;
    dao.params.password = req.query.password;
    const result = await dao.getUserInfo();
    res.json(result)
})
const addUser = asyncWrapper(async (req, res) => {
    dao.params.user_name = req.body.user_name;
    dao.params.user_id   = req.body.user_Id;
    dao.params.password  = req.body.password;
    const result = await dao.addUser();
    res.json({'result': result});
})

const checkuser_Id = asyncWrapper(async (req, res) => {
    dao.params.user_id   = req.body.user_Id;
    const result = await dao.checkuser_Id();
    res.json({'result': result[0]});
})
module.exports = {
    getUserInfo:getUserInfo,
    addUser : addUser,
    checkuser_Id : checkuser_Id
}