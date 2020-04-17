import { pagesDomain } from './pages.domain';

type AddPageModel = void;
export const addPage = pagesDomain.createEvent<AddPageModel>('Add page');
