import * as React from 'react';
import './headerbreadcrumb.css';
/** interface describing page object for use in breadcrumbs */
interface Page {
  url?: string;
  label: string;
}
/** interface for breadcrumb items */
export interface BreadCrumbProps {
  currentPage: Page;
  pages: Page[];
}
/** Configurable Breadcrumbs Component */
declare class HeaderBreadcrumb extends React.Component<BreadCrumbProps, {}> {
  constructor(props: BreadCrumbProps);
  public render(): JSX.Element;
}
export default HeaderBreadcrumb;
