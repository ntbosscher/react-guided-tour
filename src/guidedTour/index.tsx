import * as React from "react";
import {
    createContext,
    PropsWithChildren, useCallback,
    useContext,
    useMemo,
    useState
} from "react";

export const GuidedTourContext = createContext<TourContext>({
    position: null,
    exited: false,
    canGoBack: false,
    canGoForward: false,
    moveTo(key: GuidedTourStopElementClassOrFunction) {
        console.error("not setup");
    },
    exit() {
        console.error("not setup");
    },
    back() {
        console.error("not setup");
    }, 
    forward() {
        console.error("not setup");
    }
});

export type GuidedTourStopElementClassOrFunction = (props: any) => any;

interface TourContext {
    position: GuidedTourStopElementClassOrFunction | null;
    exited: boolean;
    canGoBack: boolean;
    canGoForward: boolean;
    moveTo(key: GuidedTourStopElementClassOrFunction | null): void;
    exit(): void;
    back(): void;
    forward(): void;
}

interface Position {
    value: GuidedTourStopElementClassOrFunction | null;
    previous: GuidedTourStopElementClassOrFunction[];
    forward: GuidedTourStopElementClassOrFunction[];
}

export function GuidedTourProvider(props: PropsWithChildren<{startWith?: GuidedTourStopElementClassOrFunction}>) {

    const [position, setPosition] = useState<Position>({
        value: props.startWith || null,
        previous: [],
        forward: [],
    });

    const [exited, setExited] = useState(false);
    const moveTo = useCallback(p => {
        if(exited) {
            console.warn("ignoring tour prompt b/c user has exited the tour");
            return;
        }

        setPosition({
            value: p,
            previous: position.value === null ? position.previous : [...position.previous, position.value],
            forward: [],
        });
    }, [exited, position]);

    const exit = useCallback(() => {
        setPosition({value: null, previous: [], forward: []});
        setExited(true);
    }, []);

    const back = useCallback(() => {
        if(position.previous.length === 0) {
            console.warn("can't go back, no history");
            return;
        }

        setPosition({
            value: position.previous[position.previous.length - 1],
            previous: position.previous.slice(0, position.previous.length - 1),
            forward: position.value !== null ? [...position.forward, position.value] : position.forward,
        });
    }, [position]);

    const forward = useCallback(() => {
        if(position.forward.length === 0) {
            console.warn("can't go forward, no history");
            return;
        }

        setPosition({
            value: position.forward[position.forward.length - 1],
            previous: position.value !== null ? [...position.previous, position.value] : position.previous,
            forward: position.forward.slice(0, position.forward.length - 1),
        });

    }, [position]);

    const value = useMemo(() => {
        return {
            moveTo: moveTo,
            position: position.value,
            exited: exited,
            exit: exit,
            back: back,
            canGoBack: position.previous.length > 0,
            canGoForward: position.forward.length > 0,
            forward: forward,
        }
    }, [moveTo, position.value, position.previous.length, position.forward.length, exited, exit, back, forward]);

    return (
        <GuidedTourContext.Provider value={value}>
            {props.children}
        </GuidedTourContext.Provider>
    )
}

export function useGuidedTour() {
    const ctx = useContext(GuidedTourContext);
    return {
        moveTo: (p: GuidedTourStopElementClassOrFunction) => setTimeout(() => ctx.moveTo(p)),
        back: ctx.back,
        exit: ctx.exit,
    };
}