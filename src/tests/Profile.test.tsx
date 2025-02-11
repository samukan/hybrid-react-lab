import {render, screen} from '@testing-library/react';
import Profile from '../views/Profile';

test('renders correct content for the headline', () => {

  // render the Profile component in jsdom (simulated browser)
  render(<Profile />);

  // find the element with the text 'Profile'
  const element = screen.getByText(
    'Profile',
  );
  //console.log(element);
  // check that the element is found (not undefined)
  expect(element).toBeDefined();
});
