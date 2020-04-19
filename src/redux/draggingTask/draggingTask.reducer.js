import {ACTIONS} from "./draggingTask.constants";

function draggingTaskReducer(state = {}, action = {}) {
    const {type, payload} = action;
    state = Object.assign({}, state);
    switch (type) {
        case ACTIONS.SET_CURRENT_DRAGGING_TASK_DATA:
            {
                const { ID, from, index, height } = payload;
                state = {
                    ID,
                    from,
                    to: from,
                    originalIndex: index,
                    currentIndex: -1,
                    height,
                };
            }
            break;
        case ACTIONS.DELETE_CURRENT_DRAGGING_TASK_DATA:
            state = {};
            break;
        case ACTIONS.UPDATE_TO_OF_CURRENT_DRAGGING_TASK:
        {
            const {to} = payload;
            state.to = to;
        }
            break;
        case ACTIONS.UPDATE_INDEX_OF_CURRENT_DRAGGING_TASK:
            {
                const {index} = payload;
                state.currentIndex = index;
            }
            break;
        case ACTIONS.SET_CURRENT_DROP_TARGET_LIST:
            {
                const {to} = payload;
                state.to = to;
            }
            break;
        default:
            state = {};
    }
    return state;
}

export {draggingTaskReducer};
