import * as React from 'react';
import { createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

// =========================
// Context
// =========================

const PortalContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export const usePortalTarget = () => useContext(PortalContext);

export const PortalProvider = ({
                                   target,
                                   children,
                               }: {
    target: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
}) => (
    <PortalContext.Provider value={target}>
        {children}
    </PortalContext.Provider>
);

// =========================
// Portal component
// =========================

export const Portal = ({ children }: { children: React.ReactNode }) => {
    const target = usePortalTarget();

    if (target?.current) {
        return createPortal(children, target.current);
    }

    // fallback — target 없으면 document.body
    return createPortal(children, document.body);
};