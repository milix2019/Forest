import axios from 'axios';
import { GET_NOTE_RECEIEVE_DATA, GET_NOTE_COMPLETED_DATA } from './ActionConstant';
import config from '../../config';

/*
    This Section is for getting all the data,
    calling fetch_getpopular_data Action from the UI
*/

function request_getpopular_data() {
  return { type: GET_NOTE_RECEIEVE_DATA };
}

function receive_getpopular_data(data) {
  return {
    type: GET_NOTE_COMPLETED_DATA,
    getpopular: data,
  };
}

export function fetch_getpopular_data(d,page) {
    var page = page != undefined ? page : 1;
    let url = '';
    switch (d) {
      case "popular":
        url = config.BASE_URL + `movie/popular?api_key=${config.API_KEY}&language=en-US&page=${page}`;
        break;
      case "week":
        url = config.BASE_URL + `trending/movie/day?api_key=${config.API_KEY}`;
        break;
      case "month":
        url = config.BASE_URL + `trending/movie/week?api_key=${config.API_KEY}`;
        break;
      default:
        url = config.BASE_URL + `movie/popular?api_key=${config.API_KEY}&language=en-US&page=${page}`;
        break;
    }
    return function (dispatch) {
        dispatch(request_getpopular_data())
        return axios.get(url).then(
            response => {
                dispatch(receive_getpopular_data(response.data));
            },
            error => console.log("fail ajax on home page", error)
        )
    }
}