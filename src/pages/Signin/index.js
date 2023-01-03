import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import Header from '../../components/Header';
import { LOGO } from '../../assets/consts';
import SigninForm from '../../components/Forms/SigninForm';
import Loading from '../../components/Loading';
import Colors from '../../styles/colors';
import { Container, ContainerScroll } from '../../styles';
import { HeaderAccount } from '../../components/Header/headersNavigation';

const Signin = ({ navigation }) => {

    const [loading, setLoading] = useState(false);

    return (
        <>
            <ContainerScroll>
                <StatusBar hidden />
                <Header height={30} image={LOGO} />
                <Container
                    alignItems={'center'}
                    marginLeft={"10%"}
                    marginRight={"10%"}
                    backgroundColor={Colors.transparent}>
                    <SigninForm setLoading={setLoading} navigation={navigation} />
                </Container>
            </ContainerScroll>
            { loading ? <Loading /> : null}
        </>
    )
}

Signin.navigationOptions = () => {
    const options = HeaderAccount();
    return options;
}

export default Signin;