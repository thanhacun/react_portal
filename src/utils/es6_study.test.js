import { sum, giaithua } from  './es6_study';
import { List, Map } from 'immutable';

it ('sum 2 numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2017, 0)).toEqual(2017);
});

it ('giai thua a number', () => {
  expect(giaithua(0)).toEqual(0);
  expect(giaithua(1)).toEqual(1);
  expect(giaithua(5)).toEqual(120);
});

describe ('immutability', () => {
  describe('A List', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      let state = List.of('Trainspotting', '28 Days Later');
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).toMatchObject(List.of(
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
      ));
      expect(state).toMatchObject(List.of(
        'Trainspotting',
        '28 Days Later'
      ))
    })
  })

  describe('A Tree', () => {
    function addMovie(currentState, movie) {
      return currentState.set(
        'movies',
        currentState.get('movies').push(movie)
      );
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Trainspotting', '28 Days Later')
      });
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).toMatchObject(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later',
          'Sunshine'
        )
      }));
      expect(state).toMatchObject(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later'
        )
      }));

    });
  })
});
