import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import Colors from './colors';
const { width, height } = Dimensions.get('window');

//ESTILOS CONTAINERS GLOBAIS
export const SafeContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.transparent};
    padding-top: ${props => props.paddingTop ? props.paddingTop : '0px'};
    padding-bottom: ${props => props.paddingBottom ? props.paddingBottom : '0px'};
    padding-left: ${props => props.paddingLeft ? props.paddingLeft : '0px'};
    padding-right: ${props => props.paddingRight ? props.paddingRight : '0px'};
`;

export const ImageEmpty = styled.Image`
    height: ${props => (height * ((props.sizeH ? props.sizeH : 50) / 100)) + 'px'};
    width: ${props => (width * ((props.sizeW ? props.sizeW : 50) / 100)) + 'px'};
`;

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.transparent};
    margin-top: ${props => props.marginTop ? props.marginTop : '0px'};
    margin-left: ${props => props.marginLeft ? props.marginLeft : '0px'};
    margin-right: ${props => props.marginRight ? props.marginRight : '0px'};
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0px'};
    align-items: ${props => props.alignItems ? props.alignItems : 'flex-start'};
    padding-top: ${props => props.paddingTop ? props.paddingTop : '0px'};
    padding-bottom: ${props => props.paddingBottom ? props.paddingBottom : '0px'};
    padding-left: ${props => props.paddingLeft ? props.paddingLeft : '0px'};
    padding-right: ${props => props.paddingRight ? props.paddingRight : '0px'};
`;

export const Content = styled.View`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.transparent};
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items: ${props => props.alignItems ? props.alignItems : 'center'};
    margin-top: ${props => props.marginTop ? props.marginTop : '0px'};
    margin-left: ${props => props.marginLeft ? props.marginLeft : '0px'};
    margin-right: ${props => props.marginRight ? props.marginRight : '0px'};
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0px'};
    align-self: ${props => props.alignSelf ? props.alignSelf : 'auto'};
`;

export const ContainerCenter = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.primary};
    padding-Left: ${props => props.paddingLeft ? props.paddingLeft : '0px'};
    padding-right: ${props => props.paddingRight ? props.paddingRight : '0px'};
`;

export const ContainerModal = styled.View`
    border-radius: 10px;
    flex: 1;
    max-height: ${props => props.height ? props.height : '80%'};
    width: ${props => props.width ? props.width : '80%'};
    margin: ${props => props.margin ? props.margin : '0px'};
    padding-left: ${props => props.paddingLeft ? props.paddingLeft : '0px'};
    padding-top: ${props => props.paddingTop ? props.paddingTop : '0px'};
    padding-right: ${props => props.paddingRight ? props.paddingRight : '0px'};
    padding-bottom: ${props => props.paddingBottom ? props.paddingBottom : '0px'};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.modalColor};
`;

export const ContainerHeader = styled.View`
    flex: 1;
    max-height: ${props => (height * ((props.height ? props.height : 50) / 100)) + 'px'};
    min-height: ${props => (height * ((props.height ? props.height : 50) / 100)) + 'px'};
    justify-content: center;
    align-items: center;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.transparent};
`;

export const ContainerItem = styled.View`
    border-width: 1px;
    border-color: ${Colors.white};
    border-radius: 8px;
    width: ${props => (width * ((props.width ? props.width : 80) / 100)) + 'px'};
    min-height: ${props => (height * ((props.height ? props.height : 11) / 100)) + 'px'};
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'space-around'};
    align-items: ${props => props.alignItems ? props.alignItems : 'center'};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.transparent};
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0px'};
`;

export const Dashboard = styled.View`
    border-width: 1px;
    border-color: ${Colors.white};
    width: ${props => props.width ? props.width : '49%'};
    min-height: ${props => props.height ? props.height : '100px'};
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items: ${props => props.alignItems ? props.alignItems : 'center'};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.transparent};
    margin-top: ${props => props.marginTop ? props.marginTop : '0px'};
    margin-left: ${props => props.marginLeft ? props.marginLeft : '0px'};
    margin-right: ${props => props.marginRight ? props.marginRight : '0px'};
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0px'};
`;

export const ContainerRow = styled.View`
    flex-direction: row;
    background-color: ${ props => props.backgroundColor ? props.backgroundColor : Colors.transparent};
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items: ${props => props.alignItems ? props.alignItems : 'center'};
    align-self:  ${props => props.alignSelf ? props.alignSelf : 'auto'};
    padding-top: ${props => props.paddingTop ? props.paddingTop : '0px'};
    padding-left: ${props => props.paddingLeft ? props.paddingLeft : '0px'};
    padding-right: ${props => props.paddingRight ? props.paddingRight : '0px'};
    padding-bottom: ${props => props.paddingBottom ? props.paddingBottom : '0px'};
    margin-top: ${props => props.marginTop ? props.marginTop : '0px'};
    margin-left: ${props => props.marginLeft ? props.marginLeft : '0px'};
    margin-right: ${props => props.marginRight ? props.marginRight : '0px'};
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0px'};
`;

export const ContainerColumn = styled.View`
    flex-direction: column;
    flex: ${props => props.flex ? props.flex : 0};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.transparent};
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'space-around'};
    align-items: ${props => props.alignItems ? props.alignItems : 'center'};
    padding-top: ${props => props.paddingTop ? props.paddingTop : '0px'};
    padding-left: ${props => props.paddingLeft ? props.paddingLeft : '0px'};
    padding-right: ${props => props.paddingRight ? props.paddingRight : '0px'};
    padding-bottom: ${props => props.paddingBottom ? props.paddingBottom : '0px'};
    margin-top: ${props => props.marginTop ? props.marginTop : '0px'};
    margin-left: ${props => props.marginLeft ? props.marginLeft : '0px'};
    margin-right: ${props => props.marginRight ? props.marginRight : '0px'};
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0px'};
`;

export const ContainerScroll = styled.ScrollView`
    flex: 1;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.primary};
    padding-top: ${props => props.paddingTop ? props.paddingTop : '0px'};
    padding-left: ${props => props.paddingLeft ? props.paddingLeft : '0px'};
    padding-right: ${props => props.paddingRight ? props.paddingRight : '0px'};
    padding-bottom: ${props => props.paddingBottom ? props.paddingBottom : '0px'};
    margin-top: ${props => props.marginTop ? props.marginTop : '0px'};
    margin-left: ${props => props.marginLeft ? props.marginLeft : '0px'};
    margin-right: ${props => props.marginRight ? props.marginRight : '0px'};
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0px'};
    align-self: ${props => props.alignSelf ? props.alignSelf : 'auto'};
`;

export const ContainerWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.transparent};
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
    flex: 1;
    margin-right: ${props => props.right ? props.right : '10px'};
    margin-left: ${props => props.left ? props.left : '0px'};
    margin-top: ${props => props.top ? props.top : '0px'};
    margin-bottom: ${props => props.bottom ? props.bottom : '0px'};
    padding: ${props => props.spacing ? props.spacing : '0px'};
`;

export const Hr = styled.View`
    border-bottom-width: 0.5px;
    border-color: ${props => props.color ? props.color : Colors.white};
    padding: ${props => props.spacing ? props.spacing : '10px'};
    align-self: stretch;
    margin-left: ${props => props.marginLeft ? props.marginLeft : '0px'};
    margin-right: ${props => props.marginRight ? props.marginRight : '0px'};
`;

//ESTILOS LABELS, TITLE, TEXT, DESCRIPTIONS GLOBAIS
export const Title = styled.Text`
    font-size: ${props => props.font ? props.font : '18px'};
    text-align: ${props => props.align ? props.align : 'center'};
    font-family: ${props => props.family ? props.family : 'Square'};
    color: ${props => props.color ? props.color : Colors.white};
    padding-left: ${props => props.left ? props.left : '0px'};
    padding-right: ${props => props.right ? props.right : '0px'};
    padding-top: ${props => props.top ? props.top : '0px'};
    padding-bottom: ${props => props.bottom ? props.bottom : '0px'};
    align-self: ${props => props.alignSelf ? props.alignSelf : 'auto'};
`;
export const TextBtn = styled.Text`
    font-size: ${props => props.font ? props.font : '18px'};
    text-align: center;
    color: ${props => props.color ? props.color : Colors.white};
    font-family: 'Square';
`;

export const TextErrorForm = styled.Text`
    font-size: ${props => props.font ? props.font : '12px'};
    color: ${props => props.color ? props.color : Colors.red};
    margin-left: ${props => props.marginLeft ? props.marginLeft : '0px'};
    align-self: flex-start;
`;

//ESTILOS BUTTONS GLOBAIS
export const Button = styled.TouchableOpacity`
    width: 250px;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.secondary};
    padding: ${props => props.padding ? props.padding : '8px'};
    margin-bottom: ${props => props.bottom ? props.bottom: '0px'};
  
`;

export const FabButton = styled.TouchableOpacity`
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.secondary};
    border-radius: 30px;
    bottom: 10px;
    right: 10px;
    align-items: center;
    justify-content: center;
    padding: ${props => props.padding ? props.padding : '0px'};
  
`;

export const AddButton = styled.TouchableOpacity`
    position: absolute;
    width: ${(width * (10 / 100)) + 'px'};
    height: ${(width * (10 / 100)) + 'px'};
    background-color: ${Colors.secondary};
    border-radius: 30px;
    bottom: 0px;
    right: ${(width * (0.5 / 100)) + 'px'};
    align-items: center;
    justify-content: center;
`;

export const CheckBox = styled.TouchableOpacity`
    width: ${props => (width * ((props.size ? props.size : 7) / 100)) + 'px'};
    height: ${props => (width * ((props.size ? props.size : 7) / 100)) + 'px'};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.white};
    align-items: center;
    align-self: ${props => props.alignSelf ? props.alignSelf : 'auto'};
    justify-content: center;
    margin: ${props => props.margin ? props.margin : '0px'};
    border-width: ${props => props.border ? props.border : '0px'};
    border-color: ${Colors.white};
`;

export const Combo = styled.TouchableOpacity`
    border-width: 1px;
    border-color: ${Colors.white};
    border-radius: 8px;
    width: ${props => (width * ((props.width ? props.width : 55) / 100)) + 'px'};
    min-height: ${props => (height * ((props.height ? props.height : 5) / 100)) + 'px'};
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'space-around'};
    align-items: ${props => props.alignItems ? props.alignItems : 'center'};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.transparent};
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0px'};
    margin-right: ${props => props.marginRight ? props.marginRight : '0px'};
`;

export const GridBox = styled.TouchableOpacity`
    width: ${props => (width * ((props.sizeW ? props.sizeW : 17) / 100)) + 'px'};
    height: ${props => (width * ((props.sizeH ? props.sizeH : 17) / 100)) + 'px'};
    align-items: center;
    justify-content: center;
    margin: 5px;
    border-radius: 8px;
    border-width: 1px;
    border-color: ${Colors.white};
`;

export const TouchableItem = styled.TouchableOpacity`
    border-width: 1px;
    border-color: ${Colors.white};
    border-radius: 8px;
    width: ${props => (width * ((props.width ? props.width : 80) / 100)) + 'px'};
    min-height: ${props => (height * ((props.height ? props.height : 11) / 100)) + 'px'};
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'space-around'};
    align-items: ${props => props.alignItems ? props.alignItems : 'center'};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Colors.transparent};
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0px'};
`;