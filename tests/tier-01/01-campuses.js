const { expect } = require('chai')
import enzyme, { mount } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import waitForExpect from 'wait-for-expect'
import { Provider } from 'react-redux'
import * as rrd from 'react-router-dom'

const { MemoryRouter } = rrd

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  campuses: [],
}

import mockAxios from '../mock-axios'
import { setCampuses, fetchCampuses } from '../../app/redux/campuses'

import store from '../../app/store'

import rootReducer from '../../app/redux'
import { createStore } from 'redux'

const app = require('../../server')
const agent = require('supertest')(app)

const { db } = require('../../server/db')
const { Campus } = require('../../server/db')

const adapter = new Adapter()
enzyme.configure({ adapter })

/* NOTE: Make sure you pay attention to the path below. This is where your React components should live! */
import AllCampuses from '../../app/components/AllCampuses'
import AllStudents from '../../app/components/AllStudents'
import Root from '../../app/components/root'

describe('Tier One: Campuses', () => {
  describe('<AllCampuses /> component', () => {
    //I refactored this out to be out here rather than just the first test since we are using it in a bunch of places
    const campuses = [
      { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
      { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' }
    ];

    beforeEach(() => {
      sinon.stub(rrd, 'BrowserRouter').callsFake(({ children }) => {
        return <div>{children}</div>;
      });
      mockAxios.onGet('/api/campuses').replyOnce(200, campuses);
    });
    afterEach(() => {
      rrd.BrowserRouter.restore();
    });

    //Checks that the route renders the right component
    xit('renders <AllCampuses /> at /campuses', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/campuses']}>
            <AllCampuses />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(AllCampuses)).to.have.length(1);
      //Do we need to check all students here? Probably not but wanted to make sure I was not missing anything. This was left over from the old tests
      expect(wrapper.find(AllStudents)).to.have.length(0);
    });

    //Testing the component gets the props from state
    //Is the short hand okay for the props?
    xit('renders the campuses passed in as props', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/campuses']}>
            <AllCampuses campuses />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.text()).to.include('Mars Academy');
      expect(wrapper.text()).to.include('Jupiter Jumpstart');
      const images = wrapper.find('img').map(node => node.get(0).props.src);
      expect(images).to.include.members([
        '/images/mars.png',
        '/images/jupiter.jpeg'
      ]);
    });

    //Testing that the state gets the campuses from the thunk (assuming via componentDidMount)
    xit('initializes campuses from the server when the application loads the /campuses route', async () => {
      const reduxStateBeforeMount = store.getState();
      expect(reduxStateBeforeMount.campuses).to.deep.equal([]);
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/campuses']}>
            <AllCampuses />
          </MemoryRouter>
        </Provider>
      );
      await waitForExpect(() => {
        const reduxStateAfterMount = store.getState();
        expect(reduxStateAfterMount.campuses).to.deep.equal(campuses);
      });
    });
    //So this tests if we ONLY get the redux state/store to have campuses inside of it after the thunk fires ^

    //While this makes sure that allcampuses component has it in its props by what I am assuming is mountStateToProps?
    xit('<AllCampuses /> is passed campuses from store as props', async () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/campuses']}>
            <Root />
          </MemoryRouter>
        </Provider>
      );
      await waitForExpect(() => {
        //What is update doing here? Are we expecting something to update in the render of the component?
        //going off the example in the docs, they have a counter fire in the render https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/update.html
        wrapper.update();
        const { campuses: reduxCampuses } = store.getState();
        const { campuses: componentCampuses } = wrapper
          .find(AllCampuses)
          .props();
        expect(componentCampuses).to.deep.equal(reduxCampuses);
      });
    });

    xit('*** renders "No Campuses" if passed an empty array of campuses', () => {
      throw new Error('replace this error with your own test');
    });
  });

  describe('Redux', () => {
    let fakeStore
    beforeEach(() => {
      fakeStore = mockStore(initialState)
    })

    describe('set campuses', () => {
      const campuses = [
        { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
        { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
      ]

      xit('setCampuses action creator', () => {
        expect(setCampuses(campuses)).to.deep.equal({
          type: 'SET_CAMPUSES',
          campuses,
        })
      })

      xit('fetchCampuses thunk creator', async () => {
        mockAxios.onGet('/api/campuses').replyOnce(200, campuses)
        await fakeStore.dispatch(fetchCampuses())
        const actions = fakeStore.getActions()
        expect(actions[0].type).to.equal('SET_CAMPUSES')
        expect(actions[0].campuses).to.deep.equal(campuses)
      })
    })

    describe('reducer', () => {
      let testStore
      beforeEach(() => {
        testStore = createStore(rootReducer)
      })

      xit('*** returns the initial state by default', () => {
        throw new Error('replace this error with your own test')
      })

      xit('reduces on SET_CAMPUSES action', () => {
        const campuses = [
          {
            id: 1,
            name: 'Mars Academy',
            imageUrl: '/images/mars.png',
          },
          {
            id: 2,
            name: 'Jupiter Jumpstart',
            imageUrl: '/images/jupiter.jpeg',
          },
        ]
        const action = { type: 'SET_CAMPUSES', campuses }

        const prevState = testStore.getState()
        testStore.dispatch(action)
        const newState = testStore.getState()

        expect(newState.campuses).to.be.deep.equal(campuses)
        expect(newState.campuses).to.not.be.equal(prevState.campuses)
      })
    })
  })

  describe('Express API', () => {
    // Let's test our Express routes WITHOUT actually using the database.
    // By replacing the findAll methods on the Campus and Student models
    // with a spy, we can ensure that our API tests won't fail just because
    // our Sequelize models haven't been implemented yet.
    const { findAll: campusFindAll } = Campus
    beforeEach(() => {
      Campus.findAll = sinon.spy(() => [
        { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
        { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
      ])
    })
    afterEach(() => {
      Campus.findAll = campusFindAll
    })

    xit('GET /api/campuses responds with all campuses', async () => {
      const response = await agent.get('/api/campuses').expect(200)
      expect(response.body).to.deep.equal([
        { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
        { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
      ])
      expect(Campus.findAll.calledOnce).to.be.equal(true)
    })
  })

  describe('Sequelize Model', () => {
    before(() => db.sync({ force: true }))
    afterEach(() => db.sync({ force: true }))

    xit('has fields name, address, imageUrl, description', () => {
      const campus = Campus.build({
        name: 'Jupiter Jumpstart',
        address: '5.2 AU',
        imageUrl: '/images/jupiter.png',
        description:
          'The best JavaScript Academy for toddlers in the solar system!',
      })
      expect(campus.name).to.equal('Jupiter Jumpstart')
      expect(campus.address).to.equal('5.2 AU')
      expect(campus.imageUrl).to.equal('/images/jupiter.png')
      expect(campus.description).to.equal(
        'The best JavaScript Academy for toddlers in the solar system!'
      )
    })

    xit('*** requires name and address', async () => {
      throw new Error('replace this error with your own test')
    })

    xit('name and address cannot be empty', async () => {
      const campus = Campus.build({ name: '', address: '' })
      try {
        await campus.validate()
        throw Error('validation should have failed with empty name and address')
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on name')
        expect(err.message).to.contain('Validation notEmpty on address')
      }
    })

    xit('default imageUrl if left blank', async () => {
      const campus = Campus.build({
        name: 'Jupiter Jumpstart',
        address: '5.2 AU',
      })
      await campus.validate()
      expect(campus.imageUrl).to.be.a('string')
      expect(campus.imageUrl.length).to.be.greaterThan(1)
    })
  })
})
