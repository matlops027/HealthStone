import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import Header from '../../components/Header';
import { LOGO } from '../../assets/consts';
import LoginForm from '../../components/Forms/LoginForm';
import Loading from '../../components/Loading';
import Colors from '../../styles/colors';
import { Container, ContainerScroll } from '../../styles';
import { HeaderAccount } from '../../components/Header/headersNavigation';

const Login = ({ navigation }) => {

    const [loading, setLoading] = useState(false);

    return (
        <>
            <ContainerScroll>
                <StatusBar hidden />
                <Header image={LOGO} />
                <Container
                    alignItems={'center'}
                    marginLeft={"10%"}
                    marginRight={"10%"}
                    backgroundColor={Colors.transparent}>
                    <LoginForm setLoading={setLoading} navigation={navigation} />
                </Container>
            </ContainerScroll>
            { loading ? <Loading /> : null}
        </>
    )
}

Login.navigationOptions = () => {
    const options = HeaderAccount();
    return options;
};

export default Login;