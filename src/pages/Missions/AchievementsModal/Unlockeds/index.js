import React from 'react';
import {
    FlatList
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../../styles/colors';
import styles from '../../../../styles/styles';
import { Title } from '../../../../styles';

const Unlockeds = ({ achievements }) => {

    return (
        <>
            <Title
                font={'25px'}
                bottom={'10px'}>Desbloqueios</Title>
            <FlatList
                data={achievements}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <ListItem
                        title={item.label}
                        bottomDivider
                        containerStyle={{ backgroundColor: Colors.modalColor }}
                        titleStyle={styles.textInputCustom}
                        rightIcon={
                            <Icon name='unlock' color={Colors.white} size={25} />
                        }
                    />}
            />
        </>
    )
}

export default Unlockeds;