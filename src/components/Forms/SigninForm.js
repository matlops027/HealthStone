import React, { useState } from 'react';
import Btn from '../Buttons';
import Toast from '../Toasts';
import style from "../../styles/styles";
import Colors from '../../styles/colors';
import { TextErrorForm, Title, ContainerRow } from "../../styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Signin } from '../../services/accountService';
import { InsertUser } from '../../services/userService';
import { CreateProfile } from '../../services/profileService';
import { InitialAvatar } from '../../services/avatarService';

const SigninForm = ({ navigation, setLoading }) => {

    const [userObject, setUserObject] = useState({
        nomeCompleto: '',
        userName: '',
        email: ''
    });
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const [validForm, setValidForm] = useState(false);
    const [validCompleteName, setValidCompleteName] = useState("");
    const [validUserName, setValidUserName] = useState("");
    const [validEmail, setValidEmail] = useState("");
    const [validPassword, setValidPassword] = useState("");
    const [validConfirmPassword, setValidConfirmPassword] = useState("");

    const createUser = async () => {

        await validationForm();

        if (validForm) {
            setLoading(true);
            await Signin(userObject.email, password) //Autentica via Firebase
                .then(async resp => {
                    await InsertUser(userObject.email, userObject.nomeCompleto)
                        .then(async res => {
                            await CreateProfile(res.insertId, userObject.userName)
                                .then(async r => {
                                    await InitialAvatar(r.insertId)
                                        .then(respAvat => {
                                            setLoading(false);
                                            navigation.navigate('App');
                                        }).catch(er => {

                                        })
                                    
                                }).catch(error => {

                                })
                            
                        }).catch(err => {
                            
                        })
                }).catch(err => {
                    setLoading(false);
                    Toast("Erro ao fazer o cadastro");
                })
        }
    };

    const validationForm = async (field = '') => {

        userObject.nomeCompleto == "" || userObject.userName == "" || userObject.email == "" || password == ""
            || confirmPassword == "" || confirmPassword != password || password.length < 6 ?
            setValidForm(false) : setValidForm(true);

        if (userObject.nomeCompleto == "" && (field == 'completeName' || field == '')) {
            setValidCompleteName("O Nome Completo deve ser preenchido");
            setValidForm(false);
        } else if (userObject.nomeCompleto != "") {
            setValidCompleteName("");
        }

        if (userObject.userName == "" && (field == 'userName' || field == '')) {
            setValidUserName("O Username deve ser preenchido");
            setValidForm(false);
        } else if (userObject.userName != "") {
            setValidUserName("");
        }

        if (userObject.email == "" && (field == 'email' || field == '')) {
            setValidEmail("O E-mail deve ser preenchido");
            setValidForm(false);
        } else if (userObject.email != "") {
            setValidEmail("");
        }

        if (password == "" && (field == 'password' || field == '')) {
            setValidPassword("A Senha deve ser preenchida");
            setValidForm(false);
        } else if (password != "" || password.length >= 6) {
            setValidPassword("");
        }

        if (password.length < 6 && password != "" && (field == 'password' || field == '')) {
            setValidPassword("A Senha deve ter no mínimo 6 dígitos");
            setValidForm(false);
        } else if (password != "" && password.length >= 6) {
            setValidPassword("");
        }

        if (confirmPassword == "" && (field == 'confirmPassword' || field == '')) {
            setValidConfirmPassword("A Confirmação de Senha deve ser preenchida");
            setValidForm(false);
        } else if (confirmPassword != "") {
            setValidConfirmPassword("");
        }

        if (confirmPassword != password && confirmPassword != "" && (field == 'confirmPassword' || field == '')) {
            setValidConfirmPassword("A confirmação da senha não corresponde");
            setValidForm(false);
        } else if (confirmPassword == password && confirmPassword != "") {
            setValidConfirmPassword("");
        }
    }

    return (
        <>
            <Input
                inputContainerStyle={style.inputForm}
                leftIconContainerStyle={style.iconForm}
                placeholder='Nome Completo'
                leftIcon={
                    <Icon
                        name='user'
                        size={24}
                        color='black'
                    />
                }
                onBlur={text => { validationForm('completeName') }}
                onChangeText={text => { setUserObject({ ...userObject, nomeCompleto: text }) }}
            />
            { validCompleteName != "" ?
                <TextErrorForm marginLeft="3%">{validCompleteName}</TextErrorForm> : null
            }
            <Input
                inputContainerStyle={style.inputForm}
                leftIconContainerStyle={style.iconForm}
                placeholder='Username'
                leftIcon={
                    <Icon
                        name='user'
                        size={24}
                        color='black'
                    />
                }
                onBlur={text => { validationForm('userName') }}
                onChangeText={text => { setUserObject({ ...userObject, userName: text }) }}
            />
            { validUserName != "" ?
                <TextErrorForm marginLeft="3%">{validUserName}</TextErrorForm> : null
            }
            <Input
                inputContainerStyle={style.inputForm}
                leftIconContainerStyle={style.iconForm}
                placeholder='E-mail'
                leftIcon={
                    <Icon
                        name='envelope'
                        size={24}
                        color='black'
                    />
                }
                onBlur={text => { validationForm('email') }}
                onChangeText={text => { setUserObject({ ...userObject, email: text.trim().toLowerCase() }) }}
            />
            { validEmail != "" ?
                <TextErrorForm marginLeft="3%">{validEmail}</TextErrorForm> : null
            }
            <Input
                inputContainerStyle={style.inputForm}
                leftIconContainerStyle={style.iconForm}
                placeholder='Senha'
                secureTextEntry={true}
                leftIcon={
                    <Icon
                        name='lock'
                        size={24}
                        color='black'
                    />
                }
                onBlur={text => { validationForm('password') }}
                onChangeText={text => setPassword(text)}
            />
            { validPassword != "" ?
                <TextErrorForm marginLeft="3%">{validPassword}</TextErrorForm> : null
            }
            <Input
                inputContainerStyle={style.inputForm}
                leftIconContainerStyle={style.iconForm}
                placeholder='Confirmar Senha'
                secureTextEntry={true}
                leftIcon={
                    <Icon
                        name='lock'
                        size={24}
                        color='black'
                    />
                }
                onBlur={text => { validationForm('confirmPassword') }}
                onChangeText={text => setconfirmPassword(text)}
            />
            { validConfirmPassword != "" ?
                <TextErrorForm marginLeft="3%">{validConfirmPassword}</TextErrorForm> : null
            }
            <Btn label='Cadastrar'
                padding={'10px'}
                onSubmit={createUser}
            />
            <ContainerRow justifyContent="center" marginTop="20px">
                <Title family="SanSerif" bottom="10px" align="left">Já possui conta? </Title>
                <Title family="SanSerif" onPress={() => navigation.pop()} bottom="10px" align="left" color={Colors.secondary}>Entrar</Title>
            </ContainerRow>
        </>
    )
};

export default SigninForm;