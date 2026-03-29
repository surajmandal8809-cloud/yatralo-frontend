import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { store } from './store.js'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root');
if (rootElement) {
    try {
        const root = createRoot(rootElement);
        root.render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    } catch(e) {
        console.error("Mount error:", e);
    }
} else {
    console.error("No root element found");
}

window.addEventListener('error', (e) => {
    console.error("UNCAUGHT RUNTIME ERROR:", e.message, e.filename, e.lineno);
});
