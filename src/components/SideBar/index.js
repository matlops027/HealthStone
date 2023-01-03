import React, { useEffect } from 'react';
import {
    Dimensions
} from "react-native";
const { width, height } = Dimensions.get('window');
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { Avatar } from "react-native-avataaars";
import { connect } from 'react-redux';
import * as ProfileActions from '../../store/actions/profile';
import * as AvatarActions from '../../store/actions/avatar';
import * as UserActions from '../../store/actions/user';
import { SignOut } from '../../services/accountService';
import Toast from '../Toasts';
import { Container, Title, Hr, Content, ContainerScroll } from '../../styles';
import Colors from '../../styles/colors';
import styles from '../../styles/styles';
import StatusArea from '../StatusArea';


const SideBar = ({ ...props }) => {

    useEffect(() => {
        getInfos();
    }, [])

    const getInfos = async () => {
        props.getProfile();
        props.getAvatar();
        props.getUser();
    }

    const signOut = async () => {
        await SignOut().then(res => {
            props.resetProfile();
            props.resetAvatar();
            props.navigation.navigate('Auth');
        }).catch(err => {
            Toast("Erro sair da conta");
        });
    };

    return (
        <Container
            paddingTop={'10px'}
            paddingRight={'30px'}
            paddingLeft={'30px'}
            backgroundColor={Colors.primary}>
            <Content alignSelf={'center'}>
                <Avatar
                    style={styles.avatar}
                    size={width * (35 / 100)}
                    topType={props.avatar.data.TOPTYPE}
                    hairColor={props.avatar.data.HAIRCOLO}
                    hatColor={props.avatar.data.HATCOLO}
                    facialHairType={props.avatar.data.FACHAITY}
                    facialHairColor={props.avatar.data.FACHAICO}
                    accessoriesType={props.avatar.data.ACCETYPE}
                    clotheType={props.avatar.data.CLOTTYPE}
                    clotheColor={props.avatar.data.CLOTCOLO}
                    graphicType={props.avatar.data.GRAPTYPE}
                    eyeType={props.avatar.data.EYETYPE}
                    eyebrowType={props.avatar.data.EYEBTYPE}
                    mouthType={props.avatar.data.MOUNTYPE}
                    skinColor={props.avatar.data.SKINCOLO}
                />
            </Content>
            <StatusArea profile={props.profile} />
            <Hr />
            <ContainerScroll alignSelf={'stretch'}>
                <DrawerNavigatorItems labelStyle={styles.sideBarItens} {...props} />
                <Hr />
                <Title
                    align={'left'}
                    top={'16px'}
                    bottom={'16px'}
                    left={'16px'}
                    right={'16px'}
                    onPress={() => signOut()}>SAIR</Title>
            </ContainerScroll>
        </Container>
    )
};

const mapStateToProps = state => ({
    avatar: state.avatar,
    profile: state.profile
});

const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch(ProfileActions.setProfInfo()),
    resetProfile: () => dispatch(ProfileActions.resetProfInfo()),
    getAvatar: () => dispatch(AvatarActions.setAvatInfo()),
    resetAvatar: () => dispatch(AvatarActions.resetAvatInfo()),
    getUser: () => dispatch(UserActions.setUserInfo())
})


export default connect(mapStateToProps, mapDispatchToProps)(SideBar);