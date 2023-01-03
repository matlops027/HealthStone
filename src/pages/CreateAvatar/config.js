import { optionsAvatar } from './../../utils';

export const selectedOptions = (avatar) => {
  return [
    { id: 'TOPTYPE', title: 'Superior', selected: optionsAvatar.TOPTYPE.filter(value => { return value.idv == avatar.data.TOPTYPE }), visible: true, value: optionsAvatar.TOPTYPE },
    { id: 'HAIRCOLO', title: 'Cor do cabelo', selected: optionsAvatar.HAIRCOLO.filter(value => { return value.idv == avatar.data.HAIRCOLO }), visible: true, value: optionsAvatar.HAIRCOLO },
    { id: 'HATCOLO', title: 'Cor do chapéu', selected: optionsAvatar.HATCOLO.filter(value => { return value.idv == avatar.data.HATCOLO }), visible: true, value: optionsAvatar.HATCOLO },
    { id: 'FACHAITY', title: 'Barba', selected: optionsAvatar.FACHAITY.filter(value => { return value.idv == avatar.data.FACHAITY }), visible: true, value: optionsAvatar.FACHAITY },
    { id: 'FACHAICO', title: 'Cor barba', selected: optionsAvatar.FACHAICO.filter(value => { return value.idv == avatar.data.FACHAICO }), visible: true, value: optionsAvatar.FACHAICO },
    { id: 'ACCETYPE', title: 'Óculos', selected: optionsAvatar.ACCETYPE.filter(value => { return value.idv == avatar.data.ACCETYPE }), visible: true, value: optionsAvatar.ACCETYPE },
    { id: 'CLOTTYPE', title: 'Roupas', selected: optionsAvatar.CLOTTYPE.filter(value => { return value.idv == avatar.data.CLOTTYPE }), visible: true, value: optionsAvatar.CLOTTYPE },
    { id: 'CLOTCOLO', title: 'Cor roupa', selected: optionsAvatar.CLOTCOLO.filter(value => { return value.idv == avatar.data.CLOTCOLO }), visible: true, value: optionsAvatar.CLOTCOLO },
    { id: 'GRAPTYPE', title: 'Estampa', selected: optionsAvatar.GRAPTYPE.filter(value => { return value.idv == avatar.data.GRAPTYPE }), visible: true, value: optionsAvatar.GRAPTYPE },
    { id: 'EYETYPE', title: 'Olhos', selected: optionsAvatar.EYETYPE.filter(value => { return value.idv == avatar.data.EYETYPE }), visible: true, value: optionsAvatar.EYETYPE },
    { id: 'EYEBTYPE', title: 'Sombrancelhas', selected: optionsAvatar.EYEBTYPE.filter(value => { return value.idv == avatar.data.EYEBTYPE }), visible: true, value: optionsAvatar.EYEBTYPE },
    { id: 'MOUNTYPE', title: 'Boca', selected: optionsAvatar.MOUNTYPE.filter(value => { return value.idv == avatar.data.MOUNTYPE }), visible: true, value: optionsAvatar.MOUNTYPE },
    { id: 'SKINCOLO', title: 'Pele', selected: optionsAvatar.SKINCOLO.filter(value => { return value.idv == avatar.data.SKINCOLO }), visible: true, value: optionsAvatar.SKINCOLO }
  ]
}

export const objPieceBlock = { id: '', title: '', value: [], selected: '', visible: true };