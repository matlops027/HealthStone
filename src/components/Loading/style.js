import {StyleSheet, Dimensions} from "react-native";

const { height, width } = Dimensions.get('window');

const style = StyleSheet.create({
    container: {
        zIndex: 9,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
    
})


export default style;