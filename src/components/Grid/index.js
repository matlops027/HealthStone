import React from 'react';
import { FlatList } from 'react-native';
import { GridBox } from '../../styles';
import Empty from '../Empty';

const Grid = ({info, columns, fn, contentRender, type, sizeW, sizeH}) => {


    const formatData = (data, numColumns) => {
        if (type == 'table') {
            const numberOfFullRows = Math.floor(data.length / numColumns);
    
            let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
            while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
                data.push({ empty: true });
                numberOfElementsLastRow++;
            }
        }

        return data;
    };

    const RenderGrid = ({ content }) => (
        <GridBox
            sizeW={sizeW}
            sizeH={sizeH}
            style={[
            content.state ?
                { backgroundColor: 'green' }
                : null
        ]}
            onPress={() => {
                type == 'table' ? 
                    changeStateContent(content) :
                    changeStateContentFilter(content)
            }}>
            {contentRender(content)}
        </GridBox>
    );

    const changeStateContent = (content) => {
        if (!content.empty) {
            fn(
                info.map(data => {
                    if (data.IMAGE == content.IMAGE) {
                        data.state = !(data.state)
                    }
                    return data
                })
            )
        }
    };

    const changeStateContentFilter = (content) => {
        fn(
            info.map(data => {
                if (data.id == content.id) {
                    data.state = !(data.state)
                }
                return data
            })
        )
    };

    return (
        <FlatList
            data={formatData(info, columns)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Empty width={25} height={25} label={'Nenhum item foi encontrado!'} />}
            renderItem={({ item }) => <RenderGrid content={item} />}
            numColumns={columns}
        />
    )
}

export default Grid;