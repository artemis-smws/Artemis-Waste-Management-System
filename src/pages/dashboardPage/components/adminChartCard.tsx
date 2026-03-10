import * as React from 'react';

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
    const bootstrap_class = "flex flex-col border border-gray-200 rounded-lg shadow-sm bg-white"
    const header_class = "bg-gray-50 flex items-center justify-between rounded-t-lg border-b border-gray-200 px-4 py-3"
    const body_class = "rounded-b-lg h-full w-full flex flex-row justify-center p-4 bg-white"


    return(<div className={bootstrap_class} style={style}>
        <header className={header_class}>
            <h5 className='m-0 font-semibold text-lg'>{header}</h5>
            {filterOptions}
        </header>
        <div style={{overflow : 'hidden'}}  className={body_class}>
            {children}
        </div>
    </div>);
}