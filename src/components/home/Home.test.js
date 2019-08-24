import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "./Home";
import Typography from "@material-ui/core/Typography";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    loadHomeAlbums: jest.fn(),
    loadHomeSongs: jest.fn()
  };

  const enzymeWrapper = shallow(<Home {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("Home", () => {
    it("should render a page title", () => {
      const { enzymeWrapper } = setup();

      //expect(enzymeWrapper.find("Header")).toBe(<Header />);

      expect(enzymeWrapper.find(<Home />)).toBe(<Home />);

      // const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
      // expect(todoInputProps.newTodo).toBe(true)
      // expect(todoInputProps.placeholder).toEqual('What needs to be done?')
    });

    // it('should call addTodo if length of text is greater than 0', () => {
    //   const { enzymeWrapper, props } = setup()
    //   const input = enzymeWrapper.find('TodoTextInput')
    //   input.props().onSave('')
    //   expect(props.addTodo.mock.calls.length).toBe(0)
    //   input.props().onSave('Use Redux')
    //   expect(props.addTodo.mock.calls.length).toBe(1)
    // })
  });
});
