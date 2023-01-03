import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList } from "react-native";
const { width, height } = Dimensions.get('window');
import * as AvatarActions from '../../store/actions/avatar';
import { connect } from 'react-redux';
import { Avatar } from "react-native-avataaars";
import { Container, ContainerRow, Title } from '../../styles';
import styles from '../../styles/styles';
import Colors from '../../styles/colors';
import { HeaderSubScreen } from '../../components/Header/headersNavigation';
import Combobox from '../../components/Combobox';
import Toast from '../../components/Toasts';
import Loading from '../../components/Loading';
import { selectedOptions, objPieceBlock } from './config';
import OptionsModal from './OptionsModal';
import { updateAvatar } from '../../services/avatarService';

const CreateAvatar = ({ navigation, avatar, getAvatar, profile }) => {

  const [loading, setLoading] = useState(false);
  const [modalPickerVisible, setModalPickerVisible] = useState(false);
  const [pieceBlock, setPieceBlock] = useState(Object.assign({}, objPieceBlock));
  const [pieceOptions, setPieceOptions] = useState(selectedOptions(avatar));

  useEffect(() => {
    showItemValidator();
  }, [])

  const showItemValidator = () => {

    setPieceOptions(
      pieceOptions.map(data => {

        //Valida Barba
        if (pieceOptions[0].selected[0].idv == 'Hijab' && data.id == 'FACHAITY') {
          data.visible = false;
        } else if (data.id == 'FACHAITY') {
          data.visible = true;
        }

        //Valida Acessórios
        if (pieceOptions[0].selected[0].idv == 'Eyepatch' && data.id == 'ACCETYPE') {
          data.visible = false;
        } else if (data.id == 'ACCETYPE') {
          data.visible = true;
        }

        //Valida Cor Chapéu/Cabelo
        if (
          (pieceOptions[0].selected[0].idv == 'Eyepatch' ||
            pieceOptions[0].selected[0].idv == 'NoHair' ||
            pieceOptions[0].selected[0].idv == 'Hat' ||
            pieceOptions[0].selected[0].idv == 'LongHairFrida' ||
            pieceOptions[0].selected[0].idv == 'LongHairShavedSides') &&
          (data.id == 'HAIRCOLO' || data.id == 'HATCOLO')
        ) {
          data.visible = false;

        } else if (
          (pieceOptions[0].selected[0].idv == 'Hijab' ||
            pieceOptions[0].selected[0].idv == 'Turban' ||
            pieceOptions[0].selected[0].idv == 'WinterHat1' ||
            pieceOptions[0].selected[0].idv == 'WinterHat2' ||
            pieceOptions[0].selected[0].idv == 'WinterHat3' ||
            pieceOptions[0].selected[0].idv == 'WinterHat4') &&
          (data.id == 'HAIRCOLO' || data.id == 'HATCOLO')
        ) {
          data.visible = data.id == 'HAIRCOLO' ? data.visible = false : data.visible = true;

        } else {
          if (data.id == 'HAIRCOLO') {
            data.visible = true;
          } else if (data.id == 'HATCOLO') {
            data.visible = false;
          }
        }

        //Valida Cor/Estampa da roupa
        if (
          (pieceOptions[6].selected[0].idv == 'BlazerShirt' ||
            pieceOptions[6].selected[0].idv == 'BlazerSweater') &&
          (data.id == 'CLOTCOLO' || data.id == 'GRAPTYPE')
        ) {
          data.visible = false;

        } else if (pieceOptions[6].selected[0].idv == 'GraphicShirt' && (data.id == 'CLOTCOLO' || data.id == 'GRAPTYPE')) {
          data.visible = true;

        } else {
          if (data.id == 'CLOTCOLO') {
            data.visible = true;

          } else if (data.id == 'GRAPTYPE') {
            data.visible = false;

          }
        }

        //Valida Cor Barba
        if (
          (pieceOptions[3].selected[0].idv == 'Blank' ||
            pieceOptions[0].selected[0].idv == 'Hijab') &&
          data.id == 'FACHAICO'
        ) {
          data.visible = false;
        } else if (data.id == 'FACHAICO') {
          data.visible = true;
        }

        return data;

      })
    );

  };

  const selectedPiece = (piece) => {
    setPieceBlock(piece);
    setModalPickerVisible(true);
  };

  const changeAvatar = (valueObj) => {
    setPieceOptions(
      pieceOptions.map(data => {
        if (data.id == pieceBlock.id) {
          data.selected = [valueObj]

        }
        return data;
      })
    )
    showItemValidator();
    setModalPickerVisible(false);
  };

  const saveAvatar = async () => {
    setLoading(true);

    const objUpdateAvatar = {};

    pieceOptions.map(data => {
      objUpdateAvatar[data.id] = data.selected[0].idv
    });

    await updateAvatar(objUpdateAvatar).then(res => {
      getAvatar();
      setLoading(false);
      Toast('Avatar salvo com sucesso');
      navigation.pop();
    }).catch(err => {
      setLoading(false);
      Toast('Não possivel salvar as alterações do avatar'); 
    })

  }

  const RenderOptions = ({ data }) => (
    <>
      {
        data.visible ?
          <ContainerRow
            justifyContent={'space-between'}
            paddingBottom={'10px'}
          >
            <Title right={'5px'} font={'16px'}>{data.title}</Title>
            <Combobox
              label={data.selected[0].label}
              onSubmit={selectedPiece}
              info={data}
            />
          </ContainerRow> : null
      }
    </>
  );

  return (
    <>
      <Container
        paddingTop={'10px'}
        paddingLeft={'10px'}
        paddingRight={'10px'}
        paddingBottom={'10px'}
        alignItems={'center'}
        backgroundColor={Colors.primary}>
        <OptionsModal
          setModalPickerVisible={setModalPickerVisible}
          changeAvatar={changeAvatar}
          visible={modalPickerVisible}
          info={pieceBlock}
          level={profile.data.LEVEL}
        />
        <Avatar
          style={styles.avatar}
          size={width / 2}
          topType={pieceOptions[0].selected[0].idv}
          hairColor={pieceOptions[1].selected[0].idv}
          hatColor={pieceOptions[2].selected[0].idv}
          facialHairType={pieceOptions[3].selected[0].idv}
          facialHairColor={pieceOptions[4].selected[0].idv}
          accessoriesType={pieceOptions[5].selected[0].idv}
          clotheType={pieceOptions[6].selected[0].idv}
          clotheColor={pieceOptions[7].selected[0].idv}
          graphicType={pieceOptions[8].selected[0].idv}
          eyeType={pieceOptions[9].selected[0].idv}
          eyebrowType={pieceOptions[10].selected[0].idv}
          mouthType={pieceOptions[11].selected[0].idv}
          skinColor={pieceOptions[12].selected[0].idv}
        />
        <Container marginTop={'10px'}>
          <FlatList
            data={pieceOptions}
            indicatorStyle={Colors.white}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <RenderOptions data={item} />}
          />
        </Container>
        <Btn label='SALVAR'
          padding={'10px'}
          bottom={'10px'}
          onSubmit={saveAvatar}
        />
      </Container>
      { loading || avatar.loading ? <Loading /> : null}
    </>
  )
}

CreateAvatar.navigationOptions = ({ navigation }) => {
  const options = HeaderSubScreen('ALTERAR AVATAR');
  return options;
}

const mapStateToProps = state => ({
  avatar: state.avatar,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getAvatar: () => dispatch(AvatarActions.setAvatInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAvatar);