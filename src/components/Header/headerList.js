import React from 'react';

import { Content, Title } from '../../styles';


export default HeaderList = ({ label, font, padding }) => (
    <Content>
        <Title
            bottom={padding}
            left={padding}
            right={padding}
            top={padding}
            font={font}>{label}</Title>
    </Content>
)