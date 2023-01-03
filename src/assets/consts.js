export const LOGO = require('./images/logo.png');
export const STONE = require('./images/Healthstone.png');
export const EMPTY = require('./images/itens_magicos.png');
export const REWARDS = require('./images/mestre_loja.png');
export const MISSION = require('./images/mestre_criacao.png');
export const VIEW = require('./images/mestre_detalhe.png');

export const RewardPath = (path) => {
    const objImgRewards = {
        Chicken: require('./images/rewards/Chicken.png'),
        Chocolate: require('./images/rewards/Chocolate.png'),
        Coffee: require('./images/rewards/Coffee.png'),
        Egg: require('./images/rewards/Egg.png'),
        Meal: require('./images/rewards/Meal.png'),
        Soda: require('./images/rewards/Soda.png')
    }
    return objImgRewards[path];
}