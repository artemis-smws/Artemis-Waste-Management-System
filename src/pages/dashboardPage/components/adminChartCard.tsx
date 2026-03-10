import * as React from 'react';

interface Props {
    header?: string;
    children: React.ReactNode;
    width?: string;
    maxHeight?: string;
    filterOptions?: React.ReactNode;
    height?: string;
}

export default function AdminChartCard({ maxHeight, header, children, width, filterOptions, height }: Props) {
    return (
        <div
            className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            style={{
                width: width ?? '100%',
                height: height,
                minHeight: '350px',
                maxHeight: maxHeight === undefined ? '350px' : maxHeight,
            }}
        >
            <header className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white shrink-0">
                <h5 className="m-0 text-base font-semibold text-[#171717] tracking-tight">{header}</h5>
                {filterOptions && (
                    <div className="flex items-center gap-2">{filterOptions}</div>
                )}
            </header>
            <div className="flex flex-row justify-center items-start h-full w-full p-4 overflow-hidden bg-white">
                {children}
            </div>
        </div>
    );
}