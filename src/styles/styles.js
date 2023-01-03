import { StyleSheet, Dimensions } from 'react-native';
import Colors from './colors';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    containerCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    imageStone: {
        width: 30,
        height: 30
    },
    containerModal: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20
    },
    contentModal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    imgHeader: {
        width: (width * (100 / 100)) ,
        height: (height * (26 / 100)),
        marginTop: 40
    },
    imageReward: {
        width: '50%',
        height: '50%'
    },
    inputForm: {
        backgroundColor: Colors.formColor,
        marginTop: 10,
        marginBottom: 10
    },
    inputContent: {
        width: (width * (80 / 100)),
        height: (height * (6 / 100)),
        alignItems: 'center',
        margin: 10
    },
    inputCustom: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.white,
        width: (width * (80/100)),
        borderRadius: 8,
        height: (height * (6 / 100))
    },
    inputHalfContent: {
        width: (width * (40 / 100)),
        height: (height * (6 / 100)),
        alignItems: 'center'
    },
    inputHalfCustom: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.white,
        width: (width * (40 / 100)),
        borderRadius: 8,
        height: (height * (6 / 100))
    },
    textInputCustom: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'normal',
        fontFamily: 'Square'
    },
    iconForm: {
        paddingRight: 10
    },
    menuOptions: {
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: 8
    },
    menuAction: {
        margin: 10
    },
    avatar: {
        flexDirection: 'row',
        borderRadius: 500,
        backgroundColor: Colors.backGroundAvatar
    },
    progressBar: {
        alignSelf: 'stretch'
    },
    sideBarItens: {
        fontFamily: 'Square',
        fontWeight: 'normal',
        fontSize: 18
    },
    textTitlePage: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'normal',
        fontFamily: 'Square'
    },
    viewTabs: {
        backgroundColor: Colors.primary,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        paddingTop: 20
    },
    checkBox: {
        backgroundColor: Colors.primary,
        borderWidth: 0
    },
    textCheckBox: {
        color: '#FFF',
        fontWeight: 'normal',
        fontSize: 16
    },
    distance: {
        padding: 10
    }
});

export default styles;