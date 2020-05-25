import * as React from "react";
import "./JsonToTable.css";
export interface IJsonToTableProps {
    id?: string;
    json: any;
    styles?: any;
}
export default class JsonToTable extends React.Component<IJsonToTableProps, {}> {
    constructor(props: any, context: any);
    render(): JSX.Element;
    private renderObject;
    private renderCell;
    private renderHeader;
    private renderValues;
    private renderRowValues;
    private parseArray;
    private renderRow;
    private renderRowHeader;
    private renderRows;
}
