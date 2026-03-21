import * as React from 'react';

interface Props {
    header?: string;
    children: React.ReactNode;
    width?: string;
    maxHeight?: string;
    filterOptions?: React.ReactNode;
    height?: string;
    minHeight?: string;
}

export default function AdminChartCard({ maxHeight, header, children, width, filterOptions, height, minHeight }: Props) {
    return (
        <div
            className="flex flex-col bg-white border border-transparent rounded-[24px] shadow-[0px_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0px_8px_32px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden w-full h-full"
            style={{
                width: width ?? '100%',
                height: height,
                minHeight: minHeight ?? (height === '100%' ? '100%' : (height ? height : '350px')),
                maxHeight: maxHeight === undefined ? '350px' : maxHeight,
            }}
        >
            {header || filterOptions ? (
                <header className="flex items-center justify-between px-6 pt-5 pb-1 bg-white shrink-0">
                    <h5 className="m-0 text-lg font-bold text-gray-900 tracking-tight">{header}</h5>
                    {filterOptions && (
                        <div className="flex items-center gap-2">{filterOptions}</div>
                    )}
                </header>
            ) : null}
            <div className="flex flex-row justify-center items-start h-full w-full px-5 pb-5 pt-3 overflow-hidden bg-white">
                {children}
            </div>
        </div>
    );
}