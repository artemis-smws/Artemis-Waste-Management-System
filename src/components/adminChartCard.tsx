import * as React from 'react';
import { Component } from 'react';

interface Props {
    header : string,
    children : any,
    width ?: any,
    maxHeight ?: any
}

export default function AdminChartCard ({maxHeight, header , children, width} : Props) {
    const style : React.CSSProperties = {
        minHeight : '350px',
        width : `${width}`,
        maxHeight : '360px',
    }
    const bootstrap_class = "d-flex flex-column border border-2 rounded"
    const header_class = "border-bottom border-3 px-2 py-2 bg-red"
    const body_class = "h-100 w-100 d-flex flex-row justify-content-center"


    return(<div className={bootstrap_class} style={style}>
        <header className={header_class}>
            <h5 className='m-0'>{header}</h5>
        </header>
        <body style={{overflow : 'hidden'}}  className={body_class}>
            {children}
        </body>
    </div>);
}