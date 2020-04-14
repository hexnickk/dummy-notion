import { List, ListDTO, Lists, ListsDTO } from './lists.model';
export const mapList = (list: List): ListDTO => list;
export const mapLists = (lists: Lists): ListsDTO => lists.map(mapList);
export const mapListDTO = (listDTO: ListDTO): List => listDTO;
export const mapListsDTO = (listsDTO: ListsDTO): Lists =>
    listsDTO.map(mapListDTO);
