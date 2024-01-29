import './bootstrap';
import '../css/app.css';

/*import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
   // resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/* *_*.jsx')),
   /* setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});*/
//import './bootstrap';
import '../css/app.css';
import { useState } from 'react';  // Ajout de useState

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || ' Rental Car Services';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Ajout d'un état local pour gérer le chargement
        const [loading, setLoading] = useState(true);

        // Mettez à jour l'état lorsque le chargement est terminé
        const handleLoadingComplete = () => {
            setLoading(false);
        };

        root.render(
            <>
                {loading && (
                    <div style={{ position: 'fixed', top: '50%', left: '50%', background:'red', transform: 'translate(-50%, -50%)' }}>
                        {/* Vous pouvez remplacer cette icône par la vôtre */}
                        <div className="loader">Chargement...</div>
                    </div>
                )}
                <App {...props} onLoadingComplete={handleLoadingComplete} />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

