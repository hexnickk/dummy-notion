/* eslint @typescript-eslint/no-use-before-define: 'off' */
import { Block, BlockDTO, Blocks, BlocksDTO } from '~src/stores/blocks';

export const mapBlock = (block: Block): BlockDTO => ({
    ...block,
    children: mapBlocks(block.children),
    createdAt: Number(block.createdAt),
    updatedAt: Number(block.updatedAt),
});
export const mapBlocks = (blocks: Blocks): BlocksDTO => blocks.map(mapBlock);

export const mapBlockDTO = (blockDTO: BlockDTO): Block => ({
    ...blockDTO,
    children: mapBlocksDTO(blockDTO.children),
    createdAt: new Date(blockDTO.createdAt),
    updatedAt: new Date(blockDTO.updatedAt),
});
export const mapBlocksDTO = (blocksDTO: BlocksDTO): Blocks =>
    blocksDTO.map(mapBlockDTO);
