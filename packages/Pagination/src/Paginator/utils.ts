/** makes sure any received page number is within 1 through to totalPages
 * @param pageNumber - the selected page number
 * @param allPages -  the total number of pages
 */
export const sanitizeNumber = (pageNumber: number, allPages: number): number =>
  Math.min(Math.max(1, pageNumber), allPages);
