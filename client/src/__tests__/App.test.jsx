import { act } from 'react-dom/test-utils'; 
import ReactDom from "react-dom";

import App from '../components/App';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
}); 

describe('Testing App.jsx', () => {
    test('Welcome Logo rendering', () => {
        act(() => {
            ReactDom.render(<App/>, container);
        });
        expect(container.querySelector('.home').textContent).toBe('OverBlog');
    }); 
});