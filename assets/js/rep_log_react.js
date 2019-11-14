import React from 'react';
import {render} from 'react-dom';
import RepLogApp from './RepLog/RepLogApp';

const shouldShowHeart = false;

console.log(...window.REP_LOG_APP_PROPS.itemOptions);

render(
    <RepLogApp
        withHeart={shouldShowHeart}
        {...window.REP_LOG_APP_PROPS}
    />,
    document.getElementById('lift-stuff-app')
);
