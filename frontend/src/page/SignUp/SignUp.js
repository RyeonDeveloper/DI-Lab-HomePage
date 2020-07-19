import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import axios from 'axios';

const SignUp = () => {
    const [user_name, setName] = useState(null);
    const [user_Id, setuser_Id] = useState(null);
    const [password, setPass] = useState(null);
    const [passCheck, setPassCheck] = useState(null);
    var checkPass = new Boolean(false);
    var checkId = new Boolean(true);

    const setNameText = e => {
        setName(e.target.value);
    };
    const setIdText = e => {
        setuser_Id(e.target.value);
    };
    const setPassWord = e => {
        setPass(e.target.value);
    };
    const setPassWordCheck = e => {
        setPassCheck(e.target.value);
    };
    const save = e => {
        e.preventDefault();
    };


    const add_User = () => {
        if (checkPass == true && checkId == true) {
            axios.post('/api/user/addUser', {
                user_name: user_name,
                user_Id: user_Id,
                password: password
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                });
        } else {
            alert("비밀번호 확인버튼이나 아이디 중복검사를 눌러주세요.");
        }
    }

    const checkuser_Id = () => {
        var user = document.getElementById("user_Id").value;
        if (user.length === 0) {
            alert("아이디(학번)를 입력해주세요.");
        } else {
            axios.post('/api/user/checkuser_Id', {
                user_Id: user_Id,
            })
                .then(function (response) {
                    if (response.data.result == undefined) {
                        alert("사용 가능한 아이디입니다.");
                    } else {
                        checkId = false;
                        alert("이미 가입된 아이디입니다.");
                    }
                    console.log(response.data.result);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                });
        }
    }

    const passWordCheck = () => {
        var pass1 = document.getElementById("password").value;
        var pass2 = document.getElementById("passCheck").value;

        if (pass1 === '' || pass2 === '') {
            alert("비밀번호를 입력해주세요.");
        } else if (pass1 !== pass2) {
            alert("비밀번호가 틀립니다. 다시 입력해주세요.");
        } else {
            alert("비밀번호가 맞습니다.");
            checkPass = true;
        }
    }



    return (
        <div className="SignUp" id="signup">
            <form onSubmit={save}>
                <FormLabel htmlFor="user_name">이름</FormLabel>
                <Input
                    type="text"
                    name="user_name"
                    id="user_name"
                    onChange={setNameText}
                />
                <br />

                <FormLabel htmlFor="user_Id">아이디(학번)</FormLabel>
                <Input
                    type="number"
                    name="user_Id"
                    id="user_Id"
                    onChange={setIdText}
                />
                <Button value="중복체크" onClick={checkuser_Id}>중복체크</Button>
                <br />

                <FormLabel htmlFor="password">비밀번호</FormLabel>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={setPassWord}
                />
                <br />

                <FormLabel htmlFor="passCheck">비밀번호확인</FormLabel>
                <Input
                    type="password"
                    name="passCheck"
                    id="passCheck"
                    onChange={setPassWordCheck}
                />
                <Button value="비밀번호확인" onClick={passWordCheck}>비밀번호확인</Button>
                <br />

                <Button value="가입완료" onClick={add_User}>가입완료</Button>
                {/*가입완료 누를시 로그인 창으로 들어감(onClick구현)*/}
            </form>
        </div>
    );
};

export default SignUp;