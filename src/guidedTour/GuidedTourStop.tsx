import {PropsWithChildren, useCallback, useContext, useState} from "react";
import * as React from "react";
import {GuidedTourContext, GuidedTourStopElementClassOrFunction} from "./index";
import {GuidedTourContent} from "./GuidedTourContent";

interface DefaultProps {
    title: string;
    description: string;
    current: GuidedTourStopElementClassOrFunction;
}

interface WithNext extends DefaultProps {
    next: GuidedTourStopElementClassOrFunction;
}

interface WithOutNext extends DefaultProps {
    next?: undefined;
    showDone: boolean;
}

type Props = WithNext | WithOutNext

const style = {
    display: "inline-block",
}

export function GuidedTourStop(props: PropsWithChildren<Props>) {
    const [ref, setRef] = useState<HTMLDivElement>();
    const ctx = useContext(GuidedTourContext);

    const refChange = useCallback(value => {
        setRef(value);
    },[]);

    let showNextButton = true;
    if(props.next === undefined) {
        showNextButton = props.showDone;
    }

    return (
        <React.Fragment>
            <GuidedTourContent
                open={props.current === ctx.position}
                anchor={ref}
                title={props.title}
                description={props.description}
                next={props.next}
                showNextButton={showNextButton} />
            <div ref={refChange} style={style}>
                {props.children}
            </div>
        </React.Fragment>
    );
}