import {
    Block,
    BlockDTO,
    Blocks,
    BlocksDTO,
    BlocksState,
} from './blocks.model';
import { nanoid } from 'nanoid';

// Mappers

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

// Factories

export const textBlockFactory = () => ({
    id: nanoid(),
    type: 'text' as 'text',
    title: '',
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const checkboxBlockFactory = () => ({
    id: nanoid(),
    type: 'checkbox' as 'checkbox',
    checked: false,
    title: '',
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});

// State manipulations

export const _updateStateBlock = (state: BlocksState, target: Block) =>
    state.map((block) => (block.id === target.id ? target : block));

export const _pushStateBlock = ({
    state,
    target,
}: {
    state: BlocksState;
    target: Block;
}) => [...state, target];

export const _deleteStateBlock = ({
    state,
    target,
}: {
    state: BlocksState;
    target: Block;
}) => state.filter((block) => block.id !== target.id);

// Children manipulations

export const _deleteBlockChild = (parent: Block, target: Block) => {
    return {
        ...parent,
        children: parent.children.filter((child) => child !== target.id),
    };
};

export const _pushBlockChild = ({
    target,
    parent,
}: {
    parent: Block;
    target: Block;
}) => {
    return {
        ...parent,
        children: [...parent.children, target.id],
    };
};

export const _insertBlockChild = ({
    parent,
    target,
    position,
}: {
    parent: Block;
    target: Block;
    position: number;
}) => {
    return {
        ...parent,
        children: parent.children.reduce(
            (acc, curr, index) =>
                index === position ? [...acc, curr, target.id] : [...acc, curr],
            []
        ),
    };
};

// Other utils

export const _pushBlock = ({
    state,
    parent,
    target,
}: {
    state: BlocksState;
    parent: Block;
    target: Block;
}) => {
    const updatedState = _pushStateBlock({ state, target });
    const updatedParent = _pushBlockChild({ parent, target });
    return _updateStateBlock(updatedState, updatedParent);
};

export const _insertBlock = ({
    state,
    parent,
    target,
    position,
}: {
    state: BlocksState;
    target: Block;
    parent: Block;
    position: number;
}) => {
    const updatedState = _pushStateBlock({ state, target });
    const updatedParent = _insertBlockChild({ parent, target, position });
    return _updateStateBlock(updatedState, updatedParent);
};

export const _deleteBlock = ({
    state,
    parent,
    target,
}: {
    state: BlocksState;
    parent: Block;
    target: Block;
}) => {
    const updatedState = _deleteStateBlock({
        state,
        target,
    });
    const updatedParent = _deleteBlockChild(parent, target);
    return _updateStateBlock(updatedState, updatedParent);
};

export const _convertBlockTo = ({
    state,
    parent,
    target,
    type,
}: {
    state: BlocksState;
    parent: Block;
    target: Block;
    type: Block['type'];
}) => {
    // const blockWithoutTarget = _deleteBlock({
    //     state,
    //     parent,
    //     target,
    // });
    return state;
};
