import * as React from "react";
import { render } from "react-dom";

import s from './style.module.scss';

import engine from './vlv_eng.jpg'

type Props = {
    children: React.ReactNode;
}

const Button: React.FC<Props> = ({ children }) => {
    return <div>{children}</div>
}

render(<div className={s.text}>Test react APP
    <div className={s.pict}>
        <Button>BUTTON</Button>
        <img src={engine} alt='eng' />
    </div>
</div>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}