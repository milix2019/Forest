import { GET_NOTE_COMPLETED_DATA } from '../action/ActionConstant';
import { get_notes_reducer } from "./HomeReducer";

describe('Get Reducer', () => {
  it('Should return default state', () => {
    const initate_state = {
      loading_getpopular: true,
      getpopular: [],
    };
    const newState = get_notes_reducer(initate_state, {});
    expect(newState).toEqual(initate_state);
  });

  it('Should return new state if receiving type', () => {
    const initate_state = {
      loading_getpopular: false,
      getpopular: [],
    };
    const newState = get_notes_reducer([], {
      type: GET_NOTE_COMPLETED_DATA,
      loading_getpopular: false,
      getpopular: [],
    });
    expect(newState).toEqual(initate_state);
  });
  it("handles get_notes_reducer as expected", () => {
    const initate_state = {
      loading_getpopular: false,
      getpopular: [],
    };
    const newState = get_notes_reducer(initate_state, {
      type: GET_NOTE_COMPLETED_DATA,
      getpopular: [{
        title: 'Test title',
        note: 'Test note',
        is_deleted: false,
        id: 23,
        create_at: "2019-10-31",
      }],
    });

    expect(newState).toEqual({
      getpopular: [{
        title: 'Test title',
        note: 'Test note',
        is_deleted: false,
        id: 23,
        create_at: "2019-10-31",
      }],
      loading_getpopular: false,
    });
  });
});
