import { Dimensions } from "react-native";
export const { width, height } = Dimensions.get('window');

export const COUNT_SEQ = 5;

export const COUNT_DIF = 3;

export const ValidationStatusMission = (mission) => {
    const data = Object.assign({}, mission);
    const date = new Date();
    const day = formatDate(date, false);

    if (data.DAYS.includes((date.getDay()+1).toString())) {
        if (data.STATUS == 2 || data.STATUS == 4) {
            if (data.DTLASTAT != day) {
                mission.STATUS = 1;
            }
        }
    } else {
        mission.STATUS = 0;
    }

    return mission;

}

export const statusValidation = (params) => {
    let returnStatus;

    if (params.status == 1 && params.keepOrGiveUp == 1) {
        returnStatus = 2;
    } else if (params.status == 1 && params.keepOrGiveUp == 2) {
        returnStatus = 3;
    } else if (params.status == 2 && params.keepOrGiveUp == 1) {
        returnStatus = 4;
    } else if (params.status == 2 && params.keepOrGiveUp == 2) {
        returnStatus = 5;
    }

    return returnStatus;

}

export const buildUpdateProfileInfo = (params) => {
    //objeto para retornar o feedBack do usuario
    let objReturn = {};
    let objUpdateProf = {};
    let profileUpdate = Object.assign({}, params.profile);
    const missionInfo = Object.assign({}, params.mission);

    //CONCLUIU A MISSÃO
    if (params.status == 1) {

        //BONUS DE SEQUENCIA
        const multiplier = Math.floor((missionInfo.QUESTSEQ + 1) / COUNT_SEQ) + 1;

        profileUpdate.COIN += missionInfo.QUESCOIN * multiplier;
        profileUpdate.CURXP += (missionInfo.QUESXP) * multiplier;

        if (profileUpdate.CURXP >= profileUpdate.MAXXP) {
            profileUpdate.LEVEL += 1;
            profileUpdate.CURXP = 0 + (profileUpdate.CURXP - profileUpdate.MAXXP);
            profileUpdate.MAXHP += Math.ceil(profileUpdate.LEVEL * 0.5);
            profileUpdate.MAXXP = Math.ceil(100 + Math.pow((profileUpdate.LEVEL * 1.5), 2));
        }

        //Coloca o valor que está sendo incrementado em cada atributo em um objeto 
        //para usar como feedBack para o usuário na View de Missões
        objReturn.CURXP = '+ ' + (missionInfo.QUESXP);
        objReturn.COIN = '+ ' + missionInfo.QUESCOIN;
        objReturn.CURHP = (profileUpdate.CURHP + (profileUpdate.LEVEL * missionInfo.DIFFCULT)) > profileUpdate.MAXHP ?
            '+ ' + (profileUpdate.MAXHP - profileUpdate.CURHP) : '+ ' + (profileUpdate.LEVEL * missionInfo.DIFFCULT);
        objReturn.STATUS = 1;
        objReturn.BONUS = multiplier > 1 ? 'Bônus: x' + multiplier : '';
        objReturn.CURLEVEL = profileUpdate.LEVEL;
        objReturn.ACHIEV = profileUpdate.LEVEL > params.profile.LEVEL ? 'SUBIU PARA NIVEL ' + profileUpdate.LEVEL : '';
        //##################################################################################################

        profileUpdate.CURHP += (profileUpdate.CURHP + (profileUpdate.LEVEL * missionInfo.DIFFCULT)) > profileUpdate.MAXHP ?
            (profileUpdate.MAXHP - profileUpdate.CURHP) : (profileUpdate.LEVEL * missionInfo.DIFFCULT);

        objUpdateProf = {
            COIN: profileUpdate.COIN,
            CURXP: profileUpdate.CURXP,
            LEVEL: profileUpdate.LEVEL,
            MAXHP: profileUpdate.MAXHP,
            MAXXP: profileUpdate.MAXXP,
            CURHP: profileUpdate.CURHP
        }


    } else {//NÃO CONCLUIU A MISSÃO

        if (profileUpdate.COIN > 0) {
            profileUpdate.COIN -= 1;
            objReturn.COIN = '- ' + 1;
        }

        profileUpdate.CURHP -= Math.floor((profileUpdate.LEVEL * missionInfo.DIFFCULT) * 1.33);
        objReturn.CURHP = '- ' + Math.floor((profileUpdate.LEVEL * missionInfo.DIFFCULT) * 1.33);

        if (profileUpdate.CURHP <= 0) {
            objReturn.CURHP = '- ' + profileUpdate.CURHP;
            profileUpdate.CURHP = 0;
            objReturn.COIN = '- ' + profileUpdate.COIN;
            profileUpdate.COIN = 0;
        }

        objReturn.CURXP = '- ' + 0;
        objReturn.STATUS = 2;
        objReturn.BONUS = '';
        objReturn.CURLEVEL = 0;
        objReturn.ACHIEV = '';

        objUpdateProf = {
            COIN: profileUpdate.COIN,
            MAXHP: profileUpdate.MAXHP,
            CURHP: profileUpdate.CURHP
        }

    }

    return { objUpdateProf, objReturn };

}

export const formatDate = (date, hour = true) => {

    let stringHour = '';

    if (hour) {
        let hh = date.getHours().toString();
        hh = (hh.length < 2 ? '0' + hh : hh);

        let mm = date.getMinutes().toString();
        mm = (mm.length < 2 ? '0' + mm : mm);

        let ss = date.getSeconds().toString();
        ss = (ss.length < 2 ? '0' + ss : ss);

        stringHour = hh + mm + ss;
    }
    


    return date.toISOString().substr(0, 10).split('-').join('') + stringHour;

}

export const formatBDStringtoDate = (string) => {

    if (string.length == 14) {
        return string.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$3/$2/$1 $4:$5:$6')
    }

    return string.replace(/^(\d{4})(\d\d)(\d\d)$/, '$3/$2/$1')
}

export const resetSelectedGrid = (callback, items) => {
    callback(
        items.map(data => {
            data.state = false;
            return data
        })
    )
}

//Função que prepara objetos para serem atualizados no Banco
export const prepareObjToUpdate = (obj) => {
    let updates = ' ';
    for (const key in obj) {
        updates += `${key} = '${obj[key]}',`
    }

    return updates.substring(0, updates.length - 1);
}

export const prepareObjToInsert = (obj) => {
    let insert = {columns: '', values: ''};
    for (const key in obj){
        insert.columns += `${key},`
        insert.values += `'${obj[key]}',`
    }
    insert.columns = insert.columns.substring(0, insert.columns.length - 1);
    insert.values = insert.values.substring(0, insert.values.length - 1);

    return insert;
}

export const typesCategoryFoods = [{ id: 1, description: 'Cereais'},
                                   { id: 2, description: 'Verduras'},
                                   { id: 3, description: 'Frutas'},
                                   { id: 4, description: 'Gorduras'},
                                   { id: 5, description: 'Pescados'},
                                   { id: 6, description: 'Carnes'},
                                   { id: 7, description: 'Leite'},
                                   { id: 8, description: 'Bebidas'},
                                   { id: 9, description: 'Ovos'},
                                   { id: 10, description: 'Açucarados'},
                                   { id: 11, description: 'Miscelâneas'},
                                   { id: 12, description: 'Industrial'},
                                   { id: 13, description: 'Preparados'},
                                   { id: 14, description: 'Leguminosas'},
                                   { id: 15, description: 'Sementes'},
];
                                 
export const optionsAvatar = {
    TOPTYPE: [{ idv: 'NoHair', label: 'Careca', level: 1 }, { idv: 'Eyepatch', label: 'Tapa-olho', level: 2 }, { idv: 'Hat', label: 'Chapéu', level: 3 }, { idv: 'Hijab', label: 'Burca', level: 1 }, { idv: 'Turban', label: 'Turbante', level: 1 }, { idv: 'WinterHat1', label: 'Gorro', level: 1 }, { idv: 'WinterHat2', label: 'Gorro de Inverno', level: 6 }, { idv: 'WinterHat3', label: 'Toca', level: 1 }, { idv: 'WinterHat4', label: 'Toca gatinho', level: 12 }, { idv: 'LongHairBigHair', label: 'Cabelão', level: 1 }, { idv: 'LongHairBob', label: 'Chanel', level: 1 }, { idv: 'LongHairBun', label: 'Coque', level: 1 }, { idv: 'LongHairCurly', label: 'Encaracolado longo', level: 1 }, { idv: 'LongHairCurvy', label: 'Ondulado longo', level: 1 }, { idv: 'LongHairDreads', label: 'Dread longo', level: 1 }, { idv: 'LongHairFrida', label: 'Frida longo', level: 1 }, { idv: 'LongHairFro', label: 'Black Power', level: 1 }, { idv: 'LongHairFroBand', label: 'Tiara afro', level: 1 }, { idv: 'LongHairNotTooLong', label: 'Liso curto', level: 1 }, { idv: 'LongHairShavedSides', label: 'Raspado longo ', level: 1 }, { idv: 'LongHairMiaWallace', label: 'Conceitual longo ', level: 1 }, { idv: 'LongHairStraight', label: 'Liso de lado', level: 1 }, { idv: 'LongHairStraight2', label: 'Ondulado de lado', level: 1 }, { idv: 'LongHairStraightStrand', label: 'Para trás longo', level: 1 }, { idv: 'ShortHairDreads01', label: 'Dread curto', level: 1 }, { idv: 'ShortHairDreads02', label: 'Dread médio', level: 1 }, { idv: 'ShortHairFrizzle', label: 'Chavoso', level: 1 }, { idv: 'ShortHairShaggyMullet', label: 'Despojado', level: 1 }, { idv: 'ShortHairShortCurly', label: 'Enrolado curto', level: 1 }, { idv: 'ShortHairShortFlat', label: 'Plano', level: 1 }, { idv: 'ShortHairShortRound', label: 'Curvo curto', level: 1 }, { idv: 'ShortHairShortWaved', label: 'Ondulado curto', level: 1 }, { idv: 'ShortHairSides', label: 'Lateral', level: 1 }, { idv: 'ShortHairTheCaesar', label: 'Cesariano', level: 1 }, { idv: 'ShortHairTheCaesarSidePart', label: 'Cesariano cortado', level: 1 }],
    HAIRCOLO: [{ idv: 'Auburn', label: 'Castanho-avermelhado', level: 1 }, { idv: 'Black', label: 'Preto', level: 1 }, { idv: 'Blonde', label: 'Loiro', level: 1 }, { idv: 'BlondeGolden', label: 'Loiro dourado', level: 1 }, { idv: 'Brown', label: 'Castanho', level: 1 }, { idv: 'BrownDark', label: 'Castanho-escuro', level: 1 }, { idv: 'PastelPink', label: 'PastelPink', level: 1 }, { idv: 'Platinum', label: 'Platina', level: 1 }, { idv: 'Red', label: 'Ruivo', level: 1 }, { idv: 'SilverGray', label: 'Cinza-prata', level: 1 }],
    HATCOLO: [{ idv: 'Black', label: 'Preto', level: 1 }, { idv: 'Blue01', label: 'Azul-claro', level: 1 }, { idv: 'Blue02', label: 'Azul-lago', level: 4 }, { idv: 'Blue03', label: 'Azul-escuro', level: 1 }, { idv: 'Gray01', label: 'Cinza-claro', level: 1 }, { idv: 'Gray02', label: 'Cinza-escuro', level: 1 }, { idv: 'Heather', label: 'Urze', level: 1 }, { idv: 'PastelBlue', label: 'Azul-pastel', level: 11 }, { idv: 'PastelGreen', label: 'Verde-pastel', level: 11 }, { idv: 'PastelOrange', label: 'Laranja-pastel', level: 11 }, { idv: 'PastelRed', label: 'Vermelho-pastel', level: 11 }, { idv: 'PastelYellow', label: 'Amarelo-pastel', level: 11 }, { idv: 'Pink', label: 'Rosa', level: 1 }, { idv: 'Red', label: 'Vermelho', level: 1 }, { idv: 'White', label: 'Branco', level: 1 }],
    FACHAITY: [{ idv: 'Blank', label: 'Sem barba', level: 1 }, { idv: 'BeardMedium', label: 'Media', level: 1 }, { idv: 'BeardLight', label: 'Curta', level: 1 }, { idv: 'MoustacheFancy', label: 'Bigode longo', level: 1 }, { idv: 'MoustacheMagnum', label: 'Bigode curto', level: 1 }],
    FACHAICO: [{ idv: 'Auburn', label: 'Castanho-avermelhado', level: 1 }, { idv: 'Black', label: 'Preto', level: 1 }, { idv: 'Blonde', label: 'Loiro', level: 1 }, { idv: 'BlondeGolden', label: 'Loiro dourado', level: 1 }, { idv: 'Brown', label: 'Castanho', level: 1 }, { idv: 'BrownDark', label: 'Castanho-escuro', level: 1 }, { idv: 'Platinum', label: 'Platina', level: 1 }, { idv: 'Red', label: 'Ruivo', level: 1 }],
    ACCETYPE: [{ idv: 'Blank', label: 'Nenhum', level: 1 }, { idv: 'Kurt', label: 'Kurt Cobain', level: 23 }, { idv: 'Prescription01', label: 'Tradicional branco', level: 1 }, { idv: 'Prescription02', label: 'Tradicional preto', level: 1 }, { idv: 'Round', label: 'Redondo', level: 1 }, { idv: 'Sunglasses', label: 'De sol', level: 10 }, { idv: 'Wayfarers', label: 'Ray-ban', level: 14 }],
    CLOTTYPE: [{ idv: 'BlazerShirt', label: 'Blazer camisa', level: 1 }, { idv: 'BlazerSweater', label: 'Blazer sweater', level: 1 }, { idv: 'CollarSweater', label: 'Sweater colarinho', level: 1 }, { idv: 'GraphicShirt', label: 'Estampada', level: 15 }, { idv: 'Hoodie', label: 'Capuz', level: 5 }, { idv: 'Overall', label: 'Macacão', level: 8 }, { idv: 'ShirtCrewNeck', label: 'Camiseta gola comum', level: 1 }, { idv: 'ShirtScoopNeck', label: 'Camiseta gola aberta', level: 1 }, { idv: 'ShirtVNeck', label: 'Camiseta gola V', level: 1 }],
    CLOTCOLO: [{ idv: 'Black', label: 'Preto', level: 1 }, { idv: 'Blue01', label: 'Azul-claro', level: 1 }, { idv: 'Blue02', label: 'Azul-lago', level: 4 }, { idv: 'Blue03', label: 'Azul-escuro', level: 1 }, { idv: 'Gray01', label: 'Cinza-claro', level: 1 }, { idv: 'Gray02', label: 'Cinza-escuro', level: 1 }, { idv: 'Heather', label: 'Urze', level: 1 }, { idv: 'PastelBlue', label: 'Azul-pastel', level: 11 }, { idv: 'PastelGreen', label: 'Verde-pastel', level: 11 }, { idv: 'PastelOrange', label: 'Laranja-pastel', level: 11 }, { idv: 'PastelRed', label: 'Vermelho-pastel', level: 11 }, { idv: 'PastelYellow', label: 'Amarelo-pastel', level: 11 }, { idv: 'Pink', label: 'Rosa', level: 1 }, { idv: 'Red', label: 'Vermelho', level: 1 }, { idv: 'White', label: 'Branco', level: 1 }],
    GRAPTYPE: [{ idv: 'Bat', label: 'Morcego', level: 30 }, { idv: 'Cumbia', label: 'Cumbia', level: 1 }, { idv: 'Deer', label: 'Veado', level: 1 }, { idv: 'Diamond', label: 'Diamante', level: 1 }, { idv: 'Hola', label: 'Alô', level: 1 }, { idv: 'Pizza', label: 'Pizza', level: 20 }, { idv: 'Resist', label: 'Resist', level: 1 }, { idv: 'Selena', label: 'Selena', level: 1 }, { idv: 'Bear', label: 'Urso', level: 1 }, { idv: 'SkullOutline', label: 'Caveira bordas', level: 25 }, { idv: 'Skull', label: 'Caveira', level: 25 }],
    EYETYPE: [{ idv: 'Close', label: 'Fechado', level: 1 }, { idv: 'Cry', label: 'Choro', level: 1 }, { idv: 'Default', label: 'Padrão', level: 1 }, { idv: 'Dizzy', label: 'Tonto', level: 7 }, { idv: 'EyeRoll', label: 'Esbugalhado', level: 1 }, { idv: 'Happy', label: 'Feliz', level: 1 }, { idv: 'Hearts', label: 'Corações', level: 18 }, { idv: 'Side', label: 'De lado', level: 1 }, { idv: 'Squint', label: 'Soslaio', level: 1 }, { idv: 'Surprised', label: 'Surpreso', level: 1 }, { idv: 'Wink', label: 'Piscadela', level: 1 }, { idv: 'WinkWacky', label: 'Piscadela esbugalhada', level: 1 }],
    EYEBTYPE: [{ idv: 'Angry', label: 'Nervoso', level: 1 }, { idv: 'AngryNatural', label: 'Nervoso natural', level: 1 }, { idv: 'Default', label: 'Padrão', level: 1 }, { idv: 'DefaultNatural', label: 'Padrão natural', level: 1 }, { idv: 'FlatNatural', label: 'Plano natural', level: 1 }, { idv: 'RaisedExcited', label: 'Levantada animada', level: 1 }, { idv: 'RaisedExcitedNatural', label: 'Levantada animada natural', level: 1 }, { idv: 'SadConcerned', label: 'Preocupado', level: 1 }, { idv: 'SadConcernedNatural', label: 'Preocupado natural', level: 1 }, { idv: 'UnibrowNatural', label: 'Monocelha', level: 1 }, { idv: 'UpDown', label: 'Franzir o cenho', level: 9 }, { idv: 'UpDownNatural', label: 'Franzir o cenho natural', level: 1 }],
    MOUNTYPE: [{ idv: 'Concerned', label: 'Preocupado', level: 1 }, { idv: 'Default', label: 'Padrão', level: 1 }, { idv: 'Disbelief', label: 'Incrédulo', level: 1 }, { idv: 'Eating', label: 'Comendo', level: 21 }, { idv: 'Grimace', label: 'Careta', level: 1 }, { idv: 'Sad', label: 'Triste', level: 1 }, { idv: 'ScreamOpen', label: 'Boquiaberto', level: 13 }, { idv: 'Serious', label: 'Sério', level: 1 }, { idv: 'Smile', label: 'Sorriso', level: 1 }, { idv: 'Tongue', label: 'Mostrando língua', level: 16 }, { idv: 'Twinkle', label: 'Sorrizinho', level: 1 }],
    SKINCOLO: [{ idv: 'Tanned', label: 'Bronzeado', level: 1 }, { idv: 'Yellow', label: 'Amarelo', level: 1 }, { idv: 'Pale', label: 'Pálido', level: 1 }, { idv: 'Light', label: 'Branco', level: 1 }, { idv: 'Brown', label: 'Pardo', level: 1 }, { idv: 'DarkBrown', label: 'Moreno', level: 1 }, { idv: 'Black', label: 'Negro', level: 1 }]
};

export const objUnits = [
    { name: 'Gramas', value: 'g' },
    { name: 'Miligramas', value: 'mg' },
    { name: 'Quilogramas', value: 'kg' }
];

