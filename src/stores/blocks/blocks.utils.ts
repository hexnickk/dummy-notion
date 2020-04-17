import { Block, BlockDTO, Blocks, BlocksDTO } from './blocks.model';

export const mapBlock = (block: Block): BlockDTO => ({
    ...block,
    createdAt: Number(block.createdAt),
    updatedAt: Number(block.updatedAt),
});
export const mapBlocks = (blocks: Blocks): BlocksDTO => blocks.map(mapBlock);

export const mapBlockDTO = (blockDTO: BlockDTO): Block => ({
    ...blockDTO,
    createdAt: new Date(blockDTO.createdAt),
    updatedAt: new Date(blockDTO.updatedAt),
});
export const mapBlocksDTO = (blocksDTO: BlocksDTO): Blocks =>
    blocksDTO.map(mapBlockDTO);
