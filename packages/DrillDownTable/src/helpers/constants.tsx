/** Constants */
import React from 'react';

export const ID = 'id';
export type ID = typeof ID;

export const PARENT_ID = 'parent_id';
export type PARENT_ID = typeof PARENT_ID;

export const ROOT_PARENT_ID = null;
export type ROOT_PARENT_ID = typeof ROOT_PARENT_ID;

export const LINKER_ITEM_CSS_CLASS = 'dd-linker-item';
export type LINKER_ITEM_CSS_CLASS = typeof LINKER_ITEM_CSS_CLASS;

export const CLICKABLE_CSS_CLASS = 'dd-linker-item dd-clickable';
export type CLICKABLE_CSS_CLASS = typeof CLICKABLE_CSS_CLASS;

export const CARET_CSS_CLASS = 'dd-caret';
export type CARET_CSS_CLASS = typeof CARET_CSS_CLASS;

export const CARET_SPAN = <span className={CARET_CSS_CLASS}>&nbsp;&#9660;</span>;
export type CARET_SPAN = typeof CARET_SPAN;

export const DEFAULT_ROW_HEIGHT = '1.5em';
export type DEFAULT_ROW_HEIGHT = typeof DEFAULT_ROW_HEIGHT;

export const NO_DATA_FOUND = 'No Data Found';
export type NO_DATA_FOUND = typeof NO_DATA_FOUND;

export const NEXT = 'Next';
export type NEXT = typeof NEXT;

export const OF = 'Of';
export type OF = typeof OF;

export const PAGE = 'Page';
export type PAGE = typeof PAGE;

export const PREVIOUS = 'Previous';
export type PREVIOUS = typeof PREVIOUS;

export const ROWS_TO_DISPLAY = 'Rows to display';
export type ROWS_TO_DISPLAY = typeof ROWS_TO_DISPLAY;

export const LOADING = 'Loading';
export type LOADING = typeof LOADING;

export const PAGE_SIZE_CATEGORIES = [10, 20, 30, 50];
export type PAGE_SIZE_CATEGORIES = typeof PAGE_SIZE_CATEGORIES;
