/// <reference types="react" />
/** The default custom pagination component for drillDown v7  */
import { Dictionary } from '@onaio/utils';
import { DrillDownInstanceProps } from '../TableJSX';
import './pagination.css';
/** interface describes props for Reveal Custom Pagination */
export interface PaginationProps<T extends object> extends DrillDownInstanceProps<T> {
    pageSizeCategories: number[] /** an array of page size options */;
    nextText: string;
    rowsToDisplayText: string;
    pageText: string;
    ofText: string;
    previousText: string;
}
/** Reveal pagination component */
declare function RevealPagination<T extends object = Dictionary>(props: PaginationProps<T>): JSX.Element;
declare namespace RevealPagination {
    var defaultProps: {
        nextText: string;
        ofText: string;
        pageSizeCategories: number[];
        pageText: string;
        previousText: string;
        rowsToDisplayText: string;
    };
}
export { RevealPagination };
/** default function that can be used as a render prop. to use a custom pagination
 * component, create a custom renderProp like this and return your custom pagination from within
 * @param {DrillDownInstanceProps<t>} props - the React table instance containing applied hooks.
 */
export declare const renderPaginationFun: <T extends object>(props: DrillDownInstanceProps<T>) => JSX.Element;
