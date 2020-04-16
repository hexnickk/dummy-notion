import { listsDomain } from './lists.domain';

type AddListModel = void;
export const addList = listsDomain.createEvent<AddListModel>('Add list');
