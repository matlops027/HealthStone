//Navigation
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

//Components
import SideBar from './components/SideBar';

//Colors
import Colors from './styles/colors';

// Pages
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Missions from './pages/Missions';
import History from './pages/History';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import CreateAvatar from './pages/CreateAvatar';
import CreateMission from './pages/CreateMission';
import Statistic from './pages/Statistic';
import Foods from './pages/Foods';
import CreateFood from './pages/CreateFood';

const SplashStackNavigator = createStackNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            headerShown: false
        }
    }
});

const AuthStackNavigator = createStackNavigator({
    Login,
    Signin
}, {});

const MissionsStackNavigator = createStackNavigator({
    Missions,
    CreateMission
}, {});

const ProfileStackNavigator = createStackNavigator({
    Profile,
    CreateAvatar
}, {});

const RewardsStackNavigator = createStackNavigator({
    Rewards
}, {});

const HistoryStackNavigator = createStackNavigator({
    History,
    CreateMission
}, {});

const StatisticStackNavigator = createStackNavigator({
    Statistic
}, {});

const FoodsStackNavigator = createStackNavigator({
    Foods,
    CreateFood
}, {});

const AppSideBarNavigator = createDrawerNavigator(
    {
        missoes: MissionsStackNavigator,
        perfil: ProfileStackNavigator,
        loja: RewardsStackNavigator,
        historico: HistoryStackNavigator,
        estatistica: StatisticStackNavigator,
        alimentos: FoodsStackNavigator
    },
    {
        initialRouteName: 'missoes',
        contentComponent: SideBar,
        contentOptions: {
            activeTintColor: Colors.third,
            inactiveTintColor: Colors.white
        }
    }
);

export default AppContainer = createAppContainer(
    createSwitchNavigator({
        Splash: SplashStackNavigator,
        Auth: AuthStackNavigator,
        App: AppSideBarNavigator
    })
)