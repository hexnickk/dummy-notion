import { Block, BlockDTO, Blocks, BlocksDTO } from '~src/stores/blocks';

export const mapAbstractBlock = (baseBlock: Block): BlockDTO => ({
    ...baseBlock,
    createdAt: Number(baseBlock.createdAt),
    updatedAt: Number(baseBlock.updatedAt),
});
export const mapBlocks = (blocks: Blocks): BlocksDTO =>
    blocks.map(mapAbstractBlock);

export const mapAbstractBlockDTO = (blockDTO: BlockDTO): Block => ({
    ...blockDTO,
    createdAt: new Date(blockDTO.createdAt),
    updatedAt: new Date(blockDTO.updatedAt),
});
export const mapBlocksDTO = (blocksDTO: BlocksDTO): Blocks =>
    blocksDTO.map(mapAbstractBlockDTO);
