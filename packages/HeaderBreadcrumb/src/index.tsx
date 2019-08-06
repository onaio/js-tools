import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
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
class HeaderBreadcrumb extends React.Component<BreadCrumbProps, {}> {
  constructor(props: BreadCrumbProps) {
    super(props);
  }

  public render() {
    const { currentPage, pages } = this.props;

    const linkList = pages.map((page, key) => {
      // render breadcrumb items with urls as links or without urls as text nodes
      let breadCrumbItem: string | JSX.Element;
      if (page.url && page.url.trim()) {
        breadCrumbItem = (
          <Link to={page.url!} key={key}>
            {page.label}
          </Link>
        );
      } else {
        breadCrumbItem = page.label;
      }
      return <BreadcrumbItem key={key}>{breadCrumbItem}</BreadcrumbItem>;
    });

    return (
      <div>
        <Breadcrumb className="reveal-breadcrumb">
          {linkList}
          <BreadcrumbItem active={true}>{currentPage.label}</BreadcrumbItem>
        </Breadcrumb>
      </div>
    );
  }
}

export default HeaderBreadcrumb;
