import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';

import SignIn from './../client/Components/SignIn';
import Product from './../client/Components/Product';

const product = {
  name: 'package',
  images: 'fakeurl.com',
  price: 4.2,
  description: 'just your every day package, nothing to see here',
  seller: { name: 'exampleName' },
  location: {
    name: 'testLoc',
    lng: '123.456789',
    lat: '123.456789'
  }
};

//You must use mount or render for stateful components
describe('Full DOM Render <SignIn />', () => {
  it('should contain a form', () => {
    const wrapper = mount(<SignIn />);

    //When rendered, we can make sure it contains a form
    expect(wrapper.find('form')).to.have.length(1);
  });
});

describe('Static HTML Render <SignIn />', () => {
  it('should contain a form', () => {
    const wrapper = render(<SignIn />);

    //Once the component is rendered, we can search it's components
    expect(wrapper.find('form')).to.have.length(1);
  });
});

//You can use shallow on stateless components
describe('Shallow Render <Product />', () => {
  it('should have return a value with html()', () => {
    //You can also pass props in when rendering with enzyme
    const wrapper = shallow(<Product info={product} />);


    //Find will work, but contains will not
    //Find uses an enzyme selector:
    //http://airbnb.io/enzyme/docs/api/selector.html
    expect(wrapper.find('img')).to.have.length(1);
    //Contains looks for React elements
    expect(wrapper.contains('img')).to.be.false;
  });
});


