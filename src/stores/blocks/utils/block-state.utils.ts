import { Block, BlocksState, PageBlock } from '../blocks.model';
import {
    checkboxBlockFactory,
    headerBlockFactory,
    pageBlockFactory,
    textBlockFactory,
} from './block-factories.utils';

export const _findBlock = (
    state: BlocksState,
    predicate: (block: Block) => boolean
): Block => {
    const _iter = (current: Block) => {
        if (predicate(current)) {
            return current;
        }
        if (current.children.length === 0) {
            return undefined;
        }
        return current.children.map(_iter).reduce((acc, cur) => cur ?? acc);
    };
    return _iter(state);
};

export const _findParent = (state: BlocksState, target: Block) => {
    return _findBlock(
        state,
        (block) =>
            block.children.find((child) => child.id === target.id) !== undefined
    );
};

export const _updateBlock = (state: BlocksState, target: Block) => {
    const _iter = (current: Block) => {
        if (current.id === target.id) {
            return target;
        }
        return {
            ...current,
            children: current.children.map(_iter),
        };
    };
    return _iter(state);
};

export const _pushChild = (state: BlocksState, parent: Block, child: Block) => {
    const newParent = {
        ...parent,
        children: [...parent.children, child],
    };
    return _updateBlock(state, newParent);
};

export const _deleteBlock = (state: BlocksState, target: Block) => {
    const _iter = (current: Block) => {
        if (current.children.find((child) => child.id === target.id)) {
            return {
                ...current,
                children: current.children.filter(
                    (child) => child.id !== target.id
                ),
            };
        }
        return {
            ...current,
            children: current.children.map(_iter),
        };
    };
    return _iter(state);
};

export const _insertBlock = (
    state: BlocksState,
    parent: Block,
    target: Block,
    position: number
) => {
    const _iter = (node: Block) => {
        if (node.id === parent.id) {
            const updatedNode: Block = {
                ...node,
                children: node.children.reduce(
                    (acc, curr, index) =>
                        index === position
                            ? [...acc, target, curr]
                            : [...acc, curr],
                    []
                ),
            };
            return updatedNode;
        }
        if (node.children.length === 0) {
            return node;
        }
        return {
            ...node,
            children: node.children.map(_iter),
        };
    };
    return _iter(state);
};

export const blockFactoryStrategy = (type: Block['type']) => {
    switch (type) {
        case 'checkbox':
            return checkboxBlockFactory;
        case 'header':
            return headerBlockFactory;
        case 'page':
            return pageBlockFactory;
        default:
            return textBlockFactory;
    }
};

export const _convertBlockTo = (
    state: BlocksState,
    target: Block,
    type: Block['type'],
    options?: Partial<Block>
) => {
    const _iter = (node: Block) => {
        if (node.id === target.id) {
            const blockFactory = blockFactoryStrategy(type);
            return blockFactory({
                ...target,
                ...options,
            });
        }
        if (node.children.length === 0) {
            return node;
        }
        return {
            ...node,
            children: node.children.map(_iter),
        };
    };
    return _iter(state);
};

export const _pathToPage = (state: BlocksState, target: PageBlock) => {
    const _iter = (node: Block, path: Block[]) => {
        if (node.id === target.id) {
            return path;
        }
        if (node.children.length === 0) {
            return undefined;
        }
        return node.children
            .map((item) => _iter(item, [...path, item]))
            .find((item) => !!item);
    };
    return _iter(state, []);
};

export const _attachToNeighbour = (state: BlocksState, target: Block) => {
    const parent = _findParent(state, target);
    const targetIndex = parent.children.findIndex(
        (child) => child.id === target.id
    );
    const neighbourIndex = targetIndex - 1;
    if (neighbourIndex < 0) {
        return state;
    }
    const neighbour = parent.children[neighbourIndex];
    const stateWithoutTarget = _deleteBlock(state, target);
    return _pushChild(stateWithoutTarget, neighbour, target);
};

export const _insertNextNeighbour = (
    state: BlocksState,
    source: Block,
    target: Block
) => {
    const parent = _findParent(state, source);
    const sourceIndex = parent.children.findIndex(
        (child) => child.id === source.id
    );
    const targetIndex = sourceIndex + 1;
    if (targetIndex === parent.children.length) {
        return _pushChild(state, parent, target);
    }
    return _insertBlock(state, parent, target, targetIndex);
};
