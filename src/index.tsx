import * as React from "react";
import { render } from "react-dom";
import 'regenerator-runtime'

import s from './style.module.scss';

import engine from 'assets/pics/vlv_eng.jpg'
import Button from 'components/Button'

render(<div className={s.text}>Test react APP
    <div className={s.pict}>
        <img src={engine} alt='eng' />
        <Button></Button>
    </div>
</div>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}