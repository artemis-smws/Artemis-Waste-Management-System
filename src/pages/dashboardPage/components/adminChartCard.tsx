import * as React from 'react';
import { Component } from 'react';

interface Props {
    header ?: string,
    children : any,
    width ?: string,
    maxHeight ?: string,
    filterOptions ?: any
    height ?: string
}

export default function AdminChartCard ({maxHeight, header , children, width, filterOptions, height} : Props) {
    const style : React.CSSProperties = {
        minHeight : '350px',
        width : `${width}`,
        height : `${height}`,
        maxHeight : `${(maxHeight == undefined) ? '350px' : maxHeight}`,
    }
    const bootstrap_class = "d-flex flex-column border border-2 rounded"
    const header_class = "bg-light d-flex align-items-center justify-content-between rounded-top border-bottom border-1 px-3 py-3"
    const body_class = "border rounded-bottom border-0 h-100 w-100 d-flex flex-row justify-content-center"


    return(<div className={bootstrap_class} style={style}>
        <header className={header_class}>
            <h5 className='m-0'>{header}</h5>
            {filterOptions}
        </header>
        <div style={{overflow : 'hidden'}}  className={body_class}>
            {children}
        </div>
    </div>);
}