import { Page, PageDTO, Pages, PagesDTO } from './pages.model';
export const mapPage = (page: Page): PageDTO => page;
export const mapPages = (pages: Pages): PagesDTO => pages.map(mapPage);
export const mapPageDTO = (pageDTO: PageDTO): Page => pageDTO;
export const mapPagesDTO = (pagesDTO: PagesDTO): Pages =>
    pagesDTO.map(mapPageDTO);
