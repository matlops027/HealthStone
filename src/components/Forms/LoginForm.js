import React, { useState } from 'react';
import Btn from '../Buttons';
import Toast from '../Toasts';
import style from "../../styles/styles";
import Colors from '../../styles/colors';
import { TextErrorForm, Title, ContainerRow } from "../../styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Login } from '../../services/accountService';
//import { InsertFoodsFromJson } from '../../data/dao/rewardDAO';

const LoginForm = ({ navigation, setLoading }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [validForm, setValidForm] = useState(false);
    const [validEmail, setValidEmail] = useState("");
    const [validPassword, setValidPassword] = useState("");

    const authenticationUser = async () => {

        await validationForm();

        if (validForm) {
            setLoading(true);
            await Login(email, password).then(res => {
                setLoading(false);
                navigation.navigate('App');
            }).catch(err => {
                setLoading(false);
                Toast("Erro ao fazer Login");
            })
        }
    };

    const validationForm = async (field = '') => {
        email == "" || password == "" ? setValidForm(false) : setValidForm(true);

        if (email == "" && (field == 'email' || field == '')) {
            setValidEmail("O E-mail deve ser preenchido");
        }else if (email != "") {
            setValidEmail("");
        }

        if (password == "" && (field == 'password' || field == '')) {
            setValidPassword("A Senha deve ser preenchida");
        }else if (password != "") {
            setValidPassword("");
        }

    };

    return (
        <>
            <Input
                inputContainerStyle={style.inputForm}
                leftIconContainerStyle={style.iconForm}
                textAlignVertical="bottom"
                placeholder='Usuario'
                leftIcon={
                    <Icon
                    name='user'
                    size={24}
                    color='black'
                    />
                }
                onBlur={text => { validationForm('email') }}
                onChangeText={text => setEmail(text.trim().toLowerCase())}
            />
            { validEmail != "" && !validForm ? 
                <TextErrorForm marginLeft="3%">
                    {validEmail}
                </TextErrorForm> : null
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
            { validPassword != "" && !validForm ? 
                <TextErrorForm marginLeft="3%">{validPassword}</TextErrorForm> : null
            }
            <Btn label='Entrar'
                padding={'10px'}
                onSubmit={authenticationUser}
            />
            <ContainerRow justifyContent="center" marginTop="20px">
                <Title family="SanSerif" bottom="10px" align="left">Não possui conta? </Title>
                <Title family="SanSerif" onPress={() => navigation.push("Signin")} bottom="10px" align="left" color={Colors.secondary}>Criar Conta</Title>
            </ContainerRow>
        </>
    )
};

export default LoginForm;